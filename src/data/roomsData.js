// src/data/roomsData.js

export const rooms = [
    {
      id: '1',
      name: 'الغرفة الأولى',
      description: 'هذه هي الغرفة الأولى والتي تحتوي على ميزات رائعة.',
      image: '/images/rooms/room1.jpg',
      hotspots: [
        { id: '1-1', position: [-13, -10, -2], name: 'الانتقال إلى الغرفة الثانية', targetRoom: '2' },
      ],
    },
    {
      id: '2',
      name: 'الغرفة الثانية',
      description: 'هذه هي الغرفة الثانية، وهي تحتوي على تفاصيل فريدة.',
      image: '/images/rooms/room2.jpg',
      hotspots: [
        { id: '2-1', position: [15, 0, 2], name: 'العودة إلى الغرفة الأولى', targetRoom: '1' },
        { id: '2-2', position: [-20, 0, -1], name: 'العودة إلى الغرفة الأولى', targetRoom: '3' },
      ],
    },
    {
      id: '3',
      name: 'الغرفة الثالثة',
      description: 'الغرفة الثالثة تتميز بتصميمها الأنيق.',
      image: '/images/rooms/room3.jpg',
      hotspots: [
        { id: '3-1', position: [15, 0, -.2], name: 'العودة إلى الغرفة الثانية،', targetRoom: '2' },
      ],
    },
  ];
  