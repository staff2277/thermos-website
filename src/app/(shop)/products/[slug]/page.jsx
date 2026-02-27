"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ModernCard } from "@/components/ui/ModernCard";
import {
  Star,
  Shield,
  ThermometerSnowflake,
  Droplets,
  ArrowRight,
} from "lucide-react";
import { useParams } from "next/navigation";

// Dynamic Slug page for Product Details
export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params?.slug || "midnight-black";

  const [selectedColor, setSelectedColor] = useState("bg-black");
  const [activeTab, setActiveTab] = useState("features");

  // Format slug for display name
  const displayName = slug
    .toString()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const colors = [
    { name: "Midnight Black", value: "bg-black", border: "border-white/20" },
    {
      name: "Forest Green",
      value: "bg-brand-green",
      border: "border-brand-green",
    },
    { name: "Arctic White", value: "bg-white", border: "border-gray-300" },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Product Images / 3D Viewer Placeholder */}
          <div className="space-y-6">
            <ModernCard className="aspect-square w-full relative group">
              {/* Product Visual Mock */}
              <div
                className={`absolute inset-0 opacity-20 transition-colors duration-500 ${selectedColor}`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-1/3 h-2/3 ${selectedColor} rounded-t-[3rem] rounded-b-xl shadow-2xl relative z-10 transition-colors duration-500`}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-[#1a1a1a] rounded-t-lg" />
                  <div className="absolute top-1/2 left-0 w-full h-8 border-y border-white/10" />
                </div>
              </div>
            </ModernCard>

            {/* Gallery Thumbnails Mock */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((thumb) => (
                <ModernCard
                  key={thumb}
                  hover={false}
                  className="aspect-square opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info & Cart Actions */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center space-x-2 text-brand-green text-sm uppercase font-bold tracking-widest">
              <span>Best Seller</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">Smart Water Bottle</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              {displayName}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl font-medium">$85.00</span>
              <div className="flex items-center space-x-1 text-brand-green">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm text-gray-400 ml-2">
                  (1,204 reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-lg mb-10">
              The pinnacle of hydration engineering. Featuring our proprietary
              dual-vacuum insulation and integrated smart thermal core to track
              your daily goals.
            </p>

            {/* Color Selector */}
            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-widest font-semibold mb-4 flex justify-between">
                <span>Color</span>
                <span className="text-gray-400 font-normal">
                  {colors.find((c) => c.value === selectedColor)?.name}
                </span>
              </h3>
              <div className="flex space-x-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${color.value} ${
                      selectedColor === color.value
                        ? `scale-110 ${color.border} ring-2 ring-offset-2 ring-offset-black ring-white`
                        : "border-transparent"
                    }`}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="flex space-x-4 mb-12">
              <Button size="lg" className="flex-1 text-lg py-5 group">
                Add to Cart
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Accordion / Tabs */}
            <div className="border-t border-white/10 pt-8 mt-auto">
              <div className="flex space-x-8 border-b border-white/10 mb-6 font-semibold uppercase tracking-widest text-sm">
                <button
                  onClick={() => setActiveTab("features")}
                  className={`pb-4 transition-colors relative ${activeTab === "features" ? "text-brand-green" : "text-gray-500 hover:text-white"}`}
                >
                  Features
                  {activeTab === "features" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-4 transition-colors relative ${activeTab === "specs" ? "text-brand-green" : "text-gray-500 hover:text-white"}`}
                >
                  Specs
                  {activeTab === "specs" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-4 transition-colors relative ${activeTab === "shipping" ? "text-brand-green" : "text-gray-500 hover:text-white"}`}
                >
                  Shipping
                  {activeTab === "shipping" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[150px] text-gray-400">
                {activeTab === "features" && (
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <ThermometerSnowflake className="w-5 h-5 mr-3 text-brand-green shrink-0 mt-0.5" />{" "}
                      24 hrs cold / 14 hrs hot guarantee
                    </li>
                    <li className="flex items-start">
                      <Droplets className="w-5 h-5 mr-3 text-brand-green shrink-0 mt-0.5" />{" "}
                      Leak-proof, sweat-proof exterior
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 mr-3 text-brand-green shrink-0 mt-0.5" />{" "}
                      Military-grade stainless steel construction
                    </li>
                  </ul>
                )}
                {activeTab === "specs" && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-white block">Capacity</strong> 32
                      oz (946 ml)
                    </div>
                    <div>
                      <strong className="text-white block">Weight</strong> 1.1
                      lbs (empty)
                    </div>
                    <div>
                      <strong className="text-white block">Dimensions</strong>{" "}
                      11.2" H x 3.5" W
                    </div>
                    <div>
                      <strong className="text-white block">Materials</strong>{" "}
                      18/8 Pro-Grade Steel, BPA-Free Plastics
                    </div>
                  </div>
                )}
                {activeTab === "shipping" && (
                  <p>
                    Free standard shipping on all orders over $50. Express 2-day
                    shipping available at checkout. 30-day hassle-free returns.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
