"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CommunityPage() {
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
          The <span className="text-accent italic">Collective.</span>
        </h1>
        <div className="h-[1px] w-full bg-white/10 animate-item" />
        <div className="flex flex-col gap-6 text-white/60 text-lg leading-relaxed font-outfit animate-item">
          <p>
            We are more than a brand; we are a network of explorers, creators, and boundary pushers. The Thermos Collective exists to share stories from the edge of the world.
          </p>
          <p>
            Whether you're scaling a 14er in Colorado, deep-sea diving in the Pacific, or pushing through a 16-hour studio session in Tokyo, we want to see how your vessel fuels your passion.
          </p>
          <p className="text-accent font-bold">
            Tag your journey #ThermosCollective for a chance to be featured on our dynamic timeline.
          </p>
        </div>
      </div>
    </main>
  );
}
