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

export default function RegisterPage() {
  const { login } = useAppStore();
  const router = useRouter();
  const containerRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".reg-hero-text", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
      }).from(
        ".reg-form-card",
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
    setIsLoading(true);

    setTimeout(() => {
      login({
        id: `PIONEER-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: "pioneer",
      });
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center py-20"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/grid/grid-8.png"
          alt="Technical Interior"
          fill
          className="object-cover opacity-10 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(94,163,88,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col gap-12">
        <div className="flex flex-col gap-6 text-center">
          <div className="flex items-center justify-center gap-3 reg-hero-text">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px]">
              Onboarding Initiative
            </span>
            <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] reg-hero-text italic">
            CREATE <br />
            <span
              className="bg-clip-text text-transparent animate-gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                backgroundSize: "200% auto",
                backgroundPosition: "0% 50%",
              }}
            >
              IDENTITY.
            </span>
          </h1>
          <p className="text-white/40 font-outfit max-w-sm mx-auto reg-hero-text">
            Join the collective. Decrypt your potential. Forge your path in
            thermal engineering.
          </p>
        </div>

        <div className="reg-form-card bg-neutral-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 relative z-10"
          >
            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 ml-4">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Marcus Thorne"
                className="bg-black/50 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-black/30 placeholder:text-white/5"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 ml-4">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="vessel@uplink.io"
                className="bg-black/50 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-black/30 placeholder:text-white/5"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 ml-4">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  className="bg-black/50 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-black/30"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 ml-4">
                  Verify Password
                </label>
                <input
                  type="password"
                  required
                  className="bg-black/50 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-black/30"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-start gap-3 px-4 mt-2">
              <input
                type="checkbox"
                required
                className="mt-1 accent-accent"
                id="terms"
              />
              <label
                htmlFor="terms"
                className="text-[9px] font-medium text-white/30 uppercase tracking-[0.2em] leading-relaxed cursor-pointer hover:text-white transition-colors"
              >
                I ACKNOWLEDGE THE{" "}
                <span className="text-white border-b border-white/20">
                  OPERATIONAL PROTOCOLS
                </span>{" "}
                AND COMMIT TO THE FRONTIER ETHOS.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full py-6 bg-white text-black font-black rounded-full uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>Sign Up &rarr;</>
              )}
            </button>
          </form>

          <div className="flex flex-col gap-6 mt-12 text-center relative z-10">
            <p className="text-white/30 text-xs font-medium uppercase tracking-widest text-[10px]">
              Already commissioned?{" "}
              <Link
                href="/sign-in"
                className="text-accent font-black hover:text-white transition-colors border-b border-accent/20 hover:border-white pb-1"
              >
                Sign In
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
