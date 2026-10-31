"use client";

import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";

type TPosition = [number, number, number];
type TSize = [number, number, number];
type TTorusSize = [number, number, number, number];

function Cube({
  position = [0, 0, 0],
  size = [1, 1, 1],
  color,
}: {
  position?: TPosition;
  size?: TSize;
  color?: string;
}) {
  const ref = useRef<Mesh>(null!);
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2;

    ref.current.position.z = Math.cos(state.clock.elapsedTime) * 2;
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Sphere({
  position = [0, 0, 0],
  size = [1, 30, 30],
  color = "black",
}: {
  position?: TPosition;
  size?: TSize;
  color?: string;
}) {
  const ref = useRef<Mesh>(null!);

  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    ref.current.rotation.y += delta * speed;
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? color : "lightBlue"} wireframe />
    </mesh>
  );
}

function Torus({
  position = [0, 0, 0],
  size = [0.5, 0.1, 30, 30],
  color = "black",
}: {
  position?: TPosition;
  size?: TTorusSize;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function TorusKnot({
  position = [0, 0, 0],
  size = [0.5, 0.1, 1000, 50],
  color = "black",
}: {
  position?: TPosition;
  size?: TTorusSize;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color} />
      <MeshWobbleMaterial />
    </mesh>
  );
}

function Scene() {
  const directionalLightRef = useRef<DirectionalLight>(null!);

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");

  return (
    <>
      <directionalLight
        position={[0, 1, 3]}
        intensity={0.5}
        ref={directionalLightRef}
      />
      <ambientLight intensity={0.1} />
      {/* <Cube position={[2, 0, 0]} color="orange" /> */}
      {/* <Sphere color="orange" /> */}
      {/* <Torus position={[2, -2, 0]} color="orange" />*/}
      <TorusKnot position={[0, 0, 0]} size={[1, 0.1, 100, 50]} color="orange" />
      <OrbitControls />
      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color="green" />
        <Cube position={[-1, 0, 0]} color="hotpink" />
        <Cube position={[-1, 2, 0]} color="blue" />
        <Cube position={[1, 2, 0]} color="yellow" />
      </group> */}
    </>
  );
}

export default function Home() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}
