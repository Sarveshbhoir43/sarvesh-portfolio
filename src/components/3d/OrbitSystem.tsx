// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Float,
//   OrbitControls,
//   Text,
//   Text3D,
//   Sparkles,
// } from "@react-three/drei";
// import { useRef } from "react";
// import * as THREE from "three";



// function SBSculpture() {
//   const groupRef = useRef<THREE.Group>(null);

//   useFrame((state, delta) => {
//     if (!groupRef.current) return;

//     const time = state.clock.elapsedTime;

//     groupRef.current.rotation.y += delta * 0.12;

//     groupRef.current.position.y =
//       Math.sin(time * 1.1) * 0.05;

//     groupRef.current.rotation.x =
//       Math.sin(time * 0.5) * 0.025;
//   });

//   return (
//     <group ref={groupRef}>

//       {/* =========================================
//           BACK PLATE
//       ========================================= */}

//       <mesh position={[0, 0, -0.25]}>
//         <boxGeometry args={[2.6, 2.6, 0.16]} />

//         <meshStandardMaterial
//           color="#181914"
//           metalness={0.8}
//           roughness={0.2}
//         />
//       </mesh>


//       {/* =========================================
//           FRONT BORDER
//       ========================================= */}

//       <mesh position={[0, 0, -0.14]}>
//         <boxGeometry args={[2.72, 2.72, 0.035]} />

//         <meshStandardMaterial
//           color="#000000"
//           emissive="#D8CFBC"
//           emissiveIntensity={0.3}
//           metalness={0.8}
//           roughness={0.25}
//         />
//       </mesh>


//     {/* =========================================
//     SB FRONT
// ========================================= */}


//   <Text3D
//   font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
//   size={1.25}
//   height={0.10}
//   curveSegments={12}
//   bevelEnabled
//   bevelThickness={0.05}
//   bevelSize={0.035}
//   bevelSegments={5}
//   position={[-1.05, -0.62, 0.02]}
//   rotation={[0, 0, 0]}
// >
//   SB
//   <meshStandardMaterial
//     color="#000000"
//     metalness={0.9}
//     roughness={0.16}
//     emissive="#D8CFBC"
//     emissiveIntensity={0.08}
//   />
// </Text3D>


//       {/* =========================================
//           SB BACK
//       ========================================= */}

//      <Text3D
//   font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
//   size={1.25}
//   height={0.28}
//   curveSegments={12}
//   bevelEnabled
//   bevelThickness={0.05}
//   bevelSize={0.035}
//   bevelSegments={5}
//   position={[1.05, -0.62, -0.19]}
//   rotation={[0, Math.PI, 0]}
// >
//   SB
//   <meshStandardMaterial
//     color="#14110a"
//     metalness={0.9}
//     roughness={0.16}
//     emissive="#D8CFBC"
//     emissiveIntensity={0.08}
//     side={THREE.DoubleSide}
//   />
// </Text3D>

//       {/* =========================================
//           CENTER GLOW
//       ========================================= */}

//       <mesh position={[0, 0, 0.42]}>
//         <sphereGeometry args={[0.065, 24, 24]} />

//         <meshStandardMaterial
//           color="#FFFBF4"
//           emissive="#D8CFBC"
//           emissiveIntensity={4}
//         />
//       </mesh>


//       {/* =========================================
//           TOP LIGHT
//       ========================================= */}

//       <mesh position={[0, 1.05, 0.3]}>
//         <boxGeometry args={[0.6, 0.018, 0.025]} />

//         <meshStandardMaterial
//           color="#D8CFBC"
//           emissive="#D8CFBC"
//           emissiveIntensity={3}
//         />
//       </mesh>


//       {/* =========================================
//           BOTTOM LIGHT
//       ========================================= */}

//       <mesh position={[0, -1.05, 0.3]}>
//         <boxGeometry args={[0.32, 0.018, 0.025]} />

//         <meshStandardMaterial
//           color="#D8CFBC"
//           emissive="#D8CFBC"
//           emissiveIntensity={2}
//         />
//       </mesh>

//     </group>
//   );
// }

