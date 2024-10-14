// src/app/page.js

'use client';

import Link from 'next/link';
import { rooms } from '../data/roomsData';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>مرحبًا بكم في جولة الغرف التفاعلية</h1>
      <div className="rooms-list">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="room-item"
          >
            <Link href={`/rooms/${room.id}`}>
              <img src={room.image} alt={room.name} />
              <h2>{room.name}</h2>
            </Link>
          </motion.div>
        ))}
      </div>
      <style jsx>{`
        .home-container {
          padding: 50px;
          text-align: center;
        }
        .rooms-list {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .room-item {
          width: 300px;
          cursor: pointer;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }
        .room-item:hover {
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
        }
        .room-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .room-item h2 {
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
