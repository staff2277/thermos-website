"use client";
/* eslint-disable react/no-unknown-property */

import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";

export function Bottle({ isHero = false, ...props }) {
  const { scene, nodes } = useGLTF("/models/thermos2.glb");
  
  // Clone the scene and apply shadow settings
  const copiedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Hide the original plane so we can substitute it with MeshReflectorMaterial
        if (child.name === "Plane") {
          child.visible = false;
        }
      }
    });
    return clone;
  }, [scene]);

  return (
    <group {...props}>
      <primitive object={copiedScene} />
      
      {/* Reflective Glass Floor using the geometry from the model */}
      {nodes.Plane && (
        <mesh 
          geometry={nodes.Plane.geometry} 
          position={nodes.Plane.position}
          rotation={nodes.Plane.rotation}
          scale={nodes.Plane.scale}
          receiveShadow
        >
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={60}
            roughness={0.15}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#151515"
            metalness={0.8}
            mirror={1}
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/models/thermos2.glb");