// function OrbitScene() {
//  const orbitRef = useRef<THREE.Group>(null);

//   useFrame((_, delta) => {
//     if (orbitRef.current) {
//       orbitRef.current.rotation.y += delta * 0.08;
//     }
//   });

//     // Main SB sculpture movemen

// const technologies = [
//   // Orbit 1
//   {
//     name: "React",
//     position: [0, 3.0, 0] as [number, number, number],
//   },
//   {
//     name: "Next.js",
//     position: [0, -3.0, 0] as [number, number, number],
//   },

//   // Orbit 2
//   {
//     name: "Java",
//     position: [-2.7, 1.5, 0] as [number, number, number],
//   },
//   {
//     name: "Node.js",
//     position: [2.7, -1.5, 0] as [number, number, number],
//   },

//   // Orbit 3
//   {
//     name: "MySQL",
//     position: [-2.7, -1.5, 0] as [number, number, number],
//   },
//   {
//     name: "Git",
//     position: [2.7, 1.5, 0] as [number, number, number],
//   },
// ];

//   return (
//     <Float
//       speed={1.2}
//       rotationIntensity={0.12}
//       floatIntensity={0.3}
//     >
//       <group>

//         {/* =====================================================
//             ORBIT SYSTEM
//         ====================================================== */}

//   {/* MAIN NODE ORBIT */}

// <group ref={orbitRef}>

//   {/* Orbit 1 — React / Next.js */}
//   <mesh rotation={[Math.PI / 2, 0, 0]}>
//     <torusGeometry args={[3, 0.012, 12, 160]} />
//     <meshStandardMaterial
//       color="#565449"
//       emissive="#D8CFBC"
//       emissiveIntensity={0.08}
//       transparent
//       opacity={0.45}
//     />
//   </mesh>


//   {/* Orbit 2 — Java / Node.js */}
//   <mesh rotation={[0.7, 0.35, 0.4]}>
//     <torusGeometry args={[3, 0.012, 12, 160]} />
//     <meshStandardMaterial
//       color="#565449"
//       emissive="#D8CFBC"
//       emissiveIntensity={0.08}
//       transparent
//       opacity={0.4}
//     />
//   </mesh>


//   {/* Orbit 3 — MySQL / Git */}
//   <mesh rotation={[-0.6, 0.8, -0.35]}>
//     <torusGeometry args={[3, 0.012, 12, 160]} />
//     <meshStandardMaterial
//       color="#565449"
//       emissive="#D8CFBC"
//       emissiveIntensity={0.08}
//       transparent
//       opacity={0.35}
//     />
//   </mesh>

// </group>


//         {/* =====================================================
//             CENTRAL SB SCULPTURE
//         ====================================================== */}

//         <SBSculpture />

//         {/* =====================================================
//             TECHNOLOGY NODES
//         ====================================================== */}

//       {technologies.map((tech, index) => (
//   <Float
//     key={tech.name}
//     speed={1.2 + index * 0.08}
//     rotationIntensity={0.15}
//     floatIntensity={0.12}
//   >
//     <group position={tech.position}>

//       {/* Node */}
//       <mesh>
//         <sphereGeometry args={[0.14, 24, 24]} />

//         <meshStandardMaterial
//           color="#D8CFBC"
//           emissive="#D8CFBC"
//           emissiveIntensity={1.5}
//           metalness={0.5}
//           roughness={0.15}
//         />
//       </mesh>


//       {/* Node ring */}
//       <mesh>
//         <torusGeometry
//           args={[0.22, 0.008, 12, 40]}
//         />

//         <meshStandardMaterial
//           color="#D8CFBC"
//           emissive="#D8CFBC"
//           emissiveIntensity={0.6}
//           transparent
//           opacity={0.55}
//         />
//       </mesh>


//       {/* Technology name */}
//       <Text
//         position={[0, -0.38, 0]}
//         fontSize={0.17}
//         color="#FFFBF4"
//         anchorX="center"
//         anchorY="middle"
//       >
//         {tech.name}
//       </Text>

//     </group>
//   </Float>
// ))}


