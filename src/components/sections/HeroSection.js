"use client";
/* eslint-disable react/no-unknown-property */

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

function HeroScene() {
  const cameraRef = useRef();
  const groupRef = useRef();
  const dirLightRef = useRef();
  const batteryRef = useRef();

  useGSAP(() => {
    if (!cameraRef.current) return;

    // Intro → Hero camera animation
    gsap.to(cameraRef.current.position, {
      x: 0,
      y: 2,
      z: 2.6,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".hero-content-section",
        start: "top bottom",
        end: "top 20%",
        scrub: 1,
      },
    });

    // Hero → Battery camera animation
    gsap.to(cameraRef.current.position, {
      x: 0,
      y: 3.5,
      z: 0.1,
      ease: "power1.inOut",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".battery-section",
        start: "top bottom",
        end: "top 20%",
        scrub: 1,
      },
    });

    // Battery → Temperature camera animation (Forward from top)
    gsap.to(cameraRef.current.position, {
      x: 1,
      y: 3,
      z: 2,
      ease: "power1.inOut",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".temp-section",
        start: "top bottom",
        end: "top 20%",
        scrub: 1,
      },
    });

    // Animate directional light to shine directly from above
    if (dirLightRef.current) {
      gsap.to(dirLightRef.current.position, {
        x: 0,
        y: 4,
        z: 0,
        ease: "power1.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".battery-section",
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        },
      });
      gsap.to(dirLightRef.current, {
        intensity: 7.5,
        ease: "power1.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".battery-section",
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        },
      });
    }

    // Animate Battery group scale in smoothly
    if (batteryRef.current) {
      gsap.to(batteryRef.current.scale, {
        y: 0.674,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".battery-section",
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
      });
      gsap.to(batteryRef.current.rotation, {
        x: 0,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".battery-section",
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Animate Battery group out as we enter Temperature section
      gsap.to(batteryRef.current.scale, {
        y: 0,
        ease: "power2.in",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".temp-section",
          start: "top bottom",
          end: "top 70%",
          scrub: 1,
        },
      });
      gsap.to(batteryRef.current.rotation, {
        x: Math.PI / 2,
        ease: "power2.in",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".temp-section",
          start: "top bottom",
          end: "top 70%",
          scrub: 1,
        },
      });
    }
  });

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
        position={[1.5, 2, 3.2]}
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
        ref={dirLightRef}
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
      <ambientLight intensity={0} />
      {/* Rotating Scene Content */}
      <group ref={groupRef}>
        {/* Main Hero Bottle - Shifted slightly right to balance with left CTA */}
        <ModelScene position={[0.7, 0.6, 1.8]} isHero batteryRef={batteryRef} />
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
  const containerRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Intro section entrance animation
      gsap.from(".animate-item-intro", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.3,
      });

      // Hero section entrance animation
      gsap.from(".animate-item", {
        scrollTrigger: {
          trigger: ".hero-content-section",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
      });

      // Continuous gradient animation moving left at clock speed
      gsap.to(".animate-gradient-text", {
        backgroundPosition: "-200% 50%",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });

      // Battery section animation
      gsap.from(".animate-item-2", {
        scrollTrigger: {
          trigger: ".battery-section",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
      });

      // Temperature section animation
      gsap.from(".animate-item-3", {
        scrollTrigger: {
          trigger: ".temp-section",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      {/* 3D Canvas Background */}
      <div className="sticky top-0 h-screen w-full z-0">
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full -mt-[100vh] pointer-events-none">
        {/* Page 0: Intro Section */}
        <div className="intro-section w-full h-screen flex items-center justify-center pointer-events-none">
          <div className="text-center flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 animate-item-intro">
              <span className="h-[1px] w-12 bg-accent" />
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs">
                Introducing
              </span>
              <span className="h-[1px] w-12 bg-accent" />
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-9xl text-white font-bold leading-[1] tracking-tight animate-item-intro">
              THERMOS
            </h1>
            <p className="text-white/60 text-sm tracking-[0.2em] uppercase font-outfit animate-item-intro">
              Scroll to explore
            </p>
          </div>
        </div>

        {/* Page 1: Hero Content Overlay */}
        <div className="hero-content-section w-full h-screen flex items-center px-6 md:px-12 lg:px-24 pointer-events-none">
          <div className="w-full md:w-[45%] lg:w-[40%] p-8 md:p-12 rounded-[2.5rem] bg-white/10 backdrop-blur-sm border-[0.05] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-8 pointer-events-auto transform transition-all duration-700 hover:bg-white/15">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 animate-item">
                <span className="h-[1px] w-8 bg-accent" />
                <span className="text-accent font-bold tracking-widest uppercase text-xs">
                  Excellence in Hydration
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-outfit-72 text-white font-bold leading-[1.05] tracking-tight animate-item">
                Precision <br />
                Meet{" "}
                <span
                  className="bg-clip-text text-transparent animate-gradient-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                    backgroundSize: "200% auto",
                    backgroundPosition: "0% 50%",
                  }}
                >
                  Purity.
                </span>
              </h1>
            </div>

            <p className="text-md md:text-md text-white/80 max-w-md leading-relaxed font-outfit animate-item">
              Next-generation thermal engineering wrapped in a timeless
              aesthetic. Experience the peak of performance.
            </p>

            <div className="flex flex-wrap gap-5 mt-2 animate-item">
              <Link
                href="/shop"
                className="group relative px-10 py-5 bg-accent text-white text-outfit-14 font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(41,129,33,0.3)] active:scale-95"
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

        {/* Page 2: Battery Content Overlay */}
        <div className="battery-section w-full h-screen flex items-center justify-end px-6 md:px-12 lg:px-24 pointer-events-none">
          <div className="w-full md:w-[45%] lg:w-[40%] p-8 md:p-12 rounded-[2.5rem] bg-white/10 backdrop-blur-sm border-[0.05] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-8 pointer-events-auto transform transition-all duration-700 hover:bg-white/15">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 animate-item-2">
                <span className="h-[1px] w-8 bg-accent" />
                <span className="text-accent font-bold tracking-widest uppercase text-xs">
                  Power That Lasts
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl text-white font-bold leading-[1.05] tracking-tight animate-item-2">
                Up to <br />
                <span
                  className="bg-clip-text text-transparent animate-gradient-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                    backgroundSize: "200% auto",
                    backgroundPosition: "0% 50%",
                  }}
                >
                  24 Hours
                </span>
              </h2>
            </div>

            <p className="text-md md:text-md text-white/80 max-w-md leading-relaxed font-outfit animate-item-2">
              Equipped with a state-of-the-art battery and thermal insulation,
              our thermos keeps your beverages at the perfect temperature all
              day long. Stay powered from morning commute to evening workout.
            </p>
          </div>
        </div>

        {/* Page 3: Temperature Content Overlay */}
        <div className="temp-section w-full h-screen flex items-center justify-start px-6 md:px-12 lg:px-24 pointer-events-none">
          <div className="w-full md:w-[45%] lg:w-[40%] p-8 md:p-12 rounded-[2.5rem] bg-white/10 backdrop-blur-sm border-[0.05] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-8 pointer-events-auto transform transition-all duration-700 hover:bg-white/15">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 animate-item-3">
                <span className="h-[1px] w-8 bg-accent" />
                <span className="text-accent font-bold tracking-widest uppercase text-xs">
                  Peak Retention
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl text-white font-bold leading-[1.05] tracking-tight animate-item-3">
                Hot or Cold <br />
                <span
                  className="bg-clip-text text-transparent animate-gradient-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-accent), var(--color-cream), #ffffff, var(--color-cream), var(--color-accent))",
                    backgroundSize: "200% auto",
                    backgroundPosition: "0% 50%",
                  }}
                >
                  All Day.
                </span>
              </h2>
            </div>

            <p className="text-md md:text-md text-white/80 max-w-md leading-relaxed font-outfit animate-item-3">
              Double-walled vacuum insulation keeps your drinks hot for 12 hours
              or ice-cold for 24. Performance that never fades, no matter the
              journey.
            </p>

            <div className="flex flex-wrap gap-5 mt-2 animate-item-3">
              <Link
                href="/tech"
                className="group relative px-10 py-5 bg-accent text-white text-outfit-14 font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(41,129,33,0.3)] active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
