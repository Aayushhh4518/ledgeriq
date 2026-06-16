"use client";

import React, { Component, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { logger } from "@/lib/logger";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error("Component ErrorBoundary caught an exception", error, {
      componentStack: errorInfo.componentStack,
      fallbackTitle: this.props.fallbackTitle,
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-[#0a0a0a]/50 backdrop-blur-md border border-rose-500/20 rounded-2xl p-6 text-center shadow-lg">
          <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-rose-500" />
          </div>
          <h3 className="text-base font-semibold tracking-tight text-zinc-200 mb-2">
            {this.props.fallbackTitle || "Component Error"}
          </h3>
          <p className="text-sm text-zinc-500 mb-6 max-w-sm">
            We couldn&apos;t load this section properly.
          </p>
          
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 hover:border-white/20 hover:bg-zinc-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Component
          </button>

          {process.env.NODE_ENV !== "production" && this.state.error && (
            <div className="mt-6 w-full max-w-lg bg-black p-4 rounded-lg border border-red-500/10 overflow-auto text-left">
              <code className="text-xs text-rose-400 whitespace-pre-wrap font-mono">
                {this.state.error.message}
              </code>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
