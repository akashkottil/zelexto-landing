import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
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
import RiveBackground from "@/components/RiveBackground";
import InteractiveGrid from "@/components/InteractiveGrid";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ParallaxGrid />
      <RiveBackground />
      <InteractiveGrid />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Services />
        <div className="section-divider max-w-5xl mx-auto" />
        <WhyZelexto />
        <div className="section-divider max-w-5xl mx-auto" />
        <Process />
        <Audience />
        <div className="section-divider max-w-5xl mx-auto" />
        <Portfolio />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
