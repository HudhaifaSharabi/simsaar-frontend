// src/components/Sidebar.js

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { roomsData } from "@/data/roomsData";
import styles from "./Sidebar.module.css";
import Image from "next/image";

const Sidebar = ({ roomInfo, onRoomChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const roomsPerPage = 3;

  // Get all available rooms
  const allRooms = roomsData.allImages;
  const totalPages = Math.ceil(allRooms.length / roomsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? totalPages - 1 : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((current) =>
      current === totalPages - 1 ? 0 : current + 1
    );
  };

  // Get current visible rooms
  const visibleRooms = allRooms.slice(
    currentIndex * roomsPerPage,
    (currentIndex + 1) * roomsPerPage
  );

  return (
    <motion.div
      className={styles.sidebar}
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className={styles.controls}>
        <div className={styles.roomNavigation}>
          <button className={styles.arrowButton} onClick={handlePrevious}>
            ←
          </button>

          <div className={styles.roomButtons}>
            {visibleRooms.map((room) => (
              <button
                key={room._id}
                className={`${styles.roomButton} ${
                  room._id === roomInfo.imageId ? styles.activeRoom : ""
                }`}
                onClick={() => onRoomChange(room._id)}
              >
                <div className={styles.roomThumbnail}>
                  <Image
                    src={room.thumbnail}
                    alt={room.name}
                    width={60}
                    height={60}
                  />
                </div>
                <span className={styles.roomName}>{room.name}</span>
              </button>
            ))}
          </div>

          <button className={styles.arrowButton} onClick={handleNext}>
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
