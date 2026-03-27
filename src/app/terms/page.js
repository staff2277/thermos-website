"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TermsPage() {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.from(".animate-item", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white pt-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase animate-item">
          Terms of <span className="text-accent italic">Service.</span>
        </h1>
        <div className="h-[1px] w-full bg-white/10 animate-item" />
        <div className="flex flex-col gap-6 text-white/50 text-sm leading-relaxed font-outfit animate-item">
          <p>
            By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use any services.
          </p>
          <p className="font-bold text-white uppercase text-xs tracking-widest mt-4">Hardware Warranty</p>
          <p>
            All Thermos vessels are backed by an extensive multi-year warranty. We guarantee performance in maintaining thermal isolation. Modifying the device voids this warranty.
          </p>
          <p className="font-bold text-white uppercase text-xs tracking-widest mt-4">Software Metrics</p>
          <p>
            Your dynamic telemetry score is calculated locally and only synchronized to your authenticated session. Abuse of the loyalty system will result in account termination.
          </p>
        </div>
      </div>
    </main>
  );
}
