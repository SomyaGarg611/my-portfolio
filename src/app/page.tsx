"use client";

import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { HeroSection } from "@/components/sections/hero"; // Keep hero section for immediate loading
import dynamic from "next/dynamic";

// Lazy load non-critical sections
const WhyHireMeSection = lazy(() =>
  import("@/components/sections/why-hire-me").then((mod) => ({
    default: mod.WhyHireMeSection,
  }))
);
const FeaturedProjects = lazy(() =>
  import("@/components/sections/featured-projects").then((mod) => ({
    default: mod.FeaturedProjects,
  }))
);
const TechnicalSkills = lazy(() =>
  import("@/components/sections/technical-skills").then((mod) => ({
    default: mod.TechnicalSkills,
  }))
);
const CallToAction = lazy(() =>
  import("@/components/sections/call-to-action").then((mod) => ({
    default: mod.CallToAction,
  }))
);
const FloatingActionButton = lazy(() =>
  import("@/components/ui/floating-action-button").then((mod) => ({
    default: mod.FloatingActionButton,
  }))
);
const AnimatedBackground = dynamic(
  () =>
    import("@/components/layout/animated-background").then((mod) => ({
      default: mod.AnimatedBackground,
    })),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Somya Garg",
            jobTitle: "Software Engineer I",
            url: "https://somyagarg.com",
            logo: "https://somyagarg.com/logo.png",
            image: "https://somyagarg.com/og-image.jpg",
            description:
              "Portfolio of Somya Garg, Software Engineer with 1+ years of experience in backend and full-stack development. Built scalable REST APIs and web applications using Python, Node.js, React.js and SQL databases. Delivered Gen AI-powered RAG systems that reduced manual review effort by 90% and accelerated test cycles by 40%.",
            email: "mailto:somyagarg270@gmail.com",
            telephone: "+91 9045182704",
            sameAs: [
              "https://www.linkedin.com/in/somyagarg611",
              "https://github.com/SomyaGarg611",
            ],
            knowsAbout: [
              "Software Engineering",
              "AI Development",
              "Python",
              "React.js",
              "Node.js",
              "LangChain",
              "FastAPI",
              "Spring Boot",
              "LLMs",
              "RAG Pipelines",
              "Full-Stack Development",
              "Prompt Engineering",
              "System Optimization",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bangalore",
              addressCountry: "India",
            },
          }),
        }}
      />

      <main className="min-h-screen relative overflow-x-hidden">
        <Analytics />
        {/* 3D Animated Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <AnimatedBackground />
        </div>

        <div className="relative z-10">
          {/* Hero Section - Load immediately */}
          <div data-section="hero">
            <HeroSection />
          </div>

          {/* Why Hire Me - Lazy loaded */}
          <div data-section="skills">
            <Suspense fallback={<div className="h-20 bg-black/20 animate-pulse" />}>
              <WhyHireMeSection />
            </Suspense>
          </div>

          {/* Featured Projects - Lazy loaded */}
          <div data-section="projects">
            <Suspense
              fallback={<div className="h-96 bg-black/20 animate-pulse" />}
            >
              <FeaturedProjects />
            </Suspense>
          </div>

          {/* Technical Skills - Lazy loaded */}
          <div data-section="about">
            <Suspense
              fallback={<div className="h-96 bg-black/20 animate-pulse" />}
            >
              <TechnicalSkills />
            </Suspense>
          </div>

          {/* CTA - Lazy loaded */}
          <div data-section="contact">
            <Suspense
              fallback={<div className="h-32 bg-black/20 animate-pulse" />}
            >
              <CallToAction />
            </Suspense>
          </div>
        </div>

        {/* Floating Action Button - Lazy loaded */}
        <Suspense fallback={null}>
          <FloatingActionButton />
        </Suspense>
      </main>
    </>
  );
}
