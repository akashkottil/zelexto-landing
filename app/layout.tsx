import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zelexto — Build Your Startup Faster with AI-Powered Apps & MVPs",
  description:
    "From idea to launch — we design, develop, and scale your product with speed, precision, and personal support. MVP development, AI integration, Shopify, and more.",
  keywords: [
    "startup development",
    "MVP development",
    "AI integration",
    "Shopify",
    "digital agency",
    "web development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#111111] text-[#F5F5F5]">
        {children}
      </body>
    </html>
  );
}
