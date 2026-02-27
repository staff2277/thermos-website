"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Float,
  ContactShadows,
  PresentationControls,
} from "@react-three/drei";
import * as THREE from "three";

// Preload the model to avoid pop-in
// useGLTF.preload("/models/thermos.glb");

export function BottleModel(props) {
  // If we had a real model we would use this
  // const { nodes, materials } = useGLTF("/models/thermos.glb");
  const groupRef = useRef();

  // Custom rotation logic based on scroll (handled via GSAP elsewhere or simple rotation here)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle floating idle animation is mostly handled by <Float> wrapper
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t / 4) / 4;
      groupRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Mock 3D Cylinder representation of the Thermos since actual GLB isn't available */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 4.5, 64]} />
        <meshStandardMaterial
          color="#31482F"
          roughness={0.15}
          metalness={0.8}
          envMapIntensity={2}
        />
      </mesh>

      {/* Upper cap area */}
      <mesh castShadow receiveShadow position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.95, 1, 0.5, 64]} />
        <meshStandardMaterial color="#000000" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Detail rim */}
      <mesh castShadow receiveShadow position={[0, 2.8, 0]}>
        <cylinderGeometry args={[0.8, 0.95, 0.2, 64]} />
        <meshStandardMaterial color="#223421" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Lower grip detail */}
      <mesh castShadow receiveShadow position={[0, 0, 0.9]}>
        <boxGeometry args={[1.5, 2, 0.4]} />
        <meshStandardMaterial color="#223421" roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={2048}
      />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.5}
        color="#31482F"
      />

      <Environment preset="studio" />

      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Float
          speed={1.5}
          rotationIntensity={0.5}
          floatIntensity={1}
          floatingRange={[-0.1, 0.1]}
        >
          {/* Centered Model */}
          <BottleModel position={[0, -0.5, 0]} scale={1.2} />
        </Float>
      </PresentationControls>

      {/* Realistic floor shadow that follows the floating model */}
      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.65}
        scale={10}
        blur={2}
        far={4.5}
      />
    </>
  );
}
