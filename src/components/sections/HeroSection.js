"use client";
/* eslint-disable react/no-unknown-property */

import Link from "next/link";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, ContactShadows, OrbitControls } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { Bottle } from "../3d/Bottle";

function HeroScene() {
  const cameraRef = useRef();

  return (
    <>
      <color attach="background" args={["#e5e5e5"]} />

      <OrbitControls target={[0, 0.8, 0]} />
      <axesHelper args={[5]} />

      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 1.2, 4]}
        fov={35}
        near={0.1}
        far={100}
      />

      {/* Lighting Setup */}
      {/* Key Light */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      {/* Fill Light */}
      <pointLight position={[-3, 2, 2]} intensity={0.6} />
      {/* Rim Light */}
      <pointLight position={[0, 4, -4]} intensity={1.2} />

      {/* Soft environmental lighting */}
      <ambientLight intensity={0.4} />

      {/* Main Hero Bottle */}
      <Bottle position={[0, 0, 0]} isHero />

      {/* Contact Shadows for grounding */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.6}
        scale={5}
        blur={2.5}
        far={2}
        color="#000000"
      />

      {/* Background Bottles */}
      <Bottle position={[-3, 0, -5]} scale={0.8} />
      <Bottle position={[3, 0, -6]} scale={0.7} />
      <Bottle position={[0, 0, -7]} scale={0.85} />

      {/* Environment / Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#d4d4d4" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Postprocessing */}
      <EffectComposer>
        <DepthOfField
          focusDistance={0.03} // Focus approximately on the hero bottle
          focalLength={0.02}
          bokehScale={2.5}
          height={480}
        />
      </EffectComposer>
    </>
  );
}

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 text-center text-white pointer-events-auto mt-[40vh]">
        <h1 className="text-outfit-72 tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 mix-blend-difference">
          The Future of Hydration
        </h1>
        <p className="text-outfit-24 text-white/90 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 mix-blend-difference">
          Experience the most advanced smart water bottle ever designed. Stay
          tracked, stay healthy.
        </p>

        <div className="flex items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <Link
            href="/shop"
            className="px-8 py-4 bg-white text-black rounded-full text-outfit-16 hover:scale-105 transition-transform active:scale-95 shadow-xl"
          >
            Shop Now
          </Link>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-outfit-16 hover:bg-white/20 transition-all active:scale-95">
            Watch Film
          </button>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}
