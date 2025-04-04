import HotspotEditor from "@/components/HotspotEditor";
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
