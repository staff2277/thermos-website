"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

import * as THREE from "three";

const allImages = [
  { src: "/images/grid/grid-1.jpg", portrait: true, aspect: 0.75 },
  { src: "/images/grid/grid-2.png", portrait: true, aspect: 0.66 },
  { src: "/images/grid/grid-4.png", portrait: true, aspect: 0.66 },
  { src: "/images/grid/grid-5.png", portrait: true, aspect: 0.7 },
  { src: "/images/grid/grid-6.png", portrait: false, aspect: 1.77 },
  { src: "/images/grid/grid-7.jpg", portrait: true, aspect: 0.8 },
  { src: "/images/grid/grid-8.png", portrait: false, aspect: 1.79 },
  { src: "/images/grid/grid-9.png", portrait: true, aspect: 0.67 },
  { src: "/images/grid/grid-10.png", portrait: true, aspect: 0.8 },
  { src: "/images/grid/grid-11.png", portrait: true, aspect: 0.8 },
  { src: "/images/grid/grid-15.jpg", portrait: true, aspect: 0.79 },
  { src: "/images/grid/pexels-ketut-subiyanto-5038852.jpg", portrait: false, aspect: 1.5 },
  { src: "/images/grid/pexels-sarah-chai-7266767.jpg", portrait: false, aspect: 1.5 },
];

function FlippableImage({ item, alt, ...props }) {
  const [frontItem, setFrontItem] = useState(item);
  const [backItem, setBackItem] = useState(item);
  const [isFlipped, setIsFlipped] = useState(false);
  const [lastItem, setLastItem] = useState(item);
  
  useEffect(() => {
    if (item.src !== lastItem.src) {
      // If we are currently showing front, put new item on back and flip
      if (!isFlipped) {
        setBackItem(item);
        setIsFlipped(true);
      } else {
        // If we are showing back, put new item on front and flip back
        setFrontItem(item);
        setIsFlipped(false);
      }
      setLastItem(item);
    }
  }, [item, isFlipped, lastItem]);

  return (
    <div className="w-full h-full" style={{ perspective: "1200px" }}>
      <div 
        className="relative w-full h-full transition-transform duration-[1000ms]"
        style={{ 
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden z-20">
          <Image 
            src={frontItem.src}
            alt={alt}
            fill
            {...props}
            priority={true}
            unoptimized={true}
            className="object-cover"
            style={{ filter: "contrast(1.02) brightness(1.02)" }}
          />
        </div>
        
        {/* Back Face (True 2nd side) */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <Image 
            src={backItem.src}
            alt={alt}
            fill
            {...props}
            priority={true}
            unoptimized={true}
            className="object-cover"
            style={{ filter: "contrast(1.02) brightness(1.02)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ImageGridSection() {
  const containerRef = useRef();
  const [visibleItems, setVisibleItems] = useState(allImages.slice(0, 5));
  
  // Preloading into THREE Manager so the global Loader counts them
  useEffect(() => {
    const manager = THREE.DefaultLoadingManager;
    const loader = new THREE.TextureLoader(manager);
    
    allImages.forEach(img => {
      loader.load(img.src);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleItems(prev => {
        const next = [...prev];
        const slotToReplace = Math.floor(Math.random() * 5);
        const availablePool = allImages.filter(img => !prev.some(p => p.src === img.src));
        
        if (availablePool.length > 0) {
          const newItem = availablePool[Math.floor(Math.random() * availablePool.length)];
          next[slotToReplace] = newItem;
        }
        
        return next;
      });
    }, 3000); // Slowed down to 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.from(".grid-item", {
      opacity: 0,
      scale: 0.9,
      x: 50,
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
      className="relative w-full h-screen px-4 md:px-12 bg-transparent z-10 flex flex-col justify-center overflow-hidden"
    >
      {/* Hidden pool to force browser to keep all images in cache */}
      <div className="hidden" aria-hidden="true">
        {allImages.map((img, i) => (
          <Image key={i} src={img.src} alt="preload" width={100} height={100} priority={true} />
        ))}
      </div>

      <div className="max-w-[1800px] mx-auto w-full flex flex-col gap-12 font-outfit">
        <div className="flex flex-col gap-4 max-w-2xl px-4">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-accent opacity-50" />
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]">
              Active Horizon
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight text-white uppercase italic">
            DYNAMIC <span className="text-accent">STRIDE.</span>
          </h2>
        </div>

        {/* Single Horizontal Row (Aspect-aware) */}
        <div className="flex flex-nowrap gap-2 md:gap-4 h-[40vh] md:h-[50vh] w-full items-stretch perspective-2000">
          {visibleItems.map((item, idx) => (
             <div 
                key={idx} 
                className="grid-item relative overflow-visible rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-neutral-900 shadow-2xl transition-all duration-[1200ms] ease-in-out"
                style={{ 
                  flex: `${item.aspect}`,
                  minWidth: item.portrait ? "180px" : "300px"
                }}
             >
                 <FlippableImage 
                    item={item}
                    alt={`Dynamic Item ${idx + 1}`}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-[2rem] md:rounded-[3rem] z-20" />
             </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center opacity-20 px-4">
           <span className="text-[10px] font-black tracking-[0.5em] uppercase">Horizon Sync: Active</span>
           <div className="flex gap-8">
             <span className="text-[10px] font-black tracking-[0.5em] uppercase text-accent animate-pulse">Scanning Field...</span>
             <span className="text-[10px] font-black tracking-[0.5em] uppercase">v4.2</span>
           </div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <style jsx global>{`
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .perspective-2000 {
           perspective: 2000px;
        }
      `}</style>
    </section>
  );
}
