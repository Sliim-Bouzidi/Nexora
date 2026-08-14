import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter-latin.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Inter-latin.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Inter-latin.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Inter-latin.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Inter-latin.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSerif-italic-latin.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexora",
  description: "SaaS landing page hero section with interactive dashboard preview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-body flex flex-col scroll-smooth overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
