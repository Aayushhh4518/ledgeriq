/**
 * Centralized logging utility for LedgerIQ.
 * Prevents verbose logging in production environments and sets up standard formatting.
 * Can be easily integrated with Sentry or Datadog in the future.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
  timestamp: string;
}

class Logger {
  private readonly isDev = process.env.NODE_ENV !== "production";

  private formatMessage(entry: LogEntry): string {
    const contextStr = entry.context ? ` | Context: ${JSON.stringify(entry.context)}` : "";
    const errorStr = entry.error ? ` | Error: ${entry.error.message}\n${entry.error.stack}` : "";
    return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${contextStr}${errorStr}`;
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      context,
      error,
      timestamp: new Date().toISOString(),
    };

    if (this.isDev) {
      const formattedMessage = this.formatMessage(entry);
      switch (level) {
        case "debug":
          console.debug(formattedMessage);
          break;
        case "info":
          console.info(formattedMessage);
          break;
        case "warn":
          console.warn(formattedMessage);
          break;
        case "error":
          console.error(formattedMessage);
          break;
      }
    } else {
      // In production, you would typically send this to an external service like Sentry or Datadog.
      // For now, we still log errors and warnings to the console for basic observability.
      if (level === "error" || level === "warn") {
        const formattedMessage = this.formatMessage(entry);
        console[level](formattedMessage);
      }
    }
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log("debug", message, context);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log("info", message, context);
  }

  warn(message: string, context?: Record<string, unknown>, error?: Error) {
    this.log("warn", message, context, error);
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    const err = error instanceof Error ? error : new Error(String(error));
    this.log("error", message, context, err);
  }
}

export const logger = new Logger();
