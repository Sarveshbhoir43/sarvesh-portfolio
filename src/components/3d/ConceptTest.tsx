"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {Float,
  OrbitControls,
  Text,
  Text3D,
  Sparkles,} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";


function SBSculpture() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Very slow rotation
    groupRef.current.rotation.y += delta * 0.12;

    // Subtle floating
    groupRef.current.position.y =
      Math.sin(time * 1.1) * 0.06;

    // Tiny tilt
    groupRef.current.rotation.x =
      Math.sin(time * 0.5) * 0.025;
  });

  return (
    <group ref={groupRef}>

      {/* =========================================
          BACK PLATE
      ========================================= */}

      <mesh position={[0, 0, -0.25]}>
        <boxGeometry args={[2.9, 2.9, 0.16]} />

        <meshStandardMaterial
          color="#181914"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>


      {/* =========================================
          OUTER FRAME
      ========================================= */}

      <mesh position={[0, 0, -0.36]}>
        <boxGeometry args={[3.1, 3.1, 0.035]} />

        <meshStandardMaterial
          color="#565449"
          emissive="#D8CFBC"
          emissiveIntensity={0.35}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>


      {/* =========================================
          3D SB
      ========================================= */}

      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
        size={1.45}
        height={0.28}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.055}
        bevelSize={0.035}
        bevelOffset={0}
        bevelSegments={5}
        position={[-1.05, -0.62, 0.05]}
        rotation={[0, 0, 0]}
      >
        SB

        <meshStandardMaterial
          color="#D8CFBC"
          metalness={0.9}
          roughness={0.16}
          emissive="#D8CFBC"
          emissiveIntensity={0.08}
        />
      </Text3D>


      {/* =========================================
          CENTER GLOW
      ========================================= */}

      <mesh position={[0, 0, 0.38]}>
        <sphereGeometry args={[0.07, 24, 24]} />

        <meshStandardMaterial
          color="#FFFBF4"
          emissive="#D8CFBC"
          emissiveIntensity={4}
        />
      </mesh>


      {/* =========================================
          TOP LIGHT
      ========================================= */}

      <mesh position={[0, 1.18, 0.2]}>
        <boxGeometry args={[0.7, 0.018, 0.025]} />

        <meshStandardMaterial
          color="#D8CFBC"
          emissive="#D8CFBC"
          emissiveIntensity={3}
        />
      </mesh>


      {/* =========================================
          BOTTOM LIGHT
      ========================================= */}

      <mesh position={[0, -1.18, 0.2]}>
        <boxGeometry args={[0.35, 0.018, 0.025]} />

        <meshStandardMaterial
          color="#D8CFBC"
          emissive="#D8CFBC"
          emissiveIntensity={2}
        />
      </mesh>

    </group>
  );
}

function GlowingCube() {
  const cubeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.15;
      cubeRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={cubeRef}>
        {/* Main cube */}
        <mesh>
          <boxGeometry args={[2.4, 2.4, 2.4]} />
          <meshStandardMaterial
            color="#181914"
            roughness={0.25}
            metalness={0.7}
          />
        </mesh>

        {/* Glowing center */}
        <mesh position={[0, 0, 1.22]}>
          <circleGeometry args={[0.45, 32]} />
          <meshStandardMaterial
            color="#D8CFBC"
            emissive="#D8CFBC"
            emissiveIntensity={3}
          />
        </mesh>

        <mesh position={[0, 0, -1.22]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.45, 32]} />
          <meshStandardMaterial
            color="#D8CFBC"
            emissive="#D8CFBC"
            emissiveIntensity={3}
          />
        </mesh>

        {/* SB label */}
        <Text
          position={[0, 0, 1.25]}
          fontSize={0.25}
          color="#11120D"
          anchorX="center"
          anchorY="middle"
        >
          SB
        </Text>
      </group>
    </Float>
  );
}

const technologies = [
  { name: "React", position: [0, 2.5, 0] },
  { name: "Java", position: [-2.5, 0, 0] },
  { name: "Next.js", position: [2.5, 0, 0] },
  { name: "MySQL", position: [0, -2.5, 0] },
];

