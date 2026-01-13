import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLM Dashboard | Antigravity",
  description: "LLM 사용량 통합 모니터링 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} antialiased bg-gray-950 text-white`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8" style={{ marginLeft: '256px' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
