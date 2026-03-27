"use client";

import { Suspense, useState, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Image, ScrollControls, useScroll, Html } from "@react-three/drei";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WaveMaterial = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uHover: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    
    void main() {
      vec2 uv = vUv;
      
      // Wave distortion
      float wave = sin(uv.y * 15.0 + uTime * 4.0) * 0.02 * uHover;
      uv.x += wave;
      
      vec4 color = texture2D(uTexture, uv);
      gl_FragColor = color;
    }
  `,
};

function WaveImage({ url, aspect = 1 }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const hoverVal = useRef(0);
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(WaveMaterial.uniforms),
      vertexShader: WaveMaterial.vertexShader,
      fragmentShader: WaveMaterial.fragmentShader,
    });
  }, []);

  const texture = useLoader(THREE.TextureLoader, url);
  
  useFrame((state, delta) => {
    const targetHover = hovered ? 1 : 0;
    hoverVal.current = THREE.MathUtils.lerp(hoverVal.current, targetHover, delta * 10);
    
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    material.uniforms.uHover.value = hoverVal.current;
    material.uniforms.uTexture.value = texture;
  });

  // Calculate plane size based on aspect ratio
  const scale = [aspect > 1 ? 2 * aspect : 2, aspect < 1 ? 2 / aspect : 2, 1];

  return (
    <mesh 
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={scale}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

const gridItems = [
  { url: "/images/grid/grid-1.jpg", span: "grid-item col-span-2 row-span-2", curve: "rounded-[4rem] rounded-tr-[12rem] rounded-bl-[8rem]", aspect: 0.8 },
  { url: "/images/grid/grid-2.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-[6rem] rounded-tl-[2rem]", aspect: 1 },
  { url: "/images/grid/grid-3.jfif", span: "grid-item col-span-1 row-span-2", curve: "rounded-full aspect-[2/3]", aspect: 0.6 },
  { url: "/images/grid/grid-4.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-[3rem] rounded-br-[10rem]", aspect: 1.2 },
  { url: "/images/grid/grid-5.png", span: "grid-item col-span-2 row-span-1", curve: "rounded-[10rem] rounded-tl-[10rem] rounded-br-[8rem]", aspect: 2 },
  { url: "/images/grid/grid-6.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-[6rem] rounded-tr-[2rem]", aspect: 1 },
  { url: "/images/grid/grid-7.jpg", span: "grid-item col-span-1 row-span-1", curve: "rounded-[2rem] rounded-bl-[10rem]", aspect: 0.9 },
  { url: "/images/grid/grid-8.png", span: "grid-item col-span-2 row-span-2", curve: "rounded-[10rem] rounded-tl-[4rem] rounded-br-[16rem]", aspect: 1 },
  { url: "/images/grid/grid-9.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-full", aspect: 0.7 },
  { url: "/images/grid/grid-10.png", span: "grid-item col-span-1 row-span-1", curve: "rounded-[6rem] rounded-tr-[4rem]", aspect: 1.1 },
  { url: "/images/grid/grid-11.png", span: "grid-item col-span-2 row-span-1", curve: "rounded-tl-[12rem] rounded-tr-[4rem] rounded-br-[10rem] rounded-bl-[2rem]", aspect: 1.8 },
];

export default function ImageGridSection() {
  const containerRef = useRef();
  
  useGSAP(() => {
    gsap.from(".grid-item", {
      opacity: 0,
      scale: 0.8,
      y: 100,
      stagger: 0.1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      }
    });

    // Parallax effect on grid items
    gsap.to(".grid-item-inner", {
      y: (i) => (i % 2 === 0 ? -40 : 40),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            CRAFTED FOR <span className="text-accent">EVERY JOURNEY</span>
          </h2>
          <p className="text-white/40 max-w-xl font-medium">
            Explore the Thermos collection through the lens of our global community. Premium design meets everyday utility.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {gridItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`grid-item relative overflow-hidden group ${item.span} ${item.curve}`}
            >
              <div className="grid-item-inner w-full h-full relative cursor-pointer">
                {/* We'll use a single Canvas or just regular images for now to ensure performance 
                    but the "wave" is specifically requested. Let's use R3F View for premium feel if possible, 
                    otherwise simple CSS hover with filter is safer for huge grids. 
                    Given the request for "custom look" and "wave texture", I'll use a Canvas per item 
                    but keep it optimized. */}
                <Canvas 
                  className="w-full h-full"
                  camera={{ position: [0, 0, 1.5], fov: 45 }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <ambientLight intensity={1.5} />
                  <WaveImage url={item.url} position={[0, 0, 0]} scale={[2.5, 2.5, 1]} />
                </Canvas>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
