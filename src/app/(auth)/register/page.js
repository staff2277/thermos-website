"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const { login } = useAppStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock registration delay
    setTimeout(() => {
      login({
        id: `PIONEER-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: "pioneer"
      });
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-32 pb-16">
      <div className="w-full max-w-md flex flex-col gap-10">
        <div className="flex flex-col gap-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
             <span className="h-[1px] w-8 bg-accent" />
             <span className="text-accent font-black tracking-widest uppercase text-[10px]">Onboarding</span>
             <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Create Identity.</h1>
          <p className="text-white/30 font-medium">Join the frontier of thermal engineering.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 ml-4">Full Legal Name</label>
            <input 
              type="text"
              required
              placeholder="e.g. Erik Karlsson"
              className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 ml-4">Email Address</label>
            <input 
              type="email"
              required
              placeholder="vessel@uplink.io"
              className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 ml-4">Password</label>
              <input 
                type="password"
                required
                className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 ml-4">Confirm</label>
              <input 
                type="password"
                required
                className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-4">
             <input type="checkbox" required className="accent-accent w-4 h-4 rounded border-white/10 bg-white/5" id="terms" />
             <label htmlFor="terms" className="text-[10px] font-medium text-white/40 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
                I accept the <span className="text-white border-b border-white/20">Operational Protocols</span>
             </label>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full py-5 bg-white text-black font-black rounded-full uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
               <>Initialize Passport &rarr;</>
            )}
          </button>
        </form>

        <div className="flex flex-col gap-4 text-center">
          <p className="text-white/30 text-xs font-medium">
            Already registered?{" "}
            <Link href="/sign-in" className="text-accent font-black hover:underline underline-offset-4">
              Return to Uplink
            </Link>
          </p>
          <div className="w-full h-[1px] bg-white/5" />
          <Link href="/" className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">
            &larr; Return to Base
          </Link>
        </div>
      </div>
    </main>
  );
}
