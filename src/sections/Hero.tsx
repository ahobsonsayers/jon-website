import { animate, createScope, createTimeline, stagger, svg } from "animejs"
import { useEffect, useRef } from "react"
import Aurora from "../components/Aurora"
import FoldText from "../components/FoldText/FoldText"
import { ShinyText } from "../components/ShinyText"
import TextLoop from "../components/TextLoop/TextLoop"
import type { Site } from "../lib/content"
import { prefersReducedMotion } from "../lib/smooth"

type Letter = { ch: string; x: number; y: number; w: number }

const JON: Letter[] = [
  { ch: "J", x: 40, y: 100, w: 80 },
  { ch: "O", x: 144, y: 100, w: 96 },
  { ch: "N", x: 264, y: 100, w: 96 },
]

const MASTERS: Letter[] = [
  { ch: "M", x: 170, y: 238, w: 104 },
  { ch: "A", x: 298, y: 238, w: 88 },
  { ch: "S", x: 410, y: 238, w: 76 },
  { ch: "T", x: 510, y: 238, w: 84 },
  { ch: "E", x: 618, y: 238, w: 72 },
  { ch: "R", x: 714, y: 238, w: 88 },
  { ch: "S", x: 826, y: 238, w: 76 },
]

const JON_FILL = "#ffb3a0"
const MASTERS_FILL = "#ffd9a3"

export function Hero({ site }: { site: Site }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const scope = createScope({ root: root.current ?? undefined }).add(() => {
      const drawables = svg.createDrawable(".jm-line")
      const tl = createTimeline({ defaults: { ease: "inOutQuad" } })
      tl.add(drawables.slice(0, JON.length), {
        draw: "0 1",
        duration: 500,
        delay: stagger(70),
      } as never, 0)
        .add(
          drawables.slice(JON.length),
          {
            draw: "0 1",
            duration: 500,
            delay: stagger(70),
          } as never,
          0,
        )
        .add(
          ".jm-fill",
          { fillOpacity: [0, 1], duration: 600, delay: stagger(40) },
          "-=800",
        )
        .add(
          ".jm-fade",
          {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 700,
            delay: stagger(100),
          },
          "-=600",
        )
        .add(".jm-cue", {
          opacity: [0, 1],
          duration: 600,
          loop: true,
          alternate: true,
        })
      animate(".jm-bg", { opacity: [0, 1], duration: 1000 })
    })
    return () => scope.revert()
  }, [])

  return (
    <header
      ref={root}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 py-8 md:px-12"
    >
      <div className="jm-bg pointer-events-none absolute inset-x-0 top-0 h-[45svh] opacity-0 max-md:opacity-50 md:opacity-60">
        <Aurora
          colorStops={["#ff5c33", "#ffb03a", "#ff5c33"]}
          amplitude={1.1}
          blend={0.6}
          speed={0.8}
        />
      </div>
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
          viewBox="0 0 980 340"
          className="w-full"
          role="img"
          aria-label={site.site.name}
        >
          <g className="font-bold" style={{ fontSize: 120 }}>
            {JON.map((l) => (
              <g key={`j-${l.ch}`}>
                <text
                  className="jm-fill"
                  x={l.x}
                  y={l.y}
                  fill={JON_FILL}
                  fillOpacity={prefersReducedMotion() ? 1 : 0}
                >
                  {l.ch}
                </text>
                <text
                  className="jm-line"
                  x={l.x}
                  y={l.y}
                  fill="none"
                  stroke="var(--color-paper)"
                  strokeWidth="3"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={prefersReducedMotion() ? 0 : 1}
                >
                  {l.ch}
                </text>
              </g>
            ))}
          </g>
          <g className="font-bold" style={{ fontSize: 120 }}>
            {MASTERS.map((l) => (
              <g key={`m-${l.ch}-${l.x}`}>
                <text
                  className="jm-fill"
                  x={l.x}
                  y={l.y}
                  fill={MASTERS_FILL}
                  fillOpacity={prefersReducedMotion() ? 1 : 0}
                >
                  {l.ch}
                </text>
                <text
                  className="jm-line"
                  x={l.x}
                  y={l.y}
                  fill="none"
                  stroke="var(--color-paper)"
                  strokeWidth="3"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={prefersReducedMotion() ? 0 : 1}
                >
                  {l.ch}
                </text>
              </g>
            ))}
          </g>
        </svg>

        <div className="mt-8 max-w-xl">
          <p className="jm-fade font-mono text-sm uppercase tracking-widest text-accent">
            <ShinyText
              text={site.site.role}
              speed={3}
              delay={2}
              color="var(--color-accent)"
              shineColor="#ffffff"
              className="uppercase tracking-widest"
            />
          </p>
          <h1 className="mt-3 text-xl leading-snug md:text-2xl">
            <FoldText
              text={site.hero.tagline}
              splitBy="word"
              hinge="top"
              duration={0.55}
              stagger={0.06}
              trigger="scroll"
              fontSize="inherit"
              fontWeight="inherit"
              color="inherit"
              className="text-xl leading-snug md:text-2xl"
            />
          </h1>
          <p className="jm-fade mt-3 text-paper-dim">{site.hero.sub}</p>
        </div>
      </div>

      <div className="relative z-10">
        <TextLoop
          text="Comedy Direction        ✦        Writing        ✦        Performance"
          shape="wave"
          speed={70}
          separator=""
          curviness={70}
          fontSize={26}
          fontWeight={600}
          letterSpacing={3}
          color="var(--color-paper-dim)"
          ribbon
          ribbonColor="var(--color-accent)"
          ribbonWidth={64}
          pauseOnHover
          className="max-w-full opacity-90"
        />
      </div>

      <div className="relative z-10 flex justify-center">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="jm-cue font-mono text-4xl text-paper-dim hover:text-accent"
          style={{ opacity: prefersReducedMotion() ? 1 : 0 }}
        >
          ↓
        </a>
      </div>
    </header>
  )
}
