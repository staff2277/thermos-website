"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const { login } = useAppStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "alex@example.com",
    password: "password123"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call to /api/auth/login
    login({
      name: "Alex Marcus",
      email: formData.email,
      role: "pioneer"
    });
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-md flex flex-col gap-10">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-5xl font-black tracking-tighter">WELCOME BACK.</h1>
          <p className="text-white/40 font-medium">Access your thermal telemetry and orders.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 ml-4">Email Address</label>
            <input 
              type="email" 
              required
              className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
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

          <button 
            type="submit"
            className="mt-4 w-full py-5 bg-white text-black font-black rounded-full uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
          >
            Authenticate
          </button>
        </form>

        <div className="flex flex-col gap-4 text-center">
          <p className="text-white/30 text-xs font-medium">
            New to Thermos?{" "}
            <Link href="/register" className="text-accent font-black hover:underline underline-offset-4">
              Create an Identity
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
