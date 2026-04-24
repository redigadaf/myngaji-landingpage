"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animate } from "framer-motion";
import { TeacherModal } from "./teacher-modal";
import ScrollFloat from "@/components/scroll-float";
import { useTeachers, TeacherFromAPI } from "@/hooks/useTeachers";

/* ─── single card ────────────────────────────────────────── */
function TeacherCard({
    teacher,
    onClick,
}: {
    teacher: TeacherFromAPI;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="group/card relative flex-shrink-0 cursor-pointer rounded-[2rem] overflow-hidden select-none border border-primary/20 shadow-sm hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 transition-all duration-500 bg-primary"
            style={{ width: 220, height: 320 }}
        >
            {/* Hexagon Pattern Background */}
            <div
                className="absolute inset-0 z-0 opacity-[0.3]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='a' width='58' height='100.23' patternTransform='scale(2)' patternUnits='userSpaceOnUse'%3E%3Crect width='100%25' height='100%25' fill='none'/%3E%3Cpath fill='none' stroke='%23F5BB2C' stroke-linecap='round' stroke-linejoin='round' stroke-opacity='.5' stroke-width='1.5' d='m.111-33.307-28.997 16.744zm.012.006 28.993 16.738-.004 33.485L.115 33.492l-28.997-16.57.004-33.485m40.992 43.198v-5.672l4.937 2.85M29.113 9.995 12.117.18l17-9.815M6.114 30.062V10.57l16.967 9.798m-51.963-3.446 57.998-33.485m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485m57.992 19.63-5-2.887 5.002-2.887m28.872-30.805L28.99-16.768zm.012.006 28.993 16.738-.004 33.485-28.997 16.57-28.997-16.57.004-33.485m-.004 33.485 57.998-33.485M57.992 33.287l-.004-66.799m29 50.229Q57.928-.065 28.999-16.768M28.998 2.86l4.998-2.886-4.998-2.886m6.029 23.076 16.964-9.794.002 19.49m-6-3.43v-5.67l-4.936 2.85M28.995 9.789 45.994-.026 28.998-9.84M-.003 66.943-29 83.687zm.012.006 28.993 16.738-.004 33.485m0 0L.001 133.742m0 0-28.997-16.57m0 0 .004-33.485m57.991 26.557-16.996-9.814 17-9.815m-58 26.557 57.999-33.485M.001 133.742l-.004-66.8m29.001 50.23-57.99-33.485m45.994-6.928-5.005 2.89V73.87m11.005 6.353L5.999 90.04l-.002-19.633M29 103.317l-5-2.887 5.002-2.887m28.99-30.6L28.993 83.687zm.011.006 28.993 16.738-.004 33.485m0 0-28.997 16.57m0 0-28.997-16.57m0 0 .004-33.485m22.99-13.28v19.627l-16.995-9.813m-5.999 36.95 57.998-33.484m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485M29 103.314l5-2.886-5-2.886m11.996-20.786 4.996 2.885v-5.77m-16.994 36.373 17-9.815L29 90.615M57.998 66.94l-.003-33.484zm-.012.008-28.992 16.74L-.002 66.94l.148-33.397 28.849-16.827L57.99 33.463M.084 47.363 4.997 50.2.06 53.05m5.936 17.356 16.998-9.812v19.63m35.003-20.212L41 50.2l16.996-9.812m-57.878.067 16.88 9.745L.03 59.996m28.966-43.28v66.971M.144 33.544 57.999 66.94m-58 .001L57.99 33.463M40.994 76.759v-5.78l5.004 2.89m-5.004-50.221v5.772l5-2.886m-11 53.689V60.589l17.004 9.815m-40.003 3.467 5-2.887v5.775m41.002-29.444L53 50.2l4.998 2.885M22.995 20.217v19.589l-16.88-9.744m5.97-3.481 4.91 2.835v-5.7m18-3.535v19.63l16.997-9.813'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800%25' height='800%25' fill='url(%23a)' transform='translate(0 -.92)'/%3E%3C/svg%3E")`,
                    maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                }}
            />
            <Image
                src={teacher.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.full_name)}&background=17838F&color=fff`}
                alt={teacher.full_name}
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
                        {teacher.full_name}
                    </p>

                    {/* decorative underline that stretches */}
                    <div className="h-[2px] w-4 group-hover/card:w-12 bg-white/30 group-hover/card:bg-amber-400 rounded-full transition-all duration-500 ease-out mt-1.5 mb-2 opacity-80" />

                    {/* Role - Hidden by default, reveals on hover */}
                    <div className="overflow-hidden">
                        <p className="text-[10px] sm:text-[11px] font-medium leading-snug text-slate-200 translate-y-full opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 delay-75">
                            {teacher.display_role}
                        </p>
                    </div>

                </div>
            </div>

            {/* Subtle light reflection sweep effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>
    );
}

/* ─── main section ───────────────────────────────────────── */
export function PengajarSection() {
    const { teachers, loading, error } = useTeachers();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<TeacherFromAPI | null>(null);

    const CARD_WIDTH = 220;
    const CARD_GAP = 16;
    const SET_SIZE = teachers.length;
    const SET_WIDTH = SET_SIZE * (CARD_WIDTH + CARD_GAP);

    // Gandakan data supaya array jadi panjang (5 set)
    const duplicatedTeachers = [
        ...teachers,
        ...teachers,
        ...teachers,
        ...teachers,
        ...teachers,
    ];

    useEffect(() => {
        if (loading || teachers.length === 0) return;

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
    }, [loading, teachers.length, SET_WIDTH]);

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
                    {loading ? (
                        <div className="flex gap-4 overflow-hidden px-12 py-8 animate-pulse">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex-shrink-0 rounded-[2rem] bg-slate-200" style={{ width: 220, height: 320 }} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-500 font-bold w-full">{error}</div>
                    ) : (
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
                                    onClick={() => setSelectedTeacher(teacher)}
                                />
                            ))}
                        </div>
                    )}
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
