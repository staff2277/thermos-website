"use client";

import Link from "next/link";

const SocialIcon = ({ d }) => (
  <Link
    href="#"
    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300 text-white/40 hover:text-white"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  </Link>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 py-16 px-6 md:px-12 lg:px-24">
      <div className="mx-auto flex flex-col gap-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="text-3xl font-black tracking-tighter text-white"
            >
              THERMOS<span className="text-accent">.</span>
            </Link>
            <p className="text-white/40 leading-relaxed font-medium">
              Aerospace-grade thermal engineering for the modern explorer.
              Redefining hydration, one vessel at a time.
            </p>
            <div className="flex gap-4">
              <SocialIcon d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />{" "}
              {/* Twitter */}
              <SocialIcon d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />{" "}
              {/* LinkedIn */}
              <SocialIcon d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />{" "}
              {/* Insta (Simplified) */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
              Collection
            </h4>
            <div className="flex flex-col gap-3">
              {[
                "Shop All",
                "New Arrivals",
                "Legacy Series",
                "Performance Pro",
                "Accessories",
              ].map((item) => (
                <Link
                  key={item}
                  href="/shop"
                  className="text-white/50 hover:text-white transition-colors font-medium"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
              Experience
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { name: "Our Story", path: "/discover" },
                { name: "Research & Tech", path: "/tech" },
                { name: "Sustainability", path: "/sustainability" },
                { name: "Community", path: "/community" },
                { name: "Journal", path: "/journal" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-white/50 hover:text-white transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
              Insights
            </h4>
            <div className="flex flex-col gap-4">
              <p className="text-white/40 text-sm font-medium">
                Join the collective to receive early access to limited editions.
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="name@nexus.com"
                  className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm text-white focus:outline-none focus:border-accent/40 transition-all hover:bg-white/10"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-accent text-white px-6 rounded-full text-xs font-black tracking-widest uppercase hover:scale-105 transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/20">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-accent transition-colors">
              Cookie Settings
            </Link>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 text-center md:text-right">
            © {currentYear} THERMOS CO. ALL RIGHTS RESERVED.{" "}
            <br className="md:hidden" />
            <span className="text-accent/40">DESIGNED BY ANTIGRAVITY</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
