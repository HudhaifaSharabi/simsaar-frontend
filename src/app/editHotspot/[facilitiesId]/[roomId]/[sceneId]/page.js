import HotspotEditor from "@/components/Tour360/editViewer";
export default function RoomPage({ params }) {
  const { roomId } = params;
  const { facilitiesId } = params;
  const { sceneId } = params;
  return (
   
        <HotspotEditor 
        facilitiesId={facilitiesId}
        roomId={roomId}
        sceneId={sceneId}
       
        />   
  );
}
