// app/loading.js
"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Import the Player component correctly
const Player = dynamic(() => 
  import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Player
        autoplay
        loop
        src="/animations/loading-animation.json"
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
}