//         {/* =====================================================
//             SMALL LIGHT PARTICLES
//         ====================================================== */}

//         <Sparkles
//           count={30}
//           scale={7}
//           size={1}
//           speed={0.25}
//           color="#D8CFBC"
//         />

//       </group>
//     </Float>
//   );
// }

// export default function OrbitSystem() {
//   return (
//     <Canvas
//      camera={{
//   position: [0, 0, 8],
//   fov: 48,
// }}
//     >
//       <ambientLight intensity={0.25} />

//       <pointLight
//         position={[4, 4, 5]}
//         intensity={20}
//         color="#D8CFBC"
//       />

//       <pointLight
//         position={[-4, 1, 3]}
//         intensity={8}
//         color="#565449"
//       />

//       <pointLight
//         position={[0, -4, -2]}
//         intensity={5}
//         color="#D8CFBC"
//       />

//       <OrbitScene />

//       <OrbitControls
//         enableZoom={false}
//         enablePan={false}
//         enableDamping
//         dampingFactor={0.05}
//       />
//     </Canvas>
//   );
// }

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Text,
  Sparkles,
  Billboard,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* =============================================================
   PALETTE
============================================================= */

const CREAM = "#D8CFBC";
const CREAM_BRIGHT = "#FFFBF4";
const CHARCOAL = "#181914"; // dark faces
const FRONT_PANEL = "#EFE8D6"; // light cream faces
const DARK_TEXT = "#0B0B08"; // text on light faces
const BRASS = "#565449";

/* =============================================================
   FACE TEXTURE — draws "SB" + a thin frame onto a canvas so every
   cube face carries its own crisp monogram, readable from any angle
============================================================= */

function makeFaceTexture(bg: string, textColor: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = "rgba(216, 207, 188, 0.45)";
    ctx.lineWidth = 8;
    ctx.strokeRect(28, 28, 512 - 56, 512 - 56);

    ctx.fillStyle = textColor;
    ctx.font = "bold 236px Georgia, 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SB", 256, 272);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

/* =============================================================
   CENTRAL SB CUBE — SB engraved on all 6 faces, alternating
   light-panel / dark-panel so it reads from every side
============================================================= */

const CUBE_SIZE = 2.3;

function SBCube() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.07;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.02;
  });

  // BoxGeometry material group order: +x, -x, +y, -y, +z, -z
  const faceTextures = useMemo(() => {
    if (typeof document === "undefined") return [];
    return [
      makeFaceTexture(FRONT_PANEL, DARK_TEXT), // right
      makeFaceTexture(CHARCOAL, CREAM_BRIGHT), // left
      makeFaceTexture(FRONT_PANEL, DARK_TEXT), // top
      makeFaceTexture(CHARCOAL, CREAM_BRIGHT), // bottom
      makeFaceTexture(FRONT_PANEL, DARK_TEXT), // front
      makeFaceTexture(CHARCOAL, CREAM_BRIGHT), // back
    ];
  }, []);

  const edgesGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE)),
    []
  );

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
        {faceTextures.map((tex, i) => (
          <meshStandardMaterial
            key={i}
            attach={`material-${i}`}
            map={tex}
            metalness={0.3}
            roughness={0.38}
          />
        ))}
      </mesh>

      {/* Glowing bevel outline */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color={CREAM} transparent opacity={0.55} />
      </lineSegments>

      {/* Top light accent */}
      <mesh position={[0, CUBE_SIZE / 2 + 0.18, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.03]} />
        <meshStandardMaterial color={CREAM} emissive={CREAM} emissiveIntensity={3} />
      </mesh>

      {/* Bottom light accent */}
      <mesh position={[0, -(CUBE_SIZE / 2 + 0.18), 0]}>
        <boxGeometry args={[0.45, 0.02, 0.03]} />
        <meshStandardMaterial color={CREAM} emissive={CREAM} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

/* =============================================================
   TECHNOLOGY NODE
============================================================= */

function OrbitNode({
  name,
  position,
}: {
  name: string;
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={CREAM}
          emissive={CREAM}
          emissiveIntensity={1.6}
          metalness={0.5}
          roughness={0.15}
        />
      </mesh>

      <mesh>
        <torusGeometry args={[0.26, 0.009, 12, 40]} />
        <meshStandardMaterial
          color={CREAM}
          emissive={CREAM}
          emissiveIntensity={0.6}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Billboard keeps the label facing camera regardless of the
          tilted, spinning orbit it belongs to */}
      <Billboard>
        <Text
          position={[0, -0.37, 0]}
          fontSize={0.17}
          color={CREAM_BRIGHT}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.004}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
}

