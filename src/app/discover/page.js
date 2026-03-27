"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UnifiedScrollPath from "@/components/layout/UnifiedScrollPath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function DiscoverPage() {
  const containerRef = useRef();

  useGSAP(() => {
    // Animations for the hero sequence
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".discover-hero-text", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      delay: 0.5
    });
    
    gsap.from(".discover-image-block", {
      scrollTrigger: {
        trigger: ".discover-content-1",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.3
    });
    
    // Continuous gradient animation
    gsap.to(".animate-gradient-text", {
      backgroundPosition: "-200% 50%",
      duration: 4,
      repeat: -1,
      ease: "linear",
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-accent selection:text-white pb-32">
      {/* Hero Header */}
      <section className="relative w-full h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
           <Image
             src="/images/grid/pexels-ketut-subiyanto-5038852.jpg"
             alt="Heritage"
             fill
             className="object-cover opacity-30"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
        </div>
        
        <div className="relative z-20 flex flex-col gap-6 max-w-4xl mx-auto text-center items-center">
          <div className="flex items-center gap-3 discover-hero-text">
            <span className="h-[1px] w-12 bg-accent opacity-50" />
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]">
              Our Heritage
            </span>
            <span className="h-[1px] w-12 bg-accent opacity-50" />
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic discover-hero-text">
            FORGED BY <br/>
            <span className="text-accent underline decoration-white/10 underline-offset-8">TIME.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl font-outfit leading-relaxed discover-hero-text">
            We didn&apos;t just create a vessel; we redefined the boundaries of thermal engineering. From our first prototype to the global standard.
          </p>
        </div>
      </section>

      {/* Story Content Blocks */}
      <UnifiedScrollPath>
      <section className="discover-content-1 w-full py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="discover-image-block relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10">
            <Image
              src="/images/grid/grid-6.png"
              alt="Craftsmanship"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          
          <div className="flex flex-col gap-8 discover-image-block">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-accent" />
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs">
                The Origin
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">
              BORN IN <br/> 
              <span
                className="bg-clip-text text-transparent animate-gradient-text"
                style={{
                  backgroundImage: "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                  backgroundSize: "200% auto",
                  backgroundPosition: "0% 50%",
                }}
              >
                EXTREMES.
              </span>
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed font-outfit">
              Our journey began in the harshest environments on earth. Mountaineers, deep-sea explorers, and arctic researchers needed a way to keep their vital hydration at temperature without fail.
            </p>
            <p className="text-white/60 text-lg leading-relaxed font-outfit">
              By rethinking the vacuum seal and utilizing aerospace-grade materials, we crafted a thermos that doesn&apos;t just hold heat—it locks it in a suspension of time.
            </p>
          </div>
        </div>
      </section>

      <section className="discover-content-2 w-full py-32 px-6 md:px-12 lg:px-24 bg-neutral-950 rounded-[4rem] border border-white/5 mx-auto max-w-[1800px]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-accent" />
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs">
                Vision
              </span>
            </div>
            <p className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight max-w-5xl text-white/90">
              &quot;WE BELIEVE THAT GREAT DESIGN <span className="text-accent italic">DISAPPEARS</span>, LEAVING ONLY PURE PERFORMANCE.&quot;
            </p>
            <p className="tracking-widest uppercase font-bold text-white/50 text-sm mt-4">— The Founders</p>
        </div>
      </section>
      </UnifiedScrollPath>
    </main>
  );
}
