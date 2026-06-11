"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, LineChart, ShieldAlert, TrendingUp, BrainCircuit, FileText } from "lucide-react";
import { useSearch } from "./SearchContext";
import { useFinancialData } from "@/contexts/FinancialContext";
import { useRouter, usePathname } from "next/navigation";

const sections = [
  { id: "Hero", path: "/", title: "Overview Dashboard", icon: LayoutDashboard },
  { id: "ratio-analysis", path: "/financial-analysis", title: "Financial Ratios (ROE, Margins)", icon: LineChart },
  { id: "earnings-quality", path: "/financial-analysis", title: "Earnings Quality", icon: LineChart },
  { id: "benchmark", path: "/financial-analysis", title: "Industry Benchmark", icon: LineChart },
  { id: "risk-panel", path: "/risk-analysis", title: "Risk & Simulation", icon: ShieldAlert },
  { id: "liquidity", path: "/risk-analysis", title: "Liquidity & Solvency", icon: ShieldAlert },
  { id: "revenue-concentration", path: "/risk-analysis", title: "Revenue Concentration", icon: ShieldAlert },
  { id: "growth-analysis", path: "/growth-analysis", title: "Growth Analysis", icon: TrendingUp },
  { id: "segment-analysis", path: "/growth-analysis", title: "Segment Analysis", icon: TrendingUp },
  { id: "ai-insights", path: "/ai-insights", title: "AI Insights & Copilot", icon: BrainCircuit },
  { id: "reports", path: "/reports", title: "Reporting & Export", icon: FileText },
];

export default function CommandPalette() {
  const { searchQuery, setSearchQuery, isCommandPaletteOpen, setIsCommandPaletteOpen } = useSearch();
  const { metrics } = useFinancialData();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Dynamically generate sections based on available data
  const dynamicSections = [...sections];

  if (metrics) {
    dynamicSections.push(
      { id: "revenue-chart", path: "/", title: `Revenue: $${metrics.revenue?.toLocaleString()}`, icon: TrendingUp },
      { id: "overview-cards", path: "/", title: `Net Income: $${metrics.netIncome?.toLocaleString()}`, icon: TrendingUp },
      { id: "overview-cards", path: "/", title: `Total Assets: $${metrics.totalAssets?.toLocaleString()}`, icon: LayoutDashboard },
      { id: "overview-cards", path: "/", title: `Total Liabilities: $${metrics.totalLiabilities?.toLocaleString()}`, icon: LayoutDashboard },
      { id: "overview-cards", path: "/", title: `Cash Position: $${metrics.cash?.toLocaleString()}`, icon: LayoutDashboard }
    );
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      } else if (e.key === "/" && !isCommandPaletteOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      } else if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  const filteredSections = dynamicSections.filter((s) => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (section: typeof dynamicSections[0]) => {
    setIsCommandPaletteOpen(false);
    
    // If we are already on the page, don't push, just scroll
    if (pathname !== section.path) {
      router.push(section.path);
    }

    // Wait a brief moment for the page to render (or just scroll immediately if already there)
    setTimeout(() => {
      // In a real app we'd need a robust way to ensure elements are mounted,
      // but for this UI prototype a timeout handles the React render lifecycle well.
      const element = document.getElementById(section.id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
        
        // Highlight effect
        element.classList.add("ring-2", "ring-blue-500", "ring-offset-4", "ring-offset-black", "transition-all", "duration-1000", "rounded-xl");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-blue-500", "ring-offset-4", "ring-offset-black");
        }, 2000);
      }
    }, pathname === section.path ? 50 : 400); // Shorter delay if staying on same page
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Input Area */}
            <div className="flex items-center px-4 py-4 border-b border-white/5">
              <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dashboard sections or metrics..."
                className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500 text-lg"
              />
              <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium text-zinc-500 bg-zinc-800/50 border border-zinc-700 rounded ml-3 shrink-0">
                ESC
              </kbd>
            </div>

            {/* Results Area */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredSections.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Dashboard Sections
                  </div>
                  {filteredSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={`${section.id}-${section.title}`}
                        onClick={() => handleSelect(section)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-blue-500/10 hover:text-blue-400 text-zinc-300 transition-colors text-left group"
                      >
                        <Icon className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                        <span className="font-medium">{section.title}</span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-zinc-500">No results found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-white/5 flex justify-between items-center bg-zinc-900/20 text-xs text-zinc-500">
              <span>Filter sections dynamically behind the palette.</span>
              <div className="flex gap-2">
                <span>Navigate</span>
                <kbd className="px-1 py-0.5 bg-zinc-800 border border-zinc-700 rounded">↵</kbd>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
