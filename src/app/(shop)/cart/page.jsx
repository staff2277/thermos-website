"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ModernCard, Section } from "@/components/ui/ModernCard";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

// Mock Cart State
const initialCart = [
  {
    id: 1,
    name: "Midnight Black",
    category: "Smart Water Bottle",
    price: 85.0,
    quantity: 1,
    imageClass: "bg-black",
  },
  {
    id: 5,
    name: "Carry Sleeve",
    category: "Accessories",
    price: 30.0,
    quantity: 2,
    imageClass: "bg-gray-800",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-12 border-b border-white/10 pb-8">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
              <span className="text-3xl">🫙</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Your connection is thirsty.
            </h2>
            <p className="text-gray-400 mb-8">
              Let's get some smart hydration into your cart.
            </p>
            <Link href="/shop">
              <Button>Explore Collection</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-white/10 pb-6 relative group"
                >
                  {/* Thumbnail Mock */}
                  <div
                    className={`w-24 h-24 rounded-2xl ${item.imageClass} shrink-0 border border-white/10 relative overflow-hidden`}
                  />

                  <div className="flex-1">
                    <div className="text-xs text-brand-green uppercase font-bold tracking-widest mb-1">
                      {item.category}
                    </div>
                    <Link
                      href={`/shop/products/${item.id}`}
                      className="text-xl font-bold hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <div className="text-gray-400 mt-1">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Pricing & Remove */}
                  <div className="flex sm:flex-col items-center justify-between sm:items-end w-full sm:w-auto shrink-0 space-y-2">
                    <div className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors flex items-center text-sm uppercase tracking-wider"
                    >
                      <Trash2 className="w-4 h-4 sm:mr-0 mr-2" />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <ModernCard className="p-8 sticky top-32">
                <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-brand-green">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-8">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-black">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Button className="w-full py-6 group" size="lg">
                  Secure Checkout
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-center text-xs text-gray-500 mt-6 mt-4 flex items-center justify-center space-x-2">
                  <span>🔒 256-bit secure encryption</span>
                </p>
              </ModernCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
