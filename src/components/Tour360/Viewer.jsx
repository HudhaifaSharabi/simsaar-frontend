

// 'use client';

// import  { useRef, useState, useEffect, useCallback } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

// const rooms = [
//   {
//     id: 'room1',
//     preview: 'hotspot1',
//     tileBase: '/tiles/room1',
//     hotspots: [
//       { position: [1.5816041138216523, 1.0000000000000002, -1.6179147577748576], target: 'room2', label: 'Go to Room 2' },
//       { position: [-0.5, -1, -1], target: 'room3', label: 'Go to Room 3' }
//     ]
//   },
//   {
//     id: 'room2',
//     preview: '/tiles/room2/preview.jpg',
//     tileBase: '/tiles/room2',
//     hotspots: [
//       { position: [0, 1, 2], target: 'room1', label: 'Go to Room 1' }
//     ]
//   },
//   {
//     id: 'room3',
//     preview: '/tiles/room3/preview.jpg',
//     tileBase: '/tiles/room3',
//     hotspots: [
//       { position: [0, 1, 2], target: 'room1', label: 'Go to Room 1' }
//     ]
//   }
// ];

// const faceTransforms = {
//   r: { position: [1, 0, 0], rotation: [0, Math.PI / 2, 0], sliceIndex: 4 },
//   l: { position: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0], sliceIndex: 3 },
//   d: { position: [0, 1, 0], rotation: [-Math.PI / 2, 0, 0], sliceIndex: 1 },
//   u: { position: [0, -1, 0], rotation: [Math.PI / 2, 0, 0], sliceIndex: 5 },
//   f: { position: [0, 0, 1], rotation: [0, 0, 0], sliceIndex: 2 },
//   b: { position: [0, 0, -1], rotation: [0, Math.PI, 0], sliceIndex: 0 },
// };

// const faceKeys = ['r', 'l', 'u', 'd', 'f', 'b'];
// const maxLevel = 3;
// const levelDivisionsMap = { 1: 1, 2: 2, 3: 4 };

// //
// // Hotspot Component
// // Renders a ring mesh with pointer events and sets userData so that it can be found via raycast.
// //
// function Hotspot({ hotspot, onClick }) {
//   return (
//     <mesh
//       userData={{ target: hotspot.target, label: hotspot.label }}
//       position={[
//         hotspot.position[0],
//         -hotspot.position[1],
//         -hotspot.position[2]
//       ]}
//       rotation={[-Math.PI / 2, 0, 0]}
//       renderOrder={999}
//       onClick={(e) => {
//         e.stopPropagation();
//         onClick(e);
//       }}
//       onPointerOver={(e) => {
//         e.stopPropagation();
//         e.object.material.opacity = 1;
//       }}
//       onPointerOut={(e) => {
//         e.stopPropagation();
//         e.object.material.opacity = 0.6;
//       }}
//     >
//       <ringGeometry args={[0.06, 0.1, 32]} />
//       <meshBasicMaterial
//         color="white"
//         opacity={0.6}
//         transparent
//         side={THREE.DoubleSide}
//         depthTest={false}
//         depthWrite={false}
//       />
//     </mesh>
//   );
// }

// //
// // HotspotRaycaster Component
// // Attaches pointerdown and pointerup event listeners on the canvas element to perform a raycast only when
// // the pointer movement is below a set threshold (i.e. a true click rather than a swipe).
// //
// function HotspotRaycaster({ onHotspotClick }) {
//   const { scene, camera, gl } = useThree();
//   const pointer = useRef(new THREE.Vector2());
//   const raycaster = useRef(new THREE.Raycaster());
//   const pointerDownPos = useRef(null);
//   const CLICK_THRESHOLD = 5; // pixels

//   useEffect(() => {
//     const handlePointerDown = (e) => {
//       pointerDownPos.current = { x: e.clientX, y: e.clientY };
//     };

