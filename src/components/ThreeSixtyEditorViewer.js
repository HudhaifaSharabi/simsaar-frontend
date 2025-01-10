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
  
  useEffect(() => {
    if (currentTexture && sphereRef.current) {
      // Force material update
      sphereRef.current.material.map = currentTexture;
      sphereRef.current.material.needsUpdate = true;
    }
  }, [currentTexture]);

  return (
    <>
      <mesh ref={sphereRef} scale={[-1, 1, 1]} rotation={[0, Math.PI / 2, 0]}>
        <sphereGeometry args={[500, 60, 40]} />
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadTexture = async () => {
      setIsLoading(true);
      setLoadError(null);
      
      try {
        const texture = await texturePreloader.preload(roomData.image360);
        
        // Only update state if component is still mounted
        if (isMounted) {
          texture.encoding = THREE.sRGBEncoding;
          setCurrentTexture(texture);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading texture:", error);
        if (isMounted) {
          setLoadError("Failed to load panorama image");
          setIsLoading(false);
        }
      }
    };

    loadTexture();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [roomData.image360]);

  // Debug logging
  useEffect(() => {
    console.log('Loading state:', isLoading);
    console.log('Current texture:', currentTexture);
    console.log('Load error:', loadError);
  }, [isLoading, currentTexture, loadError]);

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

  if (loadError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>{loadError}</div>
      </div>
    );
  }

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
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <Scene
            roomData={{ ...roomData, hotspots }}
            currentTexture={currentTexture}
            onUpdateHotspot={handleUpdateHotspot}
          />
        </Suspense>
      </Canvas>

      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <div>Loading panorama...</div>
        </div>
      )}
    </div>
  );
};

export default ThreeSixtyEditorViewer;