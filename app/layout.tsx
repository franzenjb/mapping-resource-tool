import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import HybridAuth from "@/components/HybridAuth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mapping Resource Tool",
  description: "ArcGIS & Red Cross Mapping Resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HybridAuth>
          {children}
        </HybridAuth>
      </body>
    </html>
  );
}
