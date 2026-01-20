"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ImageSlideshow } from "@/components/ui/image-slideshow";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  liveHref: string;
  githubHref: string;
  image: string; // Single image fallback
  images?: string[]; // Multiple images for slideshow
  imageGradient?: string; // Gradient placeholder when no image
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const liveDisabled = !project.liveHref || project.liveHref === "#";
  const githubDisabled = !project.githubHref || project.githubHref === "#";
  return (
    <motion.div
      className="h-full group"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Card className={`h-full flex flex-col bg-card/50 border-2 ${project.borderColor} hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden`}>
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {project.images && project.images.length > 0 ? (
            <ImageSlideshow
              images={project.images}
              alt={project.title}
              className="w-full h-full"
              interval={3000}
              aspectRatio="video"
            />
          ) : project.image && project.image !== "/file.svg" ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105 p-2"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${project.imageGradient || 'from-gray-600 to-gray-700'} flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300 relative`}>
              <div className="text-white text-center p-4 z-10">
                <div className="mb-3 opacity-80">
                  <project.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-sm mb-1 line-clamp-2">{project.title}</h3>
                <p className="text-xs opacity-80">{project.status}</p>
              </div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Status Badge Overlay */}
          <div className="absolute top-4 right-4 z-10">
            <Badge
              variant="secondary"
              className={`text-xs ${project.bgColor} ${project.borderColor} border backdrop-blur-sm shadow-lg`}
            >
              {project.status}
            </Badge>
          </div>

          {/* Icon Overlay */}
          <div className={`absolute bottom-4 left-4 z-10 p-3 rounded-xl border ${project.borderColor} ${project.bgColor} backdrop-blur-sm shadow-lg`}>
            <project.icon className={`w-6 h-6 ${project.color}`} />
          </div>
        </div>

        {/* Content */}
        <CardHeader className="flex-shrink-0 pb-4">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>

        {/* Tags */}
        <CardContent className="flex-grow flex flex-col justify-end pb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs font-mono bg-background/80 hover:bg-primary/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className="text-xs font-mono bg-background/80 hover:bg-primary/10 transition-colors cursor-help"
                  >
                    +{project.tags.length - 4}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(4).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs font-mono bg-background/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="pt-0 flex gap-2">
          <Button
            {...(!liveDisabled && { asChild: true })}
            size="sm"
            className={`flex-1 ${liveDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-primary/10'}`}
            disabled={liveDisabled}
            aria-disabled={liveDisabled}
          >
            {liveDisabled ? (
              <span className="flex items-center justify-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </span>
            ) : (
              <a href={project.liveHref} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            )}
          </Button>
          <Button
            {...(!githubDisabled && { asChild: true })}
            size="sm"
            className={`flex-1 ${githubDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-primary/10'}`}
            disabled={githubDisabled}
            aria-disabled={githubDisabled}
          >
            {githubDisabled ? (
              <span className="flex items-center justify-center">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </span>
            ) : (
              <a href={project.githubHref} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
