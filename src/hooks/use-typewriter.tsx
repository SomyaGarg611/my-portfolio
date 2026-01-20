"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

export function useTypewriter({ text, delay = 0, speed = 50, onComplete }: UseTypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const hasStarted = useRef(false);
  const isMounted = useRef(true);

  const startTypewriter = useCallback(() => {
    if (hasStarted.current || !isMounted.current) return;
    
    hasStarted.current = true;
    let currentIndex = 0;
    
    const typeChar = () => {
      if (!isMounted.current) return;
      
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeChar, speed + Math.random() * 30);
      } else {
        setIsComplete(true);
        onComplete?.();
        setTimeout(() => {
          if (isMounted.current) setShowCursor(false);
        }, 1500);
      }
    };
    
    setTimeout(typeChar, delay);
  }, [text, delay, speed, onComplete]);

  useEffect(() => {
    isMounted.current = true;
    startTypewriter();
    
    return () => {
      isMounted.current = false;
    };
  }, [startTypewriter]);

  return {
    displayedText,
    isComplete,
    showCursor
  };
}