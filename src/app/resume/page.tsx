// Client component for interactive resume page
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedBackground } from "@/components/layout/animated-background";
import VariableProximity from "@/components/ui/variable-proximity";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Code,
  Star,
  ExternalLink,
  Download,
  Phone,
  ArrowUpRight,
} from "lucide-react";

const personalInfo = {
  name: "Somya Garg",
  title: "Software Engineer I",
  email: "somyagarg270@gmail.com",
  location: "Bangalore, India",
  phone: "+91 9045182704",
  linkedin: "linkedin.com/in/somyagarg611",
  github: "github.com/SomyaGarg611",
};

const professionalSummary = `Software Engineer with 1+ years of experience in backend and full-stack development. Built scalable REST APIs and web applications using Python, Node.js, React.js and SQL databases. Delivered Gen AI-powered RAG systems that reduced manual review effort by 90% and accelerated test cycles by 40%.`;

const experience = [
  {
    title: "Software Engineer I",
    company: "HashedIn By Deloitte",
    location: "Bangalore, India",
    period: "July 2024 - Present",
    achievements: [
      "Designed and deployed a full-stack Duplicate Claim Detection System using LangChain and Streamlit that converts insurance SOPs into JSON/DMN, automating the detection of claims as duplicate or bypass, thereby slashing manual review by 90%",
      "Led development of HITL and self-reflective RAG modules, saving 100+ manual hours monthly for claims analysts and accelerating test cycles by 40%",
      "Instituted bi-weekly peer reviews and mentored 2 juniors on stateful agent design, improving story-point delivery from 14 to 18 points per sprint (+30%)",
      "Built scalable Node.js APIs for Autonomous Configuration System, integrating VM provisioning and Oracle DB, reducing client-side configuration turnaround from 24h to 4h and raising CSAT by 20%",
      "Contributed to the adoption of Agile methodologies within the team, reducing sprint feature delivery timing from 2 weeks to 1.7 weeks",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "HashedIn By Deloitte",
    location: "Bangalore, India",
    period: "April 2024 - July 2024",
    achievements: [
      "Developed a full-stack Employment Management System using React.js and Spring Boot with JWT authentication and role-based dashboards, integrated PostgreSQL via Hibernate and achieved 80% unit-test coverage with Jest",
      "Launched system to 50+ HR users, cutting average onboarding query volume by 35% and reducing manual paperwork by 60%",
      "Completed a 3-month intensive training on multiple tech stacks and achieved a top 5 ranking in the product month assessment",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    school: "Dr. A.P.J. Abdul Kalam Technical University",
    location: "Ghaziabad, India",
    period: "2020 - 2024",
    details: [
      "GPA: 9/10",
    ],
  },
];

const skills = {
  "Languages": ["Python", "JavaScript", "C/C++", "Java", "HTML", "CSS"],
  "Frameworks & Libraries": ["FastAPI", "Node.js", "Express.js", "React.js", "Spring Boot"],
  "Gen AI & Data": ["LLMs", "LangChain", "LangGraph", "AutoGen", "PostgreSQL", "MongoDB", "Vector DBs"],
  "Tools & Cloud": ["Git/GitHub", "Docker", "CI/CD", "AWS", "Jira"],
};

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
    certificateUrl: "/AWS Certified Cloud Practitioner certificate.pdf"
  }
];

const achievements = [
  {
    title: "IEEE Research Paper",
    description: "Published Email Classifier Using NLP and ML in IEEE at 2024 1st International Conference on ACET",
    url: "https://ieeexplore.ieee.org/document/10730368"
  },
  {
    title: "Rising Star Award",
    description: "Awarded to top 2% performers at HashedIn for accelerating delivery by 20%",
    url: "https://www.linkedin.com/posts/somyagarg611_spot-award-activity-7313749886120669184-if0_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADcZFg0Bxak9KY-298wrpjMxPRKNVfZoosg"
  }
];

