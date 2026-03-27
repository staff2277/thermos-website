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
      
      // If texture is not loaded or transparent, show a stylish placeholder
      if (color.a < 0.01) {
        color = vec4(0.1, 0.1, 0.1, 1.0);
        // Add some "loading" noise or pattern
        float pattern = sin(vUv.x * 100.0) * sin(vUv.y * 100.0);
        color.rgb += pattern * 0.02;
      }
      
      gl_FragColor = color;
    }
  `,
};

function WaveImage({ url, aspect = 1 }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const hoverVal = useRef(0);
  
  const texture = useLoader(THREE.TextureLoader, url);
  
  const material = useMemo(() => {
    if (!texture) return null;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uHover: { value: 0 },
      },
      vertexShader: WaveMaterial.vertexShader,
      fragmentShader: WaveMaterial.fragmentShader,
      transparent: true,
      depthTest: true,
      depthWrite: true,
    });
  }, [texture]);

  useFrame((state, delta) => {
    if (!material) return;
    const targetHover = hovered ? 1 : 0;
    hoverVal.current = THREE.MathUtils.lerp(hoverVal.current, targetHover, delta * 12);
    
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    material.uniforms.uHover.value = hoverVal.current;
  });

  // Calculate plane size based on aspect ratio
  // We want the image to fill the canvas area while maintaining aspect ratio
  const s = 4.0;
  const scale = [aspect > 1 ? s * aspect : s, aspect < 1 ? s / aspect : s, 1];

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
    // Reveal animation
    gsap.from(".grid-item", {
      opacity: 0,
      scale: 0.9,
      y: 100,
      stagger: {
        amount: 0.8,
        grid: [4, 3],
        from: "start"
      },
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      }
    });

    // Parallax effect on grid items
    gsap.to(".grid-item-inner", {
      y: (i) => (i % 2 === 0 ? -60 : 60),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-48 px-6 md:px-12 lg:px-24 bg-transparent z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <div className="flex flex-col gap-6 max-w-2xl relative">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-accent opacity-50" />
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs">
              Visual Narrative
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight text-white mb-4">
            DESIGNED FOR <br />
            <span className="text-accent italic">IMPACT.</span>
          </h2>
          <p className="text-white/40 max-w-lg font-medium leading-relaxed">
            The intersection of high-performance engineering and street aesthetics. 
            Every curve, every finish, meticulously crafted for those who refuse to settle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[250px] md:auto-rows-[400px]">
          {gridItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`grid-item relative overflow-hidden group/item ${item.span} ${item.curve} shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 bg-neutral-900`}
            >
              <div className="grid-item-inner w-full h-full relative cursor-none">
                <Suspense fallback={
                  <div className="w-full h-full bg-white/5 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                  </div>
                }>
                  <Canvas 
                    className="w-full h-full pointer-events-auto"
                    camera={{ position: [0, 0, 4], fov: 45 }}
                    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                    dpr={[1, 2]}
                  >
                    <WaveImage url={item.url} aspect={item.aspect} />
                  </Canvas>
                </Suspense>
                
                {/* Floating label on hover */}
                <div className="absolute bottom-10 left-10 opacity-0 group-hover/item:opacity-100 transition-all duration-700 translate-y-4 group-hover/item:translate-y-0 pointer-events-none z-20">
                   <div className="px-6 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Thermos // {idx + 1}</span>
                   </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
