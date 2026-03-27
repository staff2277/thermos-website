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
  "/images/grid/grid-12.jfif",
  "/images/grid/grid-13.jfif",
  "/images/grid/grid-14.jfif",
  "/images/grid/grid-15.jpg",
];

function FlippableImage({ src, alt, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isFlipping, setIsFlipping] = useState(false);
  
  useEffect(() => {
    if (src !== currentSrc) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setCurrentSrc(src);
      }, 400); 
      
      const resetTimer = setTimeout(() => {
        setIsFlipping(false);
      }, 800); 
      
      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    }
  }, [src, currentSrc]);

  return (
    <div className="w-full h-full" style={{ perspective: "1000px" }}>
      <div 
        className="relative w-full h-full transition-transform duration-800"
        style={{ 
          transformStyle: "preserve-3d",
          transform: isFlipping ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        <div className="absolute inset-0 backface-hidden">
          <Image 
            src={currentSrc}
            alt={alt}
            fill
            {...props}
            className="object-cover"
          />
        </div>
        <div 
          className="absolute inset-0 backface-hidden bg-neutral-900 flex items-center justify-center border border-white/5 shadow-2xl"
          style={{ transform: "rotateY(180deg)" }}
        >
           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center">
                 <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function ImageGridSection() {
  const containerRef = useRef();
  // Show 8 images now
  const [visibleImages, setVisibleImages] = useState(allImages.slice(0, 8));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImages(prev => {
        const next = [...prev];
        const slotToReplace = Math.floor(Math.random() * 8);
        const availablePool = allImages.filter(img => !prev.includes(img));
        
        if (availablePool.length > 0) {
          const newImg = availablePool[Math.floor(Math.random() * availablePool.length)];
          next[slotToReplace] = newImg;
        }
        
        return next;
      });
    }, 2000);
    
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
        <div className="flex flex-col gap-4 max-w-2xl px-4">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-accent opacity-50" />
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]">
              Active Ensemble
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight text-white uppercase italic">
            DYNAMIC <span className="text-accent underline decoration-white/10 underline-offset-8">SPOTLIGHT.</span>
          </h2>
        </div>

        {/* Regular 4x2 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[55vh] md:h-[65vh] w-full px-4">
          {visibleImages.map((src, idx) => (
             <div key={idx} className="grid-item relative overflow-visible rounded-[2rem] border border-white/5 bg-neutral-900 shadow-xl">
                 <FlippableImage 
                    src={src}
                    alt={`Spotlight ${idx + 1}`}
                    sizes="(max-width: 768px) 50vw, 25vw"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-[2rem]" />
             </div>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <style jsx global>{`
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