//     const handlePointerUp = (e) => {
//       if (!pointerDownPos.current) return;
//       const dx = e.clientX - pointerDownPos.current.x;
//       const dy = e.clientY - pointerDownPos.current.y;
//       const distance = Math.sqrt(dx * dx + dy * dy);
//       // Only process if movement is within threshold
//       if (distance > CLICK_THRESHOLD) {
//         pointerDownPos.current = null;
//         return;
//       }
//       pointerDownPos.current = null;

//       const rect = gl.domElement.getBoundingClientRect();
//       pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//       pointer.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
//       raycaster.current.setFromCamera(pointer.current, camera);

//       const hotspots = [];
//       scene.traverse((child) => {
//         if (child.userData && child.userData.target) {
//           hotspots.push(child);
//         }
//       });

//       let nearestHotspot = null;
//       let minDistance = Infinity;
//       const THRESHOLD = 1.2; // world units

//       for (const hotspot of hotspots) {
//         const worldPos = new THREE.Vector3();
//         hotspot.getWorldPosition(worldPos);
//         const distToRay = raycaster.current.ray.distanceToPoint(worldPos);
//         if (distToRay < THRESHOLD) {
//           const camToHotspot = worldPos.distanceTo(camera.position);
//           if (camToHotspot < minDistance) {
//             minDistance = camToHotspot;
//             nearestHotspot = hotspot;
//           }
//         }
//       }

//       if (nearestHotspot) {
//         onHotspotClick(nearestHotspot.userData.target);
//       }
//     };

//     gl.domElement.addEventListener('pointerdown', handlePointerDown);
//     gl.domElement.addEventListener('pointerup', handlePointerUp, { passive: false });
//     return () => {
//       gl.domElement.removeEventListener('pointerdown', handlePointerDown);
//       gl.domElement.removeEventListener('pointerup', handlePointerUp);
//     };
//   }, [scene, camera, gl, onHotspotClick]);

//   return null;
// }

// //
// // Room Component
// // Loads the preview image, splits it into six faces, and sets up tile enhancement based on camera direction.
// // The face group is managed imperatively, while hotspots are rendered declaratively.
// //
// function Room({ room, savedCameraQuaternion, onRoomSwitch , roomId, facilitiesId}) {
//   const faceGroupRef = useRef();
//   const tileMeshesRef = useRef({});
//   const currentRoomVersionRef = useRef(0);
//   const isEnhancingRef = useRef(false);
//   const { camera } = useThree();
//   const [initialized, setInitialized] = useState(false);

//   useEffect(() => {
//     if (!faceGroupRef.current) return;
//     faceGroupRef.current.clear();
//     currentRoomVersionRef.current++;
//     tileMeshesRef.current = {};
//     // Rotate faces as in original code
//     faceGroupRef.current.rotation.x = Math.PI;

//     const previewImage = new Image();
//     previewImage.src = `/tiles/${facilitiesId}/${roomId}/${room.preview}/preview.jpg`;
//     previewImage.onload = () => {
//       const faceHeight = previewImage.height / 6;
//       const faceWidth = previewImage.width;
//       faceKeys.forEach(faceKey => {
//         const { position, rotation, sliceIndex } = faceTransforms[faceKey];
//         const faceGroup = new THREE.Group();
//         faceGroup.position.set(...position);
//         faceGroup.rotation.set(...rotation);

//         const canvas = document.createElement('canvas');
//         canvas.width = faceWidth;
//         canvas.height = faceHeight;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(
//           previewImage,
//           0,
//           sliceIndex * faceHeight,
//           faceWidth,
//           faceHeight,
//           0,
//           0,
//           faceWidth,
//           faceHeight
//         );
//         const texture = new THREE.CanvasTexture(canvas);
//         texture.minFilter = THREE.LinearFilter;
//         texture.magFilter = THREE.LinearFilter;
//         texture.flipY = false;
//         texture.colorSpace = THREE.SRGBColorSpace;

