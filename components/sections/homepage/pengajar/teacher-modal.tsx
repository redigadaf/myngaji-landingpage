import React from "react";
import Image from "next/image";
import { X, GraduationCap, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { TeacherFromAPI } from "@/hooks/useTeachers";

interface TeacherModalProps {
    teacher: TeacherFromAPI | null;
    onClose: () => void;
}

export function TeacherModal({ teacher, onClose }: TeacherModalProps) {
    return (
        <AnimatePresence>
            {teacher && (
                <>
                    {/* Blur Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Wrapper for perfect centering without transform conflicts */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] pointer-events-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-5 top-5 z-[102] flex h-10 w-10 items-center justify-center rounded-full bg-black/5 md:bg-black/5 text-slate-500 hover:bg-black/10 hover:text-slate-800 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="flex flex-col md:flex-row max-h-[85vh] overflow-y-auto w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                                {/* ─── LEFT: Premium Dark Image Section ──────────────────────────────── */}
                                <div className="relative w-full h-[380px] md:h-auto md:min-h-[500px] md:w-[45%] shrink-0 overflow-hidden bg-primary flex items-end justify-center">
                                    {/* Hexagon Pattern Background */}
                                    <div
                                        className="absolute inset-0 z-0 opacity-[0.3]"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='a' width='58' height='100.23' patternTransform='scale(2)' patternUnits='userSpaceOnUse'%3E%3Crect width='100%25' height='100%25' fill='none'/%3E%3Cpath fill='none' stroke='%23F5BB2C' stroke-linecap='round' stroke-linejoin='round' stroke-opacity='.5' stroke-width='1.5' d='m.111-33.307-28.997 16.744zm.012.006 28.993 16.738-.004 33.485L.115 33.492l-28.997-16.57.004-33.485m40.992 43.198v-5.672l4.937 2.85M29.113 9.995 12.117.18l17-9.815M6.114 30.062V10.57l16.967 9.798m-51.963-3.446 57.998-33.485m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485m57.992 19.63-5-2.887 5.002-2.887m28.872-30.805L28.99-16.768zm.012.006 28.993 16.738-.004 33.485-28.997 16.57-28.997-16.57.004-33.485m-.004 33.485 57.998-33.485M57.992 33.287l-.004-66.799m29 50.229Q57.928-.065 28.999-16.768M28.998 2.86l4.998-2.886-4.998-2.886m6.029 23.076 16.964-9.794.002 19.49m-6-3.43v-5.67l-4.936 2.85M28.995 9.789 45.994-.026 28.998-9.84M-.003 66.943-29 83.687zm.012.006 28.993 16.738-.004 33.485m0 0L.001 133.742m0 0-28.997-16.57m0 0 .004-33.485m57.991 26.557-16.996-9.814 17-9.815m-58 26.557 57.999-33.485M.001 133.742l-.004-66.8m29.001 50.23-57.99-33.485m45.994-6.928-5.005 2.89V73.87m11.005 6.353L5.999 90.04l-.002-19.633M29 103.317l-5-2.887 5.002-2.887m28.99-30.6L28.993 83.687zm.011.006 28.993 16.738-.004 33.485m0 0-28.997 16.57m0 0-28.997-16.57m0 0 .004-33.485m22.99-13.28v19.627l-16.995-9.813m-5.999 36.95 57.998-33.484m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485M29 103.314l5-2.886-5-2.886m11.996-20.786 4.996 2.885v-5.77m-16.994 36.373 17-9.815L29 90.615M57.998 66.94l-.003-33.484zm-.012.008-28.992 16.74L-.002 66.94l.148-33.397 28.849-16.827L57.99 33.463M.084 47.363 4.997 50.2.06 53.05m5.936 17.356 16.998-9.812v19.63m35.003-20.212L41 50.2l16.996-9.812m-57.878.067 16.88 9.745L.03 59.996m28.966-43.28v66.971M.144 33.544 57.999 66.94m-58 .001L57.99 33.463M40.994 76.759v-5.78l5.004 2.89m-5.004-50.221v5.772l5-2.886m-11 53.689V60.589l17.004 9.815m-40.003 3.467 5-2.887v5.775m41.002-29.444L53 50.2l4.998 2.885M22.995 20.217v19.589l-16.88-9.744m5.97-3.481 4.91 2.835v-5.7m18-3.535v19.63l16.997-9.813'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800%25' height='800%25' fill='url(%23a)' transform='translate(0 -.92)'/%3E%3C/svg%3E")`,
                                            maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                                            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                                        }}
                                    />

                                    {/* The Teacher Image */}
                                    <div className="relative w-full h-[95%] z-10 pl-4 pr-6 pt-10">
                                        <Image
                                            src={teacher.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.full_name)}&background=17838F&color=fff`}
                                            alt={teacher.full_name}
                                            fill
                                            className="object-contain object-bottom drop-shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
                                            draggable={false}
                                            priority
                                        />
                                    </div>

                                    {/* Subtle divider line for desktop */}
                                    <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                                </div>

                                {/* ─── RIGHT: Beautiful Content Details ─────────────────────────────── */}
                                <div className="relative flex flex-col justify-center px-8 py-10 md:px-12 md:py-16 md:w-[55%] bg-white">
                                    <div className="mb-8">
                                        <h3 className="text-3xl md:text-4xl font-black uppercase text-slate-800 tracking-tight leading-none mb-4">
                                            {teacher.full_name}
                                        </h3>
                                        {/* Role Badge with pulsing dot */}
                                        <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary shadow-sm">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                            </span>
                                            {teacher.display_role}
                                        </span>
                                    </div>

                                    <div className="space-y-6 text-sm text-slate-600">
                                        {/* Experience Tag */}
                                        {teacher.experience && (
                                            <div>
                                                <div className="flex items-center gap-4 mb-2 text-slate-800">
                                                    <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                                                        <GraduationCap className="h-5 w-5" />
                                                    </div>
                                                    <p className="font-bold text-base md:text-lg">Pengalaman Mengajar</p>
                                                </div>
                                                <p className="text-base md:text-lg font-medium text-slate-500 ml-14">{teacher.experience}</p>
                                            </div>
                                        )}

                                        <hr className="border-slate-100 ml-14" />

                                        {/* Bio Tag */}
                                        {teacher.bio && (
                                            <div>
                                                <div className="flex items-center gap-4 mb-3 text-slate-800">
                                                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                                                        <User className="h-5 w-5" />
                                                    </div>
                                                    <p className="font-bold text-base md:text-lg">Biodata & Kepakaran</p>
                                                </div>
                                                <p className="text-base md:text-lg leading-relaxed text-slate-600 ml-14 text-justify">
                                                    {teacher.bio}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
