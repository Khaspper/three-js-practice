"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

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

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2;

    ref.current.position.z = Math.cos(state.clock.elapsedTime) * 2;
  });

  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} wireframe />
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
    </mesh>
  );
}

export default function Home() {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 10]} intensity={0.5} />
      <ambientLight intensity={0.1} />

      {/* <Cube position={[2, 0, 0]} color="orange" /> */}
      <Sphere position={[0, -2, 0]} color="orange" />
      {/* <Torus position={[2, -2, 0]} color="orange" />
      <TorusKnot position={[0, 0, 0]} color="orange" /> */}

      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color="green" />
        <Cube position={[-1, 0, 0]} color="hotpink" />
        <Cube position={[-1, 2, 0]} color="blue" />
        <Cube position={[1, 2, 0]} color="yellow" />
      </group> */}
    </Canvas>
  );
}
