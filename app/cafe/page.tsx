import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CafeShowcase from "@/components/CafeShowcase";

export const metadata: Metadata = {
  title: "Cafe Themes — Zelexto Studio",
  description:
    "A collection of premium, production-ready cafe and hospitality website themes by Zelexto — each one a different visual language, ready to white-label.",
};

export default function CafePage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <CafeShowcase />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
