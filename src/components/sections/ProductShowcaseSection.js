"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// --- ANTIGRAVITY BACKGROUND ELEMENTS ---
function FloatingBlob({ position, scale, color }) {
  const meshRef = useRef();
  const { viewport, mouse } = useThree();
  const randomFactor = useMemo(() => Math.random() * 0.5 + 0.2, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Autonomous drift
    meshRef.current.position.x =
      position[0] + Math.sin(time * randomFactor) * 0.5;
    meshRef.current.position.y =
      position[1] + Math.cos(time * randomFactor) * 0.5;

    // Mouse Interaction (Anti-gravity repulsion)
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    meshRef.current.position.x +=
      (targetX - meshRef.current.position.x) * 0.005;
    meshRef.current.position.y +=
      (targetY - meshRef.current.position.y) * 0.005;

    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 15]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        chromaticAberration={0.02}
        color={color}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

const products = [
  {
    id: "arctic-studio",
    name: "Arctic Studio",
    price: "$65.00",
    capacity: "500ml",
    colors: ["#E3E9F2", "#B8C6DB"],
    image: "/images/cards/Arctic Studio Thermos.png",
  },
  {
    id: "cinematic-pro",
    name: "Cinematic Pro",
    price: "$75.00",
    capacity: "1L",
    colors: ["#0F172A", "#334155"],
    image: "/images/cards/Cinematic Thermos Product Photography.png",
  },
  {
    id: "arctic-mist",
    name: "Arctic Mist",
    price: "$45.00",
    capacity: "500ml",
    colors: ["#FFFFFF", "#E0F2F1"],
    image: "/images/cards/Thermos Engraved Bottle (1).jpg",
  },
  {
    id: "obsidian-prime",
    name: "Obsidian Prime",
    price: "$55.00",
    capacity: "750ml",
    colors: ["#1A1A1A", "#333333"],
    image: "/images/cards/Thermos Engraved Bottle (2).jpg",
  },
  {
    id: "deep-forest",
    name: "Deep Forest",
    price: "$49.00",
    capacity: "600ml",
    colors: ["#31482F", "#1B2E1A"],
    image: "/images/cards/Thermos Engraved Bottle (3).jpg",
  },
  {
    id: "ruby-core",
    name: "Ruby Core",
    price: "$52.00",
    capacity: "600ml",
    colors: ["#6D0000", "#9E0000"],
    image: "/images/cards/Thermos Engraved Bottle (4).jpg",
  },
];

export default function ProductShowcaseSection() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  // Forest Green Color Variable
  const ACCENT_COLOR = "#298121";

  useGSAP(
    () => {
      if (!pathRef.current) return;
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.5,
        },
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const handleWheel = (e) => {
      const isAtStart = scrollContainer.scrollLeft <= 0;
      const isAtEnd =
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth - 1;
      if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) return;
      e.preventDefault();
      gsap.to(scrollContainer, {
        scrollLeft: scrollContainer.scrollLeft + e.deltaY * 2,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 bg-black overflow-hidden"
    >
      {/* 1. ANTIGRAVITY R3F BACKGROUND */}
      <div className="absolute inset-0 z-[0] pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <FloatingBlob
            position={[-5, 2, -2]}
            scale={1.5}
            color={ACCENT_COLOR}
          />
          <FloatingBlob position={[4, -3, -1]} scale={2} color="#ffffff" />
          <FloatingBlob position={[0, 4, -4]} scale={3} color={ACCENT_COLOR} />
        </Canvas>
      </div>

      {/* 2. STYLISH LIQUID SVG PATH */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-30">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 500 0 Q 800 250 500 500 T 500 1000"
            fill="none"
            stroke={ACCENT_COLOR}
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="filter drop-shadow-[0_0_20px_#298121]"
          />
        </svg>
      </div>

      <div className="max-w-[95%] mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-16 relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div className="flex flex-col gap-6">
            <span
              className="font-bold tracking-[0.5em] uppercase text-xs"
              style={{ color: ACCENT_COLOR }}
            >
              Legacy Series
            </span>
            <h2 className="text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-tighter leading-none">
              Select Your <br />
              <span style={{ color: ACCENT_COLOR }}>Vessel.</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="group px-12 py-6 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full transition-all duration-500 font-bold flex items-center gap-4 hover:border-[#298121]/50"
          >
            Explore Collective
            <span className="group-hover:translate-x-2 transition-transform">
              &rarr;
            </span>
          </Link>
        </div>

        {/* PRODUCT CARDS CONTAINER */}
        <div className="relative -mx-6 md:-mx-12 lg:-mx-24">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-10 pb-20 hide-scrollbar px-6 md:px-12 lg:px-24"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[280px] md:w-[350px] lg:w-[420px]"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="group/card block relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-neutral-950 border border-white/5 transition-all duration-700 hover:border-[#298121]/40"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[1500ms] group-hover/card:scale-110 grayscale-[40%] group-hover/card:grayscale-0"
                    sizes="(max-width: 768px) 240px, 360px"
                  />

                  {/* Glassmorphic Footer */}
                  <div className="absolute inset-x-0 bottom-0 h-[35%] backdrop-blur-2xl bg-black/20 border-t border-white/10 p-8 flex flex-col justify-between transition-all duration-500 group-hover/card:h-[40%]">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-bold text-2xl tracking-tight">
                          {product.name}
                        </h3>
                        <p className="text-white/40 text-xs font-bold tracking-widest uppercase mt-1">
                          {product.capacity} / Edition
                        </p>
                      </div>
                      <span className="text-white font-bold text-xl">
                        {product.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center opacity-0 group-hover/card:opacity-100 translate-y-4 group-hover/card:translate-y-0 transition-all duration-500">
                      <div className="flex gap-2">
                        {product.colors.map((c, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border border-white/20"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-xs font-black tracking-widest border-b-2 pb-1"
                        style={{
                          color: ACCENT_COLOR,
                          borderColor: ACCENT_COLOR,
                        }}
                      >
                        SECURE ACCESS
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="flex justify-center pb-10">
          <Link
            href="/shop"
            className="group relative px-20 py-8 bg-white text-black font-black rounded-full overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-12 block">
              Limited Release &rarr;
            </span>
            <div
              className="absolute inset-0 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-white"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              SECURE YOURS
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
