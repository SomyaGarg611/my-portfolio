import {
  Award,
  BookOpen,
  Brain,
  BrainCircuit,
  Cloud,
  Mail,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

export const about = {
  skills: [
    {
      category: "Languages",
      items: ["Python", "JavaScript", "C/C++", "Java", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["FastAPI", "Node.js", "Express.js", "React.js", "Spring Boot"],
    },
    {
      category: "Gen AI & Data",
      items: ["LLMs", "LangChain", "LangGraph", "AutoGen", "PostgreSQL", "MongoDB", "Vector DBs"],
    },
    {
      category: "Tools & Cloud",
      items: ["Git/GitHub", "Docker", "CI/CD", "AWS", "Jira"],
    },
  ],
  achievements: [
    {
      title: "AWS Certified Cloud Practitioner",
      description:
        "Amazon Web Services – Certified Cloud Practitioner",
      icon: Award,
      year: "2025",
    },
    {
      title: "Rising Star Award",
      description:
        "Awarded to top 2% performers at HashedIn for accelerating delivery by 20%",
      icon: Users,
      year: "2024",
    },
    {
      title: "IEEE Research Paper",
      description: "Published Email Classifier Using NLP and ML in IEEE at 2024 1st International Conference on ACET",
      icon: Award,
      year: "2024",
    },
  ],
  values: [
    {
      title: "Performance-Driven",
      description:
        "I believe in optimizing every aspect of software development, from code efficiency to user experience, always seeking measurable improvements in application performance.",
      icon: Brain,
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      title: "Test-Driven Quality",
      description:
        "Every feature I build is thoroughly tested, with a focus on improving coverage and reducing defects. I prioritize creating robust, reliable applications.",
      icon: Award,
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Continuous Learning",
      description:
        "Technology evolves rapidly, and I'm committed to staying at the forefront through continuous learning and experimentation with new tools and techniques.",
      icon: BookOpen,
      gradient: "from-orange-500/20 to-red-500/20",
    },
    {
      title: "Business Impact",
      description:
        "I focus on delivering features that create tangible business value, with measurable outcomes such as improved efficiency, reduced costs, and enhanced user satisfaction.",
      icon: Users,
      gradient: "from-pink-500/20 to-violet-500/20",
    },
  ],
};

export const contact = {
  contactMethods: [
    {
      title: "Email",
      description: "Best way to reach me",
      value: "somyagarg270@gmail.com",
      icon: Mail,
      action: "mailto:somyagarg270@gmail.com",
      primary: true,
    },
    {
      title: "Phone",
      description: "Call for urgent inquiries",
      value: "+91 9045182704",
      icon: Mail,
      action: "tel:+919045182704",
      primary: false,
    },
    {
      title: "Location",
      description: "Based in Bangalore, India",
      value: "Available for remote work globally",
      icon: MapPin,
      action: null,
      primary: false,
    },
  ],
  expertiseAreas: [
    {
      title: "Full-Stack Development",
      description:
        "Building scalable systems with Python, Gen AI, JavaScript, Node.js, LLMs, FastAPI, and React.js. Expertise in developing full-stack applications with JWT authentication and role-based dashboards.",
      icon: BrainCircuit,
    },
    {
      title: "AI & LLM Development",
      description:
        "Developing AI-powered applications using LangChain, OpenAI APIs, and Streamlit. Experience with RAG pipelines, prompt engineering, and stateful agent design.",
      icon: ShieldCheck,
    },
    {
      title: "System Optimization",
      description:
        "Optimizing system performance and automating workflows. Successfully reduced manual overhead by 90%, accelerated test cycles by 40%, and improved configuration turnaround from 24h to 4h.",
      icon: Cloud,
    },
  ],
};

export const experience = {
  workExperience: [
    {
      title: "Software Engineer I",
      company: "HashedIn By Deloitte",
      location: "Bangalore, India",
      period: "July 2024 - Present",
      type: "Full-time",
      description:
        "Developing full-stack AI-powered systems and enterprise applications. Leading the design and deployment of scalable solutions using LangChain, Streamlit, Node.js, and Oracle DB while mentoring junior developers.",
      achievements: [
        "Designed and deployed a full-stack Duplicate Claim Detection System using LangChain and Streamlit that converts insurance SOPs into JSON/DMN, automating the detection of claims as duplicate or bypass, thereby slashing manual review by 90%",
        "Led development of HITL and self-reflective RAG modules, saving 100+ manual hours monthly for claims analysts and accelerating test cycles by 40%",
        "Instituted bi-weekly peer reviews and mentored 2 juniors on stateful agent design, improving story-point delivery from 14 to 18 points per sprint (+30%)",
        "Built scalable Node.js APIs for Autonomous Configuration System, integrating VM provisioning and Oracle DB, reducing client-side configuration turnaround from 24h to 4h and raising CSAT by 20%",
        "Contributed to the adoption of Agile methodologies within the team, reducing sprint feature delivery timing from 2 weeks to 1.7 weeks",
      ],
      technologies: [
        "Python",
        "LangChain",
        "Streamlit",
        "Node.js",
        "Oracle DB",
        "RAG Pipelines",
        "FastAPI",
        "AutoGen",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "HashedIn By Deloitte",
      location: "Bangalore, India",
      period: "April 2024 - July 2024",
      type: "Internship",
      description:
        "Developed full-stack employment management system using modern web technologies. Completed intensive training on multiple tech stacks and achieved top ranking in product assessment.",
      achievements: [
        "Developed a full-stack Employment Management System using React.js and Spring Boot with JWT authentication and role-based dashboards, integrated PostgreSQL via Hibernate and achieved 80% unit-test coverage with Jest",
        "Launched system to 50+ HR users, cutting average onboarding query volume by 35% and reducing manual paperwork by 60%",
        "Completed a 3-month intensive training on multiple tech stacks and achieved a top 5 ranking in the product month assessment",
      ],
      technologies: [
        "React.js",
        "Spring Boot",
        "JWT",
        "PostgreSQL",
        "Hibernate",
        "Jest",
      ],
    },
    {
      title: "Bachelor of Technology in Computer Science and Engineering",
      company: "Dr. A.P.J. Abdul Kalam Technical University",
      location: "Ghaziabad, India",
      period: "2020 - 2024",
      type: "Education",
      description:
        "Completed Bachelor's degree in Computer Science and Engineering with a focus on software development, AI, and engineering fundamentals.",
      achievements: [
        "Graduated with GPA of 9/10",
        "Developed strong foundation in algorithms, data structures, and software engineering principles",
        "Completed multiple academic projects in web development and AI applications",
        "Participated in technical workshops and coding competitions",
        "Built foundation in object-oriented programming and software architecture",
      ],
      technologies: [
        "Python",
        "Java",
        "C++",
        "Data Structures",
        "Algorithms",
        "Object-Oriented Design",
        "Web Development",
        "Database Systems",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      school: "Dr. A.P.J. Abdul Kalam Technical University",
      location: "Ghaziabad, India",
      period: "2020 - 2024",
      status: "Completed",
      description:
        "Focus on software development, AI development, object-oriented programming, and full-stack web application development.",
      achievements: [
        "Graduated with GPA: 9/10",
        "Participated in coding competitions and technical workshops",
      ],
      coursework: [
        "Data Structures",
        "Algorithms",
        "Object-Oriented Programming",
        "Database Systems",
        "Web Development",
        "Software Engineering",
        "Computer Networks",
        "Operating Systems",
      ],
    },
  ],
  certifications: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2025",
      credentialId: "AWS-CCP-2025",
      description:
        "Validates foundational knowledge of AWS Cloud, services, and terminology.",
    },
    {
      title: "IEEE Research Paper",
      issuer: "IEEE",
      date: "2024",
      credentialId: "IEEE-ACET-2024",
      description:
        "Published Email Classifier Using NLP and ML in IEEE at 2024 1st International Conference on ACET.",
    },
    {
      title: "Rising Star Award",
      issuer: "HashedIn By Deloitte",
      date: "2024",
      credentialId: "RS-2024",
      description:
        "Awarded to top 2% performers at HashedIn for accelerating delivery by 20%.",
    },
  ],
  skills: {
    technical: [
      { name: "Python", level: 95 },
      { name: "React.js", level: 90 },
      { name: "Node.js", level: 90 },
      { name: "LangChain", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "Java", level: 85 },
      { name: "Spring Boot", level: 85 },
      { name: "PostgreSQL", level: 85 },
      { name: "Oracle DB", level: 80 },
      { name: "Docker", level: 80 },
    ],
    soft: [
      { name: "Problem Solving", level: 95 },
      { name: "Communication", level: 90 },
      { name: "Mentoring", level: 90 },
      { name: "Agile Methodologies", level: 95 },
      { name: "Technical Documentation", level: 85 },
      { name: "Adaptability", level: 90 },
    ],
  },
};

export const projects = {
  projects: [
    {
      id: "docuquery",
      title: "DocuQuery – Smart Document Query System",
      description:
        "A multi-stage chatbot pipeline to parse documents, enrich queries via Google SERP, and generate context-aware responses using Groq LLMs. Improved answer accuracy to over 90% through targeted prompt engineering and performance tuning.",
      image: null,
      imageGradient: "from-pink-500 to-indigo-500",
      tags: [
        "FastAPI",
        "Python",
        "Groq API",
        "PostgreSQL",
        "Streamlit",
        "LLMs",
        "RAG",
      ],
      category: "AI/Platform",
      status: "Completed",
      timeline: "2024",
      year: "2024",
      client: "Personal Project",
      team: "Solo Developer",
      rating: 5.0,
      reviews: 0,
      location: "Remote",
      featured: true,
      links: [
        {
          type: "github",
          url: "https://github.com/SomyaGarg611/DocuQuery",
        },
      ],
      overview:
        "DocuQuery is a smart document query system that parses documents, enriches queries via Google SERP, and generates context-aware responses using Groq LLMs, showcasing end-to-end LLM application.",
      features: [
        "Multi-stage chatbot pipeline for document parsing",
        "Query enrichment via Google SERP",
        "Context-aware response generation using Groq LLMs",
        "Over 90% answer accuracy through targeted prompt engineering",
        "Persistent session state and multi-turn chat using Streamlit and PostgreSQL",
        "End-to-end LLM application",
      ],
      technologies: {
        "Backend": ["FastAPI", "Python"],
        "AI": ["Groq API", "LLMs", "RAG Pipelines"],
        "Database": ["PostgreSQL"],
        "Frontend": ["Streamlit"],
        "Tools": ["Git", "Prompt Engineering"],
      },
      liveUrl: "#",
      githubUrl: "https://github.com/SomyaGarg611/DocuQuery",
    },
    {
      id: "cinemic-streaming-platform",
      title: "Cinemic – Free Streaming Platform",
      description:
        "A free streaming application ensuring cross-device compatibility and integrating the TMDB API for real-time updates. Implemented advanced search, filters, trailer modals, and server-side streaming support.",
      image: null,
      imageGradient: "from-blue-500 to-purple-600",
      tags: ["React.js", "Redux", "JavaScript", "TMDB API", "REST APIs"],
      category: "Frontend",
      status: "Live",
      timeline: "2024",
      year: "2024",
      client: "Personal Project",
      team: "Solo Developer",
      rating: 5.0,
      reviews: 0,
      location: "Remote",
      featured: true,
      links: [
        {
          type: "live",
          url: "https://cinemic.vercel.app/",
        },
      ],
      overview: "Cinemic is a free streaming platform offering cross-device compatibility with real-time movie and TV series updates powered by TMDB API.",
      challenge: "Create a modern, responsive streaming platform that provides free access to movies and TV series with real-time updates while maintaining fast load times and an intuitive user experience across all devices.",
      solution: "Built with React.js and Redux, integrated TMDB API for comprehensive content data, implemented advanced search and filtering options, added trailer modals, and optimized for performance across devices.",
      results: [
        "Free streaming access to movies and TV series",
        "Real-time content updates via TMDB API",
        "Advanced search and filtering for content discovery",
        "Trailer modals for better content selection",
        "Cross-device compatibility",
        "Server-side streaming support (3rd party)"
      ],
      features: [
        "Free Streaming: Watch movies and TV series without subscription fees",
        "Real-time Updates: TMDB API integration for latest content",
        "Advanced Search & Filters: Find content with sophisticated search options",
        "Trailer Modals: Preview content before watching",
        "Cross-device Compatibility: Optimized experience across desktop and mobile devices",
        "Server-side Streaming: Third-party streaming support"
      ],
      technologies: {
        "Frontend": ["React.js", "Redux", "JavaScript"],
        "API": ["TMDB API", "REST APIs"],
        "Features": ["Advanced search & filtering", "Trailer modals", "Server-side streaming"],
        "Tools": ["Git", "npm"]
      },
      liveUrl: "https://cinemic.vercel.app/",
      githubUrl: "#"
    },
    // {
    //   id: "sgstore",
    //   title: "SGStore – E-commerce Platform",
    //   description:
    //     "A full-stack e-commerce application with product catalog, shopping cart, user authentication, and payment integration. Built with modern web technologies for a seamless shopping experience.",
    //   image: null,
    //   imageGradient: "from-emerald-500 to-teal-600",
    //   tags: ["React.js", "Node.js", "MongoDB", "Express.js", "REST APIs"],
    //   category: "Full-Stack",
    //   status: "Live",
    //   timeline: "2024",
    //   year: "2024",
    //   client: "Personal Project",
    //   team: "Solo Developer",
    //   rating: 5.0,
    //   reviews: 0,
    //   location: "Remote",
    //   featured: true,
    //   links: [
    //     {
    //       type: "live",
    //       url: "https://sg-store-frontend.vercel.app/",
    //     },
    //   ],
    //   overview: "SGStore is a complete e-commerce solution featuring product browsing, cart management, secure checkout, and user account functionality.",
    //   challenge: "Build a scalable e-commerce platform with intuitive UI, secure authentication, and seamless shopping experience across all devices.",
    //   solution: "Developed a full-stack application using React.js for the frontend and Node.js/Express for the backend, with MongoDB for data persistence and secure payment integration.",
    //   results: [
    //     "Complete e-commerce functionality",
    //     "Secure user authentication",
    //     "Responsive design across devices",
    //     "Product catalog with search and filters",
    //     "Shopping cart and checkout flow",
    //     "Order management system"
    //   ],
    //   features: [
    //     "Product Catalog: Browse products with search and filtering options",
    //     "Shopping Cart: Add, remove, and update items in cart",
    //     "User Authentication: Secure signup and login functionality",
    //     "Checkout Flow: Streamlined purchase process",
    //     "Responsive Design: Optimized for desktop and mobile",
    //     "Order Tracking: View order history and status"
    //   ],
    //   technologies: {
    //     "Frontend": ["React.js", "JavaScript", "CSS"],
    //     "Backend": ["Node.js", "Express.js"],
    //     "Database": ["MongoDB"],
    //     "API": ["REST APIs"],
    //     "Tools": ["Git", "Vercel"]
    //   },
    //   liveUrl: "https://sg-store-frontend.vercel.app/",
    //   githubUrl: "#"
    // },
  ],
};

export const resume = {
  professionalSummary: `Software Engineer with 1+ years of experience in backend and full-stack development. Built scalable REST APIs and web applications using Python, Node.js, React.js and SQL databases. Delivered Gen AI-powered RAG systems that reduced manual review effort by 90% and accelerated test cycles by 40%.`,
}
