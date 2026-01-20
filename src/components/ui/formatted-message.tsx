import React from 'react'

interface FormattedMessageProps {
    content: string
    className?: string
}

export function FormattedMessage({ content, className = '' }: FormattedMessageProps) {
    // Function to clean HTML tags and format text with bold patterns and links
    const cleanHtml = (text: string) => {
        // Remove HTML tags and decode entities
        return text
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
            .replace(/&amp;/g, '&') // Replace &amp; with &
            .replace(/&lt;/g, '<') // Replace &lt; with <
            .replace(/&gt;/g, '>') // Replace &gt; with >
            .replace(/&quot;/g, '"') // Replace &quot; with "
    }

    const formatText = (text: string) => {
        // Clean HTML first
        const cleanedText = cleanHtml(text)
        // First split by **bold** patterns (handle malformed bold text)
        const boldParts = cleanedText.split(/(\*\*[^*]*\*\*)/g)

        return boldParts.map((part, boldIndex) => {
            if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
                // Remove ** and make bold, but also check for links within bold text
                const boldText = part.slice(2, -2)
                if (boldText.trim()) {
                    return (
                        <strong key={boldIndex} className="font-semibold text-blue-600 dark:text-blue-400">
                            {formatLinks(boldText, boldIndex)}
                        </strong>
                    )
                }
            }

            // Handle orphaned ** by removing them
            if (part === '**' || part === '****') {
                return null
            }

            // Process links in non-bold text
            return formatLinks(part, boldIndex)
        })
    }

    // Function to detect and format links
    const formatLinks = (text: string, baseIndex: number) => {
        // Regex patterns for different types of links
        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
        const urlRegex = /(https?:\/\/[^\s\)\,]+)/g

        // Split by both email and URL patterns - more comprehensive
        const parts = text.split(/(https?:\/\/[^\s\)\,]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)

        return parts.map((part, linkIndex) => {
            const key = `${baseIndex}-${linkIndex}`

            // Check if it's an email
            if (emailRegex.test(part)) {
                return (
                    <a
                        key={key}
                        href={`mailto:${part}`}
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 transition-colors font-medium"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </a>
                )
            }

            // Check if it's a URL
            if (urlRegex.test(part)) {
                // For LinkedIn URLs, show the complete URL, for others truncate if too long
                const isLinkedIn = part.includes('linkedin.com')
                const displayText = isLinkedIn ? part : (part.length > 40 ? part.substring(0, 37) + '...' : part)

                return (
                    <a
                        key={key}
                        href={part}
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 transition-colors font-medium break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={part}
                    >
                        {displayText}
                    </a>
                )
            }

            return part
        })
    }

    // Split content by lines and process each line
    const lines = content.split('\n')

    return (
        <div className={`leading-relaxed ${className}`}>
            {lines.map((line, index) => {
                if (line.trim() === '') {
                    return <div key={index} className="h-2" />
                }

                // Check if line looks like a header (starts with **) - MUST come before bullet check
                if (line.trim().startsWith('**') && (line.includes(':**') || line.includes('**'))) {
                    return (
                        <div key={index} className="mb-1.5 md:mb-2 mt-2 md:mt-3 first:mt-0">
                            <div className="text-xs md:text-sm">{formatText(line)}</div>
                        </div>
                    )
                }

                // Check if line starts with bullet point - AFTER header check
                // Only match single * followed by space, not ** (which is bold formatting)
                if (line.trim().startsWith('• ') || line.trim().startsWith('- ') || (line.trim().startsWith('* ') && !line.trim().startsWith('** '))) {
                    return (
                        <div key={index} className="flex items-start gap-1.5 md:gap-2 mb-1 md:mb-1.5">
                            <span className="text-blue-500 dark:text-blue-400 mt-0.5 md:mt-1 text-xs md:text-sm">•</span>
                            <span className="flex-1 text-xs md:text-sm">{formatText(line.replace(/^[•*-]\s*/, ''))}</span>
                        </div>
                    )
                }

                return (
                    <p key={index} className="mb-1 md:mb-1.5 last:mb-0 text-xs md:text-sm">
                        {formatText(line)}
                    </p>
                )
            })}
        </div>
    )
}