//         const material = new THREE.MeshBasicMaterial({
//           map: texture,
//           side: THREE.BackSide
//         });
//         const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
//         mesh.scale.set(2, 2, 1);
//         faceGroup.add(mesh);
//         faceGroupRef.current.add(faceGroup);

//         tileMeshesRef.current[faceKey + '_group'] = faceGroup;
//         tileMeshesRef.current[faceKey + '_level'] = 0;
//       });
//       setInitialized(true);
//       if (savedCameraQuaternion.current) {
//         camera.quaternion.copy(savedCameraQuaternion.current);
//         camera.updateMatrixWorld();
//       }
//     };
//   }, [room, camera, savedCameraQuaternion]);

//   const improveOneLevel = useCallback((targetFace) => {
//     return new Promise((resolve) => {
//       const currentTileMeshes = tileMeshesRef.current;
//       let currentLevel = currentTileMeshes[targetFace + '_level'] || 0;
//       if (currentLevel >= maxLevel) {
//         resolve();
//         return;
//       }
//       const nextLevel = currentLevel + 1;
//       const divisions = levelDivisionsMap[nextLevel];
//       const oldGroup = currentTileMeshes[targetFace + '_group'];
//       if (!oldGroup) {
//         resolve();
//         return;
//       }

//       const loader = new THREE.TextureLoader();
//       const loadVersion = currentRoomVersionRef.current;
//       const newGroup = new THREE.Group();
//       newGroup.position.copy(oldGroup.position);
//       newGroup.rotation.copy(oldGroup.rotation);

//       let loaded = 0;
//       const total = divisions * divisions;
//       for (let y = 0; y < divisions; y++) {
//         for (let x = 0; x < divisions; x++) {
//           const tileY = divisions - y - 1;
//           const url = `${room.tileBase}/${nextLevel}/${targetFace}/${tileY}/${x}.jpg`;
//           const geometry = new THREE.PlaneGeometry(1, 1);
//           const material = new THREE.MeshBasicMaterial({
//             side: THREE.BackSide,
//             transparent: true,
//             opacity: 0
//           });
//           const mesh = new THREE.Mesh(geometry, material);
//           const step = 2 / divisions;
//           mesh.scale.set(step, step, 1);
//           mesh.position.set(
//             (x + 0.5 - divisions / 2) * step,
//             -(y + 0.5 - divisions / 2) * step,
//             0
//           );
//           newGroup.add(mesh);
//           loader.load(
//             url,
//             (texture) => {
//               if (currentRoomVersionRef.current !== loadVersion) return;
//               texture.flipY = false;
//               texture.colorSpace = THREE.SRGBColorSpace;
//               material.map = texture;
//               material.needsUpdate = true;
//               material.opacity = 1;
//               loaded++;
//               if (loaded === total) {
//                 if (currentRoomVersionRef.current === loadVersion) {
//                   faceGroupRef.current.remove(oldGroup);
//                   faceGroupRef.current.add(newGroup);
//                   currentTileMeshes[targetFace + '_group'] = newGroup;
//                   currentTileMeshes[targetFace + '_level'] = nextLevel;
//                 }
//                 resolve();
//               }
//             },
//             undefined,
//             () => resolve()
//           );
//         }
//       }
//     });
//   }, [room]);

//   useFrame(() => {
//     if (!initialized || isEnhancingRef.current) return;
//     const cameraDirection = new THREE.Vector3();
//     camera.getWorldDirection(cameraDirection);
//     let selectedFace = null;
//     let maxDot = -Infinity;
//     const currentTileMeshes = tileMeshesRef.current;
//     faceKeys.forEach(faceKey => {
//       const faceDir = new THREE.Vector3(...faceTransforms[faceKey].position).normalize();
//       const dot = cameraDirection.dot(faceDir);
//       const currentLevel = currentTileMeshes[faceKey + '_level'] || 0;
//       if (dot > maxDot && currentLevel < maxLevel) {
//         maxDot = dot;
//         selectedFace = faceKey;
//       }
//     });
//     if (!selectedFace) return;
//     isEnhancingRef.current = true;
//     improveOneLevel(selectedFace).finally(() => {
//       isEnhancingRef.current = false;
//     });
//   });