function OrbitSystem() {
 const orbitRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.08;
    }
  });

    // Main SB sculpture movemen

  const technologies = [
    {
      name: "React",
      position: [0, 3.0, 0] as [number, number, number],
    },
    {
      name: "Next.js",
      position: [2.7, 1.0, 0] as [number, number, number],
    },
    {
      name: "Java",
      position: [-2.7, 1.0, 0] as [number, number, number],
    },
    {
      name: "Node.js",
      position: [-2.3, -2.0, 0] as [number, number, number],
    },
    {
      name: "Git",
      position: [2.3, -2.0, 0] as [number, number, number],
    },
    {
      name: "MySQL",
      position: [0, -3.0, 0] as [number, number, number],
    },
  ];

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.12}
      floatIntensity={0.3}
    >
      <group>

        {/* =====================================================
            ORBIT SYSTEM
        ====================================================== */}

        <group ref={orbitRef}>

          {/* Main horizontal orbit */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry
              args={[2.45, 0.012, 16, 160]}
            />

            <meshStandardMaterial
              color="#565449"
              emissive="#D8CFBC"
              emissiveIntensity={0.25}
              transparent
              opacity={0.7}
            />
          </mesh>


          {/* Diagonal orbit */}
          <mesh rotation={[1.1, 0.35, 0.65]}>
            <torusGeometry
              args={[2.7, 0.01, 16, 160]}
            />

            <meshStandardMaterial
              color="#565449"
              emissive="#D8CFBC"
              emissiveIntensity={0.2}
              transparent
              opacity={0.5}
            />
          </mesh>


          {/* Second diagonal orbit */}
          <mesh rotation={[0.45, 1.15, 0.2]}>
            <torusGeometry
              args={[3.05, 0.008, 16, 160]}
            />

            <meshStandardMaterial
              color="#565449"
              emissive="#D8CFBC"
              emissiveIntensity={0.15}
              transparent
              opacity={0.3}
            />
          </mesh>

        </group>


        {/* =====================================================
            CENTRAL SB SCULPTURE
        ====================================================== */}

        <SBSculpture />

        {/* =====================================================
            TECHNOLOGY NODES
        ====================================================== */}

        {technologies.map((tech, index) => (
          <Float
            key={tech.name}
            speed={1.5 + index * 0.1}
            rotationIntensity={0.25}
            floatIntensity={0.2}
          >
            <group position={tech.position}>

              {/* Outer node */}
              <mesh>
                <sphereGeometry args={[0.19, 32, 32]} />

                <meshStandardMaterial
                  color="#D8CFBC"
                  emissive="#D8CFBC"
                  emissiveIntensity={1.8}
                  metalness={0.5}
                  roughness={0.15}
                />
              </mesh>


              {/* Node ring */}
              <mesh>
                <torusGeometry
                  args={[0.29, 0.009, 12, 48]}
                />

                <meshStandardMaterial
                  color="#D8CFBC"
                  emissive="#D8CFBC"
                  emissiveIntensity={0.7}
                  transparent
                  opacity={0.65}
                />
              </mesh>


              {/* Technology name */}
              <Text
                position={[0, -0.48, 0]}
                fontSize={0.19}
                color="#FFFBF4"
                anchorX="center"
                anchorY="middle"
              >
                {tech.name}
              </Text>

            </group>
          </Float>
        ))}


        {/* =====================================================
            SMALL LIGHT PARTICLES
        ====================================================== */}

        <Sparkles
          count={30}
          scale={7}
          size={1}
          speed={0.25}
          color="#D8CFBC"
        />

      </group>
    </Float>
  );
}

export default function ConceptTest() {
  const [concept, setConcept] = useState<"cube" | "orbit">("cube");

  return (
    <div className="min-h-screen bg-[#11120D] text-[#FFFBF4]">
      {/* Controls */}
      <div className="flex justify-center gap-3 pt-8">
        <button
          onClick={() => setConcept("cube")}
          className={`rounded-lg px-5 py-2 text-sm transition ${
            concept === "cube"
              ? "bg-[#D8CFBC] text-[#11120D]"
              : "border border-[#302F29] text-[#A6A397]"
          }`}
        >
          Glowing Cube
        </button>

        <button
          onClick={() => setConcept("orbit")}
          className={`rounded-lg px-5 py-2 text-sm transition ${
            concept === "orbit"
              ? "bg-[#D8CFBC] text-[#11120D]"
              : "border border-[#302F29] text-[#A6A397]"
          }`}
        >
          Orbit System
        </button>
      </div>

      {/* 3D */}
      <div className="mx-auto h-[650px] max-w-5xl">
        <Canvas
  camera={{
    position: [0, 0, 7],
    fov: 45,
  }}
>
  <ambientLight intensity={0.25} />

  <pointLight
    position={[4, 4, 5]}
    intensity={20}
    color="#D8CFBC"
  />

  <pointLight
    position={[-4, 1, 3]}
    intensity={8}
    color="#565449"
  />

  <pointLight
    position={[0, -4, -2]}
    intensity={5}
    color="#D8CFBC"
  />

  {concept === "cube" ? (
    <GlowingCube />
  ) : (
    <OrbitSystem />
  )}

  <OrbitControls
    enableZoom={false}
    enablePan={false}
    enableDamping
    dampingFactor={0.05}
  />
</Canvas>
      </div>
    </div>
  );
}