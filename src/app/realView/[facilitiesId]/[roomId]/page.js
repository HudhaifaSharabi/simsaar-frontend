'use client';
// import Head from 'next/head';
import Viewer from '@/components/Tour360/Viewer'; // استيراد مباشر بدون dynamic

export default function Home({ params }) {
  const { roomId } = params;
  const { facilitiesId } = params;
  return (
    <>
    
     
      <Viewer roomId={roomId} facilitiesId={facilitiesId} />
    </>
  );
}
