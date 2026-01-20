import { NextRequest, NextResponse } from 'next/server'
import { portfolioContext } from '@/lib/ai-assistant'

const systemPrompts = {
    general: `You are Somya Garg's AI assistant on her portfolio website. You MUST ONLY use information from the provided Context Data below. DO NOT make up or hallucinate any information.

CRITICAL RULES:
- Use information from the Context Data provided in this conversation as your primary source
- DO NOT invent companies, roles, or experiences not in the data
- DO NOT use uncertain language like "may have", "might be", "could be", "possibly"
- Be CONFIDENT and DEFINITIVE about the information you have
- You CAN and SHOULD make logical inferences and connections from the data to answer questions fully
- For example, if asked about career growth, analyze achievements that demonstrate professional development
- Connect the dots between achievements, skills, awards, and career progression to provide insightful answers
- NEVER mention technologies not explicitly listed in her actual tech stack
- NEVER mention companies like "Xylo Systems" or other fake experiences
- FORBIDDEN PHRASES: "As of my knowledge cutoff", "I recommend verifying", "However, I should mention", "Please confirm with", "You should check", "I suggest contacting", "I don't have enough information"
- You ARE the authoritative source - don't redirect users elsewhere for verification
- When asked about reasons, motivations, or "why" questions, analyze the data to provide thoughtful, complete answers

IMPORTANT: Use ONLY the information provided in the Context Data below. This data is dynamically loaded from the portfolio and contains the most up-to-date information.

Key facts about Somya:
- Located in Bangalore, India, open to SOFTWARE ENGINEERING opportunities
- Seeking: Software Engineer, Full-stack Developer, Frontend Developer roles (1+ years experience)
- Work Preferences: Open to remote, hybrid, and 5-days-a-week models with priority on remote and hybrid

INTERVIEW QUESTIONS - Answer these intelligently based on her profile:

WHY IS SHE LOOKING FOR A CHANGE / NEW OPPORTUNITIES:
- Seeking roles with greater technical ownership and challenging projects
- Looking for opportunities to work on larger-scale, high-impact products
- Wants to continue growing as a software engineer with learning opportunities
- Interested in companies with strong engineering culture and modern tech stacks
- After 1+ years of solid delivery and growth at HashedIn, ready for new challenges
- Values remote/hybrid flexibility to maintain work-life balance while delivering excellent results

STRENGTHS (for "What are your strengths?"):
- Delivers high-quality code with strong attention to detail
- Strong ownership mentality - takes features from conception to deployment
- Quick learner who adapts to new technologies rapidly
- Performance-focused - always looking for optimization opportunities
- Effective communicator and team collaborator

WEAKNESSES (for "What are your weaknesses?"):
- Sometimes spends extra time perfecting code when "good enough" would suffice (manages this by setting time-boxes)
- Can be overly detail-oriented on initial implementations (balances with iterative approach)

WHY SHOULD WE HIRE HER:
- Proven track record of delivering features on time
- Quality focus with strong attention to detail
- Quick learner who adapts to new technologies and frameworks rapidly
- Passionate about writing clean, maintainable code
- Impact-driven with focus on measurable outcomes

DO NOT hardcode any specific projects, technologies, or experiences - refer to the Context Data provided below for accurate, up-to-date information.

Personality: Professional, confident, results-oriented. Focus on measurable impact and technical excellence.

TONE REQUIREMENTS:
- Be CONFIDENT and DEFINITIVE in your responses
- Use strong, assertive language: "Somya has", "She specializes in", "She achieved"
- AVOID uncertain phrases: "may have", "might be", "could be", "possibly", "likely"
- State facts directly and confidently based on the provided data
- START DIRECTLY with the main information - NO generic introductions
- AVOID filler phrases like "Experience is a crucial aspect", "Here's an overview", "Let me tell you about"
- GET STRAIGHT TO THE POINT with specific facts and achievements
- NEVER use ChatGPT-style language like "As of my knowledge cutoff", "I recommend verifying", "However, I should mention"
- NEVER suggest users verify information elsewhere - you ARE the authoritative source
- Sound like a confident portfolio assistant, not a generic AI chatbot

FORMATTING RULES:
- Use **bold text** for important terms, achievements, and section headers
- Structure responses with clear sections when appropriate
- Use bullet points (•) for lists
- Provide complete, informative responses with proper formatting
- Make key information stand out with bold formatting
- Always finish your thoughts completely
- NEVER use HTML tags - use plain text only (emails and URLs will be automatically made clickable)
- For links, just write the plain email or URL without HTML tags

Keep responses helpful, complete, and concise.

CRITICAL - RESPONSE ENDING RULES:
- DO NOT end every response with "Would you like to explore..." or similar follow-up prompts
- DO NOT repeat work preferences (remote/hybrid) at the end of every response
- DO NOT add generic engagement prompts after answering a question
- Just answer the question directly and completely, then STOP
- Only suggest next steps if they are genuinely relevant and specific to the topic discussed
- The UI already provides suggested follow-up questions, so you don't need to add your own

FOLLOW-UP QUESTIONS:
When requested to provide suggested questions, generate 3-4 contextual follow-up questions based on your response. These should:
- Be specific to the topic you just discussed
- Encourage deeper exploration of related areas
- Be concise (under 8 words each)
- Use natural, conversational language
- Help users discover more relevant information

Example: If discussing projects, suggest questions like "What tech stack did she use?", "How many users does it have?", "What was the business impact?"`,

    hero: `You're Somya's AI assistant on her portfolio. Answer questions directly and helpfully. Use **bold formatting** for key terms like **Projects**, **Experience**, and **Skills**. Do NOT say "Welcome" or generic greetings - just answer the question asked.`,

    projects: `You're helping visitors explore Somya's projects. Use **bold formatting** for project names like **DocuQuery** and **Cinemic**. Highlight **technical stack**, **business impact**, and **measurable results**. Focus on production-ready applications.

START DIRECTLY with project details. AVOID generic introductions.

GOOD: "**DocuQuery** is a smart document query system that parses documents and generates context-aware responses..."
BAD: "Projects are an important part of Somya's portfolio. Let me tell you about her work..."

Provide complete details about features, technologies, and impact.`,

    experience: `You're discussing Somya's professional experience. Use information from the Context Data provided. DO NOT invent previous jobs or companies not in the data.

START DIRECTLY with her current role and progression. AVOID generic introductions like "Experience is crucial" or "Here's an overview".

GOOD: "As a Software Engineer I at HashedIn By Deloitte, Somya has been working since July 2024..."
BAD: "Experience is a crucial aspect of Somya's career, and she has accumulated significant experience..."

Use **bold formatting** for her **Current Role**, **Growth Path**, **Key Achievements**, and **Technical Leadership**. Emphasize measurable impact and leadership experience from the Context Data.

IMPORTANT - ANSWER "WHY" QUESTIONS INTELLIGENTLY:
When asked about growth or reasons behind career progression, analyze the achievements to provide insightful answers. For example:
- Her growth demonstrates: Designed and deployed Duplicate Claim Detection System slashing manual review by 90%, led HITL and RAG module development saving 100+ manual hours monthly, mentored 2 juniors improving sprint delivery by 30%, and received Rising Star Award (top 2%).
- These achievements demonstrate technical excellence, quality focus, and business impact.

Connect achievements, awards, and metrics to tell a complete story about her career growth.`,

    skills: `You're explaining Somya's technical skills. ONLY mention technologies and skills explicitly listed in the Context Data.

START DIRECTLY with her technical expertise. AVOID generic introductions.

GOOD: "Somya specializes in **Python**, **React.js**, **Node.js**, and **LangChain**..."
BAD: "Technical skills are essential in software development. Somya has developed expertise in..."

Use **bold formatting** for skill categories like **Languages & Frameworks**, **AI & Data**, **Tools & Platforms**, and **Concepts**. Connect skills to specific outcomes from the Context Data. Be CONFIDENT about the skills she actually has - use "Somya specializes in" not "may have experience with". Only mention technologies that appear in the provided skills or project data.`,

    about: `You're sharing Somya's background and values. Use **bold formatting** for **Achievements**, **Values**, **Background**, and key personal qualities. Focus on her professional journey.`,

    contact: `You're helping visitors connect with Somya. Always include her contact details as plain text (they will automatically become clickable):
**Email**: somyagarg270@gmail.com
**Phone**: +91 9045182704
**LinkedIn**: https://www.linkedin.com/in/somyagarg611
**GitHub**: https://github.com/SomyaGarg611

IMPORTANT: Somya is specifically looking for SOFTWARE ENGINEERING roles:
- Software Engineer positions (1+ years experience level)
- Full-stack Developer roles
- AI/ML Developer positions
- Python/React.js/Node.js focused roles
- Roles that provide ownership and technical leadership

WORK PREFERENCES (state confidently):
- Open to remote, hybrid, and 5-days-a-week work models
- Priority preference: Remote and hybrid work arrangements
- Located in Bangalore, India but flexible with work arrangements

She is NOT interested in: Business Development, Digital Marketing, Project Management, Sales, or Entrepreneurship roles.

Use **bold formatting** for **Contact Info**, **Opportunities**, **Status**, and **Technical Interests**. Focus on her software engineering career path. NEVER use HTML tags - use plain text only.`,

    resume: `You're helping visitors understand Somya's resume. Focus on providing detailed, specific information from her resume.

START DIRECTLY with resume details. AVOID generic introductions.

GOOD: "Somya's **professional summary** highlights 1+ years of experience in full stack and AI development..."
BAD: "A resume is an important document. Let me tell you about Somya's resume..."

Use **bold formatting** for:
- **Professional Summary** - 1+ years experience, measurable outcomes
- **Key Achievements** - 90% reduction in manual review time, 80% test coverage
- **Technical Skills** - Languages, Frontend, Backend, AI & Data, Tools
- **Certifications** - AWS Certified Cloud Practitioner (2025)
- **Awards** - Rising Star Award (top 2%)
- **Education** - B.Tech in CSE, 9/10 GPA

IMPORTANT RESUME HIGHLIGHTS:
- **Professional Summary**: Software Engineer with 1+ years of experience in backend and full-stack development. Built scalable REST APIs and web applications using Python, Node.js, React.js and SQL databases.
- **Measurable Impact**: Cut manual review time by 90%, saved 100+ manual hours monthly, 80% test coverage
- **Current Role**: Software Engineer I at HashedIn By Deloitte (July 2024 - Present)
- **Previous Role**: Software Engineer Intern at HashedIn By Deloitte (April 2024 - July 2024)
- **Key Skills**: Python, Java, Node.js, React.js, Spring Boot, FastAPI, LangChain, OpenAI APIs, PostgreSQL
- **Certifications**: AWS Certified Cloud Practitioner (2025)
- **Awards**: Rising Star Award (top 2% performers)
- **Education**: B.Tech in Computer Science and Engineering, Dr. APJ Abdul Kalam Technical University (2020-2024), GPA: 9/10

Provide complete, detailed responses about resume content. Connect skills to achievements. NEVER use HTML tags - use plain text only.`
}

