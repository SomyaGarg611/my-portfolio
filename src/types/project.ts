export interface ProjectLink {
  type: string
  url: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string | null
  images?: string[] // Optional array of images for slideshow
  imageGradient: string
  tags: string[]
  category: string
  status: string
  timeline: string
  year: string
  client: string
  team: string
  rating: number
  reviews: number
  location: string
  featured: boolean
  links: ProjectLink[]
  overview: string
  challenge?: string
  solution?: string
  results?: string[]
  features?: string[]
  technologies: Record<string, string[]>
  liveUrl?: string
  githubUrl?: string
}