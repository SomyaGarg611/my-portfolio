"use client";

import { Cpu, Gauge, Layout, Briefcase, Workflow, Award } from "lucide-react";
import { motion } from "framer-motion";

const trustElements = [
  {
    name: "AI & Full-Stack Development",
    icon: Cpu,
    description:
      "Built full-stack Duplicate Claim Detection System using LangChain and Streamlit, automating insurance SOP conversion and slashing manual review by 90%.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
  },
  {
    name: "Performance & Efficiency",
    icon: Gauge,
    description:
      "Saved 100+ manual hours monthly with HITL and self-reflective RAG modules; reduced configuration turnaround from 24h to 4h with scalable Node.js APIs.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20",
  },
  {
    name: "Quality & Testing",
    icon: Layout,
    description:
      "Achieved 80% unit-test coverage with Jest on full-stack Employment Management System. Instituted bi-weekly peer reviews improving team velocity by 30%.",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/20",
  },
  {
    name: "Business Impact",
    icon: Briefcase,
    description:
      "Cut onboarding query volume by 35% and reduced manual paperwork by 60%. Raised CSAT by 20% through efficient API development.",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
  {
    name: "Leadership & Mentoring",
    icon: Workflow,
    description:
      "Mentored 2 juniors on stateful agent design, improving story-point delivery from 14 to 18 points per sprint (+30%). Contributed to Agile adoption.",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
  },
  {
    name: "Certified & Awarded",
    icon: Award,
    description:
      "AWS Certified Cloud Practitioner (2025). Rising Star Award (Top 2%) at HashedIn. IEEE Research Paper on Email Classifier Using NLP and ML.",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/20",
  },
];
export function WhyHireMeSection() {
  return (
    <section className="py-24 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center space-y-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="space-y-4">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Why Hire{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 animate-gradient">
                Me?
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Software Engineer with 1+ years of experience in full stack and AI
              development. Expertise in building scalable systems with Python,
              React.js, Node.js, and LLMs. Successfully cut manual review time
              by 90% through efficient use of RESTful APIs and Streamlit.
            </motion.p>
          </div>

          {/* Trust Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustElements.map((element, index) => (
              <motion.div
                key={element.name}
                className="relative group p-6 rounded-xl bg-gray-700/20 border border-primary/10 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 shadow-lg hover:shadow-primary/10"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${element.bgColor} border ${element.borderColor}`}
                  >
                    <element.icon className={`w-6 h-6 ${element.color}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-foreground">
                      {element.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {element.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
