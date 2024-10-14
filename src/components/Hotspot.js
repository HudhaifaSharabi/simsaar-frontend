import { useRef, useState } from 'react';
import { Html, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';

const Hotspot = ({ hotspot, onClick }) => {
  const hotspotRef = useRef();
  const iconTexture = useTexture('/hotspot-icon.png');
  
  // حالة لتخزين حجم الـ hotspot
  const [scale, setScale] = useState(2.0); // حجم البداية للـ hotspot

  return (
    <sprite
      position={[hotspot.position[0], -10, hotspot.position[2]]}  // وضع الـ hotspot في موقعه الصحيح
      ref={hotspotRef}
      onClick={() => onClick(hotspot.targetRoom)}
      scale={[scale, scale, scale]}  // تطبيق الحجم على الـ hotspot
      onPointerOver={() => setScale(2.5)}  // تكبير الحجم عند مرور الماوس
      onPointerOut={() => setScale(2.0)}  // إعادة الحجم عند إزالة الماوس
    >
      <spriteMaterial 
        map={iconTexture} 
        transparent={true}  // تفعيل الشفافية
        depthWrite={false}  // منع الكتابة على العمق لتفادي مشاكل العرض
      />
      <Html distanceFactor={10}>
        {/* محتوى إضافي هنا إذا لزم */}
      </Html>
    </sprite>
  );
};

export default Hotspot;
