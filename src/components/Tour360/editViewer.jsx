




'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Use a single room for hotspot editing.
const room = {
  id: 'room1',
  preview: '/images/room1/preview.jpg',
  tileBase: '/tiles/room1'
};

export default function AddHotspotPage() {
  const containerRef = useRef(null);
  const [customHotspots, setCustomHotspots] = useState([]);
  // Ref to store the currently dragged hotspot (if any).
  const draggingHotspotRef = useRef(null);
  // Ref to store pointer-down coordinates.
  const pointerDownPosRef = useRef(null);

  // These variables will be initialized inside useEffect.
  let scene, camera, renderer, controls, rootGroup;
  let faceWidth, faceHeight;
  const faceKeys = ['r', 'l', 'u', 'd', 'f', 'b'];

  // Transforms for each cube face of the room preview.
  const faceTransforms = {
    r: { position: [1, 0, 0], rotation: [0, Math.PI / 2, 0], sliceIndex: 4 },
    l: { position: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0], sliceIndex: 3 },
    d: { position: [0, 1, 0], rotation: [-Math.PI / 2, 0, 0], sliceIndex: 1 },
    u: { position: [0, -1, 0], rotation: [Math.PI / 2, 0, 0], sliceIndex: 5 },
    f: { position: [0, 0, 1], rotation: [0, 0, 0], sliceIndex: 2 },
    b: { position: [0, 0, -1], rotation: [0, Math.PI, 0], sliceIndex: 0 },
  };

  // Utility: add a hotspot ring to the scene.
  // The hotspot position is stored in the room’s local coordinate space.
  const addHotspotRing = (hotspot) => {
    const innerRadius = 0.06,
      outerRadius = 0.1,
      segments = 32;
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, segments);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.6,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.renderOrder = 999;
    ring.rotation.x = -Math.PI / 2;
    // Position is assumed to be in local coordinates of rootGroup.
    ring.position.set(...hotspot.position);
    // Mark it as a hotspot so it can be picked for dragging.
    ring.userData = { ...hotspot, isHotspot: true };
    rootGroup.add(ring);
  };

  // Load the room preview and build the cube faces.
  // The faces are added to rootGroup.
  const loadRoom = () => {
    const previewImage = new Image();
    previewImage.src = room.preview;
    previewImage.onload = () => {
      faceHeight = previewImage.height / 6;
      faceWidth = previewImage.width;
      faceKeys.forEach((key) => {
        const { position, rotation, sliceIndex } = faceTransforms[key];
        const group = new THREE.Group();
        group.position.set(...position);
        group.rotation.set(...rotation);

        const canvas = document.createElement('canvas');
        canvas.width = faceWidth;
        canvas.height = faceHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          previewImage,
          0,
          sliceIndex * faceHeight,
          faceWidth,
          faceHeight,
          0,
          0,
          faceWidth,
          faceHeight
        );
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
        mesh.scale.set(2, 2, 1);
        group.add(mesh);
        rootGroup.add(group);
      });
    };
  };

  useEffect(() => {
    // Initialize scene and rootGroup.
    scene = new THREE.Scene();
    rootGroup = new THREE.Group();
    // Rotate the group so the room preview displays correctly.
    rootGroup.rotation.x = Math.PI;
    scene.add(rootGroup);

    // Set up camera.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.1, 0, 0.1);

    // Set up renderer.
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Set up orbit controls.
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.update();

    // Load room preview faces.
    loadRoom();

    // Set up a raycaster and mouse vector.
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    // Define a horizontal "floor" plane in world space.
    // Since rootGroup is rotated by π about x, use a plane at world y = -1.
    // (That is, the plane y = -1 in world space will become y = +1 in local space.)
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -1);

    // pointerdown: check if starting a drag on an existing hotspot.
    renderer.domElement.addEventListener('pointerdown', (e) => {
      pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(rootGroup.children, true);
      for (const intersect of intersects) {
        if (intersect.object.userData && intersect.object.userData.isHotspot) {
          draggingHotspotRef.current = intersect.object;
          controls.enabled = false;
          break;
        }
      }
    });

    // pointermove: if dragging, update the hotspot's position.
    renderer.domElement.addEventListener('pointermove', (e) => {
      if (draggingHotspotRef.current) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersectionPoint = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(floorPlane, intersectionPoint)) {
          // Convert world coordinate to rootGroup's local coordinate.
          const localPoint = intersectionPoint.clone();
          rootGroup.worldToLocal(localPoint);
          draggingHotspotRef.current.position.copy(localPoint);
          draggingHotspotRef.current.userData.position = [localPoint.x, localPoint.y, localPoint.z];
        }
      }
    });

    // pointerup: finish dragging or, if not dragged, add a new hotspot.
    renderer.domElement.addEventListener('pointerup', (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const pointerUpPos = { x: e.clientX, y: e.clientY };
      const dx = pointerUpPos.x - pointerDownPosRef.current.x;
      const dy = pointerUpPos.y - pointerDownPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (draggingHotspotRef.current) {
        // End dragging.
        draggingHotspotRef.current = null;
        controls.enabled = true;
        return;
      }

      // If pointer hasn't moved much, treat as a click to add a new hotspot.
      if (dist <= 5) {
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersectionPoint = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(floorPlane, intersectionPoint)) {
          // Convert the world coordinate to local space.
          const localPoint = intersectionPoint.clone();
          rootGroup.worldToLocal(localPoint);
          const targetName = window.prompt("Enter target room name for hotspot:");
          if (targetName) {
            const newHotspot = {
              target: targetName,
              position: [localPoint.x, localPoint.y, localPoint.z],
              isHotspot: true,
            };
            addHotspotRing(newHotspot);
            setCustomHotspots(prev => [...prev, newHotspot]);
          }
        }
      }
    });

    // Handle window resizing.
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop.
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', () => {});
      renderer.domElement.removeEventListener('pointermove', () => {});
      renderer.domElement.removeEventListener('pointerup', () => {});
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Handler to log hotspot data.
  const handleSaveHotspots = () => {
    console.log("Custom Hotspots Data:", customHotspots);
  };

  return (
    <>
      <div ref={containerRef} style={{ width: '100vw', height: '100vh', background: '#000' }} />
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        <button onClick={handleSaveHotspots}>Save Hotspots</button>
      </div>
    </>
  );
}

























