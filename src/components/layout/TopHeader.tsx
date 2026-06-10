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
import { useNotifications } from "@/contexts/NotificationContext";
import { useFinancialData } from "@/contexts/FinancialContext";
import Link from "next/link";

export default function TopHeader() {
  const [time, setTime] = useState("");
  const { setIsCommandPaletteOpen } = useSearch();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const { setIsCompareModalOpen } = useFinancialData();

  // Hydration-safe clock
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CommandPalette />
      <header className="sticky top-0 z-40 w-full h-[72px] px-6 flex items-center justify-between border-b border-white/[0.04] bg-[#0a0a0a]/50 backdrop-blur-2xl shadow-sm shrink-0">
        
        {/* Left side: Time & Status */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <p className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-0.5">
              System Status
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="text-[13px] font-medium text-zinc-300">Operational</span>
            </div>
          </div>

          <div className="hidden md:flex flex-col border-l border-white/10 pl-6">
            <p className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-0.5">
              Local Time
            </p>
            <span className="text-[13px] font-medium text-zinc-300 tracking-wide font-mono">
              {time}
            </span>
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-4">
          
          {/* Search Trigger */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-3 h-9 px-4 text-sm text-zinc-400 bg-white/[0.03] border border-white/5 rounded-lg hover:bg-white/[0.06] hover:text-zinc-200 hover:border-white/10 transition-colors duration-200 group w-48 lg:w-64 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
          >
            <Search className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span className="flex-1 text-left truncate text-[13px]">Search...</span>
            <div className="flex items-center gap-1 pointer-events-none">
              <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold text-zinc-500 bg-white/[0.05] border border-white/10 rounded tracking-widest shadow-inner">
                ⌘K
              </kbd>
            </div>
          </motion.button>

          <div className="h-5 w-px bg-white/10 mx-1 hidden lg:block" />

          {/* Compare Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center justify-center h-9 px-4 text-[13px] font-semibold text-zinc-300 bg-transparent border border-white/10 rounded-lg hover:bg-white/[0.04] hover:text-white transition-colors whitespace-nowrap gap-2 group shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-violet-400 transition-colors" />
            <span className="hidden sm:inline tracking-wide">Compare</span>
          </motion.button>

          {/* Export Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              href="/reports"
              className="flex items-center justify-center h-9 px-5 text-[13px] font-semibold text-white bg-gradient-to-b from-indigo-500 to-indigo-600 border border-indigo-500/50 rounded-lg hover:from-indigo-400 hover:to-indigo-500 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] whitespace-nowrap gap-2 group"
            >
              <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline tracking-wide">Export</span>
              <span className="sm:hidden">Export</span>
            </Link>
          </motion.div>

          {/* Notification Bell */}
          <div className="relative">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative flex items-center justify-center w-9 h-9 text-zinc-400 bg-white/[0.03] border border-white/5 rounded-lg hover:bg-white/[0.06] hover:text-zinc-200 transition-colors duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border border-[#0a0a0a] items-center justify-center text-[9px] font-bold text-white shadow-[0_0_10px_rgba(244,63,94,0.8)]">
                    {unreadCount}
                  </span>
                </span>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 lg:w-96 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden z-50 origin-top-right"
                >
                  <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="text-sm font-bold text-white tracking-wide">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-zinc-500 text-sm">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className={`px-4 py-3 hover:bg-white/[0.04] transition-colors flex gap-3 items-start border-b border-white/5 ${!notif.read ? 'bg-white/[0.02]' : ''}`}>
                          <div className={`mt-0.5 rounded-full p-1 shrink-0 ${
                            notif.type === 'success' ? 'bg-emerald-500/10' :
                            notif.type === 'info' ? 'bg-blue-500/10' :
                            notif.type === 'compare' ? 'bg-violet-500/10' :
                            'bg-amber-500/10'
                          }`}>
                            <CheckCircle2 className={`w-4 h-4 ${
                              notif.type === 'success' ? 'text-emerald-400' :
                              notif.type === 'info' ? 'text-blue-400' :
                              notif.type === 'compare' ? 'text-violet-400' :
                              'text-amber-400'
                            }`} />
                          </div>
                          <div>
                            <p className="text-sm text-zinc-200">{notif.title}</p>
                            <p className="text-xs text-zinc-500 mt-1">{notif.description}</p>
                            <p className="text-[10px] text-zinc-600 mt-1.5 font-medium">
                              {notif.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}