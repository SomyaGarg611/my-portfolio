"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Facebook, Twitter } from "lucide-react";
import { useEffect, useState } from "react";


export function Footer() {
  const currentYear = new Date().getFullYear();
  const [wordIndex, setWordIndex] = useState(0);
  const animatedWords = ["make", "create", "build"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2000); // Changed to 2000ms (2 seconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-border bg-background py-10">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Main content with animated headline */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-1">
            Let's{" "}
            <span className="relative inline-block min-w-20 md:min-w-28">
              <span className="inline-block transition-opacity duration-700 ease-in-out text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 animate-gradient">
                {animatedWords[wordIndex]}
              </span>
            </span>
          </h2>
          <h2 className="text-2xl md:text-4xl text-foreground mb-6 whitespace-nowrap">
            incredible work together.
          </h2>
        </div>

        {/* Contact and Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start my-6 md:gap-0 gap-4">
          {/* Email Column */}
          <div className="flex flex-col w-full md:w-auto">
            <span className="text-xs font-semibold text-foreground mb-1">Email</span>
            <a
              href="mailto:somyagarg270@gmail.com"
              className="text-xs text-muted-foreground hover:text-accent transition-colors"
            >
              somyagarg270@gmail.com
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col md:items-end w-full md:w-auto">
            <span className="text-xs font-semibold text-foreground mb-1">Socials</span>
            <div className="flex space-x-2">
              <Link
                href="https://www.linkedin.com/in/somyagarg611"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent text-accent-foreground p-1.5 hover:bg-accent/80 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/SomyaGarg611"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent text-accent-foreground p-1.5 hover:bg-accent/80 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-white/20" />

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:flex-row md:justify-between my-6">
          <nav className="flex flex-row overflow-x-auto justify-center md:justify-start w-full gap-x-4 md:gap-x-5 mb-6 md:mb-0 pb-2">
            <Link href="/" className="text-xs md:text-sm whitespace-nowrap text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/projects" className="text-xs md:text-sm whitespace-nowrap text-foreground hover:text-accent transition-colors">
              Projects
            </Link>
            <Link href="/about" className="text-xs md:text-sm whitespace-nowrap text-foreground hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/experience" className="text-xs md:text-sm whitespace-nowrap text-foreground hover:text-accent transition-colors">
              Experience
            </Link>
            <Link href="/contact" className="text-xs md:text-sm whitespace-nowrap text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center md:text-right whitespace-nowrap">
            © {currentYear} Somya Garg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
