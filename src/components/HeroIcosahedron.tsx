import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  const wireframeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff5500",
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    []
  );

  const solidMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#222222",
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y += 0.001;
      innerMeshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ff5500" />
      <mesh ref={meshRef} material={wireframeMaterial}>
        <icosahedronGeometry args={[2.5, 2]} />
      </mesh>
      <mesh ref={innerMeshRef} material={solidMaterial}>
        <icosahedronGeometry args={[2.5, 2]} />
      </mesh>
    </>
  );
}

export default function HeroIcosahedron() {
  return (
    <div className="absolute right-0 top-0 w-[50%] h-full pointer-events-none hidden lg:block">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <IcosahedronMesh />
      </Canvas>
    </div>
  );
}
