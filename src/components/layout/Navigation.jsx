"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Technology", href: "/#technology" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 py-4",
        isScrolled ? "glass py-2" : "bg-transparent py-4",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          THERMOS
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-brand-green/80 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="hidden md:block hover:opacity-75 transition-opacity"
          >
            <User className="w-5 h-5" />
          </Link>
          <button className="hover:opacity-75 transition-opacity relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              0
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden hover:opacity-75 transition-opacity"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-dark border-t border-white/10 p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg uppercase tracking-wider block hover:opacity-75"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-lg uppercase tracking-wider hover:opacity-75"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>Account</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
