"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { LoadingAnimation } from "@/components/ui/LoadingAnimation";
import { AnimatePresence, motion } from "framer-motion";

interface DashboardContextType {
  setIsLoading: (loading: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Handle Page Transitions during render to avoid cascading effects warning
  // This pattern avoids double-renders and flickering by updating before the paint
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (!isAuthorizing) {
      setIsLoading(true);
    }
  }

  // 1. Handle Initial Authorization
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login");
        } else {
          setIsAuthorizing(false);
          // Keep loading for a moment to ensure smooth entrance
          setTimeout(() => setIsLoading(false), 800);
        }
      } catch {
        router.push("/login");
      }
    };
    checkUser();
  }, [router]);

  // 2. Handle Loading Timeout for Page Transitions
  useEffect(() => {
    if (isLoading && !isAuthorizing) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthorizing, pathname]);

  return (
    <DashboardContext.Provider value={{ setIsLoading }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="dashboard-unified-loading"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-950"
          >
            <LoadingAnimation text="" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={(isLoading || isAuthorizing) ? "opacity-0 invisible" : "opacity-100 visible h-full w-full transition-opacity duration-500"}>
        {!isAuthorizing && children}
      </div>
    </DashboardContext.Provider>
  );
}
