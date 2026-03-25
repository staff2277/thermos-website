"use client";

import { useAppStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CartSidebar() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, isCartOpen, setIsCartOpen } = useAppStore();
  const sidebarRef = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    if (isCartOpen) {
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.5 });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.6, ease: "power4.out" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.5 });
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.6, ease: "power4.in" });
      document.body.style.overflow = "auto";
    }
  }, [isCartOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] opacity-0 pointer-events-none transition-opacity"
      />

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 h-screen w-full md:w-[480px] bg-neutral-950 z-[101] translate-x-full flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-white/5"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black tracking-tight text-white uppercase">Cart</h2>
            <span className="bg-accent text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {cart.length} Items
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-3 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-8 flex flex-col gap-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-6 opacity-40">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <p className="font-medium tracking-tight">Your vessel is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-xs font-black uppercase tracking-widest text-accent border-b border-accent/20 pb-1"
              >
                Explore Shop
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${item.selectedColor}-${idx}`} className="flex gap-6 group">
                <div className="relative w-24 h-32 bg-white/5 border border-white/5 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-white tracking-tight">{item.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{item.capacity}</span>
                      <div className="w-[1px] h-3 bg-white/10" />
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full border border-white/10"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-white/5 rounded-full px-3 py-1 border border-white/5">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.selectedColor, -1)}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-white min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.selectedColor, 1)}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-black text-white">{item.price}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.selectedColor)}
                  className="p-1 h-fit opacity-0 group-hover:opacity-100 transition-opacity text-white/20 hover:text-red-500"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-8 bg-neutral-900 border-t border-white/10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-white/40 font-bold uppercase text-xs tracking-widest">Subtotal</span>
              <span className="text-2xl font-black text-white">$ {cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-white/30 text-center uppercase tracking-[0.2em] px-4 leading-relaxed">
              Taxes and shipping calculated at checkout. <br /> Carbon neutral delivery included.
            </p>
            <Link 
              href="/checkout"
              className="w-full py-5 bg-accent text-white font-black rounded-full text-center tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(94,163,88,0.2)]"
            >
              Initiate Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
