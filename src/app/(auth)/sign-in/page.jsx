"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ModernCard, Section } from "@/components/ui/ModernCard";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";

export default function SignInPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Section fullHeight className="py-0 md:py-0">
      <div className="flex items-center justify-center w-full min-h-[calc(100svh-100px)] pt-12">
        <ModernCard
          className="w-full max-w-md p-8 md:p-12"
          variant="glass"
          hover={false}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tight mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin
                ? "Enter your credentials to access your hydration dashboard."
                : "Join the THERMOS ecosystem to track your hydration goals."}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 placeholder-gray-600 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">
                  Password
                </label>
                {isLogin && (
                  <Link
                    href="/forgot-password"
                    className="text-xs text-brand-green hover:underline"
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 placeholder-gray-600 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
            </div>

            <Button className="w-full py-4 mt-8 group">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-4 text-xs tracking-widest uppercase text-gray-500">
              Or continue with
            </span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 transition-colors">
              <span className="font-bold">G</span>
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 transition-colors">
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </button>
          </div>

          <div className="mt-10 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:text-brand-green transition-colors font-bold underline decoration-white/30 underline-offset-4 hover:decoration-brand-green"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </ModernCard>
      </div>
    </Section>
  );
}
