"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  LineChart, 
  ShieldAlert, 
  TrendingUp, 
  Lightbulb, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Terminal
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Financial Analysis", href: "/financial-analysis", icon: LineChart },
  { name: "Risk Analysis", href: "/risk-analysis", icon: ShieldAlert },
  { name: "Growth Analysis", href: "/growth-analysis", icon: TrendingUp },
  { name: "Strategic Insights", href: "/ai-insights", icon: Lightbulb },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Extraction Debug", href: "/debug", icon: Terminal },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside 
      className={`relative sticky top-0 h-screen flex flex-col border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl transition-all duration-300 ease-in-out shrink-0 ${
        isCollapsed ? "w-20" : "w-64"
      } z-50 shadow-[4px_0_24px_rgba(0,0,0,0.5)]`}
    >
      {/* Header / Brand */}
      <div className="flex items-center h-[72px] px-6 border-b border-zinc-800/80">
        <div className="flex items-center gap-3 overflow-hidden text-zinc-100">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
            <Wallet className="w-4 h-4 text-zinc-300" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold tracking-tight whitespace-nowrap text-zinc-200">
              LedgerIQ
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto scrollbar-hide">
        {!isCollapsed && (
          <p className="px-3 text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase mb-4">
            Platform
          </p>
        )}
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive 
                  ? "text-white font-medium" 
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {isActive ? (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-zinc-800/50 rounded-lg border border-zinc-700/50"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              
              <Icon 
                className={`w-[18px] h-[18px] shrink-0 transition-colors duration-200 relative z-10 ${
                  isActive ? "text-zinc-200" : "text-zinc-500 group-hover:text-zinc-400"
                }`} 
              />
              
              {!isCollapsed && (
                <span className="text-[13px] tracking-wide truncate relative z-10">{item.name}</span>
              )}

              {/* Active Indicator Line (Left Edge) */}
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-line"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-zinc-400 rounded-r-full z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-white/5">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} w-full p-2.5 rounded-lg text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200 transition-all duration-200 group relative overflow-hidden`}
        >
          {!isCollapsed && (
            <span className="text-[13px] font-medium tracking-wide">Collapse Sidebar</span>
          )}
          <div className="flex items-center justify-center w-6 h-6 rounded bg-white/[0.03] border border-white/[0.05] group-hover:bg-white/[0.08] transition-colors relative z-10 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            {isCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            )}
          </div>
        </button>
      </div>
    </aside>
  );
}