"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const { progress } = useProgress();
  const [percent, setPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const [forceComplete, setForceComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Fallback timeout to prevent getting stuck on pages without 3D models
    const timer = setTimeout(() => {
      setForceComplete(true);
    }, 2500); // Max 2.5s wait

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Smoothen the progress display
    // Force target to 100 if we reach timeout
    const targetProgress = forceComplete ? 100 : progress;

    gsap.to({ val: percent }, {
      val: targetProgress,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: function() {
        setPercent(Math.floor(this.targets()[0].val));
      }
    });

    if ((targetProgress >= 100) && !isReady) {
      setTimeout(() => {
        setIsReady(true);
        // Exiting animation
        const tl = gsap.timeline({
          onComplete: () => {
             // Small delay after animation to ensure no flicker
             setTimeout(() => setIsHidden(true), 100);
             if (onComplete) onComplete();
          }
        });

        tl.to(".loader-content", {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in"
        })
        .to(".pixel-block", {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          stagger: {
            grid: [10, 20],
            from: "random",
            amount: 0.5
          },
          ease: "power3.inOut"
        }, "-=0.2")
        .to(".loader-bg", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4");
      }, 500);
    }
  }, [progress, isReady, forceComplete]);

  if (isHidden) return null;


  return (
    <div className="loader-bg fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Pixel Transition Grid (Background) */}
      <div className="absolute inset-0 grid grid-cols-10 md:grid-cols-20 grid-rows-10 pointer-events-none">
        {[...Array(200)].map((_, i) => (
          <div 
            key={i} 
            className="pixel-block bg-white/5 border border-white/5 w-full h-full"
          />
        ))}
      </div>

      {/* Loader UI */}
      <div className="loader-content relative z-10 flex flex-col items-center gap-12">
        <div className="flex flex-col gap-4 text-center">
            <div className="flex items-center justify-center gap-3">
               <span className="h-[1px] w-8 bg-accent" />
               <span className="text-accent font-black tracking-widest uppercase text-[10px]">Initialize System</span>
               <span className="h-[1px] w-8 bg-accent" />
            </div>
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white tabular-nums">
                {percent.toString().padStart(3, "0")}
            </h1>
        </div>

        <div className="w-64 h-[2px] bg-white/10 rounded-full relative overflow-hidden">
            <div 
                className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_15px_rgba(94,163,88,1)] transition-all duration-300"
                style={{ width: `${percent}%` }}
            />
        </div>

        <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 animate-pulse">
                Uplink Authorization in Progress
            </p>
            <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                    <div 
                        key={i}
                        className="w-1 h-1 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}
            </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 flex flex-col gap-1">
          <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Protocol: THERMOS-OS_v4.2</p>
          <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Base: Stockholm // Sector 7</p>
      </div>
    </div>
  );
}
