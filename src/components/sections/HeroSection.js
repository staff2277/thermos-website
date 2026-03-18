"use client";
/* eslint-disable react/no-unknown-property */

import Link from "next/link";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  ContactShadows,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { ModelScene } from "../3d/ModelScene";

function HeroScene() {
  const cameraRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Normalized mouse x position is state.mouse.x (-1 to 1)
    const targetRotationY = state.mouse.x * 0.15; // Subtle orbit amount
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.05,
    );
  });

  return (
    <>
      <color attach="background" args={["black"]} />
      <OrbitControls
        target={[0, 0.8, 0]}
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
      />
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 2, 2.6]}
        fov={40}
        near={0.1}
        far={100}
      />
      {/* Environment HDRI for lighting only */}
      <Environment
        files="/hdri/NightSkyHDRI001_2K_HDR.exr"
        background={false}
        environmentIntensity={0.8}
      />
      {/* Lighting Setup */}
      {/* Key Light */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      {/* Fill Light */}
      <pointLight position={[3, 2, 3]} intensity={50} />
      {/* Rim Light */}
      <pointLight position={[0, 4, -4]} intensity={30} />
      {/* Rotating Scene Content */}
      <group ref={groupRef}>
        {/* Main Hero Bottle - Shifted slightly right to balance with left CTA */}
        <ModelScene position={[0.7, 0.6, 1.8]} isHero />
        {/* Contact Shadows for grounding */}
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.4}
          scale={5}
          blur={1.5}
          far={2}
          color="#000000"
        />
      </group>
    </>
  );
}

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full h-full flex items-center px-6 md:px-12 lg:px-24 pointer-events-none">
        <div className="w-full md:w-[45%] lg:w-[40%] p-8 md:p-12 rounded-[2.5rem] bg-white/10 backdrop-blur-sm border-[0.05] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-8 pointer-events-auto transform transition-all duration-700 hover:bg-white/15">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-xs">
                Excellence in Hydration
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-outfit-72 text-white font-bold leading-[1.05] tracking-tight">
              Precision <br />
              Meet{" "}
              <span className="bg-gradient-to-r from-accent via-cream to-sand bg-clip-text text-transparent animate-gradient-x">
                Purity.
              </span>
            </h1>
          </div>

          <p className="text-md md:text-md text-white/80 max-w-md leading-relaxed font-outfit">
            Next-generation thermal engineering wrapped in a timeless aesthetic.
            Experience the peak of performance.
          </p>

          <div className="flex flex-wrap gap-5 mt-2">
            <Link
              href="/shop"
              className="group relative px-10 py-5 bg-accent text-primary text-outfit-14 font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(41,129,33,0.3)] active:scale-95"
            >
              Shop Collection
            </Link>

            <Link
              href="/discover"
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-outfit-14 font-bold rounded-full hover:bg-white/20 transition-all duration-300 active:scale-95"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
