"use client";

import { useState } from "react";
import { ModernCard, Section } from "@/components/ui/ModernCard";
import { Button } from "@/components/ui/Button";
import {
  User,
  Package,
  CreditCard,
  Settings,
  LogOut,
  Droplet,
  Activity,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "orders", label: "Order History", icon: Package },
    { id: "hydration", label: "Hydration App", icon: Droplet },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Section className="py-0 md:py-0">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <ModernCard className="p-6 sticky top-32">
              <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-white/10">
                <div className="w-16 h-16 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center text-xl font-bold">
                  JD
                </div>
                <div>
                  <h2 className="font-bold text-xl">John Doe</h2>
                  <p className="text-gray-400 text-sm">Member since 2023</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === item.id
                          ? "bg-brand-green/10 text-brand-green font-bold"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <button className="w-full flex items-center space-x-3 px-4 py-3 mt-8 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </ModernCard>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4 space-y-6">
            {activeTab === "overview" && (
              <>
                <h2 className="text-3xl font-black mb-6">
                  Welcome Back, John.
                </h2>

                {/* Daily Hydration Goal Tracker Mock */}
                <ModernCard className="p-8 bg-gradient-to-r from-brand-green-dark to-black">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 flex items-center">
                        <Droplet className="w-5 h-5 text-brand-green mr-2" />
                        Today's Hydration Goal
                      </h3>
                      <p className="text-gray-400 text-sm max-w-sm mb-6 md:mb-0">
                        You're on track. Drink 32oz more by 5 PM to hit your
                        daily target.
                      </p>
                    </div>

                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          fill="transparent"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="12"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          fill="transparent"
                          stroke="#31482F"
                          strokeWidth="12"
                          strokeDasharray="351.85"
                          strokeDashoffset="120"
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">64</span>
                        <span className="text-xs text-brand-green font-bold uppercase tracking-widest">
                          oz / 96 oz
                        </span>
                      </div>
                    </div>
                  </div>
                </ModernCard>

                {/* Recent Orders Overview */}
                <h3 className="text-xl font-bold mt-10 mb-4">
                  Recent Activity
                </h3>
                <ModernCard className="divide-y divide-white/10">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-black rounded-lg border border-white/10 shrink-0" />
                      <div>
                        <div className="font-bold flex items-center space-x-3 mb-1">
                          <span>Midnight Black Smart Bottle</span>
                          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded uppercase tracking-widest text-gray-400">
                            Delivered
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" /> Ordered Oct 12,
                          2023
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden sm:flex"
                    >
                      View Tracking
                    </Button>
                  </div>
                </ModernCard>
              </>
            )}

            {activeTab === "hydration" && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Droplet className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">App Integration</h2>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                  Connect your Thermos to track every sip in real-time.
                  Available on iOS and Android.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="secondary">App Store</Button>
                  <Button variant="outline">Google Play</Button>
                </div>
              </div>
            )}

            {["orders", "payment", "settings"].includes(activeTab) && (
              <div className="text-center py-32 border border-white/10 rounded-3xl border-dashed">
                <Settings className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-spin-slow" />
                <h2 className="text-2xl font-bold mb-2 text-gray-400 capitalize">
                  {activeTab} section
                </h2>
                <p className="text-gray-600">
                  This area is currently under construction.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
