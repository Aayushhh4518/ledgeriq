"use client";

import { 
  Search, 
  Download, 
  ArrowLeftRight, 
  Clock, 
  Building2,
  Bell,
  CheckCircle2
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearch } from "./SearchContext";
import CommandPalette from "./CommandPalette";
import { motion, AnimatePresence } from "framer-motion";

export default function TopHeader() {
  const [time, setTime] = useState("");
  const { setIsCommandPaletteOpen, searchQuery } = useSearch();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Hydration-safe clock
  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }));
  }, []);

  return (
    <>
      <CommandPalette />
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
            
            {/* Search Bar / Command Trigger */}
            <div 
              className="relative group flex-1 lg:flex-none cursor-pointer"
              onClick={() => setIsCommandPaletteOpen(true)}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-blue-500 transition-colors" />
              <div className="w-full lg:w-72 h-9 pl-9 pr-4 flex items-center text-sm bg-zinc-900/40 border border-zinc-800 rounded-lg text-zinc-400 group-hover:border-zinc-700 transition-all shadow-inner">
                {searchQuery ? `Filter: ${searchQuery}` : "Search metrics, reports... (Press '/')" }
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
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
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`flex items-center justify-center h-9 w-9 border rounded-lg transition-all relative shrink-0 ${
                  isNotificationsOpen ? 'bg-zinc-800 border-zinc-700 text-white' : 'text-zinc-400 hover:text-white bg-zinc-900/40 border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full ring-2 ring-zinc-900" />
              </button>

              {/* Notification Popover */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 bg-zinc-950 border border-zinc-800/80 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden z-50 origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/50">
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                      <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Mark all as read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {/* Notification Item */}
                      <div className="px-4 py-3 hover:bg-zinc-900/40 transition-colors flex gap-3 items-start border-b border-zinc-800/40">
                        <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm text-zinc-200">System updated successfully</p>
                          <p className="text-xs text-zinc-500 mt-1">Live sync connection established across all regions.</p>
                          <p className="text-[10px] text-zinc-600 mt-1.5 font-medium">Just now</p>
                        </div>
                      </div>
                      <div className="px-4 py-3 hover:bg-zinc-900/40 transition-colors flex gap-3 items-start border-b border-zinc-800/40">
                        <div className="mt-0.5 rounded-full bg-blue-500/10 p-1 shrink-0">
                          <Download className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-zinc-200">Report generated</p>
                          <p className="text-xs text-zinc-500 mt-1">Your export for \"Q3 Analysis\" is ready to download.</p>
                          <p className="text-[10px] text-zinc-600 mt-1.5 font-medium">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </header>
    </>
  );
}