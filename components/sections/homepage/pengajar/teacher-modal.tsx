import React from "react";
import Image from "next/image";
import { X, GraduationCap, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type TeacherType = {
    id: number;
    name: string;
    role: string;
    experience: string;
    image: string;
    bio: string;
};

interface TeacherModalProps {
    teacher: TeacherType | null;
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
                                <div className="relative w-full h-[380px] md:h-auto md:min-h-[500px] md:w-[45%] shrink-0 overflow-hidden bg-slate-900 flex items-end justify-center">
                                    {/* Subtle Background Grid Pattern */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

                                    {/* Dramatic Spotlight Blobs */}
                                    <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/40 blur-[80px]" />
                                    <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-amber-500/20 blur-[80px]" />

                                    {/* Elegent Concentric Rings / Halo */}
                                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-white/10" />
                                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-white/5" />
                                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-gradient-to-b from-white/5 to-transparent" />

                                    {/* The Teacher Image */}
                                    <div className="relative w-full h-[95%] z-10 pl-4 pr-6 pt-10">
                                        <Image
                                            src={teacher.image}
                                            alt={teacher.name}
                                            fill
                                            className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                                            draggable={false}
                                            priority
                                        />
                                    </div>

                                    {/* Seamless Bottom Fade (blends the image cutoff to the dark bg) */}
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none" />

                                    {/* Subtle divider line for desktop */}
                                    <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                                </div>

                                {/* ─── RIGHT: Beautiful Content Details ─────────────────────────────── */}
                                <div className="relative flex flex-col justify-center px-8 py-10 md:px-12 md:py-16 md:w-[55%] bg-white">
                                    <div className="mb-8">
                                        <h3 className="text-3xl md:text-4xl font-black uppercase text-slate-800 tracking-tight leading-none mb-4">
                                            {teacher.name}
                                        </h3>
                                        {/* Role Badge with pulsing dot */}
                                        <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary shadow-sm">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                            </span>
                                            {teacher.role}
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
