import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <HeroSection />
      {/* 
        <FeaturesSection />
        <ProductShowcaseSection />
        <ReviewsSection />
        <CtaSection />
      */}
    </main>
  );
}
