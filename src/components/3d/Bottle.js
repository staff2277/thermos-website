"use client";
/* eslint-disable react/no-unknown-property */

import { useGLTF } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export function Bottle({ isHero = false, ...props }) {
  const { scene } = useGLTF("/models/thermos2.glb");
  
  // Clone the scene for multiple instances to avoid material/mesh sharing issues
  const copiedScene = useMemo(() => scene.clone(), [scene]);
  
  const ref = useRef();

  // Subtle rotation for the hero bottle
  useFrame(() => {
    if (isHero && ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  // Ensure meshes cast/receive shadows
  copiedScene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive object={copiedScene} ref={ref} {...props} />
  );
}

// Preload the model
useGLTF.preload("/models/thermos2.glb");
