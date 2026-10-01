import "./globals.css";

import NavbarPage from "@/component/shared/navbar";
import FoterPage from "@/component/shared/footer";

import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "FITLOG",
  description: "Workout management application",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >

      <body className="min-h-screen bg-[#0B0D10] flex flex-col">

        <NavbarPage />

        <div className="flex-1">
          {children}
        </div>

        <FoterPage />

      </body>

    </html>

  );
}