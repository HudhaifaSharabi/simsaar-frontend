"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useProgress, Html } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import EditableHotspot from "@/components/EditableHotspot";
import styles from "@/components/ThreeSixtyViewer.module.css";
import { texturePreloader } from "@/utils/texturePreloader";

const Scene = ({ roomData, currentTexture, onUpdateHotspot }) => {
  const sphereRef = useRef();
  const controlsRef = useRef();
  const { camera } = useThree();

  return (
    <>
      <mesh ref={sphereRef} scale={[-1, 1, 1]} rotation={[0, Math.PI / 2, 0]}>
        <sphereGeometry args={[500, 180, 90]} />
        <meshBasicMaterial
          map={currentTexture}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>

      {roomData.hotspots?.map((hotspot, index) => (
        <EditableHotspot
          key={hotspot.name || index}
          hotspot={hotspot}
          onPositionUpdate={(newPosition) => onUpdateHotspot(index, newPosition)}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.8}
        maxDistance={500}
        minDistance={0.5}
        target={[0, 0, 0]}
        makeDefault
      />
    </>
  );
};

const ThreeSixtyEditorViewer = ({ roomData, onSave }) => {
  const [currentTexture, setCurrentTexture] = useState(null);
  const [hotspots, setHotspots] = useState(roomData.hotspots || []);

  useEffect(() => {
    const loadCurrentTexture = async () => {
      try {
        const texture = await texturePreloader.preload(roomData.image360);
        setCurrentTexture(texture);
      } catch (error) {
        console.error("Error loading texture:", error);
      }
    };
    loadCurrentTexture();
  }, [roomData.image360]);

  const handleUpdateHotspot = (index, newPosition) => {
    const updatedHotspots = [...hotspots];
    updatedHotspots[index] = {
      ...updatedHotspots[index],
      position_x: newPosition.x,
      position_y: newPosition.y,
      position_z: newPosition.z
    };
    setHotspots(updatedHotspots);
  };

  return (
    <div className={styles.viewerContainer}>
      <div className={styles.editorControls}>
        <button onClick={() => onSave(hotspots)} className={styles.saveButton}>
          Save Positions
        </button>
      </div>
      <Canvas
        camera={{
          position: [0, 0, 0.1],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <Scene
            roomData={{ ...roomData, hotspots }}
            currentTexture={currentTexture}
            onUpdateHotspot={handleUpdateHotspot}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeSixtyEditorViewer;