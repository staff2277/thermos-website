"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ModernCard, Section } from "@/components/ui/ModernCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, Droplet, Battery, Activity } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// Dynamically import the entire 3D component (Canvas + Scene)
// This ensures that the loading div is rendered OUTSIDE of the R3F context.
const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-white/10">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-sm uppercase tracking-widest opacity-50 font-bold">
          Initializing 3D Core
        </span>
      </div>
    </div>
  ),
});

export default function Home() {
  const containerRef = useRef();

  useGSAP(
    () => {
      // 1. Initial Hero Stagger Reveal
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });

      // 2. Scroll Triggers for Sections
      const sections = gsap.utils.toArray(".scroll-section");

      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        {/* Background 3D Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroCanvas />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl pt-20 pointer-events-none">
          <h1 className="hero-reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 drop-shadow-2xl">
            Flawless Design.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-white to-gray-500">
              Smarter Everyday.
            </span>
          </h1>
          <p className="hero-reveal text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 drop-shadow-md">
            Unrivalled temperature control meets meticulous craftsmanship. The
            smart hydration system designed for your unstoppable life.
          </p>
          <div className="hero-reveal flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pointer-events-auto">
            <Button size="lg">Explore Collection</Button>
            <Button variant="outline" size="lg">
              Watch Film
            </Button>
          </div>
        </div>
      </section>

      {/* 2. TECH SPECS / FEATURE HIGHLIGHTS */}
      <Section
        id="technology"
        className="scroll-section border-t border-white/10 bg-gradient-to-b from-black to-brand-green/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Power for the long haul.
            </h2>
            <p className="text-xl text-gray-400">
              The proprietary dual-vacuum insulation paired with smart thermal
              core guarantees your water stays sub-zero crisp or piping hot. For
              exactly as long as you need.
            </p>
            <div className="flex flex-col space-y-6 pt-4">
              <div className="flex items-start space-x-4">
                <div className="bg-brand-green/20 p-3 rounded-full text-brand-green">
                  <Battery className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">30 Day Battery Life</h4>
                  <p className="text-gray-500">
                    A single magnetic charge lasts a month.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-brand-green/20 p-3 rounded-full text-brand-green">
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Perfect Temp. Always.</h4>
                  <p className="text-gray-500">
                    24 hours cold, 14 hours hot. Guaranteed.
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="mt-8 group">
              Learn about the tech
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <ModernCard
            variant="glass"
            hover={false}
            className="aspect-[4/5] md:aspect-square relative overflow-hidden group"
          >
            {/* This would be an Image normally but we don't have one loaded, using a gradient placeholder */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-green-dark to-black" />

            {/* Mock Floating UI layer on top of image */}
            <div className="absolute bottom-8 right-8 glass rounded-2xl p-6 shadow-2xl transition-transform group-hover:-translate-y-2">
              <div className="flex items-center space-x-4 mb-2">
                <Activity className="text-brand-green w-5 h-5" />
                <span className="font-semibold tracking-wider text-sm">
                  CURRENT TEMP
                </span>
              </div>
              <div className="text-4xl font-light">
                34°<span className="text-xl text-gray-400">F</span>
              </div>
            </div>
          </ModernCard>
        </div>
      </Section>

      {/* 3. SHOWCASE GRID */}
      <Section className="scroll-section">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Explore Many Designs
          </h2>
          <p className="text-gray-400 text-lg">A style for every journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Midnight Black", price: "$85", color: "bg-black" },
            { name: "Forest Green", price: "$85", color: "bg-brand-green" },
            {
              name: "Arctic White",
              price: "$85",
              color: "bg-white text-black",
            },
          ].map((item, i) => (
            <ModernCard key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                {/* Background placeholder */}
                <div
                  className={`absolute inset-0 opacity-50 transition-transform duration-700 group-hover:scale-105 ${item.color}`}
                />

                <div className="relative z-20 flex justify-end">
                  <div className="glass px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    New
                  </div>
                </div>

                <div className="relative z-20 mt-auto">
                  <h3 className="text-2xl font-bold mb-1">{item.name}</h3>
                  <p className="text-gray-300 font-medium">{item.price}</p>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="secondary" size="lg">
            View All Products
          </Button>
        </div>
      </Section>

      {/* 4. REVIEWS SECTION PREVIEW */}
      <Section className="scroll-section border-t border-white/10 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Read reviews, hydrate with confidence.
          </h2>
          <div className="flex justify-center items-center space-x-2 text-brand-green">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>★</span>
            ))}
            <span className="text-white ml-2">4.9/5 based on 10k+ reviews</span>
          </div>
        </div>

        {/* Horizontal Scroller */}
        <div className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory">
          {[1, 2, 3, 4].map((review) => (
            <ModernCard
              key={review}
              variant="glass"
              hover={false}
              className="min-w-[300px] md:min-w-[400px] p-8 snap-center flex-shrink-0"
            >
              <div className="flex text-brand-green mb-4">★★★★★</div>
              <p className="text-lg italic text-gray-300 mb-6">
                "Absolutely amazing. I left it in my hot car for 8 hours and the
                water was still freezing cold. The app integration is just icing
                on the cake."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center font-bold text-brand-green">
                  JS
                </div>
                <div>
                  <p className="font-bold text-sm">John S.</p>
                  <p className="text-xs text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
