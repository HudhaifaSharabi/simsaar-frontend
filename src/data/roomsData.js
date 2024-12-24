// src/data/roomsData.js

export const roomsData = {
  allImages: [
    {
      _id: "img1",
      name: "الغرفه الرئيسية",
      url: "/360-images/bedroom.jpg",
      thumbnail: "/thumbnails/living-room-thumb.jpg",
      dateAdded: "2024-03-20T10:00:00Z",
      category: "residential",
    },
    {
      _id: "img2",
      name: "الغرفه الثانيه",
      url: "/360-images/kitchen.jpg",
      thumbnail: "/thumbnails/kitchen-thumb.jpg",
      dateAdded: "2024-03-20T10:01:00Z",
      category: "residential",
    },
  ],
  activeRooms: [
    {
      _id: "room1",
      imageId: "img1",
      isActive: true,
      hotspots: [
        {
          id: "hs1",
          name: "To Kitchen",
          position: [250, -150, 0],
          targetImage: "img2",
          tooltip: "Go to Kitchen",
          type: "floor",
          targetView: {
            rotation: [0, Math.PI, 0],
            fov: 75,
          },
        },
      ],
      defaultView: {
        rotation: [0, 0, 0],
        fov: 75,
      },
    },
    {
      _id: "room2",
      imageId: "img2",
      isActive: true,
      hotspots: [
        {
          id: "hs2",
          name: "To Living Room",
          position: [250, -150, 0],
          targetImage: "img1",
          tooltip: "Back to Living Room",
          type: "floor",
          targetView: {
            rotation: [0, 0, 0],
            fov: 75,
          },
        },
      ],
      defaultView: {
        rotation: [0, 0, 0],
        fov: 75,
      },
    },
  ],
  settings: {
    hotspotSize: 50,
    transitionSpeed: 1000,
    defaultFov: 75,
  },
};
