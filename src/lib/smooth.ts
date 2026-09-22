import { useEffect, useState } from "react"

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function useSmoothScroll() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (prefersReducedMotion()) {
      setReady(true)
      return
    }
    let lenis: import("lenis").default | undefined
    const raf = 0
    let cancelled = false
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return
      lenis = new Lenis({ autoRaf: true })
      setReady(true)
    })
    return () => {
      cancelled = true
      lenis?.destroy()
      cancelAnimationFrame(raf)
    }
  }, [])
  return ready
}
