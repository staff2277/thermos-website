"use client";

import Link from "next/link";
import ProfileIcon from "./icons/ProfileIcon";
import CartIcon from "./icons/CartIcon";
import { useAppStore } from "@/lib/store";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Navbar() {
  const { user, logout, cart, setIsCartOpen } = useAppStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef();

  const routes = [
    { name: "Shop", path: "/shop" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    if (isProfileOpen) {
      gsap.fromTo(dropdownRef.current, 
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isProfileOpen]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-[60] transition-all duration-300">
      <div className="max-w-7xl px-10 mx-auto py-6 flex items-center justify-between py-6 backdrop-blur-2xl">
        {/* Logo */}
        <Link
          href="/"
          className="text-outfit-24 font-bold tracking-tighter text-white"
        >
          THERMOS<span className="text-accent">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-outfit-14 text-white/70 hover:text-accent transition-all duration-300 font-medium"
            >
              {route.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-6">
          {/* Profile Section */}
          <div className="relative">
            {user ? (
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 group transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-[10px] font-black text-accent overflow-hidden">
                  {user.name[0]}
                </div>
                <span className="hidden md:block text-outfit-14 font-semibold text-white group-hover:text-accent transition-colors">
                   Profile
                </span>
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="group flex items-center gap-3 text-white transition-all"
              >
                <ProfileIcon color="currentColor" size={24} />
                <span className="text-outfit-14 font-semibold text-white group-hover:text-accent transition-colors">Sign In</span>
              </Link>
            )}

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div 
                ref={dropdownRef}
                className="absolute right-0 mt-4 w-56 bg-neutral-900 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 z-[70]"
              >
                <div className="px-4 py-3 border-b border-white/5 mb-2">
                  <p className="text-xs font-black text-white/40 uppercase tracking-widest leading-loose">Account</p>
                  <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                </div>
                <Link 
                  href="/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                  className="px-4 py-3 hover:bg-white/5 rounded-xl text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-all"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsProfileOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-red-500/10 rounded-xl text-xs font-black uppercase tracking-widest text-red-500 text-left transition-all mt-2 border-t border-white/5"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="w-[1px] h-4 bg-white/20" />

          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-white hover:text-accent transition-all duration-300 hover:scale-110 cursor-pointer relative"
          >
            <CartIcon color="currentColor" size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-[10px] text-white font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(41,129,33,0.5)]">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
