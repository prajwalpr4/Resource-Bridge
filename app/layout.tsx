import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResourceBridge — Smart Resource Allocation",
  description:
    "AI-powered platform that turns scattered community data into actionable insights, matching urgent needs with available volunteers.",
  keywords: [
    "resource allocation",
    "community",
    "volunteer",
    "AI",
    "NGO",
    "Google Solution Challenge",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
