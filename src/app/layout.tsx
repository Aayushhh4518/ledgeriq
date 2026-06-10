import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { FinancialProvider } from "@/contexts/FinancialContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import DashboardShell from "@/components/layout/DashboardShell";

export const metadata: Metadata = {
  title: "LedgerIQ - Enterprise Financial Intelligence",
  description: "Advanced financial statement analysis and intelligence terminal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NotificationProvider>
          <FinancialProvider>
            <DashboardShell>{children}</DashboardShell>
          </FinancialProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
