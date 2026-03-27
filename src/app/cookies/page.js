"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CookiesPage() {
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
          Cookie <span className="text-accent italic">Settings.</span>
        </h1>
        <div className="h-[1px] w-full bg-white/10 animate-item" />
        <div className="flex flex-col gap-6 text-white/50 text-sm leading-relaxed font-outfit animate-item">
          <p>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
          </p>
          <p>
            By continuing to navigate the site, you consent to our use of essential cookies specifically designed to maintain your global authentication state and cart synchronization.
          </p>
          <button className="max-w-max uppercase tracking-widest text-xs font-black border border-white/20 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-all duration-300 mt-4">
            Manage Preferences
          </button>
        </div>
      </div>
    </main>
  );
}
