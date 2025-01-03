"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress, Html } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

import Hotspot from "@/components/Hotspot";
import styles from "@/components/ThreeSixtyViewer.module.css";
import { texturePreloader } from "@/utils/texturePreloader";
import { useRouter } from "next/navigation";

// Loading Screen
const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner}></div>
        <div className={styles.loadingProgress}>Loading... {progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
};

// Info Card
const InfoCard = ({ FacilitieName, roomName, logoUrl, places, router }) => (
  <div className={styles.infoCard}>
    <div className={styles.roomInfo}>
      <img src={logoUrl} alt="Logo" className={styles.logo} />
      <h3>{FacilitieName}</h3>
      <h4>{roomName}</h4>
      <div className={styles.controls}>
        {places.length > 0 ? (
          places.map((place, index) => (
            <button
              key={index}
              onClick={() => router.push(`/roomsView/${place.default_hotspot}/${place.facilitie}`)}
            >
              {place.name1}
            </button>
          ))
        ) : (
          <div>No properties available</div>
        )}
      </div>
    </div>
  </div>
);

// Scene Component
const Scene = ({ roomData, currentTexture, onHotspotClick }) => {
  const sphereRef = useRef();
  const controlsRef = useRef();
  const { camera, gl } = useThree();

  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(500, 180, 90), []);

  return (
    <>
      <mesh ref={sphereRef} scale={[-1, 1, 1]} rotation={[0, Math.PI / 2, 0]}>
        <primitive object={sphereGeometry} />
        <meshBasicMaterial
          map={currentTexture}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>

      {roomData.hotspots?.map((hotspot) => (
        <Hotspot
          key={hotspot.name}
          hotspot={hotspot}
          camera={camera}
          controls={controlsRef.current}
          onClick={onHotspotClick}
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
      // maxPolarAngle={Math.PI / 2 - 0.1} // تحديد أقصى زاوية للأسفل
      minPolarAngle={Math.PI / 3}      // تحديد أدنى زاوية للأعلى
      makeDefault
      args={[camera, gl.domElement]}
    />
    </>
  );
};

// Main Viewer
const ThreeSixtyViewer = ({ roomData, onHotspotClick, places }) => {
  const router = useRouter();
  const [currentTexture, setCurrentTexture] = useState(null);

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

  return (
    <div className={styles.viewerContainer}>
      <InfoCard
        key={roomData.name}
        roomName={roomData.place_name}
        FacilitieName={roomData.facilitie_name}
        logoUrl="/images/logo.png"
        places={places}
        router={router}
      />
      <Canvas
        camera={{
          position: [0, 0, 0.1],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(window.devicePixelRatio);
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Scene
            roomData={roomData}
            currentTexture={currentTexture}
            onHotspotClick={onHotspotClick}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeSixtyViewer;
