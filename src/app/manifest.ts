import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Somya Garg - Software Engineer I',
    short_name: 'Somya Garg',
    description: 'Portfolio of Somya Garg, Software Engineer I with expertise in Python, React.js, Node.js, and LLMs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#100C08',
    theme_color: '#100C08',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}