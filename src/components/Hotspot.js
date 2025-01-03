"use client";

import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';

import * as THREE from "three";
import styles from "./Hotspot.module.css";

const Hotspot = ({ hotspot, onClick, size = 30, transitioning }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const pulseRef = useRef();

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

  const handleClick = (e) => {
    e.stopPropagation();
    // Ensure the click is only processed when not transitioning
    if (!transitioning) {
      onClick(hotspot);
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 0.8, size, 32]} />
        <meshBasicMaterial
          color="#2a4e4e"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={hovered ? 1.3 : 1} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[size * 0.6, 32]} />
        <meshBasicMaterial
          color={hovered ? '#2a4e4e' : '#ffffff'}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={hovered ? 1.3 : 1} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[size * 0.2, 32]} />
        <meshBasicMaterial
          color={hovered ? '#2a4e4e' : '#ffffff'}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* {hovered && (
        <Html center position={[0, size * 0.8, 0]}>
          <div className={styles.tooltip} style={{ 
            transform: `scale(${size/20})`,
            transformOrigin: 'bottom center'
          }}>
            <div className={styles.tooltipTitle}>{hotspot.hotspot_name}</div>
            <div className={styles.tooltipArrow}></div>
            <div className={styles.tooltipSubtext}>انقر للانتقال</div>
          </div>
        </Html>
      )} */}
    </group>
  );
};

export default Hotspot;
