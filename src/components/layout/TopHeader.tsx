"use client";

import { 
  Search, 
  Download, 
  ArrowLeftRight, 
  Clock, 
  Building2,
  Bell
} from "lucide-react";
import { useEffect, useState } from "react";

export default function TopHeader() {
  const [time, setTime] = useState("");

  // Hydration-safe clock
  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }));
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-md border-b border-zinc-800/60 shrink-0">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-8 py-4 gap-4">
        
        {/* Left Side: Context & Status */}
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
              Financial Statement Analyzer
            </h1>
            
            {/* Status Indicators (Bloomberg Terminal Vibe) */}
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Enterprise
              </span>
              
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              
              <span className="flex items-center gap-1.5 text-emerald-400/90">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Sync Active
              </span>
              
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {time ? `Updated ${time}` : "Syncing..."}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Search & Actions (Stripe/Linear Vibe) */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          
          {/* Search Bar */}
          <div className="relative group flex-1 lg:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search metrics, reports... (Press '/')" 
              className="w-full lg:w-72 h-9 pl-9 pr-4 text-sm bg-zinc-900/40 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 bg-zinc-800/50 border border-zinc-700 rounded">
                /
              </kbd>
            </div>
          </div>

          <div className="h-5 w-px bg-zinc-800 mx-1 hidden lg:block" />

          {/* Compare Button */}
          <button className="flex items-center justify-center h-9 px-3.5 text-sm font-medium text-zinc-300 bg-zinc-900/40 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-all whitespace-nowrap gap-2">
            <ArrowLeftRight className="w-4 h-4 text-zinc-400" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          {/* Export Button */}
          <button className="flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-blue-600 border border-blue-500/50 rounded-lg hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.15)] hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] whitespace-nowrap gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>

          {/* Notification Bell */}
          <button className="flex items-center justify-center h-9 w-9 text-zinc-400 hover:text-white bg-zinc-900/40 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-all relative shrink-0">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full ring-2 ring-zinc-900" />
          </button>
        </div>
        
      </div>
    </header>
  );
}