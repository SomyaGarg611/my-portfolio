import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageSlideshow } from '@/components/ui/image-slideshow'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ExternalLink, Github, Calendar, Clock, Code, Brain, Cpu, Rocket } from 'lucide-react'
import { AnimatedBackground } from '@/components/layout/animated-background'
import { projects } from '@/data/data'

export const metadata: Metadata = {
  title: 'Projects | Somya Garg - Software Engineer I',
  description: 'View my portfolio of AI-powered applications and full-stack projects built with Python, Gen AI, JavaScript, Node.js, LLMs, FastAPI, and React.js, showcasing measurable impact and technical excellence.',
}

const categories = ['All', 'Full-Stack', 'Frontend', 'Enterprise']

const getProjectIcon = (category: string) => {
  switch (category) {
    case 'Full-Stack':
      return <Code className="w-8 h-8" />
    case 'Frontend':
      return <Rocket className="w-8 h-8" />
    case 'Enterprise':
      return <Brain className="w-8 h-8" />
    default:
      return <Cpu className="w-8 h-8" />
  }
}

// Small icon variant for category tabs
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Full-Stack':
      return <Code className="w-4 h-4" />
    case 'Frontend':
      return <Rocket className="w-4 h-4" />
    case 'Enterprise':
      return <Brain className="w-4 h-4" />
    default:
      return <Cpu className="w-4 h-4" />
  }
}

export default function ProjectsPage() {
  // Helper function to get details for each link type
  const getLinkDetails = (type: string) => {
    switch (type) {
      case 'github':
        return { text: 'View Code', icon: <Github className="w-4 h-4" /> }
      case 'live':
        return { text: 'Live Site', icon: <Rocket className="w-4 h-4" /> }
      default:
        return { text: 'View Link', icon: <ExternalLink className="w-4 h-4" /> }
    }
  }

  // Counts per category for tab badges
  const categoryCounts: Record<string, number> = Object.fromEntries(
    categories.map((c) => [
      c,
      c === 'All' ? projects.projects.length : projects.projects.filter((p) => p.category === c).length,
    ])
  )

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background relative overflow-x-hidden">
        {/* 3D Animated Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <AnimatedBackground />
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 mt-2 md:mt-0">
                  My Projects
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  A showcase of AI-powered applications and full-stack projects built with Python, Gen AI, JavaScript, Node.js, LLMs, FastAPI, and React.js. Each project demonstrates measurable impact such as improved performance, reduced manual effort, and enhanced user experience.
                </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {projects.projects.length} Projects Completed
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Python & React.js
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Full-Stack & AI Development
                </Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="pb-16 lg:pb-24">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="All" className="w-full">
                <div className="mb-12 w-full">
                  <div className="overflow-x-auto scrollbar-hide px-4">
                    <div className="flex justify-center min-w-max">
                      <TabsList className="h-auto rounded-full bg-background/50 supports-[backdrop-filter]:bg-background/60 backdrop-blur border border-primary/10 shadow-sm p-1 gap-1 inline-flex">
                        {categories.map((category) => (
                          <TabsTrigger
                            key={category}
                            value={category}
                            className="group relative rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground transition-all whitespace-nowrap flex-shrink-0
                                   hover:text-foreground hover:bg-background/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
                                   data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-primary/20 cursor-pointer"
                          >
                            <span className="flex items-center gap-1 sm:gap-2">
                              <span className="opacity-80 hidden sm:inline">{getCategoryIcon(category)}</span>
                              <span>{category}</span>
                              <span
                                className="ml-1 inline-flex items-center justify-center text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full
                                         bg-primary/10 text-primary group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground"
                              >
                                {categoryCounts[category]}
                              </span>
                            </span>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                  </div>
                </div>

                {categories.map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {projects.projects
                        .filter((project) => category === 'All' || project.category === category)
                        .map((project) => (
                          <Card key={project.id} className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                            <div className="relative overflow-hidden">
                              {(project as any).images && (project as any).images.length > 0 ? (
                                <ImageSlideshow
                                  images={(project as any).images}
                                  alt={project.title}
                                  className="w-full h-60"
                                  interval={2500}
                                  aspectRatio="video"
                                />
                              ) : project.image ? (
                                <div className="w-full h-60 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={400}
                                    height={240}
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                                  />
                                </div>
                              ) : (
                                <div className={`w-full h-60 bg-gradient-to-br ${project.imageGradient} flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300 relative`}>
                                  <div className="text-white text-center p-4 z-10">
                                    <div className="mb-3 opacity-80">
                                      {getProjectIcon(project.category)}
                                    </div>
                                    <h3 className="font-bold text-base mb-1 line-clamp-2">{project.title}</h3>
                                    <p className="text-xs opacity-80">{project.category}</p>
                                  </div>
                                  <div className="absolute inset-0 bg-black/20"></div>
                                </div>
                              )}
                              <div className="absolute top-4 left-4">
                                <Badge
                                  variant={project.status === 'Completed' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {project.status}
                                </Badge>
                              </div>
                              {project.featured && (
                                <div className="absolute top-4 right-4">
                                  <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
                                    Featured
                                  </Badge>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col flex-grow">
                              <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {project.category}
                                  </Badge>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {project.year}
                                  </div>
                                </div>
                                <CardTitle className="text-xl">{project.title}</CardTitle>
                                <CardDescription className="text-sm">
                                  {project.description}
                                </CardDescription>
                              </CardHeader>

                              <CardContent className="flex-grow">
                                <div className="mb-4">
                                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {project.timeline}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Client: {project.client}
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {project.tags.slice(0, 4).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {project.tags.length > 4 && (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Badge variant="secondary" className="text-xs cursor-help">
                                          +{project.tags.length - 4}
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" className="max-w-xs">
                                        <div className="flex flex-wrap gap-1">
                                          {project.tags.slice(4).map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                              {tag}
                                            </Badge>
                                          ))}
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </CardContent>

                              <CardFooter className="flex-wrap gap-x-4 gap-y-2 border-t pt-4 mt-auto">
                                {project.links && project.links.length > 0 ? (
                                  project.links.map((link) => {
                                    const details = getLinkDetails(link.type)
                                    return (
                                      <Link
                                        key={link.type}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                      >
                                        {details.icon}
                                        <span className="ml-2">{details.text}</span>
                                      </Link>
                                    )
                                  })
                                ) : (
                                  <p className="text-sm text-muted-foreground italic">No public links available.</p>
                                )}
                              </CardFooter>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Looking for a Skilled Developer?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                With 1+ years of experience in full-stack and AI development, I&apos;m ready to bring expertise in Python, Gen AI, JavaScript, Node.js, LLMs, FastAPI, and React.js to your team. Cut manual review time by 90% through efficient development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Connect With Me</Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href="/resume">View My Resume</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  )
}
