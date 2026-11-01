import Navbar from "@/components/Navbar";
import RibbonStage from "@/components/RibbonStage";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Process from "@/components/Process";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <RibbonStage />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Manifesto />
        <Work />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
