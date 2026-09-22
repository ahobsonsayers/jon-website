import { Reveal, SectionHeading } from "../components/Reveal"
import type { Site } from "../lib/content"

export function Services({ site }: { site: Site }) {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24 md:px-12">
      <SectionHeading index="03" title="Services" />
      <div className="grid gap-6 sm:grid-cols-2">
        {site.services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 0.08}>
            <div className="group h-full rounded-lg border border-white/10 bg-ink-soft p-8 transition-colors hover:border-accent/60">
              <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
                {s.title}
              </h3>
              <p className="mt-3 text-paper-dim">{s.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
