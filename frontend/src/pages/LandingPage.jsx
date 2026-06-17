import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeatureSection";
import HowItWorks from "../components/HowItWorks";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen 
                 bg-black 
                 text-white 
                 overflow-x-hidden"
    >
      <Navbar />

      <main>

        <HeroSection />

        <FeaturesSection />

        <HowItWorks />

        <StatsSection />

        <Testimonials />

        <CTASection />

      </main>

      <Footer />
    </div>
  );
}