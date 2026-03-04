"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { animate } from "framer-motion";
import { TeacherModal } from "./teacher-modal";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import ScrollFloat from "@/components/scroll-float";
import teachersData from "@/app/(pages)/tenaga-pengajar/data/data-guru.json";

/* ─── single card ────────────────────────────────────────── */
function TeacherCard({
    teacher,
    index,
    onClick,
}: {
    teacher: (typeof teachersData)[0];
    index: number;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="group/card relative flex-shrink-0 cursor-pointer rounded-[2rem] overflow-hidden select-none border border-slate-100 shadow-sm hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 bg-slate-50"
            style={{ width: 220, height: 320 }}
        >
            <Image
                src={teacher.image}
                alt={teacher.name}
                fill
                className="object-cover object-center scale-100 group-hover/card:scale-105 transition-transform duration-700 ease-out"
                draggable={false}
            />

            {/* Experience Badge - Fades in at the top right */}
            {teacher.experience && (
                <div className="absolute top-4 right-4 z-20 translate-x-4 opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all duration-500 delay-100">
                    <div className="rounded-full bg-amber-400 text-amber-950 px-2.5 py-1 text-[10px] font-bold shadow-sm">
                        {teacher.experience}
                    </div>
                </div>
            )}

            {/* gradient overlays */}
            <div
                className="absolute inset-0 opacity-50 group-hover/card:opacity-80 transition-opacity duration-500"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(23,131,143,0.05) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 100%)",
                }}
            />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-5">
                {/* Text Wrapper - slides up on hover */}
                <div className="translate-y-6 group-hover/card:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">

                    <p className="text-[12px] md:text-xs font-black uppercase tracking-wider leading-tight text-white group-hover/card:text-amber-400 transition-colors duration-300 drop-shadow-md">
                        {teacher.name}
                    </p>

                    {/* decorative underline that stretches */}
                    <div className="h-[2px] w-4 group-hover/card:w-12 bg-primary group-hover/card:bg-amber-400 rounded-full transition-all duration-500 ease-out mt-1.5 mb-2 opacity-80" />

                    {/* Role - Hidden by default, reveals on hover */}
                    <div className="overflow-hidden">
                        <p className="text-[10px] sm:text-[11px] font-medium leading-snug text-slate-200 translate-y-full opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 delay-75">
                            {teacher.role}
                        </p>
                    </div>

                </div>
            </div>

            {/* Subtle light reflection sweep effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>
    );
}

/* ─── constants ─────────────────────────────────────────── */
const CARD_WIDTH = 220; // Changed to match new card width (was 200)
const CARD_GAP = 16; /* gap-4 = 1rem = 16px */
const SET_SIZE = teachersData.length;
const SET_WIDTH = SET_SIZE * (CARD_WIDTH + CARD_GAP);

/* ─── main section ───────────────────────────────────────── */
export function PengajarSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<(typeof teachersData)[0] | null>(null);

    // Gandakan data supaya array jadi panjang (5 set)
    const duplicatedTeachers = [
        ...teachersData,
        ...teachersData,
        ...teachersData,
        ...teachersData,
        ...teachersData,
    ];

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // Mula di set tengah (Set ke-3 out of 5)
        // Pengiraan untuk posisikan kad pertama tepat di tengah (mengambil kira px-12 = 48px)
        const centerOffset = (el.clientWidth / 2) - (CARD_WIDTH / 2) - 48;
        el.scrollLeft = (SET_WIDTH * 2) - centerOffset;

        const handleScroll = () => {
            // Jika user scroll melepasi set ke kiri (masuk ke Set 1)
            // Lompat ke depan 2 set
            if (el.scrollLeft <= SET_WIDTH) {
                el.scrollLeft += SET_WIDTH * 2;
            }
            // Jika user scroll melepasi set ke kanan (masuk ke Set 5)
            // Lompat ke belakang 2 set
            else if (el.scrollLeft >= SET_WIDTH * 4) {
                el.scrollLeft -= SET_WIDTH * 2;
            }
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollByAmount = (dir: 1 | -1) => {
        if (!scrollRef.current) return;
        // Scroll sebanyak 2 kad pada satu masa
        const amount = 2 * (CARD_WIDTH + CARD_GAP);
        const target = scrollRef.current.scrollLeft + (dir * amount);

        // Menggunakan Framer Motion untuk kelicinan 60fps berbanding "behavior: smooth" yang berat
        animate(scrollRef.current.scrollLeft, target, {
            type: "spring",
            bounce: 0,
            duration: 0.8, // durasi yang lebih panjang sikit dan sangat smooth
            onUpdate: (latest) => {
                if (scrollRef.current) {
                    scrollRef.current.scrollLeft = latest;
                }
            }
        });
    };

    return (
        <div className="w-full bg-white py-24 md:py-32">
            <div className="container mx-auto px-6 xl:px-12">

                {/* ── header ─────────────────────────────────────────── */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 px-4">
                    {/* premium icon chip */}
                    <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-teal-100 bg-teal-50/50 px-5 py-2 shadow-sm backdrop-blur-sm">
                        <span className="text-sm font-extrabold tracking-widest text-primary uppercase">
                            Pakar Al-Quran
                        </span>
                    </div>

                    {/* Animated Heading */}
                    <div className="flex flex-wrap justify-center gap-x-3 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-7 leading-tight">
                        <ScrollFloat
                            animationDuration={1}
                            ease="back.inOut(2)"
                            scrollStart="center bottom+=50%"
                            scrollEnd="bottom bottom-=40%"
                            stagger={0.03}
                            containerClassName="text-primary !my-0"
                        >
                            Belajar Bersama
                        </ScrollFloat>
                        <ScrollFloat
                            animationDuration={1}
                            ease="back.inOut(2)"
                            scrollStart="center bottom+=50%"
                            scrollEnd="bottom bottom-=40%"
                            stagger={0.03}
                            containerClassName="text-secondary !my-0"
                        >
                            Guru Terbaik
                        </ScrollFloat>
                    </div>

                    {/* Subtitle */}
                    <p className="max-w-2xl text-lg text-slate-500 leading-relaxed mx-auto font-medium">
                        Semua barisan pengajar kami dibarisi oleh graduan bertauliah yang sangat berpengalaman
                        dalam membantu anda menguasai Al-Quran dan asas fardu ain melalui pendekatan
                        yang moden, mudah, dan berkesan.
                    </p>
                </div>

                {/* ── scroll track ─────────────────────────────────────── */}
                <div className="relative group">

                    {/* Left Button */}
                    <button
                        onClick={() => scrollByAmount(-1)}
                        aria-label="Scroll Kiri"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md border border-slate-100 text-slate-500 hover:text-primary hover:shadow-lg transition-all backdrop-blur-sm -ml-4 lg:-ml-6"
                    >
                        <ChevronLeft className="w-5 h-5 ml-[-2px]" />
                    </button>

                    {/* Right Button */}
                    <button
                        onClick={() => scrollByAmount(1)}
                        aria-label="Scroll Kanan"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md border border-slate-100 text-slate-500 hover:text-primary hover:shadow-lg transition-all backdrop-blur-sm -mr-4 lg:-mr-6"
                    >
                        <ChevronRight className="w-5 h-5 mr-[-2px]" />
                    </button>

                    {/* scrollable container – native scroll, hidden scrollbar, vertical locked */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto overflow-y-hidden px-12 py-8 -my-8 touch-pan-x [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {duplicatedTeachers.map((teacher, i) => (
                            <TeacherCard
                                key={`${teacher.id}-${i}`}
                                teacher={teacher}
                                index={i}
                                onClick={() => setSelectedTeacher(teacher)}
                            />
                        ))}
                    </div>
                </div>

            </div>

            {/* ── popup modal ────────────────────────────────────────── */}
            <TeacherModal
                teacher={selectedTeacher}
                onClose={() => setSelectedTeacher(null)}
            />

        </div>
    );
}
