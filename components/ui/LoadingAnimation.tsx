"use client";

import Lottie from "lottie-react";
import animationData from "@/public/lottie/book.json";

interface LoadingAnimationProps {
  text?: string;
  className?: string;
}

export function LoadingAnimation({ text, className = "" }: LoadingAnimationProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="w-64 h-64">
        <Lottie 
          animationData={animationData} 
          loop={true} 
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {text && (
        <p className="font-black text-sm uppercase tracking-widest opacity-50 -mt-8 text-gray-900 dark:text-white">
          {text}
        </p>
      )}
    </div>
  );
}
