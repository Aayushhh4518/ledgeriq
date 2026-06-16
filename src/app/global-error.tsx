"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Global boundary caught an unhandled exception.", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-zinc-900 border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">Critical Application Error</h1>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              LedgerIQ encountered an unexpected system error. We apologize for the inconvenience. 
              Our team has been notified.
            </p>

            <button
              onClick={() => reset()}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Restart Application
            </button>
            
            {process.env.NODE_ENV !== 'production' && (
              <div className="mt-8 text-left p-4 bg-black/50 rounded-lg overflow-x-auto border border-red-500/10">
                <p className="text-xs font-mono text-red-400 whitespace-pre-wrap">{error.message}</p>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
