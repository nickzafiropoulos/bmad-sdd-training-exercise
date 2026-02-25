import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";

import { ThemeScript } from "~/app/_components/theme-script";
import { Shell } from "~/app/_components/shell";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Road & Ridgelines — Cycling the World",
  description: "One rider's road bike journeys across mountains, coastlines, and continents.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading-family",
  weight: ["600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <TRPCReactProvider>
          <Shell>{children}</Shell>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
