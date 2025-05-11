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
                    <h1>  طلب حذف الحساب - تطبيق مساري </h1>
                  <p>
                    طلب حذف الحساب – سمسار | simsaar.
نحن نولي أهمية كبيرة لخصوصية مستخدمينا وحقوقهم المتعلقة ببياناتهم الشخصية. إذا كنت ترغب في حذف بياناتك الشخصية من أنظمتنا، يمكنك طلب ذلك من خلال التواصل معنا على البريد الإلكتروني التالي:

info@simsaar.co

يرجى تضمين المعلومات التالية في رسالتك لضمان تنفيذ الطلب بسرعة:

الاسم الكامل
البريد الإلكتروني المرتبط بالحساب
سبب الحذف (اختياري)
سنقوم بمراجعة طلبك واتخاذ الإجراءات اللازمة خلال مدة لا تتجاوز 7 أيام عمل، وسيتم إخطارك فور حذف الحساب.

نشكرك لاستخدامك منصة سمسار | simsaar.
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
