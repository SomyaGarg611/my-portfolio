"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, BrainCircuit, Wrench, Lightbulb, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// Technical skills based on resume
const skills = [
  {
    icon: Code,
    title: "Languages",
    description:
      "Core programming languages for full-stack development with experience building scalable applications and modern web solutions.",
    features: [
      "Python & JavaScript",
      "C/C++ & Java",
      "HTML & CSS",
    ],
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
  },
  {
    icon: Code,
    title: "Frameworks & Libraries",
    description:
      "Building scalable full-stack applications with FastAPI, Node.js, Express.js, React.js, and Spring Boot for production-ready code.",
    features: [
      "FastAPI & Spring Boot",
      "Node.js & Express.js",
      "React.js",
    ],
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
  {
    icon: BrainCircuit,
    title: "Gen AI & Data",
    description:
      "Developing AI-powered applications using LLMs, LangChain, LangGraph, AutoGen and modern data technologies for intelligent solutions.",
    features: [
      "LLMs & LangChain",
      "LangGraph & AutoGen",
      "PostgreSQL, MongoDB & Vector DBs",
    ],
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
  },
  {
    icon: Wrench,
    title: "Tools & Cloud",
    description:
      "Implementing CI/CD pipelines and cloud solutions with Git, Docker, and AWS for efficient and reliable delivery.",
    features: [
      "Git/GitHub & Docker",
      "CI/CD Pipelines",
      "AWS & Jira",
    ],
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20",
  },
];

export function TechnicalSkills() {
  return (
    <section className="py-24 bg-background/70 backdrop-blur-lg">
      <div className="container mx-auto max-w-7xl px-4">
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
            My Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 animate-gradient">
              Expertise
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Expertise in building scalable systems with Python, Gen AI, JavaScript, Node.js, LLMs, FastAPI, and React.js.
            Passionate about writing clean, efficient code and enhancing system performance.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className="h-full"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <Card
                className={`
                h-full flex flex-col bg-card/50 border-2 ${skill.borderColor} 
                hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 
                shadow-lg hover:shadow-primary/10
              `}
              >
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-lg border ${skill.borderColor} ${skill.bgColor}`}
                    >
                      <skill.icon className={`w-7 h-7 ${skill.color}`} />
                    </div>
                    <CardTitle className={`text-2xl font-bold ${skill.color}`}>
                      {skill.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base text-muted-foreground">
                    {skill.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col justify-end pt-4">
                  <div className="space-y-3">
                    {skill.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${skill.color}`} />
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
