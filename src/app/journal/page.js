"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function JournalPage() {
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
          Field <span className="text-accent italic">Journal.</span>
        </h1>
        <div className="h-[1px] w-full bg-white/10 animate-item" />
        <div className="flex flex-col gap-12 animate-item">
          
          <div className="group cursor-pointer">
             <p className="text-accent font-mono text-xs mb-2">Issue 004 // 12.10.2025</p>
             <h3 className="text-3xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">Surviving The Arctic Circle</h3>
             <p className="text-white/50 font-outfit">A detailed account of our lead engineer's expedition to test the vacuum lock at -50°C.</p>
          </div>

          <div className="group cursor-pointer">
             <p className="text-accent font-mono text-xs mb-2">Issue 003 // 08.22.2025</p>
             <h3 className="text-3xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">The Titanium Standard</h3>
             <p className="text-white/50 font-outfit">Why we abandoned aluminum and committed entirely to aerospace-grade titanium.</p>
          </div>
          
        </div>
      </div>
    </main>
  );
}
