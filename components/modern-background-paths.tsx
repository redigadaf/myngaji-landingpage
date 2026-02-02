"use client";

import { motion } from "framer-motion";
import { ShinyButton } from "@/components/shiny-button";
import { useState, useEffect } from "react";

// Geometric Grid Paths
function GeometricPaths() {
  const [paths, setPaths] = useState<any[]>([]);

  useEffect(() => {
    const newPaths = [];
    const gridSize = 40;

    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 12; y++) {
        if (Math.random() > 0.7) {
          newPaths.push({
            id: `grid-${x}-${y}`,
            d: `M${x * gridSize},${y * gridSize} L${(x + 1) * gridSize},${y * gridSize} L${(x + 1) * gridSize},${(y + 1) * gridSize} L${x * gridSize},${(y + 1) * gridSize} Z`,
            delay: Math.random() * 5,
          });
        }
      }
    }
    setPaths(newPaths);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 480">
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            delay: path.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

// Organic Flow Paths
function FlowPaths() {
  const flowPaths = Array.from({ length: 12 }, (_, i) => {
    const amplitude = 50 + i * 10;
    const frequency = 0.01 + i * 0.002;
    const offset = i * 60;

    return {
      id: `flow-${i}`,
      d: `M-100,${200 + offset} Q200,${200 + offset - amplitude} 500,${200 + offset} T900,${200 + offset}`,
      strokeWidth: 1 + i * 0.3,
      opacity: 0.1 + i * 0.05,
      delay: i * 0.8,
    };
  });

  return (
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 800">
      {flowPaths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={path.strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 0.8, 0],
            opacity: [0, path.opacity, path.opacity * 0.7, 0],
          }}
          transition={{
            duration: 15,
            delay: path.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

// Neural Network Paths
function NeuralPaths() {
  const [nodes, setNodes] = useState<{ x: number; y: number; id: string }[]>([]);
  const [connections, setConnections] = useState<{ id: string; d: string; delay: number }[]>([]);

  useEffect(() => {
    const newNodes = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 800,
      y: Math.random() * 600,
      id: `node-${i}`,
    }));

    const newConnections: { id: string; d: string; delay: number }[] = [];
    newNodes.forEach((node, i) => {
      const nearbyNodes = newNodes.filter((other, j) => {
        if (i === j) return false;
        const distance = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2));
        return distance < 120 && Math.random() > 0.6;
      });

      nearbyNodes.forEach((target) => {
        newConnections.push({
          id: `conn-${i}-${target.id}`,
          d: `M${node.x},${node.y} L${target.x},${target.y}`,
          delay: Math.random() * 10,
        });
      });
    });

    setNodes(newNodes);
    setConnections(newConnections);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 800 600">
      {connections.map((conn) => (
        <motion.path
          key={conn.id}
          d={conn.d}
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 6,
            delay: conn.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r="2"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1.2, 1],
            opacity: [0, 0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

// Spiral Paths
function SpiralPaths() {
  const spirals = Array.from({ length: 8 }, (_, i) => {
    const centerX = 400 + ((i % 4) - 1.5) * 200;
    const centerY = 300 + Math.floor(i / 4 - 0.5) * 200;
    const radius = 80 + i * 15;
    const turns = 3 + i * 0.5;

    let path = `M${centerX + radius},${centerY}`;
    for (let angle = 0; angle <= turns * 360; angle += 5) {
      const radian = (angle * Math.PI) / 180;
      const currentRadius = radius * (1 - angle / (turns * 360));
      const x = centerX + currentRadius * Math.cos(radian);
      const y = centerY + currentRadius * Math.sin(radian);
      path += ` L${x},${y}`;
    }

    return {
      id: `spiral-${i}`,
      d: path,
      delay: i * 1.2,
    };
  });

  return (
    <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 800 600">
      {spirals.map((spiral) => (
        <motion.path
          key={spiral.id}
          d={spiral.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            pathLength: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            delay: spiral.delay,
          }}
        />
      ))}
    </svg>
  );
}

export default function EnhancedBackgroundPaths() {
  const [currentPattern, setCurrentPattern] = useState(0);
  const patterns = ["neural", "flow", "geometric", "spiral"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const renderPattern = () => {
    switch (currentPattern) {
      case 0:
        return <NeuralPaths />;
      case 1:
        return <FlowPaths />;
      case 2:
        return <GeometricPaths />;
      case 3:
        return <SpiralPaths />;
      default:
        return <NeuralPaths />;
    }
  };

  return (
    <div className="relative min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-teal-50 dark:bg-slate-900/50">
      {/* Dynamic Background Patterns */}
      <div className="absolute inset-0 text-primary/20 dark:text-primary/10">
        <motion.div key={currentPattern} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
          {renderPattern()}
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/80 dark:from-slate-900/80 dark:via-transparent dark:to-slate-900/80" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Main Title Group */}
          <div className="mb-8 flex flex-col items-center justify-center">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#17838F] dark:text-[#17838F] mb-2 uppercase">
              Harga Bermula
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-extrabold tracking-[0.2em] text-[#136a73]/70 dark:text-[#136a73]/70 mb-4 uppercase"
            >
              Serendah
            </motion.p>

            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{
                delay: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="relative"
            >
              <span className="text-7xl md:text-9xl font-black text-[#F5BB2C] drop-shadow-2xl filter" style={{ textShadow: "4px 4px 0px rgba(23, 131, 143, 0.2)" }}>
                RM 80
              </span>
              {/* Decorative elements around price */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-8 -right-8 w-16 h-16 border-4 border-[#F5BB2C]/30 border-dashed rounded-full" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -bottom-4 -left-8 w-12 h-12 border-4 border-[#17838F]/20 border-dotted rounded-full" />
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, type: "spring", stiffness: 100 }} className="mt-8">
            <ShinyButton className="!px-12 !py-4 !text-lg !rounded-full shadow-xl hover:shadow-2xl transition-all font-bold">Daftar Sekarang</ShinyButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements (kept from original but adjusted colors) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#17838F]/20 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-3/4 right-1/3 w-6 h-6 bg-[#F5BB2C]/20 rounded-full blur-sm"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
