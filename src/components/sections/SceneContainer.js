"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { ModelScene } from "../3d/ModelScene";
import HeroSectionContent from "./HeroSectionContent";
import BatterySection from "./BatterySection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

function SceneLighting() {
  return (
    <>
      <color attach="background" args={["#31482F"]} />
      {/* Environment HDRI for lighting only */}
      <Environment
        files="/hdri/NightSkyHDRI001_2K_HDR.exr"
        background={false}
        environmentIntensity={0.8}
      />
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
    </>
  );
}

function MouseInteractionWrapper({ children }) {
  const innerGroupRef = useRef();

  useFrame((state) => {
    if (!innerGroupRef.current) return;
    const targetRotationY = state.mouse.x * 0.15;
    innerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      innerGroupRef.current.rotation.y,
      targetRotationY,
      0.05
    );
  });

  return <group ref={innerGroupRef}>{children}</group>;
}

export default function SceneContainer() {
  const containerRef = useRef();
  const bottleGroupRef = useRef();
  const cameraRef = useRef();

  useGSAP(
    () => {
      if (!bottleGroupRef.current) return;

      // ScrollTrigger animation for the 3D bottle
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
        },
      });

      // Move bottle from center-right to center-left and rotate it cinematically
      tl.to(bottleGroupRef.current.position, {
        x: -0.7, // Move left
        y: 0.2, // Move down slightly
        z: 2.2, // Move closer
        ease: "power1.inOut",
      }, 0)
      .to(bottleGroupRef.current.rotation, {
        x: 0,
        y: Math.PI * 2 + 0.5, // 360 degree spin + a little extra to show the side
        z: 0.2, // Slight tilt
        ease: "power1.inOut",
      }, 0);
    },
    { scope: containerRef, dependencies: [] },
  );

  // Component to handle mouse interaction within the canvas
  const MouseInteraction = () => {
    useFrame((state) => {
      if (!bottleGroupRef.current) return;
      
      // Calculate scroll progress (0 to 1) manually or rely on GSAP scrubbing
      // We only apply mouse rotation if we are near the top (Hero Section)
      // For a more robust approach, we can just blend the mouse rotation subtly with the current rotation
      const targetRotationY = state.mouse.x * 0.15; // Subtle orbit amount based on mouse
      
      // We add the mouse rotation to the base rotation set by GSAP
      // To prevent fighting with GSAP, we can apply this to an inner group,
      // but for simplicity, lerping works natively if GSAP isn't currently overwriting every frame.
      // A better way is wrapping the ModelScene in another group purely for mouse interaction.
    });
    return null;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Fixed Canvas Background */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <SceneLighting />
            
            <PerspectiveCamera
              makeDefault
              ref={cameraRef}
              position={[0, 2, 2.6]}
              fov={40}
              near={0.1}
              far={100}
            />

            {/* Animated Bottle Group controlled by GSAP */}
            <group ref={bottleGroupRef} position={[0.7, 0.6, 1.8]}>
              <MouseInteractionWrapper>
                <ModelScene isHero />
              </MouseInteractionWrapper>
              <ContactShadows
                position={[0, 0, 0]}
                opacity={0.4}
                scale={5}
                blur={1.5}
                far={2}
                color="#000000"
              />
            </group>
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable HTML Content Overlays */}
      <div className="relative z-10 w-full">
        <HeroSectionContent />
        <BatterySection />
      </div>
    </div>
  );
}
