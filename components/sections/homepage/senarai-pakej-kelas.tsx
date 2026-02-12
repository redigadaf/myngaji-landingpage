"use client";

import { motion } from "motion/react";
import { CircleCheck } from "lucide-react";
import clsx from "clsx";
import ScrollFloat from "@/components/scroll-float";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface PlanItem {
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

const plans: PlanItem[] = [
  {
    title: "Kelas Al Quran",
    description: "Sesuai untuk semua peringkat umur (Kanak-kanak & Dewasa).",
    features: ["Kelas Mengaji Kanak - Kanak", "Kelas Hafazan Al-Quran", "Kelas Mengaji Dewasa"],
    cta: "Daftar Sekarang",
    href: "/daftar",
    featured: true,
  },
  {
    title: "Kelas Fardhu Ain",
    description: "Pengukuhan ilmu agama dan praktikal ibadah harian.",
    features: ["Kelas Agama & Fardhu Ain (KAFA)"],
    cta: "Daftar Sekarang",
    href: "/daftar",
  },
  {
    title: "Kelas Bahasa Arab",
    description: "Kuasai Bahasa Arab Al-Quran dan Komunikasi dengan mudah.",
    features: ["Kelas Bahasa Arab Kanak - Kanak", "Kelas Bahasa Arab Dewasa"],
    cta: "Daftar Sekarang",
    href: "/daftar",
  },
];

export const SenaraiPakejKelas = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 mb-16 text-center">
          <ScrollFloat containerClassName="!my-0" textClassName="text-3xl md:text-5xl font-black tracking-tight">
            <span className="text-primary">SENARAI </span>
            <span className="text-secondary">PAKEJ KELAS.</span>
          </ScrollFloat>
        </div>

        <div className="not-prose mt-4 grid grid-cols-1 gap-6 min-[900px]:grid-cols-3">
          {plans.map((plan, index) => {
            // Animation logic: Left -> Bottom -> Right
            const initialConfig = index === 0 ? { opacity: 0, x: -100, y: 0 } : index === 1 ? { opacity: 0, x: 0, y: 100 } : { opacity: 0, x: 100, y: 0 };

            return (
              <motion.div
                key={plan.title}
                initial={initialConfig}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index === 1 ? 0.2 : 0 }}
                className="h-full"
              >
                <PricingCard plan={plan} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function PricingCard({ plan }: { plan: PlanItem }) {
  return (
    <div className={clsx("flex flex-col rounded-2xl border bg-white p-6 text-left shadow-sm transition-all hover:shadow-md h-full")}>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Badge className="text-lg px-4 py-1 bg-primary text-white hover:bg-primary/90">{plan.title}</Badge>
        </div>

        {/* Price placeholder removed as requested */}
        {/* <h4 className="mb-2 mt-4 text-2xl text-primary">{plan.price}</h4> */}

        {plan.description && <p className="text-sm text-gray-500 min-h-[40px]">{plan.description}</p>}
      </div>

      <div className="my-6 border-t border-gray-100" />

      <ul className="space-y-4 flex-grow">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start text-sm text-gray-700">
            <CircleCheck className="mr-3 h-5 w-5 text-primary flex-shrink-0" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6">
        <Link href={plan.href} className="w-full block">
          <Button size="lg" className="w-full font-bold" variant="default">
            {plan.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
}
