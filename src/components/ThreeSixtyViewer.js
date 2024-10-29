"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import Hotspot from "./Hotspot";
import * as THREE from "three";
import styles from "./ThreeSixtyViewer.module.css";

const ThreeSixtyViewer = ({ roomData, onHotspotClick, preloadedTextures }) => {
  const sphereRef = useRef();
  const controlsRef = useRef();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (sphereRef.current && preloadedTextures[roomData.imageId]) {
      const material = sphereRef.current.material;
      material.map = preloadedTextures[roomData.imageId];
      material.needsUpdate = true;

      // Apply room's default view
      if (roomData.defaultView && controlsRef.current) {
        controlsRef.current.object.rotation.set(
          ...roomData.defaultView.rotation
        );
        controlsRef.current.update();
      }
    }
  }, [roomData.imageId, preloadedTextures, roomData.defaultView]);

  const handleHotspotClick = async (hotspot) => {
    if (transitioning) return;
    setTransitioning(true);

    // Store target view for the next room
    const targetView = hotspot.targetView;

    // Call parent handler with both target image and view
    if (onHotspotClick) {
      await onHotspotClick(hotspot.targetImage, targetView);
    }

    setTransitioning(false);
  };

  return (
    <div className={styles.viewerContainer}>
      <Canvas
        camera={{
          position: [0, 0, 0.1],
          fov: roomData.defaultView?.fov || 75,
        }}
      >
        <Suspense fallback={null}>
          <mesh ref={sphereRef} name="sphere">
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial
              map={preloadedTextures[roomData.imageId]}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Floor */}
          {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -150, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshBasicMaterial 
              color="#111111" 
              transparent 
              opacity={0.3} 
              side={THREE.DoubleSide}
            />
          </mesh> */}

          {/* Hotspots */}
          {roomData.hotspots?.map((hotspot) => (
            <Hotspot
              key={hotspot.id}
              hotspot={hotspot}
              onClick={handleHotspotClick}
              size={roomData.settings?.hotspotSize || 50}
            />
          ))}

          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            minPolarAngle={Math.PI * 0.2}
            maxPolarAngle={Math.PI * 0.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeSixtyViewer;
