import { notFound } from "next/navigation";
import { Metadata } from "next";
import { classesData } from "@/components/sections/data/data-pakej-kelas";
import { PakejHero } from "@/components/sections/pakej-kelas/pakej-hero";
import { PakejDeskripsi } from "@/components/sections/pakej-kelas/pakej-deskripsi";
import { PakejSesuaiUntuk } from "@/components/sections/pakej-kelas/pakej-sesuai-untuk";
import { PakejSyllabus } from "@/components/sections/pakej-kelas/pakej-syllabus";
import { PakejHarga } from "@/components/sections/pakej-kelas/pakej-harga";
import { PakejCta } from "@/components/sections/pakej-kelas/pakej-cta";

export const dynamicParams = true;

export async function generateStaticParams() {
  return classesData.map((pakej) => ({
    slug: pakej.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pakej = classesData.find((p) => p.slug === slug);

  if (!pakej) {
    return {
      title: "Pakej Tidak Ditemui | MyNgaji Academy",
    };
  }

  return {
    title: `${pakej.nama} - Kelas Mengaji Online | MyNgaji Academy`,
    description: pakej.tagline || `Daftar ${pakej.nama} di MyNgaji Academy.`,
  };
}

export default async function PakejDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pakej = classesData.find((p) => p.slug === slug);

  if (!pakej) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PakejHero data={pakej} />
      <PakejDeskripsi data={pakej} />
      <PakejSesuaiUntuk data={pakej} />
      <PakejSyllabus data={pakej} />
      <PakejHarga data={pakej} />
      <PakejCta />
    </main>
  );
}
