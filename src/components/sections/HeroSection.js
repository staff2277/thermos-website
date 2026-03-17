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
import { ModelScene } from "../3d/ModelScene";

function HeroScene() {
  const cameraRef = useRef();

  return (
    <>
      <color attach="background" args={["black"]} />

      <OrbitControls target={[0, 0.5, 0]} />
      <axesHelper args={[5]} />

      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 2, 2.6]}
        fov={35}
        near={0.1}
        far={100}
      />

      {/* Environment HDRI for lighting only */}
      <Environment
        files="/hdri/pretoria_gardens_1k.hdr"
        background={false}
        environmentIntensity={0.6}
      />

      {/* Lighting Setup */}
      {/* Key Light */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill Light */}
      <pointLight position={[3, 2, 3]} intensity={70} />
      {/* Rim Light */}
      <pointLight position={[0, 4, -4]} intensity={50} />

      {/* Main Hero Bottle */}
      <ModelScene position={[0, 0, 0]} isHero />

      {/* Contact Shadows for grounding */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.6}
        scale={5}
        blur={1}
        far={2}
        color="#000000"
      />
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
    </section>
  );
}
