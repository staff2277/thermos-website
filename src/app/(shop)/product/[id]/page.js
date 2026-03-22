"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: "arctic-studio",
    name: "Arctic Studio",
    price: "$65.00",
    capacity: "500ml",
    colors: ["#E3E9F2", "#B8C6DB"],
    image: "/images/cards/Arctic Studio Thermos.png",
    description: "The premium studio edition, engineered for those who demand minimalist perfection.",
  },
  {
    id: "cinematic-pro",
    name: "Cinematic Pro",
    price: "$75.00",
    capacity: "1L",
    colors: ["#0F172A", "#334155"],
    image: "/images/cards/Cinematic Thermos Product Photography.png",
    description: "A professional 1L powerhouse, designed for the cinematic journey of a lifetime.",
  },
  {
    id: "arctic-mist",
    name: "Arctic Mist",
    price: "$45.00",
    capacity: "500ml",
    colors: ["#FFFFFF", "#E0F2F1"],
    image: "/images/cards/Thermos Engraved Bottle (1).jpg",
    description: "Premium double-walled vacuum insulation for pure hydration anywhere.",
  },
  {
    id: "obsidian-prime",
    name: "Obsidian Prime",
    price: "$55.00",
    capacity: "750ml",
    colors: ["#1A1A1A", "#333333"],
    image: "/images/cards/Thermos Engraved Bottle (2).jpg",
    description: "Our largest capacity with a sleek matte obsidian finish.",
  },
  {
    id: "deep-forest",
    name: "Deep Forest",
    price: "$49.00",
    capacity: "600ml",
    colors: ["#31482F", "#1B2E1A"],
    image: "/images/cards/Thermos Engraved Bottle (3).jpg",
    description: "Inspired by the serenity of nature's deepest forests.",
  },
  {
    id: "ruby-core",
    name: "Ruby Core",
    price: "$52.00",
    capacity: "600ml",
    colors: ["#6D0000", "#9E0000"],
    image: "/images/cards/Thermos Engraved Bottle (4).jpg",
    description: "Bold performance in a vibrant ruby red casing.",
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

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

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-24 py-24">
      <Link href="/" className="inline-block mb-12 text-white/60 hover:text-white transition-colors">
        &larr; Back to Shop
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Image */}
        <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden bg-neutral-900 shadow-2xl">
          <Image 
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-accent text-2xl font-bold">{product.price}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold">Details</h3>
            <p className="text-lg text-white/80 leading-relaxed font-outfit max-w-md">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
             <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold">Capacity</h3>
             <p className="text-xl font-bold">{product.capacity}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold">Available Colors</h3>
            <div className="flex gap-4">
              {product.colors.map((color, idx) => (
                <div 
                  key={idx}
                  className="w-10 h-10 rounded-full border-2 border-white/20 hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button className="mt-8 px-12 py-5 bg-accent text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(41,129,33,0.3)] active:scale-[0.98]">
            Add to Collective
          </button>
        </div>
      </div>
    </main>
  );
}
