"use client";
import React, { useEffect, useMemo, useRef, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const nodes: ReactNode[] = [];
    const process = (child: ReactNode, className: string = "") => {
      if (typeof child === "string") {
        const words = child.split(/(\s+)/);
        words.forEach((word, wordIndex) => {
          if (word.trim() === "") {
            // It's a space
            nodes.push(<span key={`space-${nodes.length}-${wordIndex}`}>{word}</span>);
          } else {
            // It's a word, wrap it to prevent breaking
            nodes.push(
              <span className="inline-block whitespace-nowrap" key={`word-${nodes.length}-${wordIndex}`}>
                {[...word].map((char, charIndex) => (
                  <span 
                    className={`inline-block char ${className}`} 
                    key={`char-${charIndex}`}
                  >
                    {char}
                  </span>
                ))}
              </span>
            );
          }
        });
      } else if (React.isValidElement(child)) {
        const props = child.props as { children?: ReactNode; className?: string };
        React.Children.forEach(props.children, (nestedChild) => {
          process(nestedChild, props.className || "");
        });
      }
    };

    React.Children.forEach(children, (child) => process(child));
    return nodes;
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll(".char");

    gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%",
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      },
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`my-5 overflow-hidden ${containerClassName}`}>
      <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
