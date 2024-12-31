"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ThreeSixtyViewer from "@/components/ThreeSixtyViewer";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import styles from "./styles.module.css";

const RoomPage = ({ params }) => {

  const router = useRouter();

  const { hotspot_id } = params;
  const { facilities_id } = params;
  const [places, setPlaces] = useState(null);

  const [currentRoom, setCurrentRoom] = useState(null);
  const [preloadedTextures, setPreloadedTextures] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const preloadTexture = useCallback(async (imageId) => {
    if (!imageId || preloadedTextures[imageId]) return;

    const loader = new THREE.TextureLoader();
    return new Promise((resolve) => {
      loader.load(imageId, (texture) => {
        setPreloadedTextures((prev) => ({
          ...prev,
          [imageId]: texture,
        }));
        resolve(texture);
      });
    });
  }, [preloadedTextures]);

  const preloadConnectedRooms = useCallback(async (room) => {
    if (!room?.hotspots) return;

    const preloadPromises = room.hotspots.map((hotspot) =>
      preloadTexture(hotspot.image360)
    );
    await Promise.all(preloadPromises);
  }, [preloadTexture]);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const response = await fetch(`/api/resource/Hotspot/${hotspot_id}?expand=1`);
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Failed to fetch room data");

        await preloadTexture(result.data.image360);
        preloadConnectedRooms(result.data);

        setCurrentRoom(result.data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadRoom();
  }, [hotspot_id]);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const response = await fetch(`/api/resource/Places?filters=[["facilitie","=","${facilities_id}"]]&fields=["*"]`);
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Failed to fetch places");

        setPlaces(result.data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadPlaces();
  }, [facilities_id]);

  useEffect(() => {
    if (places && currentRoom) setLoading(false);
  }, [places, currentRoom]);  // Set loading to false once both are available

  const handleHotspotClick = useCallback(async (hotspot) => {
    const targetRoomId = hotspot.hotspot;
    try {
      const response = await fetch(`/api/resource/Hotspot/${targetRoomId}?expand=1`);
      const result = await response.json();

      if (response.ok) {
        await preloadTexture(result.data.image360);
        router.push(`/roomsView/${targetRoomId}/${facilities_id}`);
      }
    } catch (error) {
      console.error('Error preloading next room:', error);
      router.push(`/roomsView/${targetRoomId}/`);
    }
  }, [facilities_id, router, preloadTexture]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!currentRoom) return null;

  return (
    <div className={styles.roomContainer}>
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
            roomData={currentRoom}
            places={places}
            preloadedTextures={preloadedTextures}
            onHotspotClick={handleHotspotClick}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RoomPage;