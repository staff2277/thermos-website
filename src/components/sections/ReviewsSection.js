"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { reviews } from "@/data/reviews";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const Star = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-accent"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function ReviewsSection() {
  const containerRef = useRef();
  const scrollRef = useRef();

  useGSAP(
    () => {
      // Check if horizontal scrolling is needed based on width
      const scrollWidth = scrollRef.current.scrollWidth;
      const windowWidth = window.innerWidth;

      if (scrollWidth > windowWidth) {
        gsap.to(scrollRef.current, {
          x: -(scrollWidth - windowWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }

      // Header entrance animation
      gsap.from(".animate-review", {
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

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-transparent overflow-hidden flex flex-col justify-center py-16 sm:py-24 md:py-32"
    >
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 mb-12 flex flex-col gap-4 md:gap-6">
        <div className="flex items-center gap-3">
          <span className="animate-review h-[1px] w-8 md:w-12 bg-accent opacity-50" />
          <span className="animate-review text-accent/60 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">
            Global Recognition
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <h2 className="animate-review text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight">
            WORLD CLASS <br />
            <span
              className="bg-clip-text text-transparent animate-gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                backgroundSize: "200% auto",
                backgroundPosition: "0% 50%",
              }}
            >
              TESTIMONIALS.
            </span>
          </h2>
          <Link
            href="/reviews"
            className="animate-review group px-8 py-4 md:px-10 md:py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-accent hover:border-accent transition-all duration-500 font-black flex items-center justify-center gap-3 w-full md:w-auto"
          >
            Read All Reviews
            <span className="group-hover:translate-x-2 transition-transform">
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-8 px-6 md:px-12 lg:px-24 justify-center items-center flex-wrap">
        {reviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="review-card flex-shrink-0 w-[300px] md:w-[450px] p-10 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col gap-8 relative transition-all duration-700 hover:bg-white/10 hover:border-accent/30"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 border border-accent/30 rounded-full flex items-center justify-center font-black text-accent">
                  {review.author[0]}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg tracking-tight">
                    {review.author}
                  </h3>
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">
                    {review.location}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
            </div>

            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed font-outfit">
              "{review.content}"
            </p>

            <div className="pt-6 border-t border-white/5 flex flex-col gap-1">
              <span className="text-white/30 text-[10px] font-black tracking-widest uppercase">
                Verified Performance / {review.product}
              </span>
            </div>
          </div>
        ))}
        {/* Placeholder for "View More" card at the end of slider */}
        <Link
          href="/reviews"
          className="review-card flex-shrink-0 w-[200px] md:w-[300px] bg-accent/5 border border-accent/20 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 group/more transition-all hover:bg-accent/10"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover/more:scale-110 transition-transform">
            &rarr;
          </div>
          <span className="text-accent font-black tracking-widest uppercase text-xs">
            View All
          </span>
        </Link>
      </div>
    </section>
  );
}
