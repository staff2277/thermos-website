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

import { products } from "@/data/products";
const showcaseProducts = products.slice(0, 6);

export default function ProductShowcaseSection() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const svgRef = useRef(null);

  useGSAP(
    () => {
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
          start: "top center",
          end: "bottom center",
          scrub: 1, // Faster responsiveness
          invalidateOnRefresh: true,
        },
      });

      // Header entrance animation
      gsap.from(".animate-product", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });
      // Continuous gradient animation
      gsap.to(".animate-gradient-text", {
        backgroundPosition: "-200% 50%",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    // Horizontal wheel scroll logic
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const handleWheel = (e) => {
        const isAtStart = scrollContainer.scrollLeft <= 0;
        const isAtEnd =
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth - 1;
        const isScrollingUp = e.deltaY < 0;
        const isScrollingDown = e.deltaY > 0;
        if ((isAtStart && isScrollingUp) || (isAtEnd && isScrollingDown))
          return;
        e.preventDefault();
        gsap.to(scrollContainer, {
          scrollLeft: scrollContainer.scrollLeft + e.deltaY * 2,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 bg-transparent overflow-hidden"
    >
      {/* Background SVG Animated Path - Handled globally by ScrollPath */}
      
      <div className="max-w-[95%] mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-12 relative z-20">
        <div className="flex flex-col border md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/5">
          <div className="flex flex-col gap-4">
            <span className="animate-product text-accent font-bold tracking-[0.4em] uppercase text-xs">
              Legacy Series
            </span>
            <h2 className="animate-product text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight">
              Select Your <br />
              <span
                className="bg-clip-text text-transparent animate-gradient-text"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                  backgroundSize: "200% auto",
                  backgroundPosition: "0% 50%",
                }}
              >
                Vessel.
              </span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="animate-product group px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-accent hover:border-accent transition-all duration-500 font-black flex items-center gap-3"
          >
            Explore Collective
            <span className="group-hover:translate-x-2 transition-transform">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative -mx-6 md:-mx-12 lg:-mx-24 py-12 ">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory lg:snap-none hide-scrollbar group px-6 md:px-12 lg:px-24"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {showcaseProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[260px] md:w-[320px] lg:w-[380px] snap-center lg:snap-align-none bg-transparent"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="block relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group/card bg-neutral-900 border border-white/5 transition-all duration-700 hover:border-accent/40 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[1200ms] group-hover/card:scale-110 grayscale-[30%] group-hover/card:grayscale-0"
                    sizes="(max-width: 768px) 260px, 380px"
                  />

                  {/* Glassmorphic Overlay (30%) */}
                  <div className="absolute inset-x-0 bottom-0 h-[30%] backdrop-blur-md border-t border-white/10 p-6 md:p-8 flex flex-col justify-between transition-all duration-700 group-hover/card:h-[35%]">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-white font-black text-xl md:text-2xl tracking-tighter">
                          {product.name}
                        </h3>
                        <p className="text-white/40 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                          {product.capacity} / Edition
                        </p>
                      </div>
                      <span className="text-white font-black text-lg md:text-xl">
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
        <div className="flex justify-center">
          <Link
            href="/shop"
            className="group relative px-16 py-7 bg-white text-black text-outfit-14 font-black rounded-full transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_30px_80px_rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center"
          >
            <span className="relative z-10 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
              Limited Release &rarr;
            </span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 text-white transition-all duration-500 delay-75 flex items-center justify-center font-black">
              SECURE YOURS
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
