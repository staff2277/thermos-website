"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { products } from "@/data/products";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useAppStore();
  const product = products.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "#000000");

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found.</h1>
          <Link href="/" className="text-accent underline">Back to home</Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor
    });
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-24 py-32">
      <Link href="/shop" className="inline-block mb-12 text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest flex items-center gap-2 group">
        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Collection
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-32">
        {/* Product Image */}
        <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden bg-neutral-950 border border-white/5 shadow-2xl group">
          <Image 
            src={product.image}
            alt={product.name}
            fill
            className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1500ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-accent font-black tracking-widest uppercase text-[10px]">{product.category}</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-black tracking-tighter leading-none">{product.name}</h1>
            <p className="text-white text-3xl font-black">{product.price}</p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-black border-b border-white/5 pb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Capacity</span>
                <p className="text-lg font-bold">{product.capacity}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Insulation</span>
                <p className="text-lg font-bold">24H Cold / 12H Hot</p>
              </div>
            </div>
            <p className="text-lg text-white/60 leading-relaxed font-outfit max-w-md mt-4">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-black border-b border-white/5 pb-4">Select Finish</h3>
            <div className="flex gap-4">
              {product.colors.map((color, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-2 transition-all p-1 ${
                    selectedColor === color ? 'border-accent scale-110 shadow-[0_0_20px_rgba(41,129,33,0.3)]' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="mt-8 px-12 py-6 bg-accent text-white text-xs font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(41,129,33,0.2)] active:scale-[0.98] flex items-center justify-center gap-4 group"
          >
            Add to Collective
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="mt-48 flex flex-col gap-16">
        <div className="flex flex-col gap-4">
           <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-white/20" />
              <span className="text-white/40 font-black tracking-widest uppercase text-[10px]">Complete the setup</span>
           </div>
           <h2 className="text-4xl font-black tracking-tighter uppercase">Suggested Vessels</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {products.filter(p => p.id !== product.id).slice(0, 3).map(suggested => (
              <Link 
                key={suggested.id} 
                href={`/product/${suggested.id}`}
                className="group flex flex-col gap-6"
              >
                 <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-950 border border-white/5 shadow-xl transition-all duration-500 group-hover:border-accent/40">
                    <Image 
                      src={suggested.image} 
                      alt={suggested.name} 
                      fill 
                      className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1000ms] group-hover:scale-110" 
                    />
                 </div>
                 <div className="flex justify-between items-end px-2">
                    <div className="flex flex-col gap-1">
                       <h4 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">{suggested.name}</h4>
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{suggested.category}</span>
                    </div>
                    <span className="font-black text-white">{suggested.price}</span>
                 </div>
              </Link>
           ))}
        </div>
      </div>
    </main>

  );
}
