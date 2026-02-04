"use client";

import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}: GradualSpacingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="flex justify-center space-x-1">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.div key={i} initial="hidden" animate={isInView ? "visible" : "hidden"} exit="hidden" variants={framerProps} transition={{ duration, delay: i * delayMultiple }} className={cn("drop-shadow-sm ", className)}>
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export { GradualSpacing };
