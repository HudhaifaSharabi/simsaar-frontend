// src/components/Sidebar.js

"use client";

import { motion } from "framer-motion";

const Sidebar = ({ roomInfo, onRoomChange }) => {
  return (
    <motion.div
      className="sidebar"
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="controls">
        {roomInfo.hotspots.map((hotspot) => (
          <button
            className="btn btn-primary  w-100"
            key={hotspot.id}
            onClick={() => onRoomChange(hotspot.targetRoom)}
          >
            {roomInfo.name}
          </button>
        ))}
      </div>
      <style jsx>{`
        .sidebar {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.5); // شفافية للخلفية ليتداخل مع العرض
          padding: 10px;
          display: flex;
          justify-content: center;
          gap: 10px;
          z-index: 10;
        }
      `}</style>
    </motion.div>
  );
};

export default Sidebar;
