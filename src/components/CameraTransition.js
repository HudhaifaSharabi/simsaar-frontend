"use client";

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

const CameraTransition = ({ isTransitioning, targetPosition, onTransitionComplete }) => {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (isTransitioning && targetPosition) {
      // Store initial camera rotation
      const startRotation = camera.rotation.clone();
      
      // Create timeline for smooth transition
      const tl = gsap.timeline({
        onComplete: () => {
          if (onTransitionComplete) onTransitionComplete();
        }
      });

      // Fade out current view
      tl.to(camera.position, {
        duration: 0.8,
        z: camera.position.z + 50,
        ease: "power2.inOut"
      })
      // Move to new position
      .to(camera.position, {
        duration: 0,
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
      })
      // Rotate to new view
      .to(camera.rotation, {
        duration: 1.2,
        x: targetPosition.rotationX || 0,
        y: targetPosition.rotationY || 0,
        z: targetPosition.rotationZ || 0,
        ease: "power2.inOut"
      })
      // Fade in new view
      .to(camera.position, {
        duration: 0.8,
        z: 0.1,
        ease: "power2.out"
      });
    }
  }, [isTransitioning, targetPosition, camera]);

  return null;
};

export default CameraTransition; 