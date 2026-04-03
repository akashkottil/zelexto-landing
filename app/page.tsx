import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyZelexto from "@/components/WhyZelexto";
import Process from "@/components/Process";
import Audience from "@/components/Audience";
import Portfolio from "@/components/Portfolio";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import ParallaxGrid from "@/components/ParallaxGrid";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ParallaxGrid />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <WhyZelexto />
        <Process />
        <Audience />
        <Portfolio />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
