"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function UnifiedScrollPath({ children }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    // Initial setup
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Synchronous drawing animation
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true, // Instant catch-up
        invalidateOnRefresh: true,
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      {/* Unified Background Path */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-100 overflow-hidden mix-blend-screen">
        <svg
          viewBox="0 0 1000 6000"
          className="w-full h-full scale-[1.1]" // Slightly overscale to hide edges
          preserveAspectRatio="none"
        >
          {/* Subtle Glow Layer */}
          <path
            d="M 500 0 
               C 500 400, 850 400, 850 1500 
               S 150 2600, 150 3000 
               S 850 3400, 850 4500 
               S 500 5600, 500 6000"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="50"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="opacity-20 blur-2xl"
          />

          {/* Main Drawing Path */}
          <path
            ref={pathRef}
            d="M 500 0 
               C 500 400, 850 400, 850 1500 
               S 150 2600, 150 3000 
               S 850 3400, 850 4500 
               S 500 5600, 500 6000"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="drop-shadow-[0_0_15px_rgba(94,163,88,0.8)] transition-all duration-300"
          />

          <path
            d="M 500 0 
               C 500 400, 850 400, 850 1500 
               S 150 2600, 150 3000 
               S 850 3400, 850 4500 
               S 500 5600, 500 6000"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="opacity-20 translate-y-[-1px]"
          />
        </svg>
      </div>

      {/* Content Layers */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
