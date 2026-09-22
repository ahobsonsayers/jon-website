import { Reveal, SectionHeading } from "../components/Reveal"
import type { Site } from "../lib/content"

export function Contact({ site }: { site: Site }) {
  const { contact } = site
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:px-12">
      <SectionHeading index="05" title="Contact" />
      <Reveal>
        <p className="max-w-xl text-xl text-paper-dim">{contact.blurb}</p>
        <a
          href={`mailto:${contact.email}`}
          className="mt-8 inline-block text-3xl font-bold tracking-tight text-paper underline decoration-accent decoration-4 underline-offset-8 transition-colors hover:text-accent md:text-5xl"
        >
          {contact.email}
        </a>
        <ul className="mt-12 flex gap-6 font-mono text-sm text-paper-dim">
          {contact.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} className="hover:text-accent">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