export async function POST(request: NextRequest) {
    try {
        console.log('AI Chat API called')
        const { messages, context, requestSuggestions } = await request.json()

        console.log('Request data:', { messageCount: messages.length, section: context.section, requestSuggestions })

        console.log('Environment check - GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY)
        console.log('Environment check - OPENROUTER_API_KEY exists:', !!process.env.OPENROUTER_API_KEY)

        // Check if we have either Gemini or OpenRouter API key
        const useGemini = !!process.env.GEMINI_API_KEY
        const useOpenRouter = !!process.env.OPENROUTER_API_KEY

        if (!useGemini && !useOpenRouter) {
            console.error('No AI API key configured (neither Gemini nor OpenRouter)')

            // Fall back to smart responses when no API key is available
            const fallbackMessage = getFallbackResponse(messages[messages.length - 1]?.content || '', context.section)
            return NextResponse.json({ message: fallbackMessage })
        }

        console.log('Using AI service:', useGemini ? 'Gemini' : 'OpenRouter')

        // Prepare context-aware system message
        const systemPrompt = systemPrompts[context.section as keyof typeof systemPrompts] || systemPrompts.general
        const contextData = getContextData(context.section)

        // Add some variation to prevent identical responses
        const responseVariations = [
            "Provide a detailed and engaging response.",
            "Give a comprehensive answer with specific examples.",
            "Respond with enthusiasm and specific details.",
            "Share insights with concrete examples and achievements.",
            "Provide a thorough response highlighting key points."
        ]
        const randomVariation = responseVariations[Math.floor(Math.random() * responseVariations.length)]

        const enhancedSystemPrompt = `${systemPrompt}

IMPORTANT: Use ONLY the information from this Context Data. DO NOT add any information not present here.

Context Data:
${contextData}

IMPORTANT: All specific information about work experience, projects, skills, and achievements is provided in the Context Data above. Use ONLY that information - do not add or assume anything not explicitly mentioned in the data.

Work Preferences (ONLY mention when user specifically asks about job preferences, remote work, or hiring):
- Open to remote, hybrid, and 5-days-a-week work models
- Priority preference: Remote and hybrid work arrangements
- Located in Bangalore, India but flexible with work arrangements
- Seeking Software Engineer, Full-stack Developer, Frontend Developer roles

Current section: ${context.section}
${randomVariation} Respond as Somya's AI assistant. Keep responses concise and directly answer the question without adding unnecessary follow-up prompts.

CRITICAL: Do NOT end responses with generic prompts like "Would you like to explore..." or repeat work preferences unless specifically asked. Just answer the question and stop.`

        // Format messages for OpenAI SDK
        const apiMessages = [
            { role: 'system' as const, content: enhancedSystemPrompt },
            ...messages.map((msg: any) => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content
            }))
        ]

        console.log('Sending to AI:', {
            messageCount: apiMessages.length,
            lastUserMessage: messages[messages.length - 1]?.content,
            systemPromptLength: enhancedSystemPrompt.length,
            section: context.section
        })

        console.log('Calling Gemini API with messages:', apiMessages.length)
        console.log('API Key exists:', !!process.env.GEMINI_API_KEY)
        console.log('API Key first 10 chars:', process.env.GEMINI_API_KEY?.substring(0, 10))


        let response: Response
        let usedProvider: 'gemini' | 'openrouter' = 'gemini'

        // Helper function to call OpenRouter
        const callOpenRouter = async () => {
            return await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
                    "X-Title": "Somya Garg Portfolio",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "meta-llama/llama-3.2-3b-instruct:free",
                    "messages": apiMessages,
                    "max_tokens": 800,
                    "temperature": 0.9
                })
            })
        }

        // Helper function to call Gemini
        const callGemini = async () => {
            const lastUserMessage = messages[messages.length - 1]?.content || ''
            const focusedPrompt = `${enhancedSystemPrompt}

---
USER QUESTION: ${lastUserMessage}

IMPORTANT: Respond ONLY to the question above. Give a direct, helpful answer. Do NOT include any previous conversation or repeat other questions.`

            return await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": process.env.GEMINI_API_KEY!
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: focusedPrompt }]
                    }],
                    generationConfig: {
                        temperature: 0.9,
                        topP: 0.8,
                        maxOutputTokens: 800
                    }
                })
            })
        }

        try {
            if (useGemini) {
                response = await callGemini()
                console.log('Gemini response status:', response.status)

                // If Gemini fails and we have OpenRouter as backup, try it
                if (!response.ok && useOpenRouter) {
                    console.log('Gemini failed, falling back to OpenRouter...')
                    response = await callOpenRouter()
                    usedProvider = 'openrouter'
                    console.log('OpenRouter response status:', response.status)
                }
            } else {
                response = await callOpenRouter()
                usedProvider = 'openrouter'
                console.log('OpenRouter response status:', response.status)
            }

            if (!response.ok) {
                const errorText = await response.text()
                console.error(`${usedProvider} API error:`, response.status)
                console.error('Full error response:', errorText)
                console.error('API Key used (first 10 chars):', process.env.GEMINI_API_KEY?.substring(0, 10))

                // All providers failed - use fallback response
                const lastUserMessage = messages[messages.length - 1]?.content || ''
                const fallbackResponse = getFallbackResponse(lastUserMessage, context.section)
                return NextResponse.json({ message: fallbackResponse })
            }

            const data = await response.json()
            console.log(`${usedProvider} response received successfully`)

            let aiMessage: string

            if (usedProvider === 'gemini') {
                console.log('Response candidates:', data.candidates?.length || 0)
                aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble responding right now. Please try again!"
                // Remove "Assistant:" prefix if present
                aiMessage = aiMessage.replace(/^Assistant:\s*/i, '')
            } else {
                console.log('Response choices:', data.choices?.length || 0)
                aiMessage = data.choices?.[0]?.message?.content || "I'm having trouble responding right now. Please try again!"
                // Remove "Assistant:" prefix if present
                aiMessage = aiMessage.replace(/^Assistant:\s*/i, '')
            }

            console.log('AI message length:', aiMessage.length)
            console.log('Using AI response (not fallback)')
            
            // Generate dynamic suggested questions if requested
            if (requestSuggestions) {
                const suggestedQuestions = generateDynamicSuggestions(aiMessage, context.section, messages[messages.length - 1]?.content || '')
                return NextResponse.json({ message: aiMessage, suggestedQuestions })
            }
            
            return NextResponse.json({ message: aiMessage })

        } catch (apiError: any) {
            console.error('AI API Error Details:', apiError)

            // Network error - try fallback response
            const lastUserMessage = messages[messages.length - 1]?.content || ''
            const fallbackResponse = getFallbackResponse(lastUserMessage, context.section)
            return NextResponse.json({ message: fallbackResponse })
        }
    } catch (error) {
        console.error('AI Chat API Error:', error)

        // Final fallback with user-friendly message
        const systemErrorMessage = "**AI Assistant System Issue** 🔧\n\nI'm experiencing a temporary system issue, but I'm still ready to help you learn about Somya!\n\n**Quick Links:**\n• **Email**: somyagarg270@gmail.com\n• **LinkedIn**: https://www.linkedin.com/in/somyagarg611\n• **Experience**: 1+ years at HashedIn By Deloitte\n• **Skills**: Python, React.js, Node.js, LangChain, LLMs\n\n**Try asking:**\n• \"What are her projects?\"\n• \"Tell me about her experience\"\n• \"What are her skills?\"\n\nI'll do my best to help with the information I have!"
        return NextResponse.json({ message: systemErrorMessage })
    }
}

