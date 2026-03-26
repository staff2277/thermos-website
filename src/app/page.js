import HeroSection from "@/components/sections/HeroSection";
import ProductShowcaseSection from "@/components/sections/ProductShowcaseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import UnifiedScrollPath from "@/components/layout/UnifiedScrollPath";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      <UnifiedScrollPath>
        <FeaturesSection />
        <ProductShowcaseSection />
        <ReviewsSection />
      </UnifiedScrollPath>
    </main>
  );
}
