"use client";

import Image from "next/image";
import { Facebook, Instagram, Phone } from "lucide-react";
import { useSocialLinks } from "@/hooks/useSocialLinks";

export function FooterSection() {
  const { getLink } = useSocialLinks();
  
  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          {/* Contact Info */}
          <div className="space-y-4 mr-auto">
            <h4 className="text-xl font-extrabold text-secondary mb-6">Media Sosial</h4>
            <a 
              href={`https://wa.me/${getLink("whatsapp")?.url?.startsWith("6") ? getLink("whatsapp")?.url : `6${getLink("whatsapp")?.url}`}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">{getLink("whatsapp")?.url || "011-56406429"}</span>
            </a>
            <a 
              href={getLink("facebook")?.url || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span className="font-medium">Pusat Pengajian alQuran & Akademik</span>
            </a>
            <a 
              href={getLink("instagram")?.url || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-medium">myngaji.academy</span>
            </a>
            <a 
              href={getLink("tiktok")?.url || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors"
            >
              <div className="w-5 h-5 border border-current rounded flex items-center justify-center font-bold text-[10px]">Tk</div>
              <span className="font-medium">myngajiacademy</span>
            </a>
          </div>

          {/* Big Logo Footer */}
          <div className="text-right">
            <Image src="/assets/logo1.png" alt="MyNgaji Logo" width={400} height={150} className="w-48 md:w-80 h-auto ml-auto opacity-90 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="border-t border-teal-700/50 mt-12 pt-8 text-center text-secondary text-sm">&copy; {new Date().getFullYear()} MyNgaji Academy. Hak Cipta Terpelihara.</div>
      </div>
    </footer>
  );
}