// Calculate duration between two dates
function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = endDate === "Present" ? new Date() : new Date(endDate);
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`;
  } else if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
  } else {
    return `${years} ${years === 1 ? 'yr' : 'yrs'} ${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`;
  }
}

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Resume | Somya Garg - Software Engineer";
  }, []);

  return (
    <div className="min-h-screen relative bg-transparent print:bg-white">
      <AnimatedBackground variant="resume" />

      {/* Resume Content */}
      <div className="container mx-auto px-4 py-8 mt-10 relative z-10">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-xl opacity-40 group-hover:opacity-60 transition-opacity print:hidden" />
          <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-xl print:border-0 print:shadow-none print:bg-white print:backdrop-blur-none">
            <div className="p-8 print:p-6" ref={containerRef}>
              {/* Personal Info Header */}
              <header className="text-center mb-10 print:mb-6">
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  <span className="print:hidden">
                    <VariableProximity
                      label={personalInfo.name}
                      fromFontVariationSettings="'wght' 700"
                      toFontVariationSettings="'wght' 1200"
                      containerRef={containerRef}
                      radius={100}
                      falloff="gaussian"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    />
                  </span>
                  <span className="hidden print:inline">{personalInfo.name}</span>
                </h1>
                {/* <h2 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-5">
                  {personalInfo.title}
                </h2> */}

                {/* Contact Information - Single Line */}
                <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2 lg:gap-2.5 text-[10px] sm:text-xs px-2">
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm border border-border/50 font-medium text-foreground/85 hover:text-foreground hover:from-primary/15 hover:to-accent/15 transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 whitespace-nowrap"
                  >
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/80 group-hover:text-primary transition-colors flex-shrink-0" />
                    <span>{personalInfo.email}</span>
                  </a>
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm border border-border/50 font-medium text-foreground/85 hover:text-foreground hover:from-primary/15 hover:to-accent/15 transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 whitespace-nowrap"
                  >
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/80 group-hover:text-primary transition-colors flex-shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </a>
                  <Link
                    href={`https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm border border-border/50 font-medium text-foreground/85 hover:text-foreground hover:from-primary/15 hover:to-accent/15 transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 whitespace-nowrap"
                  >
                    <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/80 group-hover:text-primary transition-colors flex-shrink-0" />
                    <span>{personalInfo.linkedin}</span>
                  </Link>
                  <Link
                    href={`https://${personalInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm border border-border/50 font-medium text-foreground/85 hover:text-foreground hover:from-primary/15 hover:to-accent/15 transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 whitespace-nowrap"
                  >
                    <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/80 group-hover:text-primary transition-colors flex-shrink-0" />
                    <span>{personalInfo.github}</span>
                  </Link>
                </div>

                <div className="mt-6 flex justify-center gap-4 print:hidden">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="text-xs bg-pink-400/10 border border-pink-400/20 backdrop-blur-sm border border-border/40 shadow-sm hover:bg-background/70 transition-all"
                  >
                    <Link
                      href="/Somya_Garg.pdf"
                      target="_blank"
                      download
                      className="text-pink-300"
                    >
                      <Download className="w-4 h-4 mr-2 text-pink-300" />
                      Download PDF
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant={"outline"}
                    asChild
                    className="text-xs"
                  >
                    <Link href="/contact">Hire Me <ArrowUpRight /></Link>
                  </Button>
                </div>
              </header>

              {/* Professional Summary */}
              <section className="mb-10">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center relative">
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 hidden sm:block w-2 h-6 bg-gradient-to-b from-primary to-accent rounded" />
                  <Star className="w-5 h-5 mr-2 text-primary drop-shadow" />
                  Professional Summary
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed text-sm md:text-base"
                  style={{ textAlign: "justify" }}
                >
                  {professionalSummary}
                </p>
              </section>

              <Separator className="my-8" />

              {/* Experience */}
              <section className="mb-10">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-primary" />
                  Professional Experience
                </h3>
                
                {/* Company Header */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-foreground mb-1">
                    HashedIn By Deloitte
                  </h4>
                  <div className="flex flex-wrap items-center text-muted-foreground text-xs gap-x-3 gap-y-1 mb-6">
                    <span className="inline-flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      Bangalore, India
                    </span>
                    <span className="inline-flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      April 2024 - Present · {calculateDuration("2024-04-01", "Present")}
                    </span>
                  </div>

                  {/* Timeline with roles */}
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-border" />
                    
                    {experience.map((job, index) => {
                      const periodParts = job.period.split(' - ');
                      const startDate = periodParts[0];
                      const endDate = periodParts[1] || "Present";
                      
                      const parseDate = (dateStr: string) => {
                        if (dateStr === "Present") return "Present";
                        const [month, year] = dateStr.split(' ');
                        const monthMap: { [key: string]: string } = {
                          'January': '01', 'February': '02', 'March': '03', 'April': '04',
                          'May': '05', 'June': '06', 'July': '07', 'August': '08',
                          'September': '09', 'October': '10', 'November': '11', 'December': '12',
                          'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
                          'Jun': '06', 'Jul': '07', 'Aug': '08',
                          'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
                        };
                        return `${year}-${monthMap[month]}-01`;
                      };
                      
                      const startStr = parseDate(startDate);
                      const endStr = parseDate(endDate);
                      const duration = calculateDuration(startStr, endStr);
                      
                      return (
                        <div key={index} className="relative pl-8 pb-8 last:pb-0">
                          {/* Timeline dot */}
                          <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-card border-2 border-primary z-10" />
                          
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                            <div className="flex-1">
                              <h5 className="text-base font-semibold text-foreground">
                                {job.title}
                              </h5>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 sm:mt-0 whitespace-nowrap">
                              {job.period} · {duration}
                            </div>
                          </div>
                          <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-muted-foreground list-disc list-outside ml-5">
                            {job.achievements.map((achievement, idx) => (
                              <li key={idx} style={{ textAlign: "justify" }}>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <Separator className="my-8" />

              {/* Education */}
              <section className="mb-10">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                  Education
                </h3>
                {education.map((edu, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-foreground mb-2">
                          {edu.degree}
                        </h4>
                        <div className="flex flex-wrap items-center text-muted-foreground text-xs gap-x-3 gap-y-1">
                          <span className="inline-flex items-center">
                            <Building className="w-3.5 h-3.5 mr-1" />
                            {edu.school}
                          </span>
                          <span className="inline-flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            {edu.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-2 sm:mt-0 whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {edu.period}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.details.map((detail, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1.5 text-xs bg-muted/50 text-muted-foreground rounded-full border border-border/50"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              <Separator className="my-8" />

              {/* Skills */}
              <section className="mb-10">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-primary" />
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-foreground text-lg mb-4">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skillList.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs font-medium py-1.5 px-3 rounded-full bg-slate-900/90 text-slate-100 border-slate-700 hover:bg-slate-800 transition-all"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Separator className="my-8" />

              {/* Certifications & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <section>
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary" />
                    Certifications
                  </h3>
                  <ul className="space-y-2">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start justify-between group">
                        <div className="flex items-start flex-1">
                          <div className="w-2 h-2 bg-gradient-to-br from-primary to-accent rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <div className="flex-1">
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              {cert.name} – {cert.issuer}, {cert.year}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="text-xs bg-pink-400/10 border border-pink-400/20 backdrop-blur-sm border border-border/40 shadow-sm hover:bg-background/70 transition-all ml-2"
                        >
                          <Link
                            href={cert.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-300"
                          >
                            <ExternalLink className="w-4 h-4 mr-2 text-pink-300" />
                            View Certificate
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-primary" />
                    Key Achievements
                  </h3>
                  <ul className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start justify-between group">
                        <div className="flex items-start flex-1">
                          <div className="w-2 h-2 bg-gradient-to-br from-primary to-accent rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <div className="flex-1">
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              <strong>{achievement.title}</strong> – {achievement.description}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="text-xs bg-pink-400/10 border border-pink-400/20 backdrop-blur-sm border border-border/40 shadow-sm hover:bg-background/70 transition-all ml-2"
                        >
                          <Link
                            href={achievement.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-300"
                          >
                            <ExternalLink className="w-4 h-4 mr-2 text-pink-300" />
                            View
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Footer */}
              {/* <footer className="mt-14 pt-8 border-t border-border/60 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                References available upon request
              </p>
              <div className="flex justify-center gap-4 print:hidden">
                <Button variant="outline" asChild className="bg-background/50 backdrop-blur-sm border border-border/40 shadow-sm hover:bg-background/70 transition-all">
                  <Link href="/projects">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Projects
                  </Link>
                </Button>
                <Button variant="outline" asChild className="bg-background/50 backdrop-blur-sm border border-border/40 shadow-sm hover:bg-background/70 transition-all">
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </Link>
                </Button>
              </div>
            </footer> */}
            </div>
          </div>
        </div>
      </div>
      {/* end container */}

      {/* Additional Actions */}
      <section className="py-16 bg-card print:hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Interested in working together? I&apos;d love to discuss how my
              skills and experience can contribute to your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary/70 backdrop-blur-sm border border-primary/30 shadow-sm hover:bg-primary/80 transition-all"
              >
                <Link href="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-background/50 backdrop-blur-sm border border-border/40 shadow-sm hover:bg-background/70 transition-all"
              >
                <Link href="/projects">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
