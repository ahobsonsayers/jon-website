import { Reveal, SectionHeading } from "../components/Reveal"
import type { Site } from "../lib/content"
import { prefersReducedMotion } from "../lib/smooth"

function Row({
  items,
  reverse,
}: {
  items: Site["testimonials"]
  reverse?: boolean
}) {
  const doubled = [...items, ...items]
  return (
    <div className="group flex overflow-hidden border-y border-white/10 py-6">
      <div
        className="flex shrink-0 gap-6 pr-6"
        style={
          prefersReducedMotion()
            ? {
                flexWrap: "wrap",
                overflow: "hidden",
                height: "fit-content",
                maxHeight: "40vh",
              }
            : {
                animation: `marquee 40s linear infinite ${reverse ? "reverse" : ""}`,
              }
        }
      >
        {doubled.map((t, i) => (
          <figure
            key={`${t.author}-${i > items.length ? "b" : "a"}`}
            className="w-80 shrink-0 rounded-lg border border-white/10 bg-ink-soft p-6 transition-colors hover:border-accent/60"
          >
            <blockquote className="text-sm leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs text-paper-dim">
              {t.author} · {t.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export function Testimonials({ site }: { site: Site }) {
  const mid = Math.ceil(site.testimonials.length / 2)
  return (
    <section id="testimonials" className="py-12 md:py-24">
      <div className="mx-auto mb-12 max-w-6xl px-6 md:px-12">
        <SectionHeading index="04" title="Kind Words" />
      </div>
      <Reveal>
        <div className="space-y-6">
          <Row items={site.testimonials.slice(0, mid)} />
          <Row items={site.testimonials.slice(mid)} reverse />
        </div>
      </Reveal>
    </section>
  )
}
