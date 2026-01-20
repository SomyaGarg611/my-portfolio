"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Vote, School } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectCard, ProjectData } from "@/components/ui/project-card";
import { projects as projectsData } from "@/data/data";
import { TooltipProvider } from "@/components/ui/tooltip";

const projects: ProjectData[] = projectsData.projects
  .filter((p) => p.featured === true)
  .map((p) => {
    const iconMap: Record<string, any> = {
      "Full-Stack": Bot,
      Frontend: Vote,
      Enterprise: School,
    };
    const colorMap: Record<string, { color: string; bg: string; border: string }> = {
      "Full-Stack": { color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      Frontend: { color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
      Enterprise: { color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
      default: { color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" },
    };

    const cat = p.category || "default";
    const palette = colorMap[cat] || colorMap.default;
    const Icon = iconMap[cat] || Bot;
    const github = p.githubUrl || p.links?.find((l: any) => l.type === "github")?.url || "#";
    const live = p.liveUrl || "#";

    return {
      id: p.id,
      title: p.title,
      description: p.description,
      status: p.status || p.year || "",
      tags: p.tags || [],
      icon: Icon,
      color: palette.color,
      bgColor: palette.bg,
      borderColor: palette.border,
      liveHref: live,
      githubHref: github,
      image: p.image || "/file.svg",
      images: (p as any).images, // Pass through the images array for slideshow
      imageGradient: p.imageGradient, // Pass through gradient for fallback
    } as ProjectData;
  });

export function FeaturedProjects() {
    return (
        <TooltipProvider>
        <section className="py-24 bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center space-y-6 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-4xl lg:text-5xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        My Featured{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 animate-gradient">
                            Projects
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-lg text-muted-foreground max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Showcasing my experience building high-performance web applications with React, TypeScript, and Spring Boot that deliver measurable business impact and enhanced user experiences.
                    </motion.p>
                </motion.div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="text-center text-muted-foreground">No featured projects found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard 
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* Updated Button */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Button asChild size="lg" className="font-semibold">
                        <Link href="/projects">
                            View All Projects <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
        </TooltipProvider>
    );
}