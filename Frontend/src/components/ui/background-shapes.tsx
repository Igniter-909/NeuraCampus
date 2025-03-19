"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type Shape = {
  id: number
  type: "circle" | "triangle" | "square" | "hexagon"
  x: number
  y: number
  size: number
  rotation: number
  color: string
  duration: number
  delay: number
}

export function BackgroundShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    // Generate random shapes
    const types = ["circle", "triangle", "square", "hexagon"]
    const colors = [
      "rgba(59, 130, 246, 0.35)", // blue
      "rgba(99, 102, 241, 0.3)", // indigo
      "rgba(16, 35, 79, 0.25)", // dark blue
      "rgba(255, 255, 255, 0.2)", // white
    ]

    const newShapes: Shape[] = []

    for (let i = 0; i < 15; i++) {
      newShapes.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)] as Shape["type"],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })
    }

    setShapes(newShapes)
  }, [])

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-full"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              zIndex: 1,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              rotate: [0, shape.rotation, shape.rotation * 2, shape.rotation * 3],
              scale: [0, 1, 0.8, 1],
              opacity: [0, 0.9, 0.7, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          />
        )
      case "triangle":
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              zIndex: 1,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              rotate: [0, shape.rotation, shape.rotation * 2, shape.rotation * 3],
              scale: [0, 1, 0.8, 1],
              opacity: [0, 0.9, 0.7, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          />
        )
      case "square":
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              zIndex: 1,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              rotate: [0, shape.rotation, shape.rotation * 2, shape.rotation * 3],
              scale: [0, 1, 0.8, 1],
              opacity: [0, 0.9, 0.7, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          />
        )
      case "hexagon":
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: `${shape.size * 0.866}px`,
              backgroundColor: shape.color,
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              zIndex: 1,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              rotate: [0, shape.rotation, shape.rotation * 2, shape.rotation * 3],
              scale: [0, 1, 0.8, 1],
              opacity: [0, 0.9, 0.7, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          />
        )
      default:
        return null
    }
  }

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{shapes.map(renderShape)}</div>
}

