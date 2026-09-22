import { animate, createScope, createTimeline, svg } from "animejs"
import { useEffect, useRef } from "react"
import type { Site } from "../lib/content"
import { prefersReducedMotion } from "../lib/smooth"

const LOGO_PATHS = [
  // J — stem down the right, hook curving left at the bottom
  "M50 10 V70 Q50 90 32 90 Q14 90 14 68",
  // O
  "M100 10 Q80 10 80 50 Q80 90 100 90 Q120 90 120 50 Q120 10 100 10",
  // N
  "M150 90 V10 L190 90 V10",
  // (space) M
  "M240 90 V10 L270 60 L300 10 V90",
  // A
  "M330 90 L350 10 L370 90 M338 60 H362",
  // S
  "M420 20 Q400 10 395 25 Q390 40 420 45 Q450 50 445 70 Q440 90 415 80",
  // T
  "M460 10 H520 M490 10 V90",
  // E
  "M545 10 H595 M545 10 V90 M545 50 H580 M545 90 H595",
  // R
  "M620 90 V10 H650 Q670 10 670 35 Q670 60 650 60 H620 M655 60 L680 90",
  // S
  "M730 20 Q710 10 705 25 Q700 40 730 45 Q760 50 755 70 Q750 90 725 80",
] as const

export function Hero({ site }: { site: Site }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const scope = createScope({ root: root.current ?? undefined }).add(() => {
      const drawables = svg.createDrawable(".jm-line")
      const tl = createTimeline({ defaults: { ease: "inOutQuad" } })
      tl.add(drawables, {
        draw: "0 1",
        duration: 1400,
        delay: (_el: unknown, i: number) => 120 * i,
      } as never)
        .add(".jm-fade", {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 700,
          delay: 200,
        })
        .add(".jm-cue", {
          opacity: [0, 1],
          duration: 600,
          loop: true,
          alternate: true,
        })
      animate(".jm-bg", { opacity: [0, 1], duration: 1200 })
    })
    return () => scope.revert()
  }, [])

  return (
    <header
      ref={root}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 py-8 md:px-12"
    >
      <img
        src={`${import.meta.env.BASE_URL}images/dot-grid.svg`}
        alt=""
        aria-hidden
        className="jm-bg pointer-events-none absolute -top-24 left-0 w-full opacity-0 max-md:opacity-30 md:opacity-40"
      />
      <nav className="relative z-10 flex justify-between font-mono text-sm text-paper-dim">
        <a href="#work" className="hover:text-accent">
          Work
        </a>
        <a href="#contact" className="hover:text-accent">
          Contact
        </a>
      </nav>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <svg
          viewBox="0 0 760 100"
          className="w-full"
          role="img"
          aria-label={site.site.name}
        >
          {LOGO_PATHS.map((d) => (
            <path
              key={d}
              className="jm-line"
              d={d}
              fill="none"
              stroke="var(--color-paper)"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          ))}
        </svg>

        <div
          className="jm-fade mt-8 max-w-xl"
          style={{ opacity: prefersReducedMotion() ? 1 : 0 }}
        >
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            {site.site.role}
          </p>
          <h1 className="mt-3 text-xl leading-snug md:text-2xl">
            {site.hero.tagline}
          </h1>
          <p className="mt-3 text-paper-dim">{site.hero.sub}</p>
        </div>
      </div>

      <div className="relative z-10 flex justify-center">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="jm-cue font-mono text-2xl text-paper-dim hover:text-accent"
          style={{ opacity: prefersReducedMotion() ? 1 : 0 }}
        >
          ↓
        </a>
      </div>
    </header>
  )
}
