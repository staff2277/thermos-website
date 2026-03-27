"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UnifiedScrollPath from "@/components/layout/UnifiedScrollPath";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function TechPage() {
  const containerRef = useRef();

  useGSAP(() => {
    // Animations for the tech sequence
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".tech-hero-text", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      delay: 0.5
    });
    
    gsap.from(".tech-element", {
      scrollTrigger: {
        trigger: ".tech-grid-section",
        start: "top 70%",
      },
      scale: 0.9,
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out"
    });
    
    // Continuous pulse animation
    gsap.to(".tech-pulse", {
      opacity: 0.3,
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  const techFeatures = [
    {
      title: "THERMAL CORE",
      desc: "Our proprietary double-walled titanium construction eliminates heat transfer completely.",
      spec: "0.01 W/m.K Conductivity"
    },
    {
      title: "VACUUM LOCK",
      desc: "An aerospace-grade vacuum sealed between layers creates a perfect insulating void.",
      spec: "10^-6 Torr Pressure"
    },
    {
      title: "PHOTON SHIELD",
      desc: "An ultra-thin copper reflection layer bounces thermal radiation back into the vessel.",
      spec: "99% IR Reflection"
    },
    {
      title: "KINETIC LID",
      desc: "A precision-machined cap that forms an impenetrable seal down to the molecular level.",
      spec: "Zero-Leak Guarantee"
    }
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-neutral-950 text-white selection:bg-accent selection:text-white pb-32">
      {/* Hero Header */}
      <section className="relative w-full h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
           {/* Abstract tech grid background */}
           <div className="w-full h-full" style={{
             backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
             backgroundSize: "40px 40px",
             perspective: "1000px"
           }}>
             <div className="w-full h-full bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950" />
           </div>
        </div>
        
        <div className="relative z-20 flex flex-col gap-6 max-w-5xl">
          <div className="flex items-center gap-3 tech-hero-text">
            <span className="h-[1px] w-12 bg-accent opacity-50" />
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]">
              Engineering
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic tech-hero-text leading-[0.9]">
            ABSOLUTE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">ISOLATION.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl font-outfit mt-4 tech-hero-text">
            Behind the minimalist exterior lies a complex system of thermal defense mechanisms designed to defy thermodynamics.
          </p>
        </div>
      </section>

      {/* Tech Grid Content */}
      <UnifiedScrollPath>
        <section className="tech-grid-section w-full px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              {/* Central Hero Image inside Grid */}
              <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 relative aspect-square rounded-[2.5rem] bg-neutral-900 border border-white/10 overflow-hidden tech-element flex items-center justify-center p-12">
                <div className="absolute top-8 left-8 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent tech-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">Active Scan</span>
                </div>
                
                <div className="relative w-full h-full">
                  <Image
                    src="/images/grid/grid-8.png"
                    alt="Thermos Technology Diagram"
                    fill
                    className="object-contain filter drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-1000 hover:scale-105"
                  />
                  {/* Overlay measuring lines aesthetic */}
                  <div className="absolute inset-0 border border-accent/20 rounded-full scale-75 opacity-20 pointer-events-none" />
                  <div className="absolute inset-0 border border-accent/20 rounded-full scale-90 opacity-10 pointer-events-none" />
                </div>
              </div>

              {/* Feature Cards */}
              {techFeatures.map((feature, idx) => (
                <div key={idx} className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between gap-8 tech-element group hover:bg-neutral-800/80 transition-colors duration-500">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 font-outfit leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Specification</p>
                    <p className="text-xl font-mono text-accent mt-1">{feature.spec}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 flex justify-center tech-element">
               <Link
                 href="/shop"
                 className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
               >
                 Aquire Technology
               </Link>
            </div>
          </div>
        </section>
      </UnifiedScrollPath>
    </main>
  );
}
