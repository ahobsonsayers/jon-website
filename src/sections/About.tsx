import { Reveal, SectionHeading } from "../components/Reveal"
import { asset, type Site } from "../lib/content"

export function About({ site }: { site: Site }) {
  const { about } = site
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-24"
    >
      <SectionHeading index="01" title="About" />
      <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
        <Reveal className="flex md:block">
          <img
            src={asset(about.photo)}
            alt="Jon Masters"
            loading="lazy"
            className="mx-auto w-full max-w-xs rounded-lg border border-white/10"
          />
        </Reveal>
        <div className="space-y-6 text-lg text-paper-dim">
          {about.paragraphs.map((p) => (
            <Reveal key={p.slice(0, 24)} delay={0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
