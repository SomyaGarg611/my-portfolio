'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useCurrentSection() {
  const [currentSection, setCurrentSection] = useState<'hero' | 'skills' | 'projects' | 'experience' | 'about' | 'contact' | 'resume'>('hero')
  const pathname = usePathname()

  useEffect(() => {
    const updateSection = () => {
      // Check current path for specific pages
      if (pathname.includes('/projects')) {
        setCurrentSection('projects')
      } else if (pathname.includes('/experience')) {
        setCurrentSection('experience')
      } else if (pathname.includes('/contact')) {
        setCurrentSection('contact')
      } else if (pathname.includes('/about')) {
        setCurrentSection('about')
      } else if (pathname.includes('/resume')) {
        setCurrentSection('resume')
      } else {
        // For homepage, use scroll detection
        handleScroll()
      }
    }

    const handleScroll = () => {
      const sections = [
        { id: 'hero', element: document.querySelector('[data-section="hero"]') },
        { id: 'skills', element: document.querySelector('[data-section="skills"]') },
        { id: 'projects', element: document.querySelector('[data-section="projects"]') },
        { id: 'experience', element: document.querySelector('[data-section="experience"]') },
        { id: 'about', element: document.querySelector('[data-section="about"]') },
        { id: 'contact', element: document.querySelector('[data-section="contact"]') }
      ]

      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          
          if (scrollPosition >= elementTop) {
            setCurrentSection(section.id as any)
            break
          }
        }
      }
    }

    // Initial section detection
    updateSection()

    // Listen for route changes (for client-side navigation)
    const handleRouteChange = () => {
      setTimeout(updateSection, 100) // Small delay to ensure DOM is updated
    }

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange)
    
    // Listen for scroll on homepage
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return currentSection
}