'use client'

import { AIAssistant } from '@/components/ui/ai-assistant'
import { useCurrentSection } from '@/hooks/use-current-section'

export function AIAssistantProvider() {
  const currentSection = useCurrentSection()
  
  return <AIAssistant currentSection={currentSection} />
}