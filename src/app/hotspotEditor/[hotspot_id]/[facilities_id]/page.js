"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThreeSixtyEditorViewer from "@/components/ThreeSixtyEditorViewer";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.css";

const HotspotEditorPage = ({ params }) => {
  const router = useRouter();
  const { hotspot_id, facilities_id } = params;
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const response = await fetch(`/api/resource/Hotspot/${hotspot_id}?expand=1`);
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Failed to fetch room data");
        setCurrentRoom(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadRoom();
  }, [hotspot_id]);

  const handleSavePositions = async (updatedHotspots) => {
    try {
      // Implement your API call to save the updated positions
      console.log("Saving positions:", updatedHotspots);
      // Add your API call here
    } catch (error) {
      console.error("Error saving positions:", error);
    }
  };

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
          <ThreeSixtyEditorViewer
            roomData={currentRoom}
            onSave={handleSavePositions}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HotspotEditorPage;