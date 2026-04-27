"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ShinyButton } from "../shiny-button";
import { useScroll } from "@/components/use-scroll";
import { MenuToggleIcon } from "@/components/menu-toggle-icon";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const scrolled = useScroll(10);
  const pathname = usePathname();

  const navLinks = [
    { name: "Tentang", href: "/tentang" },
    { name: "Tenaga Pengajar", href: "/tenaga-pengajar" },
    {
      name: "Kelas",
      href: "#",
      submenu: [
        { name: "Kelas Alquran", href: "/kelas/kelas-alquran" },
        { name: "Kelas Bahasa Arab", href: "/kelas/kelas-bahasa-arab" },
        { name: "Kelas Kafa", href: "/kelas/kelas-kafa" },
        { name: "Kelas Hafazan", href: "/kelas/kelas-hafazan" },
      ],
    },
    { name: "Hubungi", href: "/hubungi" },
    { name: "Lokasi", href: "/lokasi" },
    { name: "Waktu Sholat", href: "/waktu-sholat" },
    { name: "Testimoni", href: "/testimoni" },
    { name: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (
    pathname.startsWith("/dashboard") || 
    pathname === "/login" || 
    pathname === "/pendaftaran" ||
    (pathname.startsWith("/blog/") && pathname !== "/blog")
  ) {
    return null;
  }

  return (
    <header
      className={cn("fixed top-0 left-0 right-0 z-50 mx-auto w-full border-b border-transparent transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]", {
        "bg-[#082b2f]/80 backdrop-blur-md shadow-sm dark:bg-black/50 border-white/30 dark:border-gray-800 md:top-4 md:max-w-7xl md:rounded-full md:border": scrolled && !open,
        "bg-primary dark:bg-black h-full": open,
        "bg-transparent": !scrolled && !open,
      })}
    >
      <nav
        className={cn("flex h-20 w-full items-center justify-between px-6 md:h-20 md:transition-all md:ease-out", {
          "md:px-6": scrolled,
        })}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="relative h-10 w-40 block">
            <Image src="/assets/logo1.png" alt="Tasqif Logo" fill className="object-contain object-left" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link href={link.href} className={cn("transition-colors font-medium text-[16px] hover:scale-105 flex items-center gap-1", pathname === link.href ? "text-white font-bold" : "text-white/80 hover:text-white")}>
                {link.name}
                {link.submenu && <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />}
              </Link>

              {link.submenu && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 p-2 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0 z-50">
                  {/* Invisible bridge to prevent closing when moving cursor */}
                  <div className="absolute -top-4 left-0 w-full h-4" />

                  <div className="flex flex-col gap-1">
                    {link.submenu.map((subItem) => (
                      <Link key={subItem.name} href={subItem.href} className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors">
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="https://dashboard.myngaji.com/daftar-trial" target="_blank" rel="noopener noreferrer">
            <ShinyButton className={cn("inline-flex items-center gap-2 px-6 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]", scrolled ? "!rounded-full" : "!rounded-xl")}>
              Daftar Kelas Percubaan
              <ArrowRight className="w-4 h-4 ml-2 inline-block" />
            </ShinyButton>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <MenuToggleIcon open={open} className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn("fixed top-20 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden bg-white dark:bg-black md:hidden", open ? "block" : "hidden")}>
        <div className="flex h-full w-full flex-col p-6 animate-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto pb-20">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col">
                <div className="flex items-center justify-between">
                  {link.submenu ? (
                    <button
                      onClick={() => setActiveSubmenu(activeSubmenu === link.name ? null : link.name)}
                      className={cn(
                        "text-xl font-semibold py-2 transition-colors flex items-center justify-between w-full",
                        activeSubmenu === link.name || pathname.startsWith(link.href) ? "text-primary" : "text-slate-800"
                      )}
                    >
                      {link.name}
                      <ChevronDown className={cn("w-5 h-5 transition-transform", activeSubmenu === link.name ? "rotate-180" : "")} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "text-xl font-semibold py-2 transition-colors",
                        pathname === link.href ? "text-primary" : "text-slate-800 hover:text-primary"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>

                {link.submenu && (
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      activeSubmenu === link.name ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden flex flex-col gap-3 pl-4 border-l-2 border-primary/10 ml-1">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={cn(
                            "text-[17px] py-1.5 transition-colors",
                            pathname === subItem.href ? "text-primary font-bold" : "text-slate-500"
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="mt-6 flex justify-start">
              <Link href="https://dashboard.myngaji.com/daftar-trial" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                <ShinyButton className="inline-flex items-center justify-center !px-8 !py-4 rounded-full text-base font-extrabold shadow-lg hover:shadow-xl translate-y-0 text-white">
                  Daftar Kelas Percubaan
                  <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                </ShinyButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
