"use client";

import { useState } from "react";
import Link from "next/link";
import { reviews } from "@/data/reviews";

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const VerifiedBadge = () => (
  <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-accent/60 bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
    Verified Owner
  </div>
);

export default function ReviewsPage() {
  const [filter, setFilter] = useState(5);
  
  const filteredReviews = filter === "All" 
    ? reviews 
    : reviews.filter(r => r.rating === filter);

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-white/5 pb-16">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-accent" />
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs">
              COMMUNITY VOICES
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight">
            TRUST IN <br />
            <span className="text-white/20">PERFORMANCE.</span>
          </h1>
          <p className="text-white/40 text-lg font-medium leading-relaxed max-w-lg">
            Hear from the explorers, commuters, and designers who rely on our thermal engineering every single day.
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-4 p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} />)}
          </div>
          <p className="text-3xl font-black tracking-tight">4.9 / 5.0</p>
          <p className="text-white/30 text-[10px] uppercase font-black tracking-widest">
            Based on 500+ Verified Reviews
          </p>
        </div>
      </div>

      {/* Filter / Tabs */}
      <div className="flex flex-wrap items-center gap-4 mb-16">
        {["All", 5, 4].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-8 py-3 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-500 border ${
              filter === f
                ? "bg-accent text-white border-accent shadow-[0_10px_30px_rgba(94,163,88,0.3)]"
                : "bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {f === "All" ? "All Reviews" : `${f} Star Reviews`}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReviews.map((review) => (
          <div 
            key={review.id} 
            className="group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col gap-8 transition-all duration-700 hover:bg-white/10 hover:border-accent/30 hover:-translate-y-2 relative overflow-hidden"
          >
            {/* Background Accent Gradient Pulse */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="flex justify-between items-start">
               {/* Fixed missing Avatar visual by using initials if images aren't present */}
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center font-black text-accent">
                   {review.author[0]}
                 </div>
                 <div className="flex flex-col">
                   <h3 className="font-bold text-lg tracking-tight">{review.author}</h3>
                   <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">{review.location}</span>
                 </div>
               </div>
               <VerifiedBadge />
            </div>

            <div className="flex gap-1 border-b border-white/5 pb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} />
              ))}
            </div>

            <div className="flex-grow flex flex-col gap-4">
              <span className="text-accent/60 text-[10px] font-black tracking-widest uppercase">
                Product: {review.product}
              </span>
              <p className="text-white/70 leading-relaxed font-outfit font-medium">
                "{review.content}"
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-black tracking-widest text-white/20 uppercase">
              <span>{review.date}</span>
              <span className="text-accent/40 group-hover:text-accent transition-colors">Shared Experience</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bottom */}
      <div className="mt-32 p-12 lg:p-20 bg-accent rounded-[3rem] flex flex-col items-center gap-10 text-center relative overflow-hidden group/cta">
        {/* Animated Rings Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[300px] h-[300px] border border-white rounded-full animate-ping delay-100" />
          <div className="absolute w-[500px] h-[500px] border border-white rounded-full animate-ping delay-1000" />
        </div>

        <div className="flex flex-col gap-4 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Ready to experience <br />the peak of performance?
          </h2>
          <p className="text-black/60 font-medium max-w-xl mx-auto text-lg">
            Join thousands of others who have elevated their hydration with our engineering.
          </p>
        </div>

        <Link 
          href="/shop" 
          className="relative z-10 px-12 py-5 bg-white text-black font-black rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl uppercase tracking-widest text-xs"
        >
          Explore All Vessels
        </Link>
      </div>
    </main>
  );
}
