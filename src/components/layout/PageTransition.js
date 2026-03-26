"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const containerRef = useRef();
  const curtainRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    // Reset and Shutter Up
    tl.to(curtainRef.current, {
      y: "0%",
      duration: 0,
    })
    .to(curtainRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power4.inOut",
    })
    .fromTo(containerRef.current, 
      { opacity: 0, y: 100, scale: 0.95 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1, 
        ease: "power4.out",
        onComplete: () => {
          gsap.set(containerRef.current, { clearProps: "all" });
        }
      },
      "-=0.6" // Start content slide while curtain is mid-way
    );

  }, [pathname]);

  return (
    <div className="relative w-full">
      {/* Parallax Shutter Layer */}
      <div 
        ref={curtainRef}
        className="fixed inset-0 bg-black z-[100] pointer-events-none"
      />
      
      <div ref={containerRef} className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