/* =============================================================
   ORBIT RING — a tilted ring carrying N nodes, evenly spaced,
   ring + nodes spin together as one rigid group
============================================================= */

interface OrbitRingProps {
  radius: number;
  tilt: [number, number, number];
  spinSpeed: number;
  nodeNames: string[];
  angleOffset: number;
  ringOpacity: number;
}

function OrbitRing({
  radius,
  tilt,
  spinSpeed,
  nodeNames,
  angleOffset,
  ringOpacity,
}: OrbitRingProps) {
  const spinRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (spinRef.current) {
      spinRef.current.rotation.z += delta * spinSpeed;
    }
  });

  const step = (Math.PI * 2) / nodeNames.length;

  return (
    // Fixed tilt — gives this ring its unique 3D orientation
    <group rotation={tilt}>
      {/* Spinning group — ring + all its nodes move together */}
      <group ref={spinRef}>
        <mesh>
          <torusGeometry args={[radius, 0.012, 12, 160]} />
          <meshStandardMaterial
            color={BRASS}
            emissive={CREAM}
            emissiveIntensity={0.08}
            transparent
            opacity={ringOpacity}
          />
        </mesh>

        {nodeNames.map((name, i) => {
          const angle = angleOffset + i * step;
          const pos: [number, number, number] = [
            radius * Math.cos(angle),
            radius * Math.sin(angle),
            0,
          ];
          return <OrbitNode key={name} name={name} position={pos} />;
        })}
      </group>
    </group>
  );
}

/* =============================================================
   SCENE — 3 orbits, 7 technology nodes total
============================================================= */

const ORBITS: OrbitRingProps[] = [
  // Orbit 1 — mostly horizontal — React + MySQL + TypeScript
  {
    radius: 3.15,
    tilt: [1.42, 0.08, 0],
    spinSpeed: 0.09,
    nodeNames: ["React", "MySQL", "TypeScript"],
    angleOffset: 0.35,
    ringOpacity: 0.45,
  },
  // Orbit 2 — diagonal — Java + Next.js
  {
    radius: 3.15,
    tilt: [0.65, 0.5, 0.25],
    spinSpeed: -0.07,
    nodeNames: ["Java", "Next.js"],
    angleOffset: 1.15,
    ringOpacity: 0.4,
  },
  // Orbit 3 — vertical / diagonal — Node.js + Git
  {
    radius: 3.15,
    tilt: [-0.35, 1.15, -0.4],
    spinSpeed: 0.06,
    nodeNames: ["Node.js", "Git"],
    angleOffset: 2.05,
    ringOpacity: 0.38,
  },
];

function OrbitScene() {
  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.2}>
      <group>
        <SBCube />

        {ORBITS.map((orbit, i) => (
          <OrbitRing key={i} {...orbit} />
        ))}

        <Sparkles count={75} scale={8.5} size={1.5} speed={1} color={CREAM} />
      </group>
    </Float>
  );
}

/* =============================================================
   EXPORT
============================================================= */

export default function OrbitSystem() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 11],
        fov: 40,
      }}
    >
      <color attach="background" args={["#11120D"]} />

      <ambientLight intensity={0.25} />

      <pointLight position={[4, 4, 5]} intensity={22} color={CREAM} />
      <pointLight position={[-4, 1, 3]} intensity={9} color={BRASS} />
      <pointLight position={[0, -4, -2]} intensity={5} color={CREAM} />
      <pointLight position={[0, 0, -6]} intensity={6} color={BRASS} />

      <OrbitScene />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
}