//   return (
//     <group>
//       <group ref={faceGroupRef} />
//       {room.hotspots &&
//         room.hotspots.map((hotspot, idx) => (
//           <Hotspot
//             key={idx}
//             hotspot={hotspot}
//             onClick={() => {
//               savedCameraQuaternion.current = camera.quaternion.clone();
//               onRoomSwitch(hotspot.target);
//             }}
//           />
//         ))}
//     </group>
//   );
// }

// //
// // Main Component
// // Sets up the Canvas, OrbitControls (with restricted zoom and polar angle),
// // handles room switching, and uses HotspotRaycaster for global click detection.
// // Note: The camera is set at your specified position.
// //
// export default function TileGridViewer({roomId, facilitiesId}) {
//   const [roomsData, setRoomsData] = useState([]); // dynamic room data
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const savedCameraQuaternion = useRef(null);
//   const controlsRef = useRef();
//   const [error, setError] = useState(null);

//   const handleRoomSwitch = (roomId) => {
//     const newRoom = rooms.find(r => r.id === roomId);
//     if (newRoom) {
//       setCurrentRoom(newRoom);
//     }
//   };


  
//   useEffect(() => {
//     const controls = controlsRef.current;
//     if (controls && controls.domElement) {
//       const handleWheel = (e) => {
//         if (e.deltaY > 0) {
//           e.preventDefault();
//         }
//       };
//       controls.domElement.addEventListener('wheel', handleWheel, { passive: false });
//       return () => {
//         controls.domElement.removeEventListener('wheel', handleWheel);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     const loadRooms = async () => {
//       try {
//         console.log("Fetching rooms for roomId:", roomId);
//         const response = await fetch(`/api/method/simsaar.api.get_hotspot?placeId=${roomId}`);
//         const result = await response.json();
//         console.log("API response:", result);

//         if (!response.ok) {
//           throw new Error(result.message || "Failed to fetch room data");
//         }
        
//         // Map API response data to the room structure expected by the Room component.
//         // Here we assume:
//         // - id comes from room.name
//         // - preview is set to room.name (or you can adjust as needed)
//         // - tileBase is built as `/tiles/${room.name}` if not provided by your API.
//         const mappedRooms = result.message.data.map(room => ({
//           id: room.name,
//           preview: room.preview || room.name,
//           tileBase: room.tileBase || `${room.name}`,
//           hotspots: room.hotspots,
//         }));

//         setRoomsData(mappedRooms);
//         if (mappedRooms.length > 0 && !currentRoom) {
//           setCurrentRoom(mappedRooms[0]);
//         }
//       } catch (err) {
//         console.error("Error fetching rooms:", err);
//         setError(err.message);
//       }
//     };

//     loadRooms();
//   }, [roomId]);
//   if (error) return <div>Error: {error}</div>;
//   if (!currentRoom) return <div>Loading rooms...</div>;
//   return (
//     <Canvas
//       style={{ width: '100vw', height: '100vh', background: '#000' }}
//       camera={{ position: [0.01, 0, 0.001], fov: 75, near: 0.1, far: 1000 }}
//     >
//       <OrbitControls
//         ref={controlsRef}
//         makeDefault
//         minDistance={0.01}
//         maxDistance={0.01}
//         minPolarAngle={Math.PI / 3.5}
//         maxPolarAngle={Math.PI }
//       />
//       <ambientLight />
//       <Room
//         room={currentRoom}
//         roomId={roomId}
//         facilitiesId={facilitiesId}
//         savedCameraQuaternion={savedCameraQuaternion}
//         onRoomSwitch={handleRoomSwitch}
//       />
//       <HotspotRaycaster onHotspotClick={handleRoomSwitch} />
//     </Canvas>
//   );
// }











