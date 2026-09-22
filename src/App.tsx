import { site } from "./lib/content"
import { useSmoothScroll } from "./lib/smooth"
import { About } from "./sections/About"
import { Contact } from "./sections/Contact"
import { Hero } from "./sections/Hero"
import { Services } from "./sections/Services"
import { Testimonials } from "./sections/Testimonials"
import { Work } from "./sections/Work"

export default function App() {
  const ready = useSmoothScroll()

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-ink">
        <span className="font-mono text-sm text-paper-dim">Loading…</span>
      </div>
    )
  }

  return (
    <main>
      <Hero site={site} />
      <About site={site} />
      <Work site={site} />
      <Services site={site} />
      <Testimonials site={site} />
      <Contact site={site} />
      <footer className="border-t border-white/10 px-6 py-8 text-center font-mono text-xs text-paper-dim md:px-12">
        © {new Date().getFullYear()} {site.site.name}
      </footer>
    </main>
  )
}
