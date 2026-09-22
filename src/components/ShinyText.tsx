import { useAnimationFrame, useMotionValue, useTransform } from "motion/react"
import { useEffect, useRef } from "react"

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
  color?: string
  shineColor?: string
  spread?: number
  delay?: number
}

export function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  delay = 0,
}: ShinyTextProps) {
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)

  const animationDuration = speed * 1000
  const delayDuration = delay * 1000

  useAnimationFrame((time) => {
    if (disabled) {
      lastTimeRef.current = null
      return
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }

    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time

    elapsedRef.current += deltaTime

    const cycleDuration = animationDuration + delayDuration
    const cycleTime = elapsedRef.current % cycleDuration

    if (cycleTime < animationDuration) {
      progress.set((cycleTime / animationDuration) * 100)
    } else {
      progress.set(100)
    }
  })

  useEffect(() => {
    elapsedRef.current = 0
    progress.set(0)
  }, [progress])

  const backgroundPosition = useTransform(
    progress,
    (p) => `${150 - p * 2}% center`,
  )

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }

  return (
    <span
      className={`inline-block ${className}`}
      style={{
        ...gradientStyle,
        backgroundPosition:
          backgroundPosition.get() as React.CSSProperties["backgroundPosition"],
      }}
    >
      {text}
    </span>
  )
}
