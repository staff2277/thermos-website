"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Filter, ShoppingBag } from "lucide-react";
import { ModernCard, Section } from "@/components/ui/ModernCard";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Midnight Black",
    category: "Smart Bottles",
    price: "$85.00",
    colorClass: "bg-black",
    isNew: true,
  },
  {
    id: 2,
    name: "Forest Green",
    category: "Smart Bottles",
    price: "$85.00",
    colorClass: "bg-brand-green",
    isNew: true,
  },
  {
    id: 3,
    name: "Arctic White",
    category: "Smart Bottles",
    price: "$85.00",
    colorClass: "bg-white",
    isNew: false,
  },
  {
    id: 4,
    name: "Dune Sand",
    category: "Smart Bottles",
    price: "$85.00",
    colorClass: "bg-[#d8c8b8]",
    isNew: false,
  },
  {
    id: 5,
    name: "Carry Sleeve",
    category: "Accessories",
    price: "$30.00",
    colorClass: "bg-gray-800",
    isNew: false,
  },
  {
    id: 6,
    name: "Magnetic Charger",
    category: "Accessories",
    price: "$25.00",
    colorClass: "bg-gray-900",
    isNew: false,
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? DUMMY_PRODUCTS
      : DUMMY_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-4">
              The Collection
            </h1>
            <p className="text-gray-400 max-w-md">
              Engineered for absolute performance. Designed for your everyday
              journey.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="glass flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Filter
              </span>
            </div>

            <div className="glass flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors group">
              <span className="text-sm font-semibold uppercase tracking-wider">
                Sort By
              </span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-8 border-b border-white/10 mb-12 overflow-x-auto">
          {["All", "Smart Bottles", "Accessories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors relative ${
                activeCategory === cat
                  ? "text-brand-green"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link href={`/shop/${product.id}`} key={product.id}>
              <ModernCard className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-[#0a0a0a] overflow-hidden flex items-center justify-center p-8">
                  {/* Backdrop highlight based on product color */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 blur-3xl opacity-20 transition-transform duration-700 group-hover:scale-150 ${product.colorClass}`}
                  />

                  <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
                    {product.isNew ? (
                      <span className="bg-brand-green text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        New
                      </span>
                    ) : (
                      <span></span>
                    )}

                    {/* Quick Add Button */}
                    <button className="bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mock Bottle Graphic (Since we don't have images) */}
                  <div
                    className={`w-1/3 h-2/3 ${product.colorClass} rounded-t-3xl rounded-b-lg shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105 ${product.colorClass === "bg-black" ? "border border-white/10" : ""}`}
                  >
                    {/* Bottle Cap Mock */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gray-800 rounded-t-md" />
                  </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-[#0d0d0d]">
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <div className="text-gray-300">{product.price}</div>
                </div>
              </ModernCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
