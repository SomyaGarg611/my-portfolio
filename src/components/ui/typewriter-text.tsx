"use client";

import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/use-typewriter';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  cursorClassName?: string;
  onComplete?: () => void;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className = "",
  showCursor: showCursorProp = true,
  cursorClassName = "",
  onComplete
}: TypewriterTextProps) {
  const { displayedText, showCursor } = useTypewriter({
    text,
    delay,
    speed,
    onComplete
  });

  return (
    <span className={className}>
      {displayedText}
      {showCursorProp && showCursor && (
        <motion.span
          className={`inline-block w-0.5 h-[1em] ml-1 ${cursorClassName || 'bg-gradient-to-b from-pink-400 to-purple-400'}`}
          animate={{
            opacity: [1, 1, 0, 0],
            scaleY: [1, 1.1, 1, 0.9]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </span>
  );
}