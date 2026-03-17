import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import StatsBand from "@/components/StatsBand";
import WireModelSection from "@/components/WireModelSection";
import ContextProblem from "@/components/ContextProblem";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import BeforeAfter from "@/components/BeforeAfter";
import Architecture from "@/components/Architecture";
import OutcomeSection from "@/components/OutcomeSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemSection />
      <StatsBand />
      <WireModelSection />
      <ContextProblem />
      <HowItWorks />
      <FeaturesGrid />
      <BeforeAfter />
      <Architecture />
      <OutcomeSection />
      <CTASection />
      <Footer />
    </main>
  );
}