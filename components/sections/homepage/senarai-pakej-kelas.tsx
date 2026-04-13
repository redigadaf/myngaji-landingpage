import React, { useEffect, useState, useRef } from "react";
import ScrollFloat from "@/components/scroll-float";
import { classesData, type PakejKelas } from "@/components/sections/data/data-pakej-kelas";
import PackageCard from "./pakej-card";
import PakejModal from "./pakej-modal";

export const SenaraiPakejKelas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedPakej, setSelectedPakej] = useState<PakejKelas | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section id="senarai-pakej" className="py-20 px-4 md:px-8 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 mb-16 text-center">
          <ScrollFloat containerClassName="!my-0" textClassName="text-3xl md:text-5xl font-black tracking-tight">
            <span className="text-primary">SENARAI </span>
            <span className="text-secondary">PAKEJ KELAS.</span>
          </ScrollFloat>
        </div>

        <div className="flex flex-wrap justify-center gap-y-12 lg:gap-y-24 -mx-6 items-start">
          {classesData.map((item, i) => {
            const isDark = i === 0 || i === 2 || i === 4 || i === 6; // Matching alternating pattern for the new order
            const isActive = isMobile && activeIndex === i;

            return (
              <div 
                key={item.slug} 
                className={`w-full md:w-1/2 lg:w-1/4 px-6 flex flex-col ${i % 2 === 1 ? "lg:mt-16" : ""}`}
              >
                <PackageCard 
                  item={item}
                  originalIndex={i}
                  isDark={isDark}
                  isActive={isActive}
                  onOpenModal={(pakej) => setSelectedPakej(pakej)}
                  cardRef={(el) => {
                    cardRefs.current[i] = el;
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <PakejModal 
        pakej={selectedPakej}
        isOpen={!!selectedPakej}
        onClose={() => setSelectedPakej(null)}
      />
    </section>
  );
};
