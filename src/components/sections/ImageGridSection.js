"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const gridItems = [
  { url: "/images/grid/grid-1.jpg", span: "grid-item col-span-2 row-span-2", curve: "rounded-[4rem] rounded-tr-[12rem] rounded-bl-[8rem]" },
  { url: "/images/grid/grid-2.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-[6rem] rounded-tl-[2rem]" },
  { url: "/images/grid/grid-3.jfif", span: "grid-item col-span-1 row-span-2", curve: "rounded-full aspect-[2/3]" },
  { url: "/images/grid/grid-4.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-[3rem] rounded-br-[10rem]" },
  { url: "/images/grid/grid-5.png", span: "grid-item col-span-2 row-span-1", curve: "rounded-[10rem] rounded-tl-[10rem] rounded-br-[8rem]" },
  { url: "/images/grid/grid-6.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-[6rem] rounded-tr-[2rem]" },
  { url: "/images/grid/grid-7.jpg", span: "grid-item col-span-1 row-span-1", curve: "rounded-[2rem] rounded-bl-[10rem]" },
  { url: "/images/grid/grid-8.png", span: "grid-item col-span-2 row-span-2", curve: "rounded-[10rem] rounded-tl-[4rem] rounded-br-[16rem]" },
  { url: "/images/grid/grid-9.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-full" },
  { url: "/images/grid/grid-10.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-[6rem] rounded-tr-[4rem]" },
  { url: "/images/grid/grid-11.png", span: "grid-item col-span-2 row-span-1", curve: "rounded-tl-[12rem] rounded-tr-[4rem] rounded-br-[10rem] rounded-bl-[2rem]" },
];

export default function ImageGridSection() {
  const containerRef = useRef();
  
  useGSAP(() => {
    // Reveal animation
    gsap.from(".grid-item", {
      opacity: 0,
      scale: 0.9,
      y: 100,
      stagger: {
        amount: 0.8,
        grid: [4, 3],
        from: "start"
      },
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      }
    });

    // Parallax effect on grid items
    gsap.to(".grid-item-inner-content", {
      y: (i) => (i % 2 === 0 ? -40 : 40),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-48 px-6 md:px-12 lg:px-24 bg-transparent z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-24 font-outfit">
        <div className="flex flex-col gap-6 max-w-2xl relative">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-accent opacity-50" />
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs">
              Visual Narrative
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight text-white mb-4 uppercase">
            DESIGNED FOR <br />
            <span className="text-accent italic">IMPACT.</span>
          </h2>
          <p className="text-white/40 max-w-lg font-medium leading-relaxed">
            The intersection of high-performance engineering and street aesthetics. 
            Every curve, every finish, meticulously crafted for those who refuse to settle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[250px] md:auto-rows-[400px]">
          {gridItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`grid-item relative overflow-hidden group/item ${item.span} ${item.curve} shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 bg-neutral-900/50`}
            >
              <div className="grid-item-inner-content w-full h-full relative overflow-hidden">
                 <Image 
                    src={item.url}
                    alt={`Grid Item ${idx + 1}`}
                    fill
                    className="object-cover transition-all duration-[1200ms] ease-out group-hover/item:scale-110 grayscale-[40%] group-hover/item:grayscale-0"
                    sizes="(max-width: 768px) 50vw, 25vw"
                 />
                
                {/* Floating label on hover */}
                <div className="absolute bottom-8 left-8 opacity-0 group-hover/item:opacity-100 transition-all duration-700 translate-y-4 group-hover/item:translate-y-0 pointer-events-none z-20">
                   <div className="px-6 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Thermos // {idx + 1}</span>
                   </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
