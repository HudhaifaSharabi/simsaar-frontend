"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import ScrollTop from "@/components/home/scrollTop";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "@/assets/animations/loading-animation.json";
import Image from "next/image";
import Link from "next/link";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const mapContainerStyle = {
  height: "calc(100vh - 80px)",
  width: "100%",
};

const center = {
  lat: 15.3597304,
  lng: 44.1958892,
};

export default function IndexFour() {
  const router = useRouter();
  const [facilities, setFacilities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [map, setMap] = useState(null);
  const [googleMaps, setGoogleMaps] = useState(null);

  useEffect(() => {
    fetchFacilities();
    fetchPropertyTypes();
  }, []);

  useEffect(() => {
    if (map) {
      const bounds = map.getBounds();
      if (bounds) {
        const visibleHotels = facilities.filter((hotel) => {
          const lat = parseFloat(hotel.lat);
          const lng = parseFloat(hotel.lng);
          return bounds.contains({ lat, lng });
        });
        setFilteredHotels(visibleHotels);
      }
    }
  }, [map, facilities]);

  const fetchFacilities = async () => {
    try {
      const res = await fetch(
        `/api/resource/facilities?fields=["*"]`
      );
      if (!res.ok) throw new Error("Facilities not found");
      const data = await res.json();
      setFacilities(data.data); // Update with the correct path for facilities
      setFilteredHotels(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyTypes = async () => {
    try {
      const res = await fetch(
        `/api/resource/Property Type?fields=["*"]`
      );
      if (!res.ok) throw new Error("Property types not found");
      const data = await res.json();
      setPropertyTypes(data.data); // Update with the correct path for property types
    } catch (err) {
      setError(err.message);
    }
  };

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
    setGoogleMaps(window.google);
  };

  const getIconUrl = (propertyTypeId) => {
    const type = propertyTypes.find((pt) => pt.name === propertyTypeId);
    return type
      ? process.env.NEXT_PUBLIC_SERVER_API + type.icon
      : `${process.env.NEXT_PUBLIC_SERVER_API}/files/6703202a3a7fb7450b2f8131.png`; // Default icon if not found
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: "300px", width: "300px" }}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar navClass="defaultscroll sticky" menuClass="navigation-menu" />
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <section className="position-relative mt-5 pt-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 p-0">
                <div className="card map border-0">
                  <div className="card-body p-0">
                    <h1>  سياسة الخصوصية لتطبيق سمسار | simsaar
</h1>
                  <p>
                   توضح هذه السياسة كيف تقوم تطبيق سمسار | simsaar بجمع واستخدام وحماية معلوماتك عند استخدامك لتطبيقنا وخدماتنا. باستخدامك للتطبيق، فإنك توافق على ممارساتنا الموضحة هنا.
-----------------------------------------------------------------------------
2️⃣ أنواع البيانات التي نجمعها
✅ البيانات التي تقدمها طواعية:
الاسم الأول واسم العائلة
رقم الهاتف

✅ البيانات التي تُجمع تلقائيًا:
عنوان IP
نوع الجهاز والمتصفح
مدة الاستخدام
معرفات الأجهزة الفريدة
بيانات تشخيصية
-----------------------------------------------------------------------------
3️⃣ كيف نستخدم بياناتك؟
نستخدم بياناتك من أجل:
تشغيل وصيانة الخدمة
إدارة الحساب
تنفيذ الطلبات والعقود  بين العملاء والمن
التواصل معك عبر البريد الإلكتروني أو الهاتف
إرسال العروض المشابهة لما استفسرت عنه
تحسين جودة الخدمة وتحليل الاستخدام
الامتثال للمتطلبات القانونية
-----------------------------------------------------------------------------
4️⃣ مشاركة بياناتك
قد نشارك بياناتك مع:
مزودي الخدمات الخارجيين
شركائنا التجاريين المتعاقدين معنا
السلطات الحكومية إذا طُلب ذلك قانونيًا
-----------------------------------------------------------------------------
5️⃣ حقوق المستخدم
نحن نحترم حقوقك المتعلقة ببياناتك، وتشمل:
✅ الحق في الوصول: يمكنك طلب نسخة من بياناتك الشخصية.
✅ الحق في التصحيح: يمكنك طلب تصحيح أي معلومات غير دقيقة.
✅ الحق في الحذف: يمكنك طلب حذف بياناتك من أنظمتنا (مع مراعاة الالتزامات القانونية).
✅ الحق في تقييد المعالجة: يمكنك طلب تقييد معالجة بياناتك في بعض الحالات.
✅ الحق في الاعتراض: يمكنك الاعتراض على استخدام بياناتك لأغراض معينة.

لطلب أي من هذه الحقوق، يُرجى التواصل معنا عبر البريد: info@simsaar.co
-----------------------------------------------------------------------------
6️⃣ الاحتفاظ بالبيانات
نحتفظ ببياناتك فقط طالما كان ذلك ضروريًا للأغراض المذكورة أو للامتثال للقانون.
-----------------------------------------------------------------------------
7️⃣ أمن البيانات
نتخذ التدابير الفنية والتنظيمية لحماية بياناتك، لكننا لا نستطيع ضمان الحماية المطلقة عبر الإنترنت. عدم مشاركة بياناتك مع أطراف غير موثوقة.
-----------------------------------------------------------------------------
🔄 التغييرات على سياسة الخصوصية
قد نقوم بتحديث هذه السياسة وسنخطرك عبر البريد الإلكتروني أو إشعار داخل التطبيق. يُرجى مراجعتها بانتظام.
-----------------------------------------------------------------------------
📩 الاتصال بنا
لأي استفسارات أو طلبات تتعلق بسياسة الخصوصية، يرجى التواصل عبر:
info@simsaar.co
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LoadScript>
    </>
  );
}
