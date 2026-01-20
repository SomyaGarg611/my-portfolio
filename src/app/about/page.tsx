import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedBackground } from '@/components/layout/animated-background'
import ProfileCardWrapper from '@/components/ui/profile-card-wrapper'
import { about } from '@/data/data'
import {
  Code,
  Coffee,
  ExternalLink,
  MapPin,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | Somya Garg - Software Engineer I',
  description: 'Learn about my journey as a Software Engineer I at HashedIn By Deloitte, my passion for building scalable AI-powered systems, and the values that drive my work.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* 3D Animated Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <AnimatedBackground />
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 mt-4 md:mt-0">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-4">
                  <Badge variant="outline" className="mr-3">
                    About Me
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    Bangalore, India
                  </div>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Building Scalable AI-Powered Systems
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  I&apos;m a Software Engineer with 1+ years of experience in backend and full-stack development.
                  I build scalable systems with Python, Gen AI, JavaScript, Node.js, LLMs, FastAPI, and React.js. Successfully cut manual review time by 90%
                  through efficient use of RESTful APIs and Streamlit. Passionate about writing clean, efficient code and enhancing system performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-pink-400/10 border border-pink-400/20">
                    <Link href="/contact" className="text-pink-300">
                      Let&apos;s Work Together
                    </Link>
                  </Button>
                  <Button size="lg" asChild variant={'outline'}>
                    <Link href="/resume">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Resume
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <ProfileCardWrapper
                  avatarUrl="/somya-profile.jpg"
                  miniAvatarUrl="/somya-profile.jpg"
                  name="Somya Garg"
                  handle="somyagarg611"
                  status="Available"
                  contactText="Let's Connect"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  behindGlowEnabled={true}
                  contactUrl="/contact"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6" style={{ textAlign: 'justify' }}>
                As a Software Engineer I at HashedIn By Deloitte, I specialize in full stack and AI development, building scalable systems with Python, Gen AI, JavaScript, Node.js, LLMs, FastAPI, and React.js. My expertise lies in creating intelligent automation solutions that deliver measurable business impact, including cutting manual review time by 90% through efficient use of RESTful APIs and Streamlit.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ textAlign: 'justify' }}>
                In my current role, I designed and deployed a full-stack Duplicate Claim Detection System using LangChain and Streamlit that automates insurance SOP processing, slashing manual review by 90%. I also led development of HITL and self-reflective RAG modules, saving 100+ manual hours monthly for claims analysts and accelerating test cycles by 40%.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ textAlign: 'justify' }}>
                I've built scalable Node.js APIs for Autonomous Configuration Systems, integrating VM provisioning and Oracle DB, reducing client-side configuration turnaround from 24h to 4h and raising CSAT by 20%. I also mentor junior engineers on stateful agent design, improving story-point delivery by 30% per sprint.
              </p>
              <p className="text-lg leading-relaxed" style={{ textAlign: 'justify' }}>
                My approach combines technical excellence with collaborative leadership. I'm passionate about writing clean, efficient code and building AI-powered solutions that drive real value. Recognized as a Rising Star Award recipient (top 2% performers) and AWS Certified Cloud Practitioner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {about.skills.map((skillGroup) => (
                <Card key={skillGroup.category} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{skillGroup.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Drives Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {about.values.map((value, index) => (
                <Card key={value.title} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardContent className="relative p-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-6">
                        <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <value.icon className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                            {value.title}
                          </h3>
                          <div className="ml-auto">
                            <Badge variant="outline" className="text-xs opacity-60">
                              0{index + 1}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {about.achievements.map((achievement) => (
                <Card key={achievement.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <achievement.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{achievement.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {achievement.year}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Coffee className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Beyond the Code</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              When I'm not coding, you'll find me unwinding with yoga, dancing, cooking, or getting lost in a good book. It helps me stay balanced and bring fresh energy to my work.
              I also love discovering cute cafes around the city.
              Beyond that, I'm always focused on continuous learning, keeping up with the latest in tech and AI.
            </p>
            {/* <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                <span>Microsoft Certified</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Continuous Learner</span>
              </div>
              <div className="flex items-center">
                <Code className="w-4 h-4 mr-2" />
                <span>Test-Driven Development</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-8 shadow-lg">
              <Code className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              I'm passionate about creating high-performance applications that deliver measurable business value.
              With experience in enterprise-level development and a focus on quality, 
              I'm ready to bring my technical expertise to your next challenging project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/contact">
                  Start a Conversation
                </Link>
              </Button>
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow bg-background/80 backdrop-blur">
                <Link href="/experience">
                  View Experience
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}