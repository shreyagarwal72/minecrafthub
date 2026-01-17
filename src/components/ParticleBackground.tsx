import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BlockParticle {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  rotationSpeed: [number, number, number];
  color: string;
}

const BLOCK_COLORS = [
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#8b5cf6", // violet
  "#f59e0b", // amber
  "#3b82f6", // blue
];

function FloatingBlocks({ count = 30 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<BlockParticle[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.15,
      speed: 0.2 + Math.random() * 0.3,
      rotationSpeed: [
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
      ] as [number, number, number],
      color: BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)],
    }));
  }, [count]);

  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      const color = new THREE.Color(p.color);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });
    return colors;
  }, [particles, count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Float animation
      const floatY = Math.sin(time * particle.speed + i) * 0.3;
      const floatX = Math.cos(time * particle.speed * 0.5 + i) * 0.2;

      dummy.position.set(
        particle.position[0] + floatX,
        particle.position[1] + floatY,
        particle.position[2]
      );

      // Rotation animation
      dummy.rotation.set(
        particle.rotation[0] + time * particle.rotationSpeed[0],
        particle.rotation[1] + time * particle.rotationSpeed[1],
        particle.rotation[2] + time * particle.rotationSpeed[2]
      );

      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        vertexColors
        transparent
        opacity={0.6}
        roughness={0.3}
        metalness={0.2}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-color"
        args={[colorArray, 3]}
      />
    </instancedMesh>
  );
}

function Stars({ count = 100 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#10b981"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#10b981" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#06b6d4" />
      <FloatingBlocks count={25} />
      <Stars count={80} />
    </>
  );
}

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground = ({ className = "" }: ParticleBackgroundProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "low-power"
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
