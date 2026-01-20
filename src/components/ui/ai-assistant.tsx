'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Send, X, Minimize2, Maximize2, RotateCcw, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { callAI, ChatMessage, AIContext, suggestedQuestions } from '@/lib/ai-assistant'
import { cn } from '@/lib/utils'
import { FormattedMessage } from '@/components/ui/formatted-message'

interface AIAssistantProps {
    currentSection: 'hero' | 'skills' | 'projects' | 'experience' | 'about' | 'contact' | 'resume'
}

export function AIAssistant({ currentSection }: AIAssistantProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showAutoPopup, setShowAutoPopup] = useState(false)
    const [hasShownPopupForSection, setHasShownPopupForSection] = useState<Set<string>>(new Set())
    const [previousSection, setPreviousSection] = useState(currentSection)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [typingText, setTypingText] = useState('')
    const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([])
    const [useDynamicSuggestions, setUseDynamicSuggestions] = useState(false)
    const lastAIMessageRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToLastAIMessage = () => {
        lastAIMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    useEffect(() => {
        // If the last message is from assistant, scroll to its start
        if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
            scrollToLastAIMessage()
        } else {
            scrollToBottom()
        }
    }, [messages])

    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus()
        }
    }, [isOpen, isMinimized])

    // Clear messages on component mount (page reload)
    useEffect(() => {
        setMessages([])
    }, [])

    // Handle section changes - update suggestions and show contextual greeting
    useEffect(() => {
        if (previousSection !== currentSection) {
            setPreviousSection(currentSection)
            // Reset to static suggestions when section changes
            setUseDynamicSuggestions(false)
            setDynamicSuggestions([])

            // If chat is open and user navigates to a new section, add a contextual message
            if (isOpen && messages.length > 0) {
                const contextualMessage: ChatMessage = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: getGreeting(),
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, contextualMessage])
            }
        }
    }, [currentSection, previousSection, isOpen, messages.length])

    // Auto-popup on section change
    useEffect(() => {
        if (!hasShownPopupForSection.has(currentSection)) {
            const timer = setTimeout(() => {
                setShowAutoPopup(true)
                setHasShownPopupForSection(prev => new Set([...prev, currentSection]))

                // Auto-hide after 5 seconds if not interacted with
                setTimeout(() => {
                    if (!isOpen) {
                        setShowAutoPopup(false)
                    }
                }, 5000)
            }, 2000) // Show popup 2 seconds after entering new section

            return () => clearTimeout(timer)
        }
    }, [currentSection, hasShownPopupForSection, isOpen])

    // Typing animation effect
    useEffect(() => {
        if (isLoading) {
            const texts = ['Thinking...', 'Processing...', 'Analyzing...']
            let currentIndex = 0

            const interval = setInterval(() => {
                setTypingText(texts[currentIndex])
                currentIndex = (currentIndex + 1) % texts.length
            }, 800)

            return () => clearInterval(interval)
        } else {
            setTypingText('')
        }
    }, [isLoading])

    const getPopupMessage = () => {
        const popupMessages: Record<typeof currentSection, string> = {
            hero: 'Ready to help with projects & experience!',
            projects: 'Want to explore her projects?',
            experience: 'Curious about her professional journey?',
            skills: 'Want to know about her technical skills?',
            about: 'Want to learn more about Somya?',
            contact: 'Ready to connect with Somya?',
            resume: "What would you like to know about Somya's resume?"
        }
        return popupMessages[currentSection] || popupMessages.hero
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

        const sectionGreetings = {
            hero: `**${timeGreeting}!** 👋\n\nI'm **Somya's AI assistant**. Ready to explore her:\n• **Projects** - DocuQuery, Cinemic & more\n• **Experience** - 1+ years at HashedIn\n• **Skills** - Python, React, LLMs expertise`,
            projects: "**Project Explorer** 🚀\n\nI can share details about:\n• **Tech Stack** - Python, React.js, FastAPI, LangChain\n• **AI/ML** - RAG pipelines, LLMs, Prompt Engineering\n• **Business Impact** - 90% efficiency gains\n\nWhich project interests you?",
            experience: "**Professional Journey** 💼\n\nLet me tell you about:\n• **Current Role** - Software Engineer I\n• **Growth Path** - Full-stack & AI development\n• **Track Record** - 90% manual review reduction\n\nWhat would you like to explore?",
            skills: "**Technical Expertise** ⚡\n\nI can explain how Somya applies:\n• **AI/ML Skills** - LangChain, RAG, LLMs\n• **Full-Stack** - Python, React.js, Node.js\n• **Quality** - 80% test coverage\n\nWhich skill area interests you?",
            about: "**About Somya** 🎯\n\nDiscover more about:\n• **Background** - Professional journey\n• **Achievements** - Measurable impact\n• **Values** - Quality & performance focus",
            contact: "**Let's Connect!** 📧\n\n**Email**: somyagarg270@gmail.com\n**LinkedIn**: https://www.linkedin.com/in/somyagarg611\n\nI can help with:\n• **Opportunities** - Role discussions\n• **Message Drafting** - Professional outreach\n\nHow can I assist?",
            resume: "**Resume Assistant** 📄\n\nI can help you understand:\n• **Professional Summary** - 1+ years experience\n• **Key Achievements** - 90% manual review reduction, 100+ hours saved monthly\n• **Technical Skills** - Python, React.js, LangChain, LLMs\n• **Certifications** - AWS Certified Cloud Practitioner\n\nWhat would you like to know about Somya's resume?"
        }

        return sectionGreetings[currentSection] || sectionGreetings.hero
    }

    const handleSendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsLoading(true)

        try {
            const context: AIContext = {
                section: currentSection,
                data: null
            }

            const aiResponse = await callAI([...messages, userMessage], context, true)

            // Handle both string and object responses
            const responseMessage = typeof aiResponse === 'string' ? aiResponse : aiResponse.message
            const suggestions = typeof aiResponse === 'object' ? aiResponse.suggestedQuestions : undefined

            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseMessage,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])

            // Update dynamic suggestions if provided
            if (suggestions && suggestions.length > 0) {
                setDynamicSuggestions(suggestions)
                setUseDynamicSuggestions(true)
            }
        } catch (error) {
            console.error('Error sending message:', error)
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having trouble connecting right now. Feel free to explore the portfolio or contact Somya directly!",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleSuggestedQuestion = (question: string) => {
        handleSendMessage(question)
    }

    const currentSuggestions = useDynamicSuggestions && dynamicSuggestions.length > 0 
        ? dynamicSuggestions 
        : (suggestedQuestions[currentSection as keyof typeof suggestedQuestions] || suggestedQuestions.hero)

    return (
        <>
            {/* Auto-popup notification */}
            <AnimatePresence>
                {showAutoPopup && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 inset-x-4 md:right-20 md:left-auto z-40"
                    >
                        <div className="ml-auto w-72 sm:w-80 md:w-auto md:max-w-sm">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border p-3 md:p-4 cursor-pointer"
                                onClick={() => {
                                    setIsOpen(true)
                                    setShowAutoPopup(false)
                                }}>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                            Somya's AI Assistant
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                            {getPopupMessage()}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setShowAutoPopup(false)
                                        }}
                                        className="h-6 w-6 p-0"
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-6 right-4 md:right-20 z-50"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={() => setIsOpen(true)}
                                size="lg"
                                className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <MessageCircle className="h-6 w-6 md:h-7 md:w-7 text-white" />
                                </div>
                                {/* Pulse animation */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 animate-ping opacity-20" />
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        className="fixed bottom-6 inset-x-4 md:right-20 md:left-auto z-50"
                    >
                        <div className="ml-auto w-72 sm:w-80 md:w-96">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-3 md:p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-white font-semibold text-xs md:text-sm truncate">Somya's AI Assistant</h3>
                                                <p className="text-white/80 text-xs hidden sm:block">Ask me about Somya</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            {messages.length > 0 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setMessages([])}
                                                    className="h-7 w-7 md:h-8 md:w-8 p-0 text-white hover:bg-white/20"
                                                    title="Clear chat"
                                                >
                                                    <RotateCcw className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsMinimized(!isMinimized)}
                                                className="h-7 w-7 md:h-8 md:w-8 p-0 text-white hover:bg-white/20"
                                            >
                                                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsOpen(false)}
                                                className="h-7 w-7 md:h-8 md:w-8 p-0 text-white hover:bg-white/20"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {!isMinimized && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                        >
                                            <div className="p-3 md:p-4 space-y-3 md:space-y-4">
                                                {/* Messages */}
                                                <div className="h-48 md:h-64 overflow-y-auto space-y-2 md:space-y-3 pr-1 md:pr-2">
                                                    {messages.length === 0 && (
                                                        <div className="flex justify-start">
                                                            <div className="max-w-[90%] md:max-w-[85%] bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md p-2 md:p-3">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
                                                                        <MessageCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                                                                    </div>
                                                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Somya's AI Assistant</span>
                                                                </div>
                                                                <div className="text-xs md:text-sm text-gray-800 dark:text-gray-200">
                                                                    <FormattedMessage content={getGreeting()} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {messages.map((message, index) => {
                                                        const isLastAIMessage = index === messages.length - 1 && message.role === 'assistant'
                                                        return (
                                                            <motion.div
                                                                key={message.id}
                                                                ref={isLastAIMessage ? lastAIMessageRef : null}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className={cn(
                                                                    "flex",
                                                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                                                )}
                                                            >
                                                                <div className={cn(
                                                                    "max-w-[90%] md:max-w-[85%] rounded-2xl p-2 md:p-3 text-xs md:text-sm",
                                                                    message.role === 'user'
                                                                        ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-br-md'
                                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md'
                                                                )}>
                                                                    {message.role === 'assistant' && (
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
                                                                                <MessageCircle className="w-3 h-3 text-white" />
                                                                            </div>
                                                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Somya's AI Assistant</span>
                                                                        </div>
                                                                    )}
                                                                    <FormattedMessage content={message.content} />
                                                                </div>
                                                            </motion.div>
                                                        )
                                                    })}

                                                    {isLoading && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="flex justify-start"
                                                        >
                                                            <div className="max-w-[90%] md:max-w-[85%] bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md p-2 md:p-3">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
                                                                        <Zap className="w-3 h-3 text-white animate-pulse" />
                                                                    </div>
                                                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Somya's AI Assistant</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex gap-1">
                                                                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
                                                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                                                    </div>
                                                                    <span className="text-xs text-gray-600 dark:text-gray-400">{typingText}</span>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                    <div ref={messagesEndRef} />
                                                </div>

                                                {/* Suggested Questions */}
                                                <div className="space-y-2 md:space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                            {messages.length === 0 
                                                                ? 'Quick questions:' 
                                                                : useDynamicSuggestions 
                                                                    ? 'You might also ask:' 
                                                                    : `Ask about ${currentSection}:`}
                                                        </p>
                                                        {messages.length > 0 && !useDynamicSuggestions && (
                                                            <Badge variant="secondary" className="text-xs px-2 py-1">
                                                                {currentSection}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                        {currentSuggestions.map((question: string, index: number) => (
                                                            <motion.button
                                                                key={`${currentSection}-${index}`}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                onClick={() => handleSuggestedQuestion(question)}
                                                                className="text-xs px-2 py-1.5 md:px-3 md:py-2 bg-gray-100 dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 transition-colors"
                                                            >
                                                                {question}
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Input */}
                                                <div className="flex gap-1.5 md:gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                    <input
                                                        ref={inputRef}
                                                        type="text"
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                                                        placeholder="Ask me anything..."
                                                        className="flex-1 px-3 py-2 md:px-4 text-xs md:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                                                        disabled={isLoading}
                                                    />
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleSendMessage(inputValue)}
                                                        disabled={isLoading || !inputValue.trim()}
                                                        className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 p-0"
                                                    >
                                                        <Send className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}