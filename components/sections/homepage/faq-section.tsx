import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import faqData from "@/components/sections/data/data-faq.json";

export function FAQSection() {
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Spiral configuration - Adapted for Myngaji Theme (Light/Teal)
  const [cfg, setCfg] = useState({
    points: 700,
    dotRadius: 1.8,
    duration: 3.0,
    color: "#17838F", // Primary Color
    gradient: "none" as "none" | "rainbow" | "sunset" | "ocean" | "fire" | "neon" | "pastel" | "grayscale",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.9,
    sizeMin: 0.5,
    sizeMax: 1.4,
    background: "#fafaf9", // Stone-50 Background
  });

  // Gradient presets
  const gradients: Record<string, string[]> = useMemo(
    () => ({
      none: [],
      rainbow: ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#0099ff", "#6633ff"],
      sunset: ["#ff0000", "#ff9900", "#ffcc00"],
      ocean: ["#0066ff", "#00ccff", "#00ffcc"],
      fire: ["#ff0000", "#ff6600", "#ffcc00"],
      neon: ["#ff00ff", "#00ffff", "#ffff00"],
      pastel: ["#ffcccc", "#ccffcc", "#ccccff"],
      grayscale: ["#ffffff", "#999999", "#333333"],
    }),
    [],
  );

  // --- Dev "tests" (runtime assertions) ------------------------------------
  useEffect(() => {
    try {
      console.assert(Array.isArray(gradients.none) && gradients.none.length === 0, "Gradient 'none' must be an empty array");
      console.assert(cfg.sizeMin <= cfg.sizeMax, "sizeMin should be <= sizeMax");
      console.assert(cfg.opacityMin <= cfg.opacityMax, "opacityMin should be <= opacityMax");
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "h") setPanelOpen((v) => !v);
      if (k === "r") randomize();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Generate spiral SVG and mount
  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 560; // larger presence
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

    // Gradient
    if (cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");
      gradients[cfg.gradient].forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });
      defs.appendChild(g);
      svg.appendChild(defs);
    }

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
      c.setAttribute("fill", cfg.gradient === "none" ? cfg.color : "url(#spiralGradient)");
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
  }, [cfg, gradients]);

  // Randomizer with contrast awareness
  const randomize = () => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const lightColors = ["#ffffff", "#e2e8f0"];
    const darkColors = ["#17838F", "#1c1917", "#44403c"]; // Myngaji Primary & Stone
    const useLightBg = Math.random() > 0.5;

    setCfg((c) => ({
      ...c,
      points: Math.floor(rand(300, 1600)),
      dotRadius: rand(0.8, 3.2),
      duration: rand(1.2, 7.5),
      pulseEffect: Math.random() > 0.35,
      opacityMin: rand(0.1, 0.4),
      opacityMax: rand(0.6, 1.0),
      sizeMin: rand(0.4, 0.9),
      sizeMax: rand(1.2, 2.2),
      background: useLightBg ? "#fafaf9" : "#ffffff", // Keep background light/stone mostly
      color: darkColors[Math.floor(Math.random() * darkColors.length)], // Use dark/primary colors for dots
      gradient: Math.random() > 0.8 ? (["ocean", "grayscale", "pastel"] as const)[Math.floor(Math.random() * 3)] : "none",
    }));
  };

  // FAQ content updated for Myngaji
  const faqs = faqData;
  const filtered = query ? faqs.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase())) : faqs;

  return (
    <div className="relative w-full overflow-hidden text-stone-900" style={{ backgroundColor: cfg.background }}>
      {/* Background Spiral */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <div ref={spiralRef} />
      </div>

      {/* Layout */}
      <div className="relative mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col md:flex-row items-center md:items-end justify-between border-b border-stone-200 pb-6 gap-4"
        >
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-primary">FAQ</h1>
            <p className="mt-2 text-sm md:text-base text-stone-500">Soalan Lazim berkaitan Myngaji.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari soalan..."
                className="h-10 w-full md:w-56 rounded-xl border border-stone-200 bg-white px-3 pl-9 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <section className="relative">
          <motion.div
            className="grid grid-cols-1 gap-3 md:grid-cols-2"
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
          {filtered.length === 0 && <p className="text-center text-stone-400 py-10">Tiada soalan ditemui.</p>}
        </section>
      </div>

      {/* Control Panel (Hidden by default, open with 'h') */}
      {panelOpen && (
        <aside className="fixed right-4 top-4 z-50 w-[320px] rounded-2xl border border-stone-200 bg-white/90 p-4 backdrop-blur shadow-2xl animate-in slide-in-from-right">
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-stone-900">Spiral Controls</h3>
          <div className="space-y-3 text-xs">
            <Slider label="Points" min={100} max={2000} step={50} value={cfg.points} onChange={(v) => setCfg({ ...cfg, points: v })} />
            <Slider label="Dot radius" min={0.5} max={5} step={0.1} value={cfg.dotRadius} onChange={(v) => setCfg({ ...cfg, dotRadius: v })} />
            <Slider label="Duration" min={1} max={10} step={0.1} value={cfg.duration} onChange={(v) => setCfg({ ...cfg, duration: v })} />

            <Toggle label="Pulse" value={cfg.pulseEffect} onChange={(v) => setCfg({ ...cfg, pulseEffect: v })} />
            <Slider label="Opacity min" min={0} max={1} step={0.05} value={cfg.opacityMin} onChange={(v) => setCfg({ ...cfg, opacityMin: v })} />
            <Slider label="Opacity max" min={0} max={1} step={0.05} value={cfg.opacityMax} onChange={(v) => setCfg({ ...cfg, opacityMax: v })} />
            <Slider label="Size min" min={0.1} max={2} step={0.1} value={cfg.sizeMin} onChange={(v) => setCfg({ ...cfg, sizeMin: v })} />
            <Slider label="Size max" min={0.1} max={3} step={0.1} value={cfg.sizeMax} onChange={(v) => setCfg({ ...cfg, sizeMax: v })} />

            <Select
              label="Gradient"
              value={cfg.gradient}
              options={[
                { label: "None", value: "none" },
                { label: "Rainbow", value: "rainbow" },
                { label: "Sunset", value: "sunset" },
                { label: "Ocean", value: "ocean" },
                { label: "Fire", value: "fire" },
                { label: "Neon", value: "neon" },
                { label: "Pastel", value: "pastel" },
                { label: "Grayscale", value: "grayscale" },
              ]}
              onChange={(v) => setCfg({ ...cfg, gradient: v as any })}
            />

            <div className="flex gap-2">
              <button onClick={randomize} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs hover:border-stone-400 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors">
                Randomize (R)
              </button>
              <button onClick={() => setPanelOpen(false)} className="rounded-xl border border-stone-200 px-3 py-2 text-xs hover:border-stone-400 bg-white text-stone-700 hover:bg-stone-50 transition-colors">
                Close (H)
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between text-left focus:outline-none" aria-expanded={open}>
        <div className="flex items-baseline gap-3 pr-4">
          <span className="text-xs text-primary font-bold opacity-60">{String(index).padStart(2, "0")}</span>
          <h3 className={`text-base md:text-lg font-semibold leading-tight transition-colors ${open ? "text-primary" : "text-stone-800"}`}>{q}</h3>
        </div>
        <span className={`ml-4 flex-shrink-0 text-stone-400 transition-transform duration-300 ${open ? "rotate-45 text-primary" : "group-hover:text-primary"}`}>+</span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
        </div>
      </div>
      {/* Hover halo */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-1 rounded-2xl border border-primary/10" style={{ maskImage: "radial-gradient(180px_180px_at_var(--x,50%)_var(--y,50%),white,transparent)" }} />
      </div>
    </div>
  );
}

function Slider({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-stone-600">
        <span>{label}</span>
        <span className="tabular-nums text-stone-400">{value.toFixed(2)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full accent-primary h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer" />
    </label>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between text-stone-600">
      <span>{label}</span>
      <button onClick={() => onChange(!value)} className={`relative h-6 w-10 rounded-full border border-stone-200 transition-colors ${value ? "bg-primary border-primary" : "bg-stone-100"}`} aria-pressed={value}>
        <span className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-[1.1rem]" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: { label: string; value: string }[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <div className="mb-1 text-stone-600">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">▾</span>
      </div>
    </label>
  );
}
