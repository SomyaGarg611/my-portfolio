import { Inter as FontSans, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { AIAssistantProvider } from "@/components/providers/ai-assistant-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: 'Somya Garg | Software Engineer I',
  description: 'Portfolio of Somya Garg, Software Engineer with 1+ years of experience in backend and full-stack development. Built scalable REST APIs and web applications using Python, Node.js, React.js and SQL databases. Explore projects, experience, and get in touch.',
  keywords: [
    'Software Engineer',
    'AI Developer',
    'Python Developer',
    'React Developer',
    'LangChain',
    'LLMs',
    'FastAPI',
    'Spring Boot',
    'Node.js',
    'Full-Stack Engineer',
    'Bangalore',
    'India',
    'Portfolio',
    'AI Development'
  ],
  authors: [{ name: 'Somya Garg', url: 'https://somyagarg.vercel.app' }],
  creator: 'Somya Garg',
  publisher: 'Somya Garg',
  metadataBase: new URL('https://somyagarg.vercel.app'),
  alternates: {
    canonical: 'https://somyagarg.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://somyagarg.vercel.app',
    siteName: 'Somya Garg Portfolio',
    title: 'Somya Garg — Software Engineer',
    description: 'Portfolio of Somya Garg, Software Engineer with 1+ years of experience in backend and full-stack development. Built scalable REST APIs and web applications using Python, Node.js, React.js and SQL databases. Explore projects, experience, and get in touch.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Somya Garg - Software Engineer',
        type: 'image/jpeg',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Portfolio Website',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'theme-color': '#100C08',
    'color-scheme': 'dark',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          montserrat.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CursorGlow />
          <AIAssistantProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
