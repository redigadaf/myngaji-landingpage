"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const paragraphs = text.split("\n\n").filter((p) => p.trim() !== "");

  // Count total words across all paragraphs for global progress calculation
  const totalWords = paragraphs.reduce((acc, p) => acc + p.split(" ").length, 0);

  let globalWordIndex = 0;

  return (
    <div ref={targetRef} className={cn("relative z-0 min-h-[150vh]", className)}>
      <div className={"sticky top-0 mx-auto flex h-screen max-w-4xl items-center bg-transparent px-4 py-12 md:py-20"}>
        <div className="space-y-6 md:space-y-8">
          {paragraphs.map((paragraph, pIndex) => {
            const words = paragraph.split(" ");
            return (
              <p key={pIndex} className={"flex flex-wrap text-base md:text-xl leading-relaxed text-muted-foreground/20 font-medium text-left md:text-justify"}>
                {words.map((word, i) => {
                  const start = globalWordIndex / totalWords;
                  const end = start + 1 / totalWords;
                  globalWordIndex++;

                  return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                      {word}
                    </Word>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1">
      <span className={"absolute opacity-30 text-muted-foreground"}>{children}</span>
      <motion.span style={{ opacity: opacity }} className={"text-primary dark:text-primary"}>
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
