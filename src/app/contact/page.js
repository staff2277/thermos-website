"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ContactPage() {
  const containerRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  useGSAP(() => {
    // Continuous gradient animation
    gsap.to(".animate-gradient-text", {
      backgroundPosition: "-200% 50%",
      duration: 4,
      repeat: -1,
      ease: "linear",
    });
  }, { scope: containerRef });

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-32 pb-24 px-6">
        <div className="flex flex-col items-center text-center gap-8 max-w-xl p-12 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white text-3xl shadow-[0_0_50px_rgba(94,163,88,0.4)]">
            ✓
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-black tracking-tight">Transmission Received.</h1>
            <p className="text-white/40 leading-relaxed font-medium">
              Your inquiry has been encrypted and sent to our team at <span className="text-accent underline">thermostest@gmail.com</span>. Expect a response within 24 hours.
            </p>
          </div>
          <Link 
            href="/" 
            className="px-10 py-4 bg-white text-black font-black rounded-full hover:scale-105 transition-all text-sm tracking-widest uppercase"
          >
            Back to Base
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white pt-48 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
        
        {/* Contact Info (Left) */}
        <div className="flex-1 flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-accent" />
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight">
              ESTABLISH <br />
              <span
                className="bg-clip-text text-transparent animate-gradient-text"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                  backgroundSize: "200% auto",
                  backgroundPosition: "0% 50%",
                }}
              >
                CONTACT.
              </span>
            </h1>
            <p className="text-white/40 text-lg font-medium leading-relaxed max-w-md">
              Whether you're exploring partnership opportunities or need technical support for your vessel, our team is standing by.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent/60">Primary Email</span>
              <a href="mailto:thermostest@gmail.com" className="text-2xl font-bold hover:text-accent transition-colors">thermostest@gmail.com</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent/60">Global HQ</span>
              <p className="text-xl font-medium text-white/80">72 Tech Avenue, Stockholm, 114 26, Sweden</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent/60">Hours</span>
              <p className="text-xl font-medium text-white/80">Mon — Fri / 09:00 — 18:00 CET</p>
            </div>
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="flex-1">
          <form 
            onSubmit={handleSubmit}
            className="p-10 md:p-14 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl flex flex-col gap-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                <input 
                  required
                  type="text"
                  placeholder="Alexander Marcus"
                  className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                <input 
                  required
                  type="email"
                  placeholder="name@nexus.com"
                  className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Transmission Category</label>
              <select 
                className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10 appearance-none cursor-pointer"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option value="Inquiry">General Inquiry</option>
                <option value="Support">Technical Support</option>
                <option value="Partnership">Partnership</option>
                <option value="Media">Media & Press</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Message Content</label>
              <textarea 
                required
                rows="5"
                placeholder="How can we assist your journey?"
                className="bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-sm focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="mt-4 px-12 py-5 bg-accent text-white font-black rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(94,163,88,0.2)] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden group relative"
            >
              <span className={isSubmitting ? "opacity-0" : "opacity-100"}>Send Transmission</span>
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
