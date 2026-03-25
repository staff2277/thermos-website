"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { products } from "@/data/products";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef();
  
  const categories = ["All", ...new Set(products.map(p => p.category))];
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  useGSAP(() => {
    // Continuous gradient animation
    gsap.to(".animate-gradient-text", {
      backgroundPosition: "-200% 50%",
      duration: 4,
      repeat: -1,
      ease: "linear",
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
      {/* Header Section */}
      <div className="flex flex-col gap-6 mb-16">
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-12 bg-accent" />
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs">
            The Collection
          </span>
        </div>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">
          SHOP <br />
          <span
            className="bg-clip-text text-transparent animate-gradient-text"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
              backgroundSize: "200% auto",
              backgroundPosition: "0% 50%",
            }}
          >
            ALL.
          </span>
        </h1>
        <p className="text-white/40 max-w-xl text-lg font-medium leading-relaxed">
          Explore our complete range of high-performance thermal vessels. Engineered for precision, designed for life.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-12 border-b border-white/5 pb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-500 border ${
              activeCategory === category
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
        <div className="ml-auto text-white/30 text-xs font-bold tracking-widest uppercase">
          {filteredProducts.length} Results
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group flex flex-col gap-6"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/5 transition-all duration-700 group-hover:border-accent/40 shadow-2xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              
              {/* Quick Add Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
                <div className="flex gap-2">
                  {product.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-2 px-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mt-1">
                    {product.capacity} / {product.category}
                  </p>
                </div>
                <span className="text-lg font-black">{product.price}</span>
              </div>
              
              <div className="h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-500 mt-2" />
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-32 text-center flex flex-col items-center gap-6">
          <p className="text-white/20 text-xl font-medium">No vessels found in this category.</p>
          <button 
            onClick={() => setActiveCategory("All")}
            className="text-accent font-black border-b-2 border-accent pb-1 hover:text-white hover:border-white transition-all"
          >
            CLEAR ALL FILTERS
          </button>
        </div>
      )}
    </main>
  );
}
