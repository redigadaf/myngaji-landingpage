import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { FooterSection } from "@/components/layout/footer-section";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://myngaji.com'),
  title: "My Ngaji",
  description: "Bimbingan Al-Quran dan Agama Secara Personal",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased font-sans`}>
        <Navbar />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
