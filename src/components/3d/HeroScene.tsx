"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function Laptop() {
  return (
    <group rotation={[0.05, -0.25, 0]}>
      {/* Screen */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[3.8, 2.4, 0.12]} />
        <meshStandardMaterial color="#D8CFBC" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 1.15, 0.08]}>
        <boxGeometry args={[3.45, 2.05, 0.02]} />
        <meshStandardMaterial color="#11120D" />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[4.2, 0.18, 2.8]} />
        <meshStandardMaterial color="#565449" />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[2.8, 0.05, 1.6]} />
        <meshStandardMaterial color="#D8CFBC" />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 1, 7], fov: 45 }}>
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[3, 5, 4]}
          intensity={3}
        />

        <Float
          speed={1.5}
          rotationIntensity={0.3}
          floatIntensity={0.5}
        >
          <Laptop />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}