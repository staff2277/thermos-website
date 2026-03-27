"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function DashboardPage() {
  const { user, isAuthLoading, logout } = useAppStore();
  const router = useRouter();
  const containerRef = useRef();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isAuthLoading, router]);

  useGSAP(() => {
    if (isAuthLoading || !user) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".dash-header", {
      y: 30,
      opacity: 0,
      duration: 1.2,
    })
    .from(".dash-metric", {
      scale: 0.9,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8
    }, "-=0.6")
    .from(".dash-order", {
      x: -30,
      opacity: 0,
      stagger: 0.1,
      duration: 1
    }, "-=0.6")
    .from(".dash-card", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.7)"
    }, "-=1");

    // Continuous rotation for the avatar ring
    gsap.to(".avatar-ring", {
       rotation: 360,
       duration: 20,
       repeat: -1,
       ease: "linear"
    });

  }, { scope: containerRef, dependencies: [isAuthLoading, user] });

  if (isAuthLoading || !user) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 border-2 border-white/10 border-t-accent rounded-full animate-spin" />
           <p className="text-xs font-black uppercase tracking-[0.3em] text-accent animate-pulse">Authenticating Protocol</p>
        </div>
      </main>
    );
  }

  const recentOrders = [
    { id: "TX-40292", date: "2026.03.20", status: "Delivered", item: products[0], total: "$45.00" },
    { id: "TX-40288", date: "2026.03.15", status: "In Transit", item: products[1], total: "$120.00" }
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white pt-40 pb-32 px-6 md:px-12 lg:px-24 selection:bg-accent selection:text-white">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        
        {/* Profile Header */}
        <div className="dash-header bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative z-10 w-full md:w-auto text-center md:text-left">
             <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
               {/* Animated Ring */}
               <svg className="avatar-ring absolute inset-0 w-full h-full text-white/10 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
                  <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="100 200" className="drop-shadow-[0_0_10px_rgba(94,163,88,1)]" />
               </svg>
               <div className="absolute inset-2 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-5xl md:text-6xl font-black text-white shadow-inner">
                 {user.name[0].toUpperCase()}
               </div>
             </div>
             
             <div className="flex flex-col gap-4 justify-center h-full pt-2">
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                 <span className="px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                   {user.role} Status
                 </span>
                 <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                   ID: {user.id.split("-")[0]}
                 </span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">{user.name}</h1>
               
               <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-outfit text-white/50">
                 <span>{user.email}</span>
                 <span className="w-1 h-1 bg-white/20 rounded-full" />
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(94,163,88,0.8)] animate-pulse" />
                   <span className="text-accent tracking-widest text-[10px] uppercase font-bold">Encrypted Connection</span>
                 </div>
               </div>
             </div>
          </div>

          <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto relative z-10">
            <button className="flex-1 md:flex-none px-8 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95">
              Protocol Config
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 md:flex-none px-8 py-4 bg-transparent border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
            >
              Terminate Session
            </button>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Thermal Efficiency", value: "98.4%", desc: "Lifetime Average", color: "text-white" },
            { label: "Vessels Deployed", value: "02", desc: "Active Hardware", color: "text-white" },
            { label: "Carbon Offset", value: "48kg", desc: "Plastics Saved", color: "text-accent" },
            { label: "Global Ranking", value: "Top 8%", desc: "Pioneer Status", color: "text-white" }
          ].map((stat, idx) => (
             <div key={idx} className="dash-metric bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 flex flex-col gap-4 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
               <div className="absolute inset-x-0 bottom-0 h-1 bg-white/5 group-hover:bg-accent/50 transition-colors" />
               <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
               <h3 className={`text-4xl md:text-5xl font-black tracking-tighter ${stat.color}`}>{stat.value}</h3>
               <p className="text-xs font-outfit text-white/30">{stat.desc}</p>
             </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Recent Orders (Transmissions) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
             <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">Recent Transmissions</h2>
                <Link href="/orders" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-accent transition-colors">View All &rarr;</Link>
             </div>
             
             <div className="flex flex-col gap-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="dash-order group p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-6">
                       <div className="relative w-20 h-20 md:w-24 md:h-24 bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500">
                          <Image src={order.item.image} alt={order.item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                       </div>
                       <div className="flex flex-col gap-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">{order.id}</p>
                          <h3 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">{order.item.name}</h3>
                          <p className="text-white/40 text-xs font-outfit">Validated on {order.date}</p>
                       </div>
                    </div>
                    
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${
                         order.status === 'Delivered' ? 'bg-accent/10 border-accent/30 text-accent shadow-[0_0_15px_rgba(94,163,88,0.2)]' : 'bg-white/5 border-white/10 text-white/50'
                       }`}>
                         {order.status}
                       </span>
                       <p className="text-xl md:text-2xl font-black tracking-tight">{order.total}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Telemetry / Loyalty Card */}
          <div className="flex flex-col gap-8">
             <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">Loyalty Node</h2>
             </div>
             
             <div className="dash-card p-8 md:p-10 bg-gradient-to-br from-neutral-800 to-black rounded-[2.5rem] relative overflow-hidden flex flex-col gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 min-h-[450px] group">
                {/* Holographic Element */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-white/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen" />
                
                {/* Card Chip Aesthetic */}
                <div className="absolute top-8 right-8 w-12 h-16 border rounded-md border-white/20 flex flex-col justify-between p-1 opacity-50">
                   <div className="w-full h-[1px] bg-white/20" />
                   <div className="w-full h-[1px] bg-white/20" />
                   <div className="w-full h-[1px] bg-white/20" />
                </div>
                
                <div className="flex flex-col gap-2 relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/80">Classified Tier</p>
                   <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter">PIONEER <br /> PASSPORT.</h3>
                </div>

                <div className="flex flex-col gap-6 relative z-10 mt-4">
                   <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-end">
                         <p className="text-xs font-black uppercase tracking-widest text-white/50">Next Clearance</p>
                         <p className="text-3xl font-black text-white tracking-tighter">75%</p>
                      </div>
                      <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden relative">
                         <div className="absolute inset-0 bg-white/10" />
                         <div className="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(94,163,88,1)] w-3/4 relative">
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-pulse" />
                         </div>
                      </div>
                   </div>
                   <p className="text-white/60 text-sm font-outfit leading-relaxed">
                     Acquire 250 more telemetry points to decrypt the 2026 Limited Edition <span className="text-white font-bold max-w-max border-b border-accent">Forest Onyx</span> hardware.
                   </p>
                </div>

                <div className="mt-auto relative z-10 flex flex-col gap-3 pt-6 border-t border-white/10">
                   <div className="flex justify-between items-center group/item cursor-pointer">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 group-hover/item:text-white transition-colors">Stored Currency</p>
                      <p className="text-xl font-black text-white font-mono">$ 120.00</p>
                   </div>
                   <div className="flex justify-between items-center group/item cursor-pointer">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 group-hover/item:text-white transition-colors">Reward Data</p>
                      <p className="text-xl font-black text-accent font-mono">3,240 pts</p>
                   </div>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