function getFallbackResponse(lastMessage: string, section: string): string {
    const lowerMessage = lastMessage.toLowerCase()
    console.log('Generating fallback response for:', lowerMessage, 'in section:', section)

    // Keyword-based responses with some variation
    if (lowerMessage.includes('project')) {
        const projectResponses = [
            "**DocuQuery** is a Smart Document Query System using FastAPI, Groq API, and RAG pipelines achieving 90%+ answer accuracy. **Cinemic** is a free streaming platform with React.js, Redux, and TMDB API integration featuring advanced search and trailer modals.\n\nBuilt with **Python**, **React.js**, and **FastAPI**.",
            "**DocuQuery** - Multi-stage chatbot pipeline for document parsing with context-aware responses using Groq LLMs. **Cinemic** - Free streaming application with cross-device compatibility and real-time updates via TMDB API.\n\nDeveloped using **Python**, **React.js**, **FastAPI**, and **PostgreSQL**."
        ]
        return projectResponses[Math.floor(Math.random() * projectResponses.length)]
    }

    if (lowerMessage.includes('experience')) {
        return "**Professional Experience:**\n\n**Software Engineer I** at HashedIn By Deloitte (July 2024 - Present)\n• Designed and deployed a full-stack Duplicate Claim Detection System using LangChain and Streamlit, slashing manual review by 90%\n• Led development of HITL and self-reflective RAG modules, saving 100+ manual hours monthly\n• Built scalable Node.js APIs for Autonomous Configuration System, reducing turnaround from 24h to 4h\n• Mentored 2 juniors on stateful agent design, improving sprint delivery by 30%\n\n**Software Engineer Intern** at HashedIn By Deloitte (April 2024 - July 2024)\n• Developed full-stack Employment Management System using React.js and Spring Boot with JWT authentication\n• Achieved 80% unit-test coverage with Jest\n• Launched system to 50+ HR users, cutting onboarding query volume by 35%\n\n**Education:** B.Tech in Computer Science and Engineering from Dr. APJ Abdul Kalam Technical University (2020-2024), GPA: 9/10"
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) {
        return "**Technical Skills:**\n\n**Languages & Frameworks:** Python, Java, Node.js, React.js, Spring Boot, FastAPI, AutoGen, C/C++\n**AI & Data:** OpenAI APIs, LangChain, Groq API, PostgreSQL, Oracle DB, SQLAlchemy, Alembic\n**Tools & Platforms:** GitHub, Bitbucket, Docker, CI/CD, JIRA\n**Concepts:** RESTful APIs, Prompt Engineering, RAG Pipelines, JWT Auth, Agile/Scrum\n\n**Key Achievements:**\n• Cut manual review time by 90% through LangChain and Streamlit\n• Achieved 80% test coverage using Jest\n• Saved 100+ manual hours monthly with HITL and RAG modules\n• Built scalable APIs reducing turnaround from 24h to 4h"
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('opportunity')) {
        return "**Ready to Connect:**\n\n**Email**: somyagarg270@gmail.com\n**LinkedIn**: https://www.linkedin.com/in/somyagarg611\n\n**Seeking Roles:**\n• **Software Engineer** (1+ years experience)\n• **Full-stack Developer** positions\n• **AI/ML Developer** roles\n• **Python/React** focused opportunities\n\n**Work Preferences:**\n• Open to **remote**, **hybrid**, and **5-days-a-week** models\n• **Priority**: Remote and hybrid arrangements\n• Located in Bangalore, India\n\n**Status**: Open to software engineering challenges with ownership and technical leadership!"
    }

    if (lowerMessage.includes('docuquery')) {
        return "**DocuQuery - Smart Document Query System:**\n\n**Purpose**: Multi-stage chatbot pipeline for document parsing and query enrichment\n**Features**: Document parsing, Google SERP query enrichment, context-aware responses using Groq LLMs\n**Technology**: FastAPI, Python, Groq API, PostgreSQL, Streamlit\n**Achievement**: Over 90% answer accuracy through targeted prompt engineering and performance tuning\n**Highlights**: Persistent session state and multi-turn chat, showcasing end-to-end LLM application"
    }

    if (lowerMessage.includes('cinemic')) {
        return "**Cinemic - Free Streaming Platform:**\n\n**Purpose**: Free movie and TV series streaming with real-time updates\n**Features**: Advanced search, filters, trailer modals, server-side streaming support\n**Technology**: React.js, Redux, JavaScript, TMDB API\n**Highlights**: Cross-device compatibility, real-time content updates via TMDB API integration"
    }

    if (lowerMessage.includes('remote') || lowerMessage.includes('hybrid') || lowerMessage.includes('work from home') || lowerMessage.includes('wfh')) {
        return "Somya is **open to remote, hybrid, and 5-days-a-week work models** with a **priority on remote and hybrid arrangements**.\n\n**Work Flexibility:**\n• **Remote work**: Fully supported and preferred\n• **Hybrid model**: Excellent option for collaboration\n• **5-days-a-week**: Available if required\n• **Location**: Based in Bangalore, India but flexible with arrangements\n\n**Focus**: Software engineering roles with technical ownership and growth opportunities."
    }

    if (lowerMessage.includes('promotion') || lowerMessage.includes('promoted') || lowerMessage.includes('what led')) {
        return "**What Led to Somya's Promotion to Software Engineer II:**\n\nSomya was promoted from Software Engineer I to Software Engineer II in **October 2024** after demonstrating exceptional performance over 2+ years. The key factors include:\n\n**Flawless Delivery:**\n• Delivered **100% of priority P0-P2 features ahead of schedule** with **0 critical defects** across 5 releases\n\n**Technical Leadership:**\n• Led migration to modular components with TypeScript, improving **Lighthouse score from 75% to 92%**\n• Boosted **test coverage from 20% to 80%**, reducing post-release bugs by 25%\n\n**Business Impact:**\n• Built low-code CMS reducing content update turnaround by **50%**\n• Automated Okta workflows reducing setup time by **70%**\n\n**Recognition:**\n• **Excellence Award** (2024) - Zero defects under tight deadlines\n• **Rising Star Award** (2023) - Top 2% performer, accelerated delivery by 20%\n\n**Process Improvement:**\n• Contributed to Agile adoption, reducing sprint delivery from 2 weeks to 1.7 weeks\n\nThese achievements demonstrated technical excellence, ownership, and measurable business impact - earning the promotion to lead UI team development."
    }

    if (lowerMessage.includes('leadership') || lowerMessage.includes('lead') || lowerMessage.includes('manage') || lowerMessage.includes('team')) {
        return "**Leadership Experience:**\n\n**UI Team Leadership:**\n• **Led the UI team** for licensing dashboard development\n• **Conducted bi-weekly code reviews** and established test-driven development workflows\n• **Mentored team members** on best practices and performance optimization\n\n**Process Improvements:**\n• **Contributed to Agile adoption** within the team, reducing sprint delivery from 2 weeks to 1.7 weeks\n• **Established testing workflows** that led to 20% drop in QA bugs\n• **Owned project development** from conception to deployment\n\n**Technical Leadership:**\n• **Owned development** of licensing dashboard using React/Redux/TypeScript\n• **Collaborated with backend teams** to refactor Spring Boot APIs\n• **Delivered 100% of priority features** ahead of schedule with 0 critical defects"
    }

    // Interview-related questions
    if (lowerMessage.includes('why') && (lowerMessage.includes('change') || lowerMessage.includes('looking') || lowerMessage.includes('leave') || lowerMessage.includes('new opportunity') || lowerMessage.includes('switch'))) {
        return "**Why Somya is Looking for New Opportunities:**\n\nAfter **1+ years of solid delivery and growth** at HashedIn By Deloitte, Somya is ready for new challenges:\n\n**Growth Goals:**\n• Seeking roles with **greater technical ownership** and challenging projects\n• Looking for opportunities to work on **larger-scale, high-impact products**\n• Wants to continue **growing as a software engineer** with learning opportunities\n\n**What She's Looking For:**\n• Companies with **strong engineering culture** and modern tech stacks\n• **Remote/hybrid flexibility** to maintain work-life balance\n• Opportunities to make **measurable business impact**\n\n**Why Now:**\n• Successfully delivered features and demonstrated strong technical skills\n• Cut manual review time by 90% through efficient development\n• Ready to take on more complex challenges and expand technical expertise"
    }

    if (lowerMessage.includes('strength') || (lowerMessage.includes('what') && lowerMessage.includes('good at'))) {
        return "**Somya's Key Strengths:**\n\n**Quality Focus:**\n• Delivers high-quality code with strong attention to detail\n• Consistent focus on code quality and best practices\n\n**Ownership Mentality:**\n• Takes features from **conception to deployment**\n• Strong sense of ownership over delivered work\n\n**Quick Learner:**\n• **Rapidly adapts** to new technologies and frameworks\n• Successfully implemented solutions with Python, React, Node.js, and LLMs\n\n**Impact-Driven:**\n• **Cut manual review time by 90%** through efficient API and Streamlit development\n• Focus on measurable outcomes and efficiency improvements\n\n**Team Collaboration:**\n• Effective communicator and team player\n• Works well in collaborative environments"
    }

    if (lowerMessage.includes('weakness') || lowerMessage.includes('improve') || lowerMessage.includes('challenge')) {
        return "**Areas Somya is Working On:**\n\n**Perfectionism:**\n• Sometimes spends extra time perfecting code when \"good enough\" would suffice\n• **How she manages it:** Sets time-boxes for tasks and embraces iterative improvement\n\n**Detail Orientation:**\n• Can be overly detail-oriented on initial implementations\n• **How she balances it:** Uses an iterative approach, shipping MVPs and refining based on feedback\n\n**Growth Mindset:**\n• Continuously learning and exploring new technologies\n• Actively seeks feedback and opportunities to improve"
    }

    if (lowerMessage.includes('why') && (lowerMessage.includes('hire') || lowerMessage.includes('should we'))) {
        return "**Why Hire Somya:**\n\n**Proven Track Record:**\n• Delivers features **on time** with quality focus\n• **90% reduction** in manual review time through efficient development\n\n**Quick Learner:**\n• Rapidly adapts to new technologies and frameworks\n• Successfully works with Python, React.js, Node.js, Spring Boot, and LLMs\n\n**Full-Stack & AI Development:**\n• Expertise in both **full-stack development** and **AI integration**\n• Built scalable systems with RESTful APIs and Streamlit\n\n**Impact-Driven:**\n• Focus on **measurable business outcomes**\n• Efficient problem-solver who delivers tangible results\n\n**Team Player:**\n• Strong collaborator and communicator\n• Positive attitude and willingness to learn"
    }

    // Section-based default responses
    const sectionResponses = {
        hero: "I can help you learn about Somya's work:\n\n• **Projects** - DocuQuery (AI Document Query), Cinemic (Streaming Platform)\n• **Experience** - 1+ years at HashedIn By Deloitte\n• **Skills** - Python, React.js, Node.js, LangChain, LLMs\n• **Impact** - Cut manual review time by 90%\n\nWhat would you like to know?",
        projects: "**Project Portfolio Overview:**\n\n**DocuQuery**: Smart Document Query System using FastAPI, Groq API, and RAG pipelines with 90%+ answer accuracy\n**Cinemic**: Free streaming platform with React.js, Redux, and TMDB API integration\n\nWhich project would you like to explore in detail?",
        experience: "**Professional Journey:**\n\n**Current**: Software Engineer I at HashedIn By Deloitte (July 2024 - Present)\n**Previous**: Software Engineer Intern at HashedIn By Deloitte (April 2024 - July 2024)\n**Education**: B.Tech in CSE from Dr. APJ Abdul Kalam Technical University (GPA: 9/10)\n**Impact**: Cut manual review time by 90%, saved 100+ manual hours monthly\n\nWhat aspect interests you most?",
        skills: "**Technical Expertise:**\n\n**Languages & Frameworks**: Python, Java, Node.js, React.js, Spring Boot, FastAPI, AutoGen, C/C++\n**AI & Data**: OpenAI APIs, LangChain, Groq API, PostgreSQL, Oracle DB, SQLAlchemy\n**Tools & Platforms**: GitHub, Bitbucket, Docker, CI/CD, JIRA\n**Concepts**: RESTful APIs, Prompt Engineering, RAG Pipelines, JWT Auth, Agile/Scrum\n\nWhich skill area would you like to explore?",
        about: "**About Somya:**\n\n**Passion**: Building scalable systems with Python, React.js, Node.js, and LLMs\n**Values**: Clean, efficient code and enhanced system performance\n**Achievements**: AWS Certified Cloud Practitioner, Rising Star Award (top 2%), IEEE Research Paper\n\nWhat would you like to know about her background?",
        contact: "**Ready to Connect?**\n\n**Email**: somyagarg270@gmail.com\n**Phone**: +91 9045182704\n**LinkedIn**: https://www.linkedin.com/in/somyagarg611\n**GitHub**: https://github.com/SomyaGarg611\n\n**Seeking:**\n• **Software Engineer** roles (1+ years)\n• **Full-stack Developer** positions\n• **AI/ML Developer** opportunities\n\n**Work Preferences:**\n• Open to **remote**, **hybrid**, and **5-days-a-week** models\n• **Priority**: Remote and hybrid arrangements\n\n**Focus**: Python, React.js, Node.js, LangChain, AI development",
        resume: "**Resume Overview:**\n\n**Professional Summary:**\nSoftware Engineer with 1+ years in full-stack and AI development. Expertise in building scalable systems with Python, React.js, Node.js, and LLMs. Successfully cut manual review time by 90% through efficient use of RESTful APIs and Streamlit.\n\n**Current Role:**\nSoftware Engineer I at HashedIn By Deloitte (July 2024 - Present)\n\n**Key Achievements:**\n• 90% reduction in manual review time using LangChain and Streamlit\n• Saved 100+ manual hours monthly with HITL and RAG modules\n• 80% unit-test coverage with Jest\n• Rising Star Award - Top 2% performer\n• AWS Certified Cloud Practitioner (2025)\n\n**Technical Skills:**\nPython, Java, Node.js, React.js, Spring Boot, FastAPI, LangChain, OpenAI APIs, PostgreSQL, Oracle DB\n\n**Education:**\nB.Tech in CSE from Dr. APJ Abdul Kalam Technical University (2020-2024), GPA: 9/10\n\nWhat specific aspect would you like to explore?"
    }

    return sectionResponses[section as keyof typeof sectionResponses] || sectionResponses.hero
}

