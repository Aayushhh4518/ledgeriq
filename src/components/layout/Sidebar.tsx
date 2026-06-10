"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  LineChart, 
  ShieldAlert, 
  TrendingUp, 
  BrainCircuit, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Wallet
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Financial Analysis", icon: LineChart },
  { name: "Risk Analysis", icon: ShieldAlert },
  { name: "Growth Analysis", icon: TrendingUp },
  { name: "AI Insights", icon: BrainCircuit },
  { name: "Reports", icon: FileText },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = "Dashboard";
      for (const item of navItems) {
        const element = document.getElementById(item.name);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentActive = item.name;
          }
        }
      }
      setActiveItem(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveItem(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <aside 
      className={`relative sticky top-0 h-screen flex flex-col border-r border-zinc-800/80 bg-black transition-all duration-300 ease-in-out shrink-0 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header / Brand */}
      <div className="flex items-center h-[72px] px-6 border-b border-zinc-800/60">
        <div className="flex items-center gap-3 overflow-hidden text-zinc-100">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
            <Wallet className="w-4 h-4 text-blue-500" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold tracking-tight whitespace-nowrap">
              LedgerIQ
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {!isCollapsed && (
          <p className="px-3 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase mb-4">
            Platform
          </p>
        )}
        
        {navItems.map((item) => {
          const isActive = activeItem === item.name;
          const Icon = item.icon;
          
          return (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive 
                  ? "text-white font-medium" 
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-zinc-800/80 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              
              <Icon 
                className={`w-[18px] h-[18px] shrink-0 transition-colors duration-200 ${
                  isActive ? "text-blue-500" : "text-zinc-400 group-hover:text-zinc-300"
                }`} 
              />
              
              {!isCollapsed && (
                <span className="text-sm tracking-wide truncate">{item.name}</span>
              )}

              {/* Active Indicator Line (Left Edge) */}
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-line"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-zinc-800/60">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} w-full p-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors group`}
        >
          {!isCollapsed && (
            <span className="text-sm font-medium">Collapse</span>
          )}
          <div className="flex items-center justify-center w-6 h-6 rounded bg-zinc-800/50 group-hover:bg-zinc-700/50 transition-colors">
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
            )}
          </div>
        </button>
      </div>
    </aside>
  );
}