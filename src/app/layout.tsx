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
  metadataBase: new URL("https://gavellia-client.vercel.app"),
  title: {
    default: "Gavellia — Premium Online Auction Platform",
    template: "%s | Gavellia",
  },
  description:
    "Buy and sell luxury goods through real-time and timed auctions. Curated collections of watches, art, cars, jewellery, fashion, and collectibles from trusted sellers worldwide.",
  keywords: [
    "online auction",
    "luxury goods",
    "live bidding",
    "timed auction",
    "watches",
    "art",
    "cars",
    "jewellery",
    "fashion",
    "collectibles",
    "buy and sell",
    "premium marketplace",
  ],
  authors: [{ name: "Gavellia" }],
  creator: "Gavellia",
  publisher: "Gavellia",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://gavellia-client.vercel.app",
    siteName: "Gavellia",
    title: "Gavellia — Premium Online Auction Platform",
    description:
      "Buy and sell luxury goods through real-time and timed auctions. Curated collections of watches, art, cars, jewellery, fashion, and collectibles.",
    images: [
      {
        url: "/ArtBanner.jpg",
        width: 1200,
        height: 630,
        alt: "Gavellia Auction Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gavellia — Premium Online Auction Platform",
    description:
      "Buy and sell luxury goods through real-time and timed auctions.",
    images: ["/ArtBanner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
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
          <div className="w-full min-h-screen">
            <div className="max-w-625 mx-auto">{children}</div>
          </div>

          <div className="w-full bg-card-bg">
            <div className="max-w-625 mx-auto">
              <ConditionalFooter />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
