"use client";

import { useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from "three";
import styles from "./Hotspot.module.css";

const EditableHotspot = ({ hotspot, onPositionUpdate, size = 30 }) => {
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const groupRef = useRef();
  const pulseRef = useRef();
  const { camera } = useThree();

  useFrame((state) => {
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  const position = [
    hotspot.position_x,
    hotspot.position_y,
    hotspot.position_z
  ];

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !groupRef.current) return;

    // Create a plane at the current Y level
    const planeY = hotspot.position_y;
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -planeY);
    const raycaster = new THREE.Raycaster();
    
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersectionPoint = new THREE.Vector3();
    
    if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
      // Update position
      groupRef.current.position.set(
        intersectionPoint.x,
        planeY,
        intersectionPoint.z
      );

      onPositionUpdate({
        x: intersectionPoint.x,
        y: planeY,
        z: intersectionPoint.z
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Add global event listeners for pointer move and up
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMove = (e) => handlePointerMove(e);
      const handleGlobalUp = () => handlePointerUp();

      window.addEventListener('pointermove', handleGlobalMove);
      window.addEventListener('pointerup', handleGlobalUp);

      return () => {
        window.removeEventListener('pointermove', handleGlobalMove);
        window.removeEventListener('pointerup', handleGlobalUp);
      };
    }
  }, [isDragging]);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 0.8, size, 32]} />
        <meshBasicMaterial
          color={isDragging ? "#ff0000" : "#2a4e4e"}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={hovered ? 1.3 : 1} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[size * 0.6, 32]} />
        <meshBasicMaterial
          color={isDragging ? "#ff0000" : (hovered ? '#2a4e4e' : '#f4efeb')}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={hovered ? 1.3 : 1} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[size * 0.2, 32]} />
        <meshBasicMaterial
          color={isDragging ? "#ff0000" : (hovered ? '#2a4e4e' : '#f4efeb')}
          side={THREE.DoubleSide}
        />
      </mesh>

      {(isDragging || hovered) && (
        <Html center position={[0, size * 0.8, 0]}>
          <div className={styles.tooltip} style={{ 
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap'
          }}>
            X: {groupRef.current ? groupRef.current.position.x.toFixed(2) : position[0].toFixed(2)}
            Y: {position[1].toFixed(2)}
            Z: {groupRef.current ? groupRef.current.position.z.toFixed(2) : position[2].toFixed(2)}
          </div>
        </Html>
      )}
    </group>
  );
};

export default EditableHotspot;