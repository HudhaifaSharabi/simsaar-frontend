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
import dynamic from 'next/dynamic';
import { Scrollbar } from 'swiper/modules';
const Player = dynamic(() => 
  import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), 
  { ssr: false }
);


// Loading Screen
const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      {mounted && <Player
        autoplay
        loop
        src="/animations/loading-animation.json"
        style={{ height: "150px", width: "150px" }}
      />}
  </div>
  );
};



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
      enableZoom={false} // Disable zoom
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
