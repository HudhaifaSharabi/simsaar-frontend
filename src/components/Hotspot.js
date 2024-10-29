import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import styles from "./Hotspot.module.css";

const Hotspot = ({ hotspot, onClick, size = 50 }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(hotspot);
  };

  return (
    <group
      position={hotspot.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Larger floor circle */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} renderOrder={1000}>
        <circleGeometry args={[size / 5, 32]} />
        <meshBasicMaterial
          color={hovered ? "#ff4444" : "#ffffff"}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Larger arrow pointing up */}
      <mesh position={[0, 5, 0]}>
        <coneGeometry args={[size / 8, size / 4, 32]} />
        <meshBasicMaterial
          color={hovered ? "#ff4444" : "#ffffff"}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Tooltip */}
      {hovered && (
        <Html center position={[0, 20, 0]}>
          <div className={styles.tooltip}>{hotspot.name}</div>
        </Html>
      )}
    </group>
  );
};

export default Hotspot;
