'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useState, useCallback } from 'react';
import Hotspot from './Hotspot';
import * as THREE from 'three';

const ThreeSixtyViewer = ({ roomImage, hotspots, onHotspotClick }) => {
  const [localHotspots, setLocalHotspots] = useState(hotspots);

  const addHotspot = useCallback((position) => {
    const newHotspot = {
      id: `new-${localHotspots.length + 1}`,
      position,
      name: 'New Hotspot',
      targetRoom: null,
    };
    console.log("Adding hotspot at position:", position); // Debugging: Log the hotspot position
    setLocalHotspots((prevHotspots) => [...prevHotspots, newHotspot]);
  }, [localHotspots]);

  return (
    <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
      <Suspense fallback={null}>
        <mesh name="sphere">
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial
            map={new THREE.TextureLoader().load(roomImage)}
            side={THREE.BackSide}
          />
        </mesh>

        {localHotspots.map((hotspot) => (
          <Hotspot key={hotspot.id} hotspot={hotspot} onClick={onHotspotClick} />
        ))}

        <MouseClickHandler addHotspot={addHotspot} />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  );
};

const MouseClickHandler = ({ addHotspot }) => {
  const { camera, scene } = useThree();

  const handleMouseClick = (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the current mouse position and camera
    raycaster.setFromCamera(mouse, camera);

    // Create a raycast to detect intersections with the scene's objects
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point; // Get the intersection point on the sphere
      console.log('Intersection point:', intersectionPoint); // Debugging: Log the intersection point

      // Add a new hotspot at the clicked position
      addHotspot([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]);
    }
  };

  return (
    <mesh onPointerDown={handleMouseClick} /> // Attach the click handler to the scene
  );
};

export default ThreeSixtyViewer;