'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Face transforms & constants remain the same
const faceTransforms = {
  r: { position: [1, 0, 0], rotation: [0, Math.PI / 2, 0], sliceIndex: 4 },
  l: { position: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0], sliceIndex: 3 },
  d: { position: [0, 1, 0], rotation: [-Math.PI / 2, 0, 0], sliceIndex: 1 },
  u: { position: [0, -1, 0], rotation: [Math.PI / 2, 0, 0], sliceIndex: 5 },
  f: { position: [0, 0, 1], rotation: [0, 0, 0], sliceIndex: 2 },
  b: { position: [0, 0, -1], rotation: [0, Math.PI, 0], sliceIndex: 0 },
};

const faceKeys = ['r', 'l', 'u', 'd', 'f', 'b'];
const maxLevel = 3;
const levelDivisionsMap = { 1: 1, 2: 2, 3: 4 };

//
// Hotspot Component
//
function Hotspot({ hotspot, onClick }) {
  return (
    <mesh
      userData={{ target: hotspot.target, label: hotspot.label }}
      position={[
        hotspot.position[0],
        -hotspot.position[1],
        -hotspot.position[2],
      ]}
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={999}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        e.object.material.opacity = 1;
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        e.object.material.opacity = 0.6;
      }}
    >
      <ringGeometry args={[0.06, 0.1, 32]} />
      <meshBasicMaterial
        color="white"
        opacity={0.6}
        transparent
        side={THREE.DoubleSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

//
// HotspotRaycaster Component
//
function HotspotRaycaster({ onHotspotClick }) {
  const { scene, camera, gl } = useThree();
  const pointer = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const pointerDownPos = useRef(null);
  const CLICK_THRESHOLD = 5; // pixels

  useEffect(() => {
    const handlePointerDown = (e) => {
      pointerDownPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e) => {
      if (!pointerDownPos.current) return;
      const dx = e.clientX - pointerDownPos.current.x;
      const dy = e.clientY - pointerDownPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Only process if movement is within threshold
      if (distance > CLICK_THRESHOLD) {
        pointerDownPos.current = null;
        return;
      }
      pointerDownPos.current = null;

      const rect = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.current.setFromCamera(pointer.current, camera);

      const hotspots = [];
      scene.traverse((child) => {
        if (child.userData && child.userData.target) {
          hotspots.push(child);
        }
      });

      let nearestHotspot = null;
      let minDistance = Infinity;
      const THRESHOLD = 1.2; // world units

      for (const hotspot of hotspots) {
        const worldPos = new THREE.Vector3();
        hotspot.getWorldPosition(worldPos);
        const distToRay = raycaster.current.ray.distanceToPoint(worldPos);
        if (distToRay < THRESHOLD) {
          const camToHotspot = worldPos.distanceTo(camera.position);
          if (camToHotspot < minDistance) {
            minDistance = camToHotspot;
            nearestHotspot = hotspot;
          }
        }
      }

      if (nearestHotspot) {
        onHotspotClick(nearestHotspot.userData.target);
      }
    };

    gl.domElement.addEventListener('pointerdown', handlePointerDown);
    gl.domElement.addEventListener('pointerup', handlePointerUp, { passive: false });
    return () => {
      gl.domElement.removeEventListener('pointerdown', handlePointerDown);
      gl.domElement.removeEventListener('pointerup', handlePointerUp);
    };
  }, [scene, camera, gl, onHotspotClick]);

  return null;
}

//
// Room Component
//
function Room({ room, savedCameraQuaternion, onRoomSwitch, roomId, facilitiesId }) {
  const faceGroupRef = useRef();
  const tileMeshesRef = useRef({});
  const currentRoomVersionRef = useRef(0);
  const isEnhancingRef = useRef(false);
  const { camera } = useThree();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!faceGroupRef.current || !room) return;
    faceGroupRef.current.clear();
    currentRoomVersionRef.current++;
    tileMeshesRef.current = {};
    // Rotate faces as in original code
    faceGroupRef.current.rotation.x = Math.PI;

    const previewImage = new Image();
    // Use room.preview to build the image path.
    previewImage.src = `/tiles/${facilitiesId}/${roomId}/${room.preview}/preview.jpg`;
    previewImage.onload = () => {
      const faceHeight = previewImage.height / 6;
      const faceWidth = previewImage.width;
      faceKeys.forEach(faceKey => {
        const { position, rotation, sliceIndex } = faceTransforms[faceKey];
        const faceGroup = new THREE.Group();
        faceGroup.position.set(...position);
        faceGroup.rotation.set(...rotation);

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

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
        });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
        mesh.scale.set(2, 2, 1);
        faceGroup.add(mesh);
        faceGroupRef.current.add(faceGroup);

        tileMeshesRef.current[faceKey + '_group'] = faceGroup;
        tileMeshesRef.current[faceKey + '_level'] = 0;
      });
      setInitialized(true);
      if (savedCameraQuaternion.current) {
        camera.quaternion.copy(savedCameraQuaternion.current);
        camera.updateMatrixWorld();
      }
    };

    previewImage.onerror = (error) => {
      console.error('Error loading preview image:', error);
    };
  }, [room, camera, savedCameraQuaternion, roomId, facilitiesId]);

  const improveOneLevel = useCallback((targetFace) => {
    return new Promise((resolve) => {
      const currentTileMeshes = tileMeshesRef.current;
      let currentLevel = currentTileMeshes[targetFace + '_level'] || 0;
      if (currentLevel >= maxLevel) {
        resolve();
        return;
      }
      const nextLevel = currentLevel + 1;
      const divisions = levelDivisionsMap[nextLevel];
      const oldGroup = currentTileMeshes[targetFace + '_group'];
      if (!oldGroup) {
        resolve();
        return;
      }

      const loader = new THREE.TextureLoader();
      const loadVersion = currentRoomVersionRef.current;
      const newGroup = new THREE.Group();
      newGroup.position.copy(oldGroup.position);
      newGroup.rotation.copy(oldGroup.rotation);

      let loaded = 0;
      const total = divisions * divisions;
      for (let y = 0; y < divisions; y++) {
        for (let x = 0; x < divisions; x++) {
          const tileY = divisions - y - 1;
          const url = `/tiles/${facilitiesId}/${roomId}/${room.tileBase}/${nextLevel}/${targetFace}/${tileY}/${x}.jpg`;
          const geometry = new THREE.PlaneGeometry(1, 1);
          const material = new THREE.MeshBasicMaterial({
            side: THREE.BackSide,
            transparent: true,
            opacity: 0,
          });
          const mesh = new THREE.Mesh(geometry, material);
          const step = 2 / divisions;
          mesh.scale.set(step, step, 1);
          mesh.position.set(
            (x + 0.5 - divisions / 2) * step,
            -(y + 0.5 - divisions / 2) * step,
            0
          );
          newGroup.add(mesh);
          loader.load(
            url,
            (texture) => {
              if (currentRoomVersionRef.current !== loadVersion) return;
              texture.flipY = false;
              texture.colorSpace = THREE.SRGBColorSpace;
              material.map = texture;
              material.needsUpdate = true;
              material.opacity = 1;
              loaded++;
              if (loaded === total) {
                if (currentRoomVersionRef.current === loadVersion) {
                  faceGroupRef.current.remove(oldGroup);
                  faceGroupRef.current.add(newGroup);
                  currentTileMeshes[targetFace + '_group'] = newGroup;
                  currentTileMeshes[targetFace + '_level'] = nextLevel;
                }
                resolve();
              }
            },
            undefined,
            () => resolve()
          );
        }
      }
    });
  }, [room]);

  useFrame(() => {
    if (!initialized || isEnhancingRef.current) return;
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    let selectedFace = null;
    let maxDot = -Infinity;
    const currentTileMeshes = tileMeshesRef.current;
    faceKeys.forEach(faceKey => {
      const faceDir = new THREE.Vector3(...faceTransforms[faceKey].position).normalize();
      const dot = cameraDirection.dot(faceDir);
      const currentLevel = currentTileMeshes[faceKey + '_level'] || 0;
      if (dot > maxDot && currentLevel < maxLevel) {
        maxDot = dot;
        selectedFace = faceKey;
      }
    });
    if (!selectedFace) return;
    isEnhancingRef.current = true;
    improveOneLevel(selectedFace).finally(() => {
      isEnhancingRef.current = false;
    });
  });

  return (
    <group>
      <group ref={faceGroupRef} />
      {room.hotspots &&
        room.hotspots.map((hotspot, idx) => (
          <Hotspot
            key={idx}
            hotspot={hotspot}
            onClick={() => {
              savedCameraQuaternion.current = camera.quaternion.clone();
              onRoomSwitch(hotspot.target);
            }}
          />
        ))}
    </group>
  );
}

