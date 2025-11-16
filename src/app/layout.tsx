/** @format */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

import Providers from "@/redux/Providers";

import ConditionalFooter from "@/components/common/ConditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gavillia",
  description:
    "Gavillia is an e-commerce website where users can buy and sell products through timed or live bidding processes. Users can participate in auctions, place bids, and purchase items if they win. The platform supports multiple user roles: individual buyer, professional buyer, and seller. Users can sign up, log in, and switch between buyer and seller roles seamlessly.",
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
        <Providers>
          <Navbar />
          {children}

          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
