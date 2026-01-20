'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageSlideshowProps {
  images: string[]
  alt: string
  className?: string
  interval?: number
  aspectRatio?: 'square' | 'video' | 'wide'
}

export function ImageSlideshow({
  images,
  alt,
  className,
  interval = 3000,
  aspectRatio = 'video'
}: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  if (!images.length) {
    return (
      <div className={cn(
        'bg-muted rounded-lg flex items-center justify-center',
        aspectRatio === 'square' && 'aspect-square',
        aspectRatio === 'video' && 'aspect-video',
        aspectRatio === 'wide' && 'aspect-[21/9]',
        className
      )}>
        <span className="text-muted-foreground">No images available</span>
      </div>
    )
  }

  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg bg-muted',
      aspectRatio === 'square' && 'aspect-square',
      aspectRatio === 'video' && 'aspect-video',
      aspectRatio === 'wide' && 'aspect-[21/9]',
      className
    )}>
      {images.map((image, index) => (
        <div
          key={image}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={image}
            alt={`${alt} - Image ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Slideshow indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-white shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm z-20">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}