//
// Main Component
// Fetches dynamic room data from the API, sets up the Canvas and controls,
// and passes the fetched room data to the Room component for display.
//
export default function TileGridViewer({ roomId, facilitiesId }) {
  const [roomsData, setRoomsData] = useState([]); // dynamic room data
  const [currentRoom, setCurrentRoom] = useState(null);
  const savedCameraQuaternion = useRef(null);
  const controlsRef = useRef();
  const [error, setError] = useState(null);

  // Fetch room data from API
  useEffect(() => {
    const loadRooms = async () => {
      try {
        console.log("Fetching rooms for roomId:", roomId);
        const response = await fetch(`/api/method/simsaar.api.get_hotspot?placeId=${roomId}`);
        const result = await response.json();
        console.log("API response:", result);

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch room data");
        }
        
        // Map API response data to the room structure expected by the Room component.
        // Here we assume:
        // - id comes from room.name
        // - preview is set to room.name (or you can adjust as needed)
        // - tileBase is built as `/tiles/${room.name}` if not provided by your API.
        const mappedRooms = result.message.data.map(room => ({
          id: room.name,
          preview: room.preview || room.name,
          tileBase: room.tileBase || `${room.name}`,
          hotspots: room.hotspots,
        }));

        setRoomsData(mappedRooms);
        if (mappedRooms.length > 0 && !currentRoom) {
          setCurrentRoom(mappedRooms[0]);
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError(err.message);
      }
    };

    loadRooms();
  }, [roomId]);

  // Room switching based on dynamic data
  const handleRoomSwitch = (targetRoomId) => {
    const newRoom = roomsData.find((r) => r.id === targetRoomId);
    if (newRoom) {
      setCurrentRoom(newRoom);
    }
  };

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls && controls.domElement) {
      const handleWheel = (e) => {
        if (e.deltaY > 0) {
          e.preventDefault();
        }
      };
      controls.domElement.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        controls.domElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!currentRoom) return <div>Loading rooms...</div>;

  return (
    <Canvas
      style={{ width: '100vw', height: '100vh', background: '#000' }}
      camera={{ position: [1, 0, 1], fov: 75, near: 0.1, far: 1000 }}
    >
      <OrbitControls
        ref={controlsRef}
        makeDefault
        minDistance={0.01}
        maxDistance={0.01}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI}
      />
      <ambientLight />
      <Room
        room={currentRoom}
        roomId={roomId}
        facilitiesId={facilitiesId}
        savedCameraQuaternion={savedCameraQuaternion}
        onRoomSwitch={handleRoomSwitch}
      />
      <HotspotRaycaster onHotspotClick={handleRoomSwitch} />
    </Canvas>
  );
}
