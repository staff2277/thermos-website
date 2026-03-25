"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const features = [
  {
    title: "Thermal Precision",
    description: "Multi-layered vacuum tech maintaining ±1°C for over 24 hours.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M2 12h20M12 2l4 4M12 2l-4 4M12 22l4-4M12 22l-4-4" />
      </svg>
    ),
  },
  {
    title: "Surgical Steel",
    description: "18/8 food-grade stainless steel that resists flavor transfer and odors.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Indestructible",
    description: "Impact-resistant powder coating designed for the most extreme climates.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.from(".feature-card", {
      opacity: 0,
      y: 100,
      duration: 1.2,
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-48 bg-black overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-accent" />
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs">
              Engineering Specs
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight text-white">
            THE PEAK OF <br />
            <span className="text-white/20">PERFORMANCE.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="feature-card group p-12 bg-white/5 border border-white/5 rounded-[3rem] flex flex-col gap-8 transition-all duration-700 hover:bg-white/10 hover:border-accent/40 hover:-translate-y-4"
            >
              <div className="w-16 h-16 bg-accent border border-accent/40 rounded-3xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(94,163,88,0.3)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                {feature.icon}
              </div>
              
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-black text-white tracking-tight">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between group-hover:text-accent transition-colors">
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-accent/60">MIL-SPEC</span>
                 <span className="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