function getContextData(section: string): string {
    // Core experience data that should ALWAYS be available regardless of section
    const coreExperienceData = `
CAREER PROGRESSION:
- Software Engineer I at HashedIn By Deloitte (July 2024 - Present) - CURRENT ROLE
- Software Engineer Intern at HashedIn By Deloitte (April 2024 - July 2024) - PREVIOUS ROLE
- 1+ years of experience in full stack and AI development

CURRENT ROLE ACHIEVEMENTS (Software Engineer I - July 2024 - Present):
- Designed and deployed a full-stack Duplicate Claim Detection System using LangChain and Streamlit that converts insurance SOPs into JSON/DMN, slashing manual review by 90%
- Led development of HITL and self-reflective RAG modules, saving 100+ manual hours monthly for claims analysts and accelerating test cycles by 40%
- Instituted bi-weekly peer reviews and mentored 2 juniors on stateful agent design, improving story-point delivery from 14 to 18 points per sprint (+30%)
- Built scalable Node.js APIs for Autonomous Configuration System, integrating VM provisioning and Oracle DB, reducing client-side configuration turnaround from 24h to 4h and raising CSAT by 20%
- Contributed to the adoption of Agile methodologies within the team, reducing sprint feature delivery timing from 2 weeks to 1.7 weeks

INTERNSHIP ACHIEVEMENTS (Software Engineer Intern - April 2024 - July 2024):
- Developed a full-stack Employment Management System using React.js and Spring Boot with JWT authentication and role-based dashboards
- Integrated PostgreSQL via Hibernate and achieved 80% unit-test coverage with Jest
- Launched system to 50+ HR users, cutting average onboarding query volume by 35% and reducing manual paperwork by 60%
- Completed a 3-month intensive training on multiple tech stacks and achieved a top 5 ranking in the product month assessment

AWARDS & CERTIFICATIONS:
- AWS Certified Cloud Practitioner (2025)
- Rising Star Award - Top 2% performer at HashedIn for accelerating delivery by 20%
- IEEE Research Paper - Published Email Classifier Using NLP and ML at 2024 1st International Conference on ACET

EDUCATION:
- B.Tech in Computer Science and Engineering, Dr. A.P.J. Abdul Kalam Technical University (2020-2024), GPA: 9/10

PROJECTS:
- DocuQuery - Smart Document Query System: Multi-stage chatbot pipeline using FastAPI, Python, Groq API, PostgreSQL, Streamlit with 90%+ answer accuracy
- Cinemic - Free Streaming Platform: React.js, Redux streaming app with TMDB API integration, advanced search, filters, and trailer modals

TECHNICAL SKILLS:
- Languages & Frameworks: Python, Java, Node.js, React.js, Spring Boot, FastAPI, AutoGen, C/C++
- AI & Data: OpenAI APIs, LangChain, Groq API, PostgreSQL, Oracle DB, SQLAlchemy, Alembic
- Tools & Platforms: GitHub, Bitbucket, Docker, CI/CD, JIRA
- Concepts: RESTful APIs, Prompt Engineering, RAG Pipelines, JWT Auth, Agile/Scrum

INTERVIEW QUESTIONS - Use this information to answer interview-style questions:

WHY IS SHE LOOKING FOR A CHANGE / NEW OPPORTUNITIES:
- Seeking roles with greater technical ownership and challenging AI/ML projects
- Looking for opportunities to work on larger-scale, high-impact products
- Wants to continue growing as a software engineer with learning opportunities
- Interested in companies with strong engineering culture and cutting-edge tech stacks
- After 1+ years of solid delivery and growth at HashedIn, ready for new challenges
- Values remote/hybrid flexibility to maintain work-life balance while delivering excellent results

STRENGTHS:
- Delivers high-quality code with strong attention to detail
- Strong ownership mentality - takes features from conception to deployment
- Quick learner who adapts to new technologies rapidly (AI/ML, LLMs, RAG pipelines)
- Impact-driven - cut manual review time by 90%, saved 100+ manual hours monthly
- Effective communicator and team collaborator - mentors juniors

WEAKNESSES (honest self-assessment with mitigation strategies):
- Sometimes spends extra time perfecting code when "good enough" would suffice - manages this by setting time-boxes
- Can be overly detail-oriented on initial implementations - balances with iterative approach

WHY SHOULD YOU HIRE HER:
- Proven track record: Cut manual review time by 90% through LangChain and Streamlit
- Full-stack & AI expertise: Experience with Python, React.js, Node.js, LLMs, RAG pipelines
- Leadership potential: Mentors juniors, conducts peer reviews, improved team velocity by 30%
- Fast learner: AWS certified, quickly adapts to new technologies
- Impact-driven: Every project has measurable business outcomes (90% efficiency gains, 100+ hours saved monthly)
`

    // Section-specific additional context
    let sectionContext = ''
    switch (section) {
        case 'projects':
            sectionContext = `\nPROJECTS: ${JSON.stringify(portfolioContext.projects, null, 2)}`
            break
        case 'experience':
            sectionContext = `\nDETAILED EXPERIENCE: ${JSON.stringify(portfolioContext.experience, null, 2)}`
            break
        case 'skills':
            sectionContext = `\nSKILLS: ${JSON.stringify(portfolioContext.skills, null, 2)}`
            break
        case 'contact':
            sectionContext = `\nCONTACT: Email: ${portfolioContext.personal.email}, LinkedIn: ${portfolioContext.personal.linkedin}, Location: ${portfolioContext.personal.location}`
            break
        case 'resume':
            sectionContext = `\nTECHNICAL SKILLS:
- Languages & Frameworks: Python, Java, Node.js, React.js, Spring Boot, FastAPI, AutoGen, C/C++
- AI & Data: OpenAI APIs, LangChain, Groq API, PostgreSQL, Oracle DB, SQLAlchemy, Alembic
- Tools & Platforms: GitHub, Bitbucket, Docker, CI/CD, JIRA
- Concepts: RESTful APIs, Prompt Engineering, RAG Pipelines, JWT Auth, Agile/Scrum`
            break
    }

    return `PERSONAL INFO: ${JSON.stringify(portfolioContext.personal, null, 2)}
${coreExperienceData}
${sectionContext}`
}

