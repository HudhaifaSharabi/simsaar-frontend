"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThreeSixtyViewer from "@/components/ThreeSixtyViewer";
import Sidebar from "@/components/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.css"; // استدعاء CSS Module

const TopLeftSidebar = () => {
  return (
    <div className={styles.topLeftSidebar}>
      <img src="/images/logo.png" alt="Logo" className={styles.logo} />
    </div>
  );
};

const RoomPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch room and hotspots from API
    const fetchRoomData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/rooms?id=${id}`
        );
        if (!res.ok) {
          throw new Error("Room not found");
        }
        const data = await res.json();
        setCurrentRoom(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [id]);

  // Handle click on hotspot
  const handleHotspotClick = (targetRoomId) => {
    router.push(`/roomsView/${targetRoomId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!currentRoom) return null;

  return (
    <div className={styles.roomContainer}>
      <TopLeftSidebar /> {/* Add the TopLeftSidebar here */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoom._id} // Make sure to use the correct unique identifier
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.viewer}
        >
          <ThreeSixtyViewer
            roomImage={currentRoom.image} // Use the image from the fetched data
            hotspots={currentRoom.hotspots} // Use the fetched hotspots
            onHotspotClick={handleHotspotClick}
          />
        </motion.div>

        <motion.div
          key="sidebar" // Unique key for the sidebar to animate
          initial={{ opacity: 0, translateY: 20 }} // Start slightly below
          animate={{ opacity: 1, translateY: 0 }} // Fade in and slide up
          exit={{ opacity: 0, translateY: 20 }} // Fade out and slide down
          transition={{ duration: 0.5 }}
          className={styles.sidebar}
        >
          <Sidebar
            roomInfo={currentRoom} // Pass the current room info to the sidebar
            onRoomChange={handleHotspotClick}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RoomPage;
