"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";
import { RefreshCcw, AlertCircle, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Next.js Error Boundary caught an exception", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.15)]">
        <AlertCircle className="w-10 h-10 text-rose-500" />
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Something went wrong</h2>
      
      <p className="text-zinc-400 max-w-md mx-auto mb-8 text-lg">
        We encountered an error while trying to render this page.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
        >
          <RefreshCcw className="w-5 h-5" />
          Try Again
        </button>
        <Link 
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-white/10 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      {process.env.NODE_ENV !== "production" && (
        <div className="mt-12 w-full max-w-2xl bg-black/50 border border-white/10 rounded-lg p-6 text-left overflow-auto">
          <p className="text-rose-400 font-mono text-sm whitespace-pre-wrap">{error.message}</p>
          {error.stack && (
            <p className="text-zinc-500 font-mono text-xs whitespace-pre-wrap mt-4">{error.stack}</p>
          )}
        </div>
      )}
    </div>
  );
}
