"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface GenericFAQProps {
  data: FAQItem[];
  categoryName: string;
}

export function FAQ({ data, categoryName }: GenericFAQProps) {
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");

  const cfg = {
    points: 700,
    dotRadius: 1.8,
    duration: 3.0,
    color: "#17838F",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.9,
    sizeMin: 0.5,
    sizeMax: 1.4,
    background: "#fafaf9",
  };

  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 560;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    for (let i = 0; i < N; i++) {
        const idx = i + 0.5;
        const frac = idx / N;
        const r = Math.sqrt(frac) * MAX_R;
        const theta = idx * GOLDEN_ANGLE;
        const x = CENTER + r * Math.cos(theta);
        const y = CENTER + r * Math.sin(theta);

        const c = document.createElementNS(svgNS, "circle");
        c.setAttribute("cx", x.toFixed(3));
        c.setAttribute("cy", y.toFixed(3));
        c.setAttribute("r", String(DOT));
        c.setAttribute("fill", cfg.color);
        c.setAttribute("opacity", "0.6");

        if (cfg.pulseEffect) {
            const animR = document.createElementNS(svgNS, "animate");
            animR.setAttribute("attributeName", "r");
            animR.setAttribute("values", `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`);
            animR.setAttribute("dur", `${cfg.duration}s`);
            animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
            animR.setAttribute("repeatCount", "indefinite");
            animR.setAttribute("calcMode", "spline");
            animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
            c.appendChild(animR);

            const animO = document.createElementNS(svgNS, "animate");
            animO.setAttribute("attributeName", "opacity");
            animO.setAttribute("values", `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`);
            animO.setAttribute("dur", `${cfg.duration}s`);
            animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
            animO.setAttribute("repeatCount", "indefinite");
            animO.setAttribute("calcMode", "spline");
            animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
            c.appendChild(animO);
        }

        svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg.points, cfg.dotRadius, cfg.duration, cfg.color, cfg.pulseEffect, cfg.sizeMin, cfg.sizeMax, cfg.opacityMin, cfg.opacityMax]);

  const filtered = query ? data.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase())) : data;

  return (
    <div className="relative w-full overflow-hidden text-stone-900 bg-stone-50 border-t border-stone-100">
      {/* Background Spiral */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <div ref={spiralRef} />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row items-center md:items-end justify-between border-b border-stone-200 pb-8 gap-6"
        >
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-primary">FAQ</h2>
            <p className="mt-3 text-sm md:text-base text-stone-500 font-medium italic">Soalan Lazim berkaitan Kelas {categoryName}.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari jawapan anda di sini..."
                className="h-12 w-full rounded-2xl border border-stone-200 bg-white px-4 pl-11 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            </div>
          </div>
        </motion.header>

        <section className="relative">
          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filtered.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.2, 0.8, 0.2, 1],
                    },
                  },
                }}
              >
                <FAQItem q={item.q} a={item.a} index={i + 1} />
              </motion.div>
            ))}
          </motion.div>
          {filtered.length === 0 && <p className="text-center text-stone-400 py-10 font-medium">Tiada soalan ditemui berkaitan carian anda.</p>}
        </section>
      </div>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between text-left focus:outline-none" aria-expanded={open}>
        <div className="flex items-baseline gap-4 pr-4">
          <span className="text-xs text-primary font-black opacity-40">{String(index).padStart(2, "0")}</span>
          <h3 className={`text-base md:text-lg font-bold leading-tight transition-colors ${open ? "text-primary" : "text-stone-800"}`}>{q}</h3>
        </div>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center transition-all duration-300 ${open ? "rotate-45 bg-primary text-white" : "group-hover:bg-primary/10 group-hover:text-primary text-stone-400"}`}>
          <span className="text-xl font-light">+</span>
        </div>
      </button>
      <div className={`grid transition-[grid-template-rows,margin] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${open ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr] mt-0"}`}>
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm md:text-base text-stone-600 leading-relaxed font-medium">{a}</p>
        </div>
      </div>
    </div>
  );
}