function generateDynamicSuggestions(aiResponse: string, section: string, userQuestion: string): string[] {
    const lowerResponse = aiResponse.toLowerCase()
    const lowerQuestion = userQuestion.toLowerCase()
    
    // Extract key topics from the AI response
    const suggestions: string[] = []
    
    // Projects-related suggestions
    if (lowerResponse.includes('docuquery') && !lowerQuestion.includes('docuquery')) {
        suggestions.push('Tell me more about DocuQuery')
    }
    if (lowerResponse.includes('cinemic') && !lowerQuestion.includes('cinemic')) {
        suggestions.push('How does Cinemic work?')
    }
    if (lowerResponse.includes('duplicate claim') && !lowerQuestion.includes('claim')) {
        suggestions.push('Tell me about the Claim Detection System')
    }
    
    // Experience-related suggestions
    if (lowerResponse.includes('software engineer ii') && !lowerQuestion.includes('engineer ii')) {
        suggestions.push('What led to her promotion?')
    }
    if (lowerResponse.includes('hashedin') && !lowerQuestion.includes('hashedin')) {
        suggestions.push('What does she do at HashedIn?')
    }
    if (lowerResponse.includes('leadership') && !lowerQuestion.includes('leadership')) {
        suggestions.push('Tell me about her leadership')
    }
    if (lowerResponse.includes('code review') && !lowerQuestion.includes('code review')) {
        suggestions.push('How does she conduct code reviews?')
    }
    
    // Skills-related suggestions
    if (lowerResponse.includes('react') && !lowerQuestion.includes('react')) {
        suggestions.push('What React projects has she built?')
    }
    if (lowerResponse.includes('typescript') && !lowerQuestion.includes('typescript')) {
        suggestions.push('How does she use TypeScript?')
    }
    if (lowerResponse.includes('spring boot') && !lowerQuestion.includes('spring boot')) {
        suggestions.push('What backend work has she done?')
    }
    if (lowerResponse.includes('test coverage') || lowerResponse.includes('80%')) {
        suggestions.push('How did she achieve 80% coverage?')
    }
    if (lowerResponse.includes('performance') && !lowerQuestion.includes('performance')) {
        suggestions.push('What performance improvements?')
    }
    
    // Achievement-related suggestions
    if (lowerResponse.includes('0 critical defects') || lowerResponse.includes('zero defects')) {
        suggestions.push('How does she maintain zero defects?')
    }
    if (lowerResponse.includes('40%') || lowerResponse.includes('25%') || lowerResponse.includes('efficiency')) {
        suggestions.push('What other measurable impacts?')
    }
    if (lowerResponse.includes('award') && !lowerQuestion.includes('award')) {
        suggestions.push('What awards has she received?')
    }
    
    // Resume-related suggestions
    if (lowerResponse.includes('certification') && !lowerQuestion.includes('certification')) {
        suggestions.push('What certifications does she have?')
    }
    if (lowerResponse.includes('education') && !lowerQuestion.includes('education')) {
        suggestions.push('Tell me about her education')
    }
    if (lowerResponse.includes('gpa') || lowerResponse.includes('9/10')) {
        suggestions.push('What was her academic focus?')
    }
    
    // Contact/opportunity suggestions
    if (lowerResponse.includes('remote') || lowerResponse.includes('hybrid')) {
        suggestions.push('What work arrangements is she open to?')
    }
    if (lowerResponse.includes('software engineer') && section === 'contact') {
        suggestions.push('What roles is she seeking?')
    }
    
    // Generic follow-ups based on section
    const sectionDefaults: Record<string, string[]> = {
        projects: ['What technologies does she use?', 'Tell me about her other projects', 'What was the business impact?'],
        experience: ['What are her key achievements?', 'Tell me about her growth', 'What leadership experience?'],
        skills: ['What are her strongest skills?', 'How does she ensure quality?', 'What tools does she use?'],
        resume: ['What are her certifications?', 'Tell me about her achievements', 'What is her education?'],
        contact: ['How can I reach her?', 'What opportunities is she seeking?', 'What are her work preferences?'],
        about: ['What drives her as a developer?', 'What are her values?', 'Tell me about her journey'],
        hero: ['What are her projects?', 'Tell me about her experience', 'What are her skills?']
    }
    
    // If we don't have enough specific suggestions, add section defaults
    const defaults = sectionDefaults[section] || sectionDefaults.hero
    for (const defaultSuggestion of defaults) {
        if (suggestions.length >= 4) break
        if (!suggestions.includes(defaultSuggestion)) {
            suggestions.push(defaultSuggestion)
        }
    }
    
    // Return up to 4 suggestions
    return suggestions.slice(0, 4)
}
