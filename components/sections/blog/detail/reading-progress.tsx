"use client";

import { useEffect } from "react";

export function ReadingProgress() {
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const progressBar = document.getElementById("reading-progress-bar");
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
      <div className="h-full bg-emerald-600 transition-all duration-100 ease-out w-[0%]" id="reading-progress-bar"></div>
    </div>
  );
}
