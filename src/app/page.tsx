import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { LogosSection } from "../components/LogosSection";
import { IntegrationsSection } from "../components/IntegrationsSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { BentoFeaturesSection } from "../components/BentoFeaturesSection";
import { KeyToolsSection } from "../components/KeyToolsSection";
import { PlatformHighlightsSection } from "../components/PlatformHighlightsSection";
import { CoreFeaturesSection } from "../components/CoreFeaturesSection";
import { AIFeaturesSection } from "../components/AIFeaturesSection";
import { LiquidShowcaseSection } from "../components/LiquidShowcaseSection";
import { SimplicitySection } from "../components/SimplicitySection";
import { WaitlistSection } from "../components/WaitlistSection";
import { RealTeamsSection } from "../components/RealTeamsSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { LottieShowcaseSection } from "../components/LottieShowcaseSection";
import { StatsShowcaseSection } from "../components/StatsShowcaseSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { PricingSection } from "../components/PricingSection";
import { FAQSection } from "../components/FAQSection";
import { BlogSection } from "../components/BlogSection";
import { CTABanner } from "../components/CTABanner";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <LogosSection />
        <IntegrationsSection />
        <FeaturesSection />
        <BentoFeaturesSection />
        <KeyToolsSection />
        <PlatformHighlightsSection />
        <CoreFeaturesSection />
        <AIFeaturesSection />
        <LiquidShowcaseSection />
        <SimplicitySection />
        <WaitlistSection />
        <RealTeamsSection />
        <HowItWorksSection />
        <LottieShowcaseSection />
        <StatsShowcaseSection />
        <TestimonialsSection />
        <PricingSection />
        <BlogSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
