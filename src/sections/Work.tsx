import { Reveal, SectionHeading } from "../components/Reveal"
import { asset, type Site } from "../lib/content"

function Poster({
  project,
  index,
}: {
  project: Site["projects"][number]
  index: number
}) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <a
        href="#work"
        className="group block overflow-hidden rounded-lg border border-white/10 bg-ink-soft"
      >
        <div className="aspect-2/3 overflow-hidden">
          <img
            src={asset(project.image)}
            alt={`${project.title} poster`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex items-baseline justify-between gap-2 p-4">
          <div>
            <h3 className="font-semibold">{project.title}</h3>
            <p className="font-mono text-xs text-paper-dim">
              {project.category}
            </p>
          </div>
          <span className="font-mono text-xs text-paper-dim">
            {project.year}
          </span>
        </div>
      </a>
    </Reveal>
  )
}

export function Work({ site }: { site: Site }) {
  return (
    <section
      id="work"
      className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-24"
    >
      <SectionHeading index="02" title="Work" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.projects.map((p, i) => (
          <Poster key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
