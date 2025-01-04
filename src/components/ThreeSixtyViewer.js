"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress, Html } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

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
const InfoCard = ({ FacilitieName, roomName, logoUrl, places, router , facilitie }) => (
  <>
    <div className={`${styles.infoCard} ${styles.rightAligned}`}>
      <div className={styles.roomInfo}>
        <img 
          src={logoUrl} 
          alt="Logo" 
          className={styles.logo}
        />
        <div className={styles.roomDetails}>
          <h3>{FacilitieName}</h3>
          <h4>{roomName}</h4>
        </div>
      </div>
      <button 
        className={styles.exitButton}
        onClick={() => router.push(`/property-detail//${facilitie}`)}
        title="Exit Tour"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M20 12H13M3 12H4M13 12V6M13 12V18" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M8 8L4 12L8 16" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span>Exit Tour</span>
      </button>
    </div>
    
    <div className={`${styles.placesContainer} ${styles.rightAligned}`}>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView="auto"
        spaceBetween={10}
        className="places-swiper"
        centeredSlides={true}
      >
        {places.length > 0 ? (
          places.map((place, index) => (
            <SwiperSlide key={index}>
              <button
                className={styles.placeButton}
                onClick={() => router.push(`/roomsView/${place.default_hotspot}/${place.facilitie}`)}
              >
                {place.name1}
              </button>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div>No properties available</div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  </>
);

// Scene Component
const Scene = ({ roomData, currentTexture, onHotspotClick, isTransitioning, transitionDirection }) => {
  const sphereRef = useRef();
  const controlsRef = useRef();
  const { camera, gl } = useThree();
  const animationRef = useRef();
  const initialCameraRotation = useRef(null);

  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(500, 180, 90), []);

  // Enhanced transition effect
  useEffect(() => {
    if (isTransitioning && transitionDirection.from && transitionDirection.to) {
      // Get current camera position and target position
      const startPos = camera.position.clone();
      const endPos = new THREE.Vector3(
        transitionDirection.to.x,
        startPos.y, // Maintain current height
        transitionDirection.to.z
      );

      let startTime = performance.now();
      const duration = 2000;
      const stepFrequency = 2;
      const bobHeight = 0.05;

      const animate = () => {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        
        if (progress < 1) {
          // Simple linear movement from current position to target
          camera.position.x = THREE.MathUtils.lerp(startPos.x, endPos.x, eased);
          camera.position.z = THREE.MathUtils.lerp(startPos.z, endPos.z, eased);

          // Add subtle walking bob
          const stepCycle = (elapsed / 1000) * stepFrequency * Math.PI;
          const verticalBob = Math.cos(stepCycle) * bobHeight;
          camera.position.y = startPos.y + verticalBob;

          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Set final position
          camera.position.copy(endPos);
          camera.position.y = startPos.y;
        }
      };
      
      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isTransitioning, transitionDirection, camera]);

  // Smooth easing function
  const easeInOutCubic = (t) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Disable controls during transition
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !isTransitioning;
    }
  }, [isTransitioning]);

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
          isTransitioning={isTransitioning}
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
        minPolarAngle={Math.PI / 3}
        makeDefault
        args={[camera, gl.domElement]}
      />
    </>
  );
};

// Main Viewer
const ThreeSixtyViewer = ({ 
  roomData, 
  onHotspotClick, 
  places, 
  isTransitioning, 
  transitionDirection 
}) => {
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
        FacilitieName={roomData.facilitie_name}
        facilitie={roomData.facilitie}
        roomName={roomData.place_name}
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
            isTransitioning={isTransitioning}
            transitionDirection={transitionDirection}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeSixtyViewer;
