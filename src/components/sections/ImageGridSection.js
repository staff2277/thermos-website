"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const allImages = [
  "/images/grid/grid-1.jpg",
  "/images/grid/grid-2.png",
  "/images/grid/grid-3.jfif",
  "/images/grid/grid-4.png",
  "/images/grid/grid-5.png",
  "/images/grid/grid-6.png",
  "/images/grid/grid-7.jpg",
  "/images/grid/grid-8.png",
  "/images/grid/grid-9.png",
  "/images/grid/grid-10.png",
  "/images/grid/grid-11.png",
];

export default function ImageGridSection() {
  const containerRef = useRef();
  const [visibleImages, setVisibleImages] = useState(allImages.slice(0, 5));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImages(prev => {
        const next = [...prev];
        const slotToReplace = Math.floor(Math.random() * 5);
        const availablePool = allImages.filter(img => !prev.includes(img));
        
        if (availablePool.length > 0) {
          const newImg = availablePool[Math.floor(Math.random() * availablePool.length)];
          next[slotToReplace] = newImg;
        }
        
        return next;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.from(".grid-item", {
      opacity: 0,
      scale: 0.9,
      y: 50,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen px-6 md:px-12 lg:px-24 bg-transparent z-10 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 font-outfit">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-accent opacity-50" />
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs">
              Live Feed
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight text-white uppercase italic">
            DYNAMIC <span className="text-accent underline decoration-white/10 underline-offset-8">FLUX.</span>
          </h2>
          <p className="text-white/40 max-w-md font-bold uppercase tracking-widest text-[10px]">
             Real-time aesthetic synchronization // Community Spotlight
          </p>
        </div>

        {/* Regular Mosaic Grid: 3 columns, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 md:grid-rows-2 gap-4 h-[50vh] md:h-[60vh] w-full">
          {/* Big Item */}
          <div className="grid-item relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900 col-span-1 md:col-span-1 md:row-span-2 group">
              <Image 
                key={visibleImages[0]}
                src={visibleImages[0]}
                alt="Feed 1"
                fill
                className="object-cover animate-swap-fade scale-105 group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          <div className="grid-item relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900 col-span-1 md:col-span-1 row-span-1 group">
              <Image 
                key={visibleImages[1]}
                src={visibleImages[1]}
                alt="Feed 2"
                fill
                className="object-cover animate-swap-fade group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
          </div>

          <div className="grid-item relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900 col-span-1 md:col-span-1 row-span-1 group">
              <Image 
                key={visibleImages[2]}
                src={visibleImages[2]}
                alt="Feed 3"
                fill
                className="object-cover animate-swap-fade group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 25vw, 33vw"
              />
          </div>

          <div className="grid-item relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900 col-span-1 md:col-span-1 row-span-1 group">
              <Image 
                key={visibleImages[3]}
                src={visibleImages[3]}
                alt="Feed 4"
                fill
                className="object-cover animate-swap-fade group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 25vw, 33vw"
              />
          </div>

          <div className="grid-item relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900 col-span-1 md:col-span-1 row-span-1 group">
              <Image 
                key={visibleImages[4]}
                src={visibleImages[4]}
                alt="Feed 5"
                fill
                className="object-cover animate-swap-fade group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 25vw, 33vw"
              />
          </div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <style jsx global>{`
        @keyframes swapFade {
          0% { opacity: 0.5; filter: blur(4px) scale(1.1); transform: translateY(10px); }
          100% { opacity: 1; filter: blur(0px) scale(1); transform: translateY(0px); }
        }
        .animate-swap-fade {
          animation: swapFade 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>
    </section>
  );
}
