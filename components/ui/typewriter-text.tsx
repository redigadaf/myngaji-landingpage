"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TypewriterSegment = {
  text: string;
  className?: string;
};

export interface TypewriterProps {
  text: string | string[] | TypewriterSegment[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

// Helper to flatten rich text segments into individual characters with their styling
const flattenSegments = (segments: TypewriterSegment[]) => {
  return segments.flatMap((segment) =>
    segment.text.split("").map((char) => ({
      char,
      className: segment.className,
    })),
  );
};

export function Typewriter({ text, speed = 100, cursor = "|", loop = false, deleteSpeed = 50, delay = 1500, className }: TypewriterProps) {
  const [displayedChars, setDisplayedChars] = useState<{ char: string; className?: string }[]>([]);
  const [displayText, setDisplayText] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  // Check if we are in Rich Text mode (array of objects)
  const isRichText = Array.isArray(text) && typeof text[0] === "object";

  // Flatten Text for Rich Mode
  const richChars = React.useMemo(() => {
    if (isRichText) {
      return flattenSegments(text as TypewriterSegment[]);
    }
    return [];
  }, [text, isRichText]);

  // Standard Text Array for Simple Mode
  const textArray = React.useMemo(() => {
    if (isRichText) return [];
    return Array.isArray(text) ? (text as string[]) : [text as string];
  }, [text, isRichText]);

  useEffect(() => {
    // Rich Text Logic (One-pass typing, usually no loop unless implemented complexly)
    if (isRichText) {
      if (currentIndex < richChars.length) {
        const timeout = setTimeout(() => {
          setDisplayedChars((prev) => [...prev, richChars[currentIndex]]);
          setCurrentIndex((prev) => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
      return;
    }

    // Standard Logic (Looping strings)
    const currentText = textArray[textArrayIndex] || "";
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, textArray, richChars, isRichText, loop, speed, deleteSpeed, delay, displayText, textArrayIndex]);

  if (isRichText) {
    return (
      <span className={className}>
        {displayedChars.map((item, i) => (
          <span key={i} className={item.className}>
            {item.char}
          </span>
        ))}
        <span className="animate-pulse">{cursor}</span>
      </span>
    );
  }

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}
