// app/loading.js
"use client"; // This indicates that the component should be rendered on the client-side

import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '@/assets/animations/loading-animation.json'; // Ensure the path is correct

const LoadingPage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full height of the viewport
      width: '100vw', // Full width of the viewport
      backgroundColor: '#f8f9fa', // Optional: set a background color
      position: 'fixed', // Position fixed to cover the entire page
      top: 0,
      left: 0,
      zIndex: 9999 // Ensure it stays on top of other content
    }}>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: '150px', width: '150px' }} // Adjust size as needed
      />
    </div>
  );
};

export default LoadingPage;
