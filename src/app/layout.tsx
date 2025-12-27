import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zero Waste Kitchen",
  description: "Reduce food waste with AI-powered ingredient detection and smart recipes",
  keywords: ["food waste", "recipes", "AI", "sustainability", "kitchen"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen`}
      >
        <div className="flex flex-col min-h-screen w-full">
          <Navbar />
          <main className="flex-1 w-full pt-16">
            {children}
          </main>
          <Footer />
        </div>
        <Chatbot />
      </body>
    </html>
  );
}
