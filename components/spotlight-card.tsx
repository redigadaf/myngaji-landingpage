import React, { useEffect, useRef, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange" | "myngaji";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
  myngaji: { base: 195, spread: -110 }, // Teal (195) to Gold (85)
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const GlowCard: React.FC<GlowCardProps> = ({ children, className = "", glowColor = "blue", size = "md", width, height, customSize = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ""; // Let className or inline styles handle sizing
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const isMyNgaji = glowColor === "myngaji";

    const baseStyles: React.CSSProperties & Record<string, string | number> = {
      "--base": base,
      "--spread": spread,
      "--radius": "14",
      "--border": "3",
      "--backdrop": "transparent",
      "--backup-border": isMyNgaji ? "rgba(23, 131, 143, 0.1)" : "rgba(0,0,0,0.05)", // Tint border for MyNgaji
      "--size": isMyNgaji ? "400" : "200", // Larger spotlight for better visibility
      "--outer": "1",
      "--bg-spot-opacity": isMyNgaji ? "0.2" : "0.1", // Stronger background glow
      "--border-spot-opacity": isMyNgaji ? "1" : "1",
      "--border-size": "calc(var(--border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative",
    };

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = `
    @media (min-width: 768px) {
      [data-glow] {
        background-image: radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, -9999) * 1px)
          calc(var(--y, -9999) * 1px),
          hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
        );
        background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
        background-position: 50% 50%;
        background-attachment: fixed;
      }

      [data-glow]::before,
      [data-glow]::after {
        pointer-events: none;
        content: "";
        position: absolute;
        inset: calc(var(--border-size) * -1);
        border: var(--border-size) solid transparent;
        border-radius: calc(var(--radius) * 1px);
        background-attachment: fixed;
        background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
        background-repeat: no-repeat;
        background-position: 50% 50%;
        mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
        mask-clip: padding-box, border-box;
        mask-composite: intersect;
      }
      
      [data-glow]::before {
        background-image: radial-gradient(
          calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
          calc(var(--x, -9999) * 1px)
          calc(var(--y, -9999) * 1px),
          hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
        );
        filter: brightness(2);
      }
      
      [data-glow]::after {
        background-image: radial-gradient(
          calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
          calc(var(--x, -9999) * 1px)
          calc(var(--y, -9999) * 1px),
          hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
        );
      }
      
      [data-glow] [data-glow] {
        position: absolute;
        inset: 0;
        will-change: filter;
        opacity: var(--outer, 1);
        border-radius: calc(var(--radius) * 1px);
        border-width: calc(var(--border-size) * 20);
        filter: blur(calc(var(--border-size) * 10));
        background: none;
        pointer-events: none;
        border: none;
      }
      
      [data-glow] > [data-glow]::before {
        inset: -10px;
        border-width: 10px;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles() as React.CSSProperties}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4]" : ""}
          rounded-2xl 
          relative 
          grid 
          grid-rows-[1fr_auto] 
          shadow-sm
          hover:shadow-xl
          transition-all
          duration-300
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};

export { GlowCard };
