import Link from "next/link";
import { Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 px-6 md:px-12 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand & Newsletter */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter">THERMOS</h2>
          <p className="text-gray-400 max-w-sm">
            Hydrate with confidence. Unrivalled temperature control wrapped in a
            meticulously crafted design.
          </p>

          <div className="pt-4">
            <h3 className="text-sm uppercase tracking-widest font-semibold mb-4">
              Join our newsletter
            </h3>
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10 max-w-md focus-within:border-brand-green transition-colors">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-none outline-none px-4 flex-1 text-sm disabled:opacity-50"
              />
              <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest font-semibold">
            Explore
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                href="/shop"
                className="text-gray-400 hover:text-white transition-colors"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=bottles"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Smart Bottles
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=accessories"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest font-semibold">
            Support
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-gray-400 hover:text-white transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/warranty"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Warranty
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>
          &copy; {currentYear} THERMOS Technologies, Inc. All rights reserved.
        </p>

        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>

          <div className="flex items-center space-x-4 ml-6 border-l border-white/10 pl-6">
            <a href="#" className="hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
