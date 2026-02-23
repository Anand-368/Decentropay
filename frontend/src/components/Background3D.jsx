import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingSphere({ position, color, size, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.7) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
}

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        
        <FloatingSphere
          position={[2, 1, -3]}
          color="#4f9cf9"
          size={1.2}
          speed={0.3}
        />
        <FloatingSphere
          position={[-2, 2, -4]}
          color="#a78bfa"
          size={0.9}
          speed={0.5}
        />
        <FloatingSphere
          position={[1.5, -1.5, -2.5]}
          color="#4f9cf9"
          size={0.7}
          speed={0.4}
        />
        <FloatingSphere
          position={[-1.8, -1, -3.5]}
          color="#a78bfa"
          size={0.6}
          speed={0.6}
        />
        <FloatingSphere
          position={[0, 2.5, -4.5]}
          color="#4f9cf9"
          size={0.5}
          speed={0.35}
        />
        <FloatingSphere
          position={[2.5, -2, -3.8]}
          color="#a78bfa"
          size={0.55}
          speed={0.45}
        />
      </Canvas>
    </div>
  );
}
