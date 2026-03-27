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

export default function BatteryPage() {
  const containerRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".battery-hero-text", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      delay: 0.5
    });
    
    gsap.from(".battery-stat", {
      scrollTrigger: {
        trigger: ".battery-content",
        start: "top 75%",
      },
      scale: 0.9,
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out"
    });
    
    gsap.from(".battery-image", {
      scrollTrigger: {
        trigger: ".battery-content",
        start: "top 60%",
      },
      x: -50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-accent selection:text-white pb-32">
      {/* Hero Header */}
      <section className="relative w-full h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
           <Image
             src="/images/grid/pexels-sarah-chai-7266767.jpg"
             alt="Resilience"
             fill
             className="object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-[2000ms]"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black z-10" />
        </div>
        
        <div className="relative z-20 flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-3 battery-hero-text">
            <span className="h-[1px] w-12 bg-accent opacity-50" />
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]">
              Endurance Core
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic battery-hero-text leading-[0.9]">
            UNYIELDING <br/>
            <span className="text-accent">RESILIENCE.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl font-outfit mt-4 leading-relaxed battery-hero-text">
            Outlast the harshest environments. Our next-generation power core is engineered to survive drops, extreme climates, and relentless daily use without losing a single degree of performance.
          </p>
        </div>
      </section>

      {/* Resilience Content */}
      <UnifiedScrollPath>
      <section className="battery-content w-full py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.1] battery-stat">
                Engineered for <br />
                <span className="text-accent italic">Extremes.</span>
              </h2>
              <p className="text-white/60 font-outfit text-lg leading-relaxed battery-stat max-w-lg">
                The battery casing is forged from high-impact polycarbonate, surrounded by a shock-absorbing silicone matrix. Whether it&apos;s a 10-foot drop onto concrete or sub-zero mountain temperatures, the core stays active, keeping your smart-monitoring systems and temperature control fully operational.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-8 border-t border-white/10 pt-8 battery-stat">
                 <div>
                    <p className="text-accent font-mono text-3xl font-black mb-2">24<span className="text-lg text-white/50 ml-1">HRS</span></p>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/60">Continuous Active Monitoring</p>
                 </div>
                 <div>
                    <p className="text-accent font-mono text-3xl font-black mb-2">-20<span className="text-lg text-white/50 ml-1">°C</span></p>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/60">Minimum Operating Temp</p>
                 </div>
              </div>
            </div>
            
            <div className="battery-image relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10">
              <Image
                src="/images/grid/grid-11.png"
                alt="Battery Core Engineering"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-overlay" />
            </div>
          </div>
          
          <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-[3rem] p-12 md:p-20 text-center flex flex-col items-center gap-10 battery-stat">
            <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center">
                 <div className="w-4 h-4 bg-accent rounded-full animate-pulse shadow-[0_0_20px_rgba(94,163,88,0.8)]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl leading-snug">
              NEVER LOSE <span className="text-accent italic">POWER</span> WHEN YOU NEED IT MOST.
            </h3>
            <Link
               href="/shop"
               className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            >
               Shop The Collection
            </Link>
          </div>
          
        </div>
      </section>
      </UnifiedScrollPath>
    </main>
  );
}
