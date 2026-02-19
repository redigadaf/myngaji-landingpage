import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/shiny-button";
import { Badge } from "@/components/ui/badge";
import { PakejKelas } from "@/components/sections/data/data-pakej-kelas";

interface PakejHeroProps {
  data: PakejKelas;
}

export function PakejHero({ data }: PakejHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-primary text-white">
      {/* Background Pattern - Consistent with Home Hero but simplified */}
      <div
        className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='a' width='58' height='100.23' patternTransform='scale(2)' patternUnits='userSpaceOnUse'%3E%3Crect width='100%25' height='100%25' fill='none'/%3E%3Cpath fill='none' stroke='%23F5BB2C' stroke-linecap='round' stroke-linejoin='round' stroke-opacity='.5' stroke-width='1.5' d='m.111-33.307-28.997 16.744zm.012.006 28.993 16.738-.004 33.485L.115 33.492l-28.997-16.57.004-33.485m40.992 43.198v-5.672l4.937 2.85M29.113 9.995 12.117.18l17-9.815M6.114 30.062V10.57l16.967 9.798m-51.963-3.446 57.998-33.485m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485m57.992 19.63-5-2.887 5.002-2.887m28.872-30.805L28.99-16.768zm.012.006 28.993 16.738-.004 33.485-28.997 16.57-28.997-16.57.004-33.485m-.004 33.485 57.998-33.485M57.992 33.287l-.004-66.799m29 50.229Q57.928-.065 28.999-16.768M28.998 2.86l4.998-2.886-4.998-2.886m6.029 23.076 16.964-9.794.002 19.49m-6-3.43v-5.67l-4.936 2.85M28.995 9.789 45.994-.026 28.998-9.84M-.003 66.943-29 83.687zm.012.006 28.993 16.738-.004 33.485m0 0L.001 133.742m0 0-28.997-16.57m0 0 .004-33.485m57.991 26.557-16.996-9.814 17-9.815m-58 26.557 57.999-33.485M.001 133.742l-.004-66.8m29.001 50.23-57.99-33.485m45.994-6.928-5.005 2.89V73.87m11.005 6.353L5.999 90.04l-.002-19.633M29 103.317l-5-2.887 5.002-2.887m28.99-30.6L28.993 83.687zm.011.006 28.993 16.738-.004 33.485m0 0-28.997 16.57m0 0-28.997-16.57m0 0 .004-33.485m22.99-13.28v19.627l-16.995-9.813m-5.999 36.95 57.998-33.484m-29 50.055-.005-66.8m29.001 50.23-57.99-33.485M29 103.314l5-2.886-5-2.886m11.996-20.786 4.996 2.885v-5.7m-16.994 36.373 17-9.815L29 90.615M57.998 66.94l-.003-33.484zm-.012.008-28.992 16.74L-.002 66.94l.148-33.397 28.849-16.827L57.99 33.463M.084 47.363 4.997 50.2.06 53.05m5.936 17.356 16.998-9.812v19.63m35.003-20.212L41 50.2l16.996-9.812m-57.878.067 16.88 9.745L.03 59.996m28.966-43.28v66.971M.144 33.544 57.999 66.94m-58 .001L57.99 33.463M40.994 76.759v-5.78l5.004 2.89m-5.004-50.221v5.772l5-2.886m-11 53.689V60.589l17.004 9.815m-40.003 3.467 5-2.887v5.775m41.002-29.444L53 50.2l4.998 2.885M22.995 20.217v19.589l-16.88-9.744m5.97-3.481 4.91 2.835v-5.7m18-3.535v19.63l16.997-9.813'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800%25' height='800%25' fill='url(%23a)' transform='translate(0 -.92)'/%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-50/20 via-transparent to-transparent -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/70 mb-8 font-medium">
          <Link href="/" className="hover:text-white transition-colors">
            Laman Utama
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/#senarai-pakej" className="hover:text-white transition-colors">
            Pakej Kelas
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white truncate">{data.nama}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {data.badge && (
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-semibold bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-sm">
                {data.badge}
              </Badge>
            )}

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">{data.nama}</h1>
              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-xl">{data.tagline}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ShinyButton className="inline-flex items-center justify-center h-14 px-8 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105 [--shiny-cta-bg:#ffffff] [--shiny-cta-bg-subtle:#f1f5f9] [--shiny-cta-fg:#17838f] [--shiny-cta-highlight:#f5bb2c] [--shiny-cta-highlight-subtle:#fcd34d]">
                Daftar Kelas Percubaan
              </ShinyButton>
              <ShinyButton className="inline-flex items-center justify-center h-14 px-8 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105 !border-2 ![--shiny-cta-bg:var(--primary)] ![--shiny-cta-bg-subtle:rgba(255,255,255,0.3)] ![--shiny-cta-fg:#ffffff] ![--shiny-cta-highlight:#ffffff] ![--shiny-cta-highlight-subtle:rgba(255,255,255,0.5)]">
                Hubungi Kami
              </ShinyButton>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">1-2x Seminggu</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Globe className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">Online (Zoom/Meet)</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Users className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">Semua Peringkat</span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            {/* Glow effect behind icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[80px]"></div>

            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-float">
              <Image src={data.icon} alt={data.nama} fill className="object-contain drop-shadow-2xl brightness-0 invert" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
