import { projects, experience, about, contact } from '@/data/data'

export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

export interface AIContext {
    section: 'hero' | 'skills' | 'projects' | 'experience' | 'about' | 'contact' | 'resume'
    data?: any
}

// Portfolio context for AI responses
export const portfolioContext = {
    personal: {
        name: "Somya Garg",
        title: "Software Engineer I",
        company: "HashedIn By Deloitte",
        location: "Bangalore, India",
        experience: "1+ years",
        email: "somyagarg270@gmail.com",
        phone: "+91 9045182704",
        linkedin: "https://www.linkedin.com/in/somyagarg611",
        github: "https://github.com/SomyaGarg611"
    },

    skills: {
        languagesFrameworks: ["Python", "Java", "Node.js", "React.js", "Spring Boot", "FastAPI", "AutoGen", "C/C++"],
        aiData: ["OpenAI APIs", "LangChain", "Groq API", "PostgreSQL", "Oracle DB", "SQLAlchemy", "Alembic"],
        toolsPlatforms: ["GitHub", "Bitbucket", "Docker", "CI/CD", "JIRA"],
        concepts: ["RESTful APIs", "Prompt Engineering", "RAG Pipelines", "JWT Auth", "Agile/Scrum"]
    },

    projects: projects.projects,
    experience: experience.workExperience,
    achievements: about.achievements,
    contact: contact.contactMethods,

    personality: {
        tone: "Professional yet approachable, confident, results-oriented",
        style: "Direct and concise, focuses on measurable impact and technical excellence",
        interests: "AI development, full-stack systems, LLMs, RAG pipelines, system optimization"
    }
}

export async function callAI(messages: ChatMessage[], context: AIContext, requestSuggestions: boolean = false): Promise<string | { message: string, suggestedQuestions?: string[] }> {
    try {
        console.log('Calling AI API with:', { context: context.section, messageCount: messages.length, requestSuggestions })

        const response = await fetch('/api/ai-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages,
                context,
                requestSuggestions
            }),
        })

        console.log('API Response status:', response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('API Error response:', errorText)
            throw new Error(`API Error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log('AI Response data:', data)
        
        if (requestSuggestions && data.suggestedQuestions) {
            return {
                message: data.message,
                suggestedQuestions: data.suggestedQuestions
            }
        }
        
        return data.message
    } catch (error) {
        console.error('Somya\'s AI Assistant Error:', error)

        // Fallback responses if API fails
        const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || ''

        if (lastMessage.includes('project')) {
            return "**Key Projects Overview:**\n\n**DocuQuery**: Smart Document Query System using FastAPI, Groq API, and RAG pipelines with 90%+ answer accuracy\n**Cinemic**: Free streaming platform with React.js, Redux, and TMDB API integration\n\nEach project demonstrates **Python**, **React.js**, and **AI/ML** expertise."
        }

        if (lastMessage.includes('experience')) {
            return "**Professional Experience:**\n\n**Current Role**: Software Engineer I at HashedIn By Deloitte\n**Experience**: 1+ years in full-stack and AI development\n**Track Record**: Delivered features on time with quality focus\n**Impact**: Cut manual review time by 90% through efficient API and Streamlit development"
        }

        if (lastMessage.includes('contact') || lastMessage.includes('email') || lastMessage.includes('linkedin') || lastMessage.includes('reach')) {
            return "**Contact Information:**\n\n**Email**: somyagarg270@gmail.com\n**LinkedIn**: https://www.linkedin.com/in/somyagarg611\n**Location**: Bangalore, India\n**Status**: Open to new opportunities\n\nFeel free to reach out for collaborations or job opportunities!"
        }

        return "**Connection Issue** 🔄\n\nI'm having trouble with my AI connection right now, but I can still help! Feel free to explore Somya's portfolio or contact her directly:\n\n**Email**: somyagarg270@gmail.com\n**LinkedIn**: https://www.linkedin.com/in/somyagarg611"
    }
}

export const suggestedQuestions = {
    hero: [
        "What are her projects?",
        "Tell me about her experience",
        "What are her skills?",
        "How can I contact her?"
    ],

    projects: [
        "What are her projects?",
        "Tell me about DocuQuery",
        "How does Cinemic work?",
        "What AI/ML technologies does she use?"
    ],

    experience: [
        "Tell me about her experience",
        "What's her technical experience?",
        "What did she achieve at HashedIn?",
        "What's her tech stack?"
    ],

    skills: [
        "What are her skills?",
        "Tell me about her AI/ML expertise",
        "What's her development approach?",
        "What technologies does she specialize in?"
    ],

    about: [
        "Tell me about her experience",
        "What are her skills?",
        "What drives Somya as a developer?",
        "What are her achievements?"
    ],

    contact: [
        "How can I contact her?",
        "What are her work preferences for remote/hybrid?",
        "Tell me about her experience",
        "What software engineering roles is she seeking?"
    ],

    resume: [
        "What's in her professional summary?",
        "Tell me about her AWS certification",
        "What are her key achievements?",
        "Explain her AI/ML skills"
    ]
}