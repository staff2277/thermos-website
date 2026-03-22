"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const products = [
  {
    id: "arctic-studio",
    name: "Arctic Studio",
    price: "$65.00",
    capacity: "500ml",
    colors: ["#E3E9F2", "#B8C6DB"],
    image: "/images/cards/Arctic Studio Thermos.png",
  },
  {
    id: "cinematic-pro",
    name: "Cinematic Pro",
    price: "$75.00",
    capacity: "1L",
    colors: ["#0F172A", "#334155"],
    image: "/images/cards/Cinematic Thermos Product Photography.png",
  },
  {
    id: "arctic-mist",
    name: "Arctic Mist",
    price: "$45.00",
    capacity: "500ml",
    colors: ["#FFFFFF", "#E0F2F1"],
    image: "/images/cards/Thermos Engraved Bottle (1).jpg",
  },
  {
    id: "obsidian-prime",
    name: "Obsidian Prime",
    price: "$55.00",
    capacity: "750ml",
    colors: ["#1A1A1A", "#333333"],
    image: "/images/cards/Thermos Engraved Bottle (2).jpg",
  },
  {
    id: "deep-forest",
    name: "Deep Forest",
    price: "$49.00",
    capacity: "600ml",
    colors: ["#31482F", "#1B2E1A"],
    image: "/images/cards/Thermos Engraved Bottle (3).jpg",
  },
  {
    id: "ruby-core",
    name: "Ruby Core",
    price: "$52.00",
    capacity: "600ml",
    colors: ["#6D0000", "#9E0000"],
    image: "/images/cards/Thermos Engraved Bottle (4).jpg",
  },
];

export default function ProductShowcaseSection() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Mouse gradient movement
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (!pathRef.current) return;

    const length = pathRef.current.getTotalLength();
    
    // Set initial dash state
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Animate dash offset based on scroll
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1, // Faster responsiveness
        invalidateOnRefresh: true,
      },
    });
  }, { scope: containerRef });

  useEffect(() => {
    // Horizontal wheel scroll logic
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const handleWheel = (e) => {
        const isAtStart = scrollContainer.scrollLeft <= 0;
        const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1;
        const isScrollingUp = e.deltaY < 0;
        const isScrollingDown = e.deltaY > 0;
        if ((isAtStart && isScrollingUp) || (isAtEnd && isScrollingDown)) return;
        e.preventDefault();
        gsap.to(scrollContainer, {
          scrollLeft: scrollContainer.scrollLeft + e.deltaY * 2,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      };
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-48 bg-black overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(49, 72, 47, 0.3) 0%, rgba(0, 0, 0, 1) 80%)`
      }}
    >
      {/* Background SVG Animated Path */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-100">
        <svg 
          ref={svgRef}
          viewBox="0 0 1000 4000" 
          className="w-full h-full" 
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 500 0 C 850 600, 150 1200, 500 1800 S 850 3000, 500 3600 S 150 4800, 500 5400"
            fill="none"
            stroke="#5EA358"
            strokeWidth="50"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="filter drop-shadow-[0_0_15px_rgba(94,163,88,0.4)]"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-12 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/5">
          <div className="flex flex-col gap-4">
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs">
              Legacy Series
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight">
              Select Your <br />
              <span className="text-accent">Vessel.</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="group px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-accent hover:border-accent transition-all duration-500 font-black flex items-center gap-3"
          >
            Explore Collective
            <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative w-full py-12">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory lg:snap-none hide-scrollbar group"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex-shrink-0 w-[300px] md:w-[380px] lg:w-[450px] snap-center lg:snap-align-none"
              >
                <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] rounded-[3rem] overflow-hidden group/card bg-neutral-900 border border-white/5 transition-all duration-700 hover:border-accent/40 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[1200ms] group-hover/card:scale-110 grayscale-[30%] group-hover/card:grayscale-0"
                    sizes="(max-width: 768px) 300px, 450px"
                  />
                  
                  {/* Glassmorphic Overlay (30%) */}
                  <div className="absolute inset-x-0 bottom-0 h-[30%] bg-black/60 backdrop-blur-3xl border-t border-white/10 p-10 flex flex-col justify-between transition-all duration-700 group-hover/card:h-[35%]">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-white font-black text-2xl md:text-3xl tracking-tighter">
                          {product.name}
                        </h3>
                        <p className="text-white/40 text-sm font-bold tracking-widest uppercase">
                          {product.capacity} / Edition
                        </p>
                      </div>
                      <span className="text-white font-black text-xl">
                        {product.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover/card:translate-y-0">
                      <div className="flex gap-3">
                        {product.colors.map((color, idx) => (
                          <div 
                            key={idx}
                            className="w-6 h-6 rounded-full border-2 border-white/20 shadow-xl"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-[12px] text-accent font-black tracking-widest border-b-2 border-accent pb-1">
                        GET ACCESS
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Premium Gradient Overlays */}
          <div className="absolute top-0 right-0 h-full w-48 bg-gradient-to-l from-black via-black/30 to-transparent pointer-events-none z-10 hidden lg:block" />
          <div className="absolute top-0 left-0 h-full w-48 bg-gradient-to-r from-black via-black/30 to-transparent pointer-events-none z-10 hidden lg:block" />
        </div>

        {/* CTA Bottom */}
        <div className="flex justify-center pt-16">
          <Link
            href="/shop"
            className="group relative px-16 py-7 bg-white text-black text-outfit-14 font-black rounded-full transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_30px_80px_rgba(255,255,255,0.05)] overflow-hidden"
          >
            <span className="relative z-10">Limited Release &rarr;</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 text-white transition-transform duration-500 flex items-center justify-center font-black">
              SECURE YOURS
            </div>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
