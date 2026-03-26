"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollPath() {
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      opacity: 0
    });

    // Fade in path only after hero
    gsap.to(path, {
      opacity: 0.4,
      scrollTrigger: {
        trigger: "body",
        start: "100vh top",
        toggleActions: "play none none reverse"
      }
    });

    // Drawing with weighted 'rope' feel
    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "100vh top",
      end: "bottom bottom",
      scrub: 3.5, // Much slower, 'weighted' feel
      onUpdate: (self) => {
        gsap.to(path, {
          strokeDashoffset: pathLength * (1 - self.progress),
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [pathname]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden mix-blend-screen overflow-visible">
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%" 
        viewBox="0 0 1000 15000" 
        preserveAspectRatio="xMidYMin slice"
        fill="none" 
        className="blur-[2px]"
      >
        <path
          ref={pathRef}
          d="M 500 0 
             C 800 500, 200 1000, 500 1500 
             S 800 2500, 500 3000 
             S 200 4000, 500 4500 
             S 800 6000, 500 6500 
             S 200 8000, 500 8500 
             S 800 10500, 500 11000 
             S 200 13000, 500 13500 
             S 800 14500, 500 15000"
          stroke="var(--color-accent)"
          strokeWidth="45"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ vectorEffect: 'non-scaling-stroke' }}
          className="filter drop-shadow-[0_0_20px_rgba(94,163,88,0.5)]"
        />
      </svg>
    </div>
  );
}
