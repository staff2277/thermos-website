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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const menuRef = useRef();
  const hamburgerRef = useRef();

  const routes = [
    { name: "Shop", path: "/shop" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];

  // Handle click outside for both profile dropdown and mobile menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isProfileOpen) {
      gsap.fromTo(dropdownRef.current, 
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isProfileOpen]);

  // Handle Hamburger Morphing and Menu Animation
  useEffect(() => {
    const tl = gsap.timeline();
    const q = gsap.utils.selector(hamburgerRef);

    if (isMenuOpen) {
      // Morph to X
      gsap.to(q(".line-1"), { y: 8, rotate: 45, duration: 0.3, ease: "power2.inOut" });
      gsap.to(q(".line-2"), { opacity: 0, scaleX: 0, duration: 0.2, ease: "power2.inOut" });
      gsap.to(q(".line-3"), { y: -8, rotate: -45, duration: 0.3, ease: "power2.inOut" });
      
      // Animate Menu In
      gsap.fromTo(menuRef.current,
        { opacity: 0, x: 20, pointerEvents: "none" },
        { opacity: 1, x: 0, pointerEvents: "auto", duration: 0.4, ease: "power3.out" }
      );
    } else {
      // Morph back to Hamburger
      gsap.to(q(".line-1"), { y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(q(".line-2"), { opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.inOut" });
      gsap.to(q(".line-3"), { y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" });
      
      // Animate Menu Out
      gsap.to(menuRef.current, { opacity: 0, x: 20, pointerEvents: "none", duration: 0.3, ease: "power3.in" });
    }
  }, [isMenuOpen]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-[60] transition-all duration-300">
      <div className="max-w-7xl px-6 md:px-10 mx-auto flex items-center justify-between py-6 backdrop-blur-2xl">
        {/* Logo */}
        <Link
          href="/"
          className="text-outfit-24 font-bold tracking-tighter text-white z-[70]"
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

        {/* Action Buttons & Hamburger */}
        <div className="flex items-center gap-4 md:gap-6 z-[70]">
          {/* Profile Section (Desktop Only) */}
          <div className="relative hidden md:block">
            {user ? (
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 group transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-[10px] font-black text-accent overflow-hidden">
                  {user.name[0]}
                </div>
                <span className="text-outfit-14 font-semibold text-white group-hover:text-accent transition-colors">
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

          <div className="hidden md:block w-[1px] h-4 bg-white/20" />

          {/* Cart Button (Desktop Only) */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hidden md:flex text-white hover:text-accent transition-all duration-300 hover:scale-110 cursor-pointer relative"
          >
            <CartIcon color="currentColor" size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-[10px] text-white font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(41,129,33,0.5)]">
                {cart.length}
              </span>
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button
            ref={hamburgerRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden flex-col gap-1.5 p-2 transition-all hover:bg-white/5 rounded-lg group"
            aria-label="Toggle Menu"
          >
            <div className="line-1 w-6 h-0.5 bg-white group-hover:bg-accent transition-colors origin-right" />
            <div className="line-2 w-6 h-0.5 bg-white group-hover:bg-accent transition-colors" />
            <div className="line-3 w-6 h-0.5 bg-white group-hover:bg-accent transition-colors origin-right" />
          </button>
        </div>

        {/* Mobile Popup Menu */}
        <div 
          ref={menuRef}
          className="md:hidden fixed top-24 right-6 w-[280px] bg-neutral-900/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] z-[65] flex flex-col gap-6 opacity-0 pointer-events-none transform translate-x-5"
        >
          {/* Mobile Profile Section */}
          <div className="flex flex-col gap-4 pb-6 border-b border-white/5">
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-sm font-black text-accent uppercase">
                    {user.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg leading-tight">{user.name}</span>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Active Member</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 px-4 bg-white/5 rounded-xl text-[10px] font-black uppercase text-center tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    Portal
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="py-3 px-4 bg-red-500/10 rounded-xl text-[10px] font-black uppercase text-center tracking-widest text-red-500 transition-all"
                  >
                    Exit
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between group p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <ProfileIcon color="currentColor" size={20} className="text-white/40 group-hover:text-accent transition-colors" />
                  <span className="font-bold text-white">Join Collective</span>
                </div>
                <span className="text-accent">&rarr;</span>
              </Link>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-1">Explore</span>
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-black text-white hover:text-accent transition-colors tracking-tight flex items-center justify-between"
              >
                {route.name}
                <span className="opacity-0 group-hover:opacity-100">&rarr;</span>
              </Link>
            ))}
          </div>

          {/* Cart Section in Menu */}
          <div className="pt-6 border-t border-white/5">
            <button 
              onClick={() => {
                setIsCartOpen(true);
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-4 bg-accent/10 border border-accent/20 rounded-2xl group active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <CartIcon color="var(--color-accent)" size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-[10px] text-accent font-black rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </div>
                <span className="font-bold text-accent uppercase tracking-widest text-xs">Vessel Cart</span>
              </div>
              <span className="text-accent opacity-40 group-hover:opacity-100 transition-opacity uppercase text-[10px] font-black">Open &rarr;</span>
            </button>
          </div>
          
          <div className="pt-2">
             <Link 
               href="/shop" 
               onClick={() => setIsMenuOpen(false)}
               className="w-full py-5 bg-white text-black text-center rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
             >
                Reserve Now
             </Link>
          </div>

          <div className="flex justify-between items-center opacity-20 mt-2">
            <span className="text-[9px] font-black tracking-widest uppercase">SYSTM v2.0.4</span>
            <span className="text-[9px] font-black tracking-widest uppercase text-accent">Active Horizon</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
