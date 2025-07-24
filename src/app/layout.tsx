import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Algoritmo Humano",
  description: "Algoritmo Humano - Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <html lang="pt-BR">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Sidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </body>
      </html>
    </SidebarProvider>
  );
}
