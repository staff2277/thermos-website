"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SustainabilityPage() {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.from(".animate-item", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white pt-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase animate-item">
          Planet <span className="text-accent italic">First.</span>
        </h1>
        <div className="h-[1px] w-full bg-white/10 animate-item" />
        <div className="flex flex-col gap-6 text-white/60 text-lg leading-relaxed font-outfit animate-item">
          <p>
            Our commitment to the planet is as unyielding as our vessels. We design products meant to last a lifetime, effectively replacing thousands of single-use plastics per owner.
          </p>
          <p>
            Every Thermos is crafted using 100% recyclable, aerospace-grade titanium and steel. We utilize zero-waste manufacturing processes and power our production facilities with renewable energy.
          </p>
          <p>
            We believe that true performance shouldn't come at the cost of the environment. Minimal footprint is our ultimate design achievement.
          </p>
        </div>
      </div>
    </main>
  );
}
