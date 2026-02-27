"use client";

import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";

export default function HeroCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 2]} // Performance optimization
      gl={{ antialias: true, alpha: true }}
    >
      <HeroScene />
    </Canvas>
  );
}
