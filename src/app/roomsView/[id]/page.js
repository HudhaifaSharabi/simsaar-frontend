"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ThreeSixtyViewer from "@/components/ThreeSixtyViewer";
import Sidebar from "@/components/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { roomsData } from "@/data/roomsData";
import styles from "./styles.module.css";
import Image from "next/image";

const TopLeftSidebar = ({ currentRoom }) => {
  const roomInfo = roomsData.allImages.find(
    (img) => img._id === currentRoom.imageId
  );

  return (
    <div className={styles.topLeftSidebar}>
      <img src="/images/logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.roomInfo}>
        <h2>{roomInfo?.name}</h2>
        <div className={styles.floorButtons}>
          <button className={styles.floorButton}>Ground Floor</button>
          <button className={styles.floorButton}>First Floor</button>
          {/* Add more floor buttons as needed */}
        </div>
      </div>
    </div>
  );
};

const RoomPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [currentRoom, setCurrentRoom] = useState(null);
  const [preloadedTextures, setPreloadedTextures] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Preload texture function
  const preloadTexture = useCallback(
    async (imageId) => {
      const imageData = roomsData.allImages.find((img) => img._id === imageId);
      if (!imageData || preloadedTextures[imageId]) return;

      return new Promise((resolve) => {
        const loader = new THREE.TextureLoader();
        loader.load(imageData.url, (texture) => {
          setPreloadedTextures((prev) => ({
            ...prev,
            [imageId]: texture,
          }));
          resolve(texture);
        });
      });
    },
    [preloadedTextures]
  );

  // Preload connected rooms
  const preloadConnectedRooms = useCallback(
    async (room) => {
      if (!room?.hotspots) return;

      const preloadPromises = room.hotspots.map((hotspot) =>
        preloadTexture(hotspot.targetImage)
      );
      await Promise.all(preloadPromises);
    },
    [preloadTexture]
  );

  // Load room data
  useEffect(() => {
    const loadRoom = async () => {
      try {
        // Find room by id
        const room = roomsData.activeRooms.find((room) => room._id === id);
        if (!room) throw new Error("Room not found");

        // Preload current room texture
        await preloadTexture(room.imageId);
        setCurrentRoom(room);

        // Preload connected rooms in background
        preloadConnectedRooms(room);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadRoom();
  }, [id, preloadTexture, preloadConnectedRooms]);

  // Handle hotspot click
  const handleHotspotClick = async (targetImageId, targetView) => {
    try {
      const targetRoom = roomsData.activeRooms.find(
        (room) => room.imageId === targetImageId
      );

      if (!targetRoom) throw new Error("Target room not found");

      // Update URL without full page reload
      router.push(`/roomsView/${targetRoom._id}`, { shallow: true });

      // Update current room with target view
      setCurrentRoom({
        ...targetRoom,
        defaultView: targetView || targetRoom.defaultView, // Use target view if provided
      });

      // Preload connected rooms in background
      preloadConnectedRooms(targetRoom);
    } catch (err) {
      console.error("Error navigating to room:", err);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!currentRoom) return null;

  return (
    <div className={styles.roomContainer}>
      <TopLeftSidebar currentRoom={currentRoom} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoom._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.viewer}
        >
          <ThreeSixtyViewer
            roomData={{
              ...currentRoom,
              settings: roomsData.settings, // Include global settings
            }}
            preloadedTextures={preloadedTextures}
            onHotspotClick={handleHotspotClick}
          />
        </motion.div>

        <motion.div
          key="sidebar"
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 20 }}
          transition={{ duration: 0.5 }}
          className={styles.sidebar}
        >
          <Sidebar
            roomInfo={{
              name:
                roomsData.allImages.find(
                  (img) => img._id === currentRoom.imageId
                )?.name || "Room",
              imageId: currentRoom.imageId,
              hotspots: currentRoom.hotspots,
            }}
            onRoomChange={handleHotspotClick}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RoomPage;
