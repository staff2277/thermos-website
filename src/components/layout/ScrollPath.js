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
    // We only want the path on certain pages (Home/Shop etc.) 
    // and specifically NOT the hero section (which we'll handle by positioning)
    
    const path = pathRef.current;
    if (!path) return;

    // Length of the path
    const pathLength = path.getTotalLength();
    
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 2.5, // Slow, weighted progress for 'rope' feel
      onUpdate: (self) => {
        const progress = self.progress;
        // Draw the path as the user scrolls
        gsap.to(path, {
          strokeDashoffset: pathLength * (1 - progress),
          duration: 1.5,
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
    <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.15] overflow-hidden mix-blend-screen">
      <svg 
        ref={svgRef}
        className="w-full h-[300vh] translate-y-[100vh]" // Offset so it starts AFTER the hero (100vh)
        viewBox="0 0 1000 3000" 
        preserveAspectRatio="xMidYMin meet"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M 500 0 
             C 700 300 300 600 500 900 
             S 700 1500 400 1800 
             S 600 2400 500 3000"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ vectorEffect: 'non-scaling-stroke' }}
          className="transition-all duration-300"
        />
        
        {/* Shadow layer for the rope depth */}
        <path
          d="M 500 0 
             C 700 300 300 600 500 900 
             S 700 1500 400 1800 
             S 600 2400 500 3000"
          stroke="var(--color-accent)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ vectorEffect: 'non-scaling-stroke' }}
          className="opacity-10 blur-md translate-x-1 translate-y-2"
        />
      </svg>
    </div>
  );
}
