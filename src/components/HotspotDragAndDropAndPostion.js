
import { useRef, useState } from 'react';
import { Html, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber'; // Correct import
import * as THREE from 'three';

const Hotspot = ({ hotspot, onClick }) => {
  const hotspotRef = useRef();
  const { camera, scene } = useThree(); // Make sure this is inside a Canvas context
  const iconTexture = useTexture('/hotspot-icon.png');
  
  const [scale, setScale] = useState(2.0); // Default size of the hotspot
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const [position, setPosition] = useState(hotspot.position); // Track the current position

  const handlePointerDown = (event) => {
    event.stopPropagation();
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    event.stopPropagation();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;
      hotspotRef.current.position.set(intersectionPoint.x, hotspotRef.current.position.y, intersectionPoint.z);
      setPosition([intersectionPoint.x, hotspotRef.current.position.y, intersectionPoint.z]); // Update the position state
    }
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    setIsDragging(false);
  };

  return (
    <sprite
      ref={hotspotRef}
      position={position}
      scale={[scale, scale, scale]}
      onClick={() => onClick(hotspot.targetRoom)} // Handle click to trigger the onClick action
      onPointerOver={() => setScale(2.5)}  // Increase size on hover
      onPointerOut={() => setScale(2.0)}   // Reset size on hover out
      onPointerDown={handlePointerDown}    // Start dragging
      onPointerMove={handlePointerMove}    // Handle dragging
      onPointerUp={handlePointerUp}        // Stop dragging
    >
      <spriteMaterial 
        map={iconTexture} 
        transparent={true}
        depthWrite={false}
      />
      <Html distanceFactor={10}>
        <div style={{ color: 'white', fontSize: '12px', textAlign: 'center' }}>
          Position: X: {position[0].toFixed(2)} Y: {position[1].toFixed(2)} Z: {position[2].toFixed(2)}
        </div>
      </Html>
    </sprite>
  );
};

export default Hotspot;
