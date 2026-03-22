"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      // If we are at the very start and trying to scroll up, OR at the very end and trying to scroll down,
      // allow default page scrolling. Otherwise, trap it for horizontal scroll.
      const isAtStart = scrollContainer.scrollLeft <= 0;
      const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1;
      
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      if ((isAtStart && isScrollingUp) || (isAtEnd && isScrollingDown)) {
        return;
      }

      // Intercept wheel for horizontal movement
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
  }, []);

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <span className="text-accent font-bold tracking-widest uppercase text-xs">
              Superior Design
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-outfit-45 text-white font-bold tracking-tight">
              Select Your Bottle
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-white hover:text-accent transition-all duration-300 font-bold group flex items-center gap-2"
          >
            Explore Full Shop
            <span className="group-hover:translate-x-1 transition-transform inline-block opacity-70">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative w-full">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory lg:snap-none hide-scrollbar group transition-all"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[420px] snap-center lg:snap-align-none"
              >
                <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group/card bg-neutral-900 border border-white/5 transition-all duration-500 hover:border-accent/30 shadow-2xl">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 420px"
                  />
                  
                  {/* Blurred Overlay (lower 30%) */}
                  <div className="absolute inset-x-0 bottom-0 h-[30%] bg-black/20 backdrop-blur-2xl border-t border-white/10 p-8 flex flex-col justify-between transition-all duration-500 group-hover/card:h-[35%] group-hover/card:bg-black/40">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight">
                          {product.name}
                        </h3>
                        <p className="text-white/50 text-sm font-medium">
                          {product.capacity} capacity
                        </p>
                      </div>
                      <span className="text-accent font-bold text-lg bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                        {product.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100">
                      <div className="flex gap-2.5">
                        {product.colors.map((color, idx) => (
                          <div 
                            key={idx}
                            className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-accent uppercase tracking-[0.2em] font-black">
                        View Product &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Premium Fade Overlays */}
          <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-black via-black/40 to-transparent pointer-events-none z-10 hidden lg:block" />
          <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none z-10 hidden lg:block" />
        </div>

        {/* CTA Bottom */}
        <div className="flex justify-center mt-6">
          <Link
            href="/shop"
            className="group relative px-14 py-6 bg-accent text-white text-outfit-14 font-black rounded-full transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_20px_60px_rgba(41,129,33,0.4)] overflow-hidden"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
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
