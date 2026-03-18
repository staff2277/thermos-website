"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

export default function HeroSectionContent() {
  const containerRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Entrance animation
      tl.from(".animate-item", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.2,
      });

      // Continuous gradient animation moving left at high speed
      gsap.to(".animate-gradient-text", {
        backgroundPosition: "-200% 50%",
        duration: 0.5,
        repeat: -1,
        ease: "linear",
      });
    },
    { scope: containerRef },
  );

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center px-6 md:px-12 lg:px-24 pointer-events-none z-10"
    >
      <div className="w-full md:w-[45%] lg:w-[40%] p-8 md:p-12 rounded-[2.5rem] bg-white/10 backdrop-blur-sm border-[0.05] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-8 pointer-events-auto transform transition-all duration-700 hover:bg-white/15">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 animate-item">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent font-bold tracking-widest uppercase text-xs">
              Excellence in Hydration
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-outfit-72 text-white font-bold leading-[1.05] tracking-tight animate-item">
            Precision <br />
            Meet{" "}
            <span
              className="bg-clip-text text-transparent animate-gradient-text"
              style={{
                backgroundImage: "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                backgroundSize: "200% auto",
                backgroundPosition: "0% 50%",
              }}
            >
              Purity.
            </span>
          </h1>
        </div>

        <p className="text-md md:text-md text-white/80 max-w-md leading-relaxed font-outfit animate-item">
          Next-generation thermal engineering wrapped in a timeless aesthetic.
          Experience the peak of performance.
        </p>

        <div className="flex flex-wrap gap-5 mt-2 animate-item">
          <Link
            href="/shop"
            className="group relative px-10 py-5 bg-accent text-white text-outfit-14 font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(41,129,33,0.3)] active:scale-95"
          >
            Shop Collection
          </Link>

          <Link
            href="/discover"
            className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-outfit-14 font-bold rounded-full hover:bg-white/20 transition-all duration-300 active:scale-95"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
