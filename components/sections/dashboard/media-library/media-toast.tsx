import { motion, AnimatePresence } from "framer-motion";

interface MediaToastProps {
  message: string | null;
}

export function MediaToast({ message }: MediaToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: 20 }}
          className="fixed top-6 right-6 z-[1000] animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3.5 rounded-2xl shadow-2xl shadow-emerald-500/20 flex items-center gap-3 font-bold text-sm border border-white/20 backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
