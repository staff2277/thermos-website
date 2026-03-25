"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function DashboardPage() {
  const { user, isAuthLoading } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading || !user) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </main>
    );
  }

  const recentOrders = [
    { id: "TX-40292", date: "2026.03.20", status: "Delivered", item: products[0], total: "$24.99" },
    { id: "TX-40288", date: "2026.03.15", status: "In Transit", item: products[1], total: "$19.99" }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-48 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-16">
          <div className="flex items-center gap-10">
             <div className="w-32 h-32 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center text-5xl font-black text-accent shadow-[0_0_80px_rgba(41,129,33,0.3)]">
               {user.name[0]}
             </div>
             <div className="flex flex-col gap-3">
               <div className="flex items-center gap-4">
                 <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-widest text-accent">
                   {user.role} Status
                 </span>
                 <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                   Member since {user.joined}
                 </span>
               </div>
               <h1 className="text-6xl font-black tracking-tighter uppercase">{user.name}</h1>
               <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-xs font-bold text-green-500/80 tracking-tight">System Online</span>
                 </div>
                 <span className="text-white/40 text-xs font-medium">{user.email}</span>
               </div>
             </div>
          </div>

          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Edit Identity</button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Support Protocol</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Orders */}
          <div className="lg:col-span-2 flex flex-col gap-8">
             <h2 className="text-3xl font-black tracking-tighter uppercase">Recent Transmissions</h2>
             <div className="flex flex-col gap-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="group p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-between hover:bg-white/10 hover:border-accent/40 transition-all duration-500">
                    <div className="flex items-center gap-8">
                       <div className="relative w-24 h-24 bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                          <Image src={order.item.image} alt={order.item.name} fill className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                       </div>
                       <div className="flex flex-col gap-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-accent">{order.id}</p>
                          <h3 className="text-lg font-bold tracking-tight text-white">{order.item.name}</h3>
                          <p className="text-white/40 text-xs font-medium">Order placed {order.date}</p>
                       </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 text-right">
                       <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                         order.status === 'Delivered' ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-white/5 border-white/10 text-white/40'
                       }`}>
                         {order.status}
                       </span>
                       <p className="text-xl font-black">{order.total}</p>
                    </div>
                  </div>
                ))}
             </div>
             <Link href="/orders" className="w-fit mx-auto text-xs font-black uppercase tracking-widest text-white/20 hover:text-accent transition-colors border-b border-transparent hover:border-accent/30 pb-2">View All Orders History &rarr;</Link>
          </div>

          {/* Telemetry / Loyalty Card */}
          <div className="flex flex-col gap-8">
             <h2 className="text-3xl font-black tracking-tighter uppercase">Loyalty Data</h2>
             <div className="p-10 bg-gradient-to-br from-accent to-primary rounded-[3rem] relative overflow-hidden flex flex-col gap-10 shadow-[0_30px_60px_rgba(41,129,33,0.3)] min-h-[450px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
                
                <div className="flex flex-col gap-2 relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Thermos Intelligence</p>
                   <h3 className="text-4xl font-black text-white leading-tight">Pioneer <br /> Passport.</h3>
                </div>

                <div className="flex flex-col gap-6 relative z-10">
                   <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                         <p className="text-xs font-black uppercase tracking-widest text-white/50">Next Upgrade</p>
                         <p className="text-2xl font-black text-white">75%</p>
                      </div>
                      <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                         <div className="w-3/4 h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                      </div>
                   </div>
                   <p className="text-white/70 text-sm font-medium leading-relaxed">You are 250 points away from unlocking the 2026 Limited Edition "Forest Onyx" flask.</p>
                </div>

                <div className="mt-auto relative z-10 flex flex-col gap-2 pt-6 border-t border-white/10">
                   <div className="flex justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Stored Credit</p>
                      <p className="text-xl font-black text-white">$ 120.00</p>
                   </div>
                   <div className="flex justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Reward Points</p>
                      <p className="text-xl font-black text-white">3,240 pts</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
