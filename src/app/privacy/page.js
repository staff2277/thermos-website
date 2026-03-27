"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PrivacyPage() {
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
          Privacy <span className="text-accent italic">Policy.</span>
        </h1>
        <div className="h-[1px] w-full bg-white/10 animate-item" />
        <div className="flex flex-col gap-6 text-white/50 text-sm leading-relaxed font-outfit animate-item">
          <p>
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Thermos.
          </p>
          <p className="font-bold text-white uppercase text-xs tracking-widest mt-4">Personal Information We Collect</p>
          <p>
            When you visit our site, we automatically collect certain information about your device, including information about your web browser, IP address, and time zone.
          </p>
          <p>
            We use this information to maintain global authentication logic and optimize your dashboard experience across devices. We do not sell your personal data.
          </p>
        </div>
      </div>
    </main>
  );
}
