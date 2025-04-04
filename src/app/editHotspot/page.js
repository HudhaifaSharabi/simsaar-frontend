import HotspotEditor from "@/components/Tour360/editViewer";
export default function RoomPage({ params }) {

  return (
    <div className="room-container">
        <HotspotEditor 
        hotelId="hotel-1"
        roomId="room1"
        sceneId="room1"
       
        />    </div>
  );
}
