import { load } from "js-yaml"
import raw from "../content/site.yaml?raw"

export interface Site {
  site: { name: string; role: string }
  hero: { tagline: string; sub: string }
  about: { photo: string; paragraphs: string[] }
  projects: { title: string; category: string; year: number; image: string }[]
  services: { title: string; description: string }[]
  testimonials: { quote: string; author: string; source: string }[]
  contact: {
    email: string
    blurb: string
    socials: { label: string; url: string }[]
  }
}

export const site = load(raw) as Site

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
