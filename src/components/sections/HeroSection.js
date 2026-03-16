"use client";
/* eslint-disable react/no-unknown-property */

import Link from "next/link";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  ContactShadows,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { Bottle } from "../3d/Bottle";

function HeroScene() {
  const cameraRef = useRef();

  return (
    <>
      <color attach="background" args={["green"]} />

      <OrbitControls target={[0, 0.8, 0]} />
      <axesHelper args={[5]} />

      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 2.5, 2.3]}
        fov={35}
        near={0.1}
        far={100}
      />

      {/* Environment HDRI for lighting only - Intensity reduced by 30% */}
      <Environment files="/hdri/pretoria_gardens_1k.hdr" background={false} environmentIntensity={0.7} />

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
      <Bottle position={[0, 0.6, 1.5]} isHero />

      {/* Main Hero Scene (Full model with reflective plane) */}
      <Bottle position={[0, 0, 0]} isHero />

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
    </section>
  );
}
