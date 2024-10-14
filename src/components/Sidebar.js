// src/components/Sidebar.js

'use client';

import { motion } from 'framer-motion';

const Sidebar = ({ roomInfo, onRoomChange }) => {
  return (
    <motion.div
      className="sidebar"
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="controls">
        {roomInfo.hotspots.map((hotspot) => (
          <button key={hotspot.id} onClick={() => onRoomChange(hotspot.targetRoom)}>
            {hotspot.name}
          </button>
        ))}
      </div>
      <style jsx>{`
        .sidebar {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);  // شفافية للخلفية ليتداخل مع العرض
          padding: 10px;
          display: flex;
          justify-content: center;
          gap: 10px;
          z-index: 10;
        }
        .controls button {
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .controls button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </motion.div>
  );
};

export default Sidebar;
