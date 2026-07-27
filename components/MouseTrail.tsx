'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const TRAIL_COUNT = 12
const SPARK_COUNT = 12

type Point = {
  x: number
  y: number
}

type Spark = {
  id: number
  x: number
  y: number
}

export default function MouseTrail() {
  const [points, setPoints] = useState<Point[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  )

  const [sparks, setSparks] = useState<Spark[]>([])

  useEffect(() => {
    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    const handleMove = (e: MouseEvent) => {
      mouse = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const handleClick = (e: MouseEvent) => {
      const id = Date.now() + Math.random()

      setSparks((prev) => [
        ...prev,
        {
          id,
          x: e.clientX,
          y: e.clientY,
        },
      ])

      setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => spark.id !== id))
      }, 500)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', handleClick)

    let animationFrame: number

    const animate = () => {
      setPoints((prev) => {
        const next = [...prev]

        next[0] = mouse

        for (let i = 1; i < TRAIL_COUNT; i++) {
          next[i] = {
            x: next[i].x + (next[i - 1].x - next[i].x) * 0.35,
            y: next[i].y + (next[i - 1].y - next[i].y) * 0.35,
          }
        }

        return next
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleClick)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      {/* Mouse Trail */}
      {points.map((point, index) => {
        const size = Math.max(3, 14 - index)

        return (
          <motion.div
            key={index}
            className="pointer-events-none fixed z-[9999] rounded-full bg-pink-400"
            animate={{
              x: point.x - size / 2,
              y: point.y - size / 2,
            }}
            transition={{
              duration: 0.08,
              ease: 'linear',
            }}
            style={{
              width: size,
              height: size,
              opacity: 1 - index / TRAIL_COUNT,
              filter: 'blur(1px)',
            }}
          />
        )
      })}

      {/* Click Sparks */}
      <AnimatePresence>
        {sparks.map((spark) =>
          Array.from({ length: SPARK_COUNT }).map((_, i) => {
            const angle = (360 / SPARK_COUNT) * i
            const distance = 35 + Math.random() * 25

            const x = Math.cos((angle * Math.PI) / 180) * distance
            const y = Math.sin((angle * Math.PI) / 180) * distance

            return (
              <motion.div
                key={`${spark.id}-${i}`}
                className="pointer-events-none fixed z-[9999] rounded-full bg-yellow-300"
                initial={{
                  x: spark.x,
                  y: spark.y,
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  x: spark.x + x,
                  y: spark.y + y,
                  scale: 0,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: 'easeOut',
                }}
                style={{
                  width: 5,
                  height: 5,
                  boxShadow: '0 0 8px #fde047',
                }}
              />
            )
          })
        )}
      </AnimatePresence>
    </>
  )
}