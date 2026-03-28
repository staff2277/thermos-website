"use client";

import { useState, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function SignInPage() {
  const { login } = useAppStore();
  const router = useRouter();
  const containerRef = useRef();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".auth-hero-text", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
      }).from(
        ".auth-form-card",
        {
          y: 40,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.8",
      );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      id: "ALEX-40292-X",
      name: "Alex Marcus",
      email: formData.email,
      role: "pioneer",
    });

    setFormData({ email: "", password: "" });
    router.push("/dashboard");
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center py-20"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/grid/pexels-sarah-chai-7266767.jpg"
          alt="Atmosphere"
          fill
          className="object-cover opacity-20 filter grayscale hover:grayscale-0 transition-all duration-[3000ms]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="relative z-10 w-full max-w-xl px-6 flex flex-col gap-12">
        <div className="flex flex-col gap-6 text-center">
          <div className="flex items-center justify-center gap-3 auth-hero-text">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px]">
              Uplink Access
            </span>
            <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] auth-hero-text italic">
            WELCOME <br />
            <span
              className="bg-clip-text text-transparent animate-gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                backgroundSize: "200% auto",
                backgroundPosition: "0% 50%",
              }}
            >
              BACK.
            </span>
          </h1>
          <p className="text-white/40 font-outfit max-w-sm mx-auto auth-hero-text">
            Restore connection to your personal thermal telemetry and deployment
            data.
          </p>
        </div>

        <div className="auth-form-card bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 relative z-10"
          >
            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-accent/80 ml-4">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="vessel@uplink.io"
                className="bg-neutral-900/50 border border-white/10 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-accent/60 transition-all hover:bg-neutral-800/50 placeholder:text-white/10"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-accent/80 ml-4">
                Secure Password
              </label>
              <input
                type="password"
                required
                placeholder="Digital Cipher"
                className="bg-neutral-900/50 border border-white/10 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-accent/60 transition-all hover:bg-neutral-800/50 placeholder:text-white/10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="group relative w-full py-6 bg-white text-black font-black rounded-full uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10">Initialize Access &rarr;</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </form>

          <div className="flex flex-col gap-6 mt-12 text-center relative z-10">
            <p className="text-white/30 text-xs font-medium uppercase tracking-widest text-[10px]">
              New to the frontier?{" "}
              <Link
                href="/register"
                className="text-accent font-black hover:text-white transition-colors border-b border-accent/20 hover:border-white pb-1"
              >
                Sign Up
              </Link>
            </p>
            <div className="w-full h-[1px] bg-white/5" />
            <Link
              href="/"
              className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] hover:text-white transition-colors"
            >
              &larr; Return to Base
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
