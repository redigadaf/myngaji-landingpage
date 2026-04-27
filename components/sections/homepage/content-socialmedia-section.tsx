"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import ScrollFloat from "@/components/scroll-float";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { useSocialLinks } from "@/hooks/useSocialLinks";

export function ContentSocialMedia() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { getLink } = useSocialLinks();

  const socialLinks = [
    {
      name: "TikTok",
      username: "@myngajiacademy",
      icon: <FaTiktok className="w-8 h-8" />,
      url: getLink("tiktok")?.url || "https://www.tiktok.com/@myngajiacademy",
      color: "bg-black text-white hover:bg-gray-900 border-gray-800",
      description: "Video pendek & tips mengaji pantas",
      delay: 0.1,
    },
    {
      name: "Instagram",
      username: "@myngaji.academy",
      icon: <FaInstagram className="w-8 h-8" />,
      url: getLink("instagram")?.url || "https://www.instagram.com/myngaji.academy",
      color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white hover:opacity-90 border-transparent",
      description: "Perkembangan terkini & inspirasi harian",
      delay: 0.2,
    },
    {
      name: "YouTube",
      username: "@MyngajiAcademy",
      icon: <FaYoutube className="w-8 h-8" />,
      url: getLink("youtube")?.url || "https://www.youtube.com/@MyngajiAcademy",
      color: "bg-red-600 text-white hover:bg-red-700 border-red-700",
      description: "Video pembelajaran & kuliah penuh",
      delay: 0.3,
    },
  ];

  return (
    <div className="w-full bg-white py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex flex-col gap-12 items-center">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <GradualSpacing className="text-xl md:text-2xl uppercase tracking-wide text-primary font-black mb-4" text="Komuniti Kami" />
            <div className="flex flex-wrap justify-center gap-x-2 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-tight">
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03} containerClassName="text-primary !my-0 ">
                Ikuti Media
              </ScrollFloat>
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03} containerClassName="text-secondary !my-0">
                Sosial Kami
              </ScrollFloat>
            </div>
            <p className="max-w-2xl text-lg text-gray-600 leading-relaxed mx-auto">Dapatkan tips menarik, panduan mengaji, dan info terkini program kami melalui platform media sosial kegemaran anda.</p>
          </div>

          {/* Video Container */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl relative group"
          >
            {/* Decorative Elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>

            <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl bg-black aspect-video border-4 border-white/50 ring-1 ring-stone-900/5">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/bLVDmnQyv1A?si=content-socialmedia"
                title="MyNgaji YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Social Media Grid Cards */}
          <div className="w-full max-w-5xl mt-4">
            {/* Mobile View: Icons Only Row */}
            <div className="flex flex-col md:hidden items-center gap-4 pb-4">
              <p className="text-stone-500 font-medium text-sm">Ikuti komuniti kami di platform lain:</p>
              <div className="flex justify-center items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex items-center justify-center w-16 h-16 rounded-2xl shadow-md border border-white/20 ${social.color}`}
                  >
                    <div className="scale-125">{social.icon}</div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Desktop View: Full Cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: social.delay, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className={`relative overflow-hidden rounded-3xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group ${social.color}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-inner">{social.icon}</div>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-1">{social.name}</h3>
                    <p className="text-sm opacity-90 font-medium mb-3">{social.username}</p>
                    <p className="text-xs opacity-80 leading-relaxed">{social.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
