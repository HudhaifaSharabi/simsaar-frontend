'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThreeSixtyViewer from '../../../components/ThreeSixtyViewer';
import Sidebar from '../../../components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './styles.module.css'; // استدعاء CSS Module

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
        const res = await fetch(`${process.env.SERVER_API}/api/rooms?id=${id}`);
        if (!res.ok) {
          throw new Error('Room not found');
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
    router.push(`/rooms/${targetRoomId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!currentRoom) return null;

  return (
    <div className={styles.roomContainer}>
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
      </AnimatePresence>

      <Sidebar
        roomInfo={currentRoom} // Pass the current room info to the sidebar
        onRoomChange={handleHotspotClick}
        className={styles.sidebarContainer}
      />
    </div>
  );
};

export default RoomPage;
