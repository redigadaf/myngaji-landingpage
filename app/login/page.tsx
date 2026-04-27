"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Toast } from "@/components/ui/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Show success toast before navigating
      setSuccessMessage("Log masuk berjaya! Menghala ke dashboard...");
      
      // Delay navigation to allow user to see the toast
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Gagal log masuk. Sila semak emel dan kata laluan anda.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 font-sans selection:bg-secondary/30 relative overflow-hidden">
      {/* Toast Notification */}
      <Toast message={successMessage} type="success" />
      {/* Premium Background Decorative Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]" 
        />
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[450px] z-10"
      >
        {/* Logo Section - Now Floating Naturally on Primary Background */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative h-16 w-64 mb-8"
          >
            <Image 
              src="/assets/logo1.png" 
              alt="MyNgaji Logo" 
              fill 
              className="object-contain"
              priority
            />
          </motion.div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">Admin Portal</h1>
            <div className="h-1 w-12 bg-secondary mx-auto rounded-full" />
          </div>
        </div>

        {/* Login Card - Clean White / Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-white/20"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-5">
                  ID Emel
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold placeholder:text-gray-300 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-5 pr-1">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Kata Laluan
                  </label>
                  <button type="button" className="text-[10px] font-black text-primary hover:text-secondary transition-colors italic">
                    Lupa akses?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold placeholder:text-gray-300 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl shadow-2xl shadow-primary/30 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Masuk ke Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <p className="text-center mt-10 text-sm text-white/40 font-bold tracking-wide">
          MyNgaji Academy &copy; 2026 • <Link href="/" className="text-secondary hover:underline">Laman Utama</Link>
        </p>
      </motion.div>
    </div>
  );
}
