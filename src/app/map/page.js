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
      ? `${process.env.NEXT_PUBLIC_SERVER_API.replace(/^https?:\/\//, "")}${type.icon}`
      : `http://${process.env.NEXT_PUBLIC_SERVER_API.replace(/^https?:\/\//, "")}/images/hotelMapMarker.png`; // Default icon if not found
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
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={12}
                      onLoad={onLoad}
                      onBoundsChanged={() => {
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
                      }}
                    >
                      {filteredHotels.map((hotel, index) => (
                        <Marker
                          key={index}
                          position={{
                            lat: parseFloat(hotel.lat),
                            lng: parseFloat(hotel.lng),
                          }}
                          icon={{
                            url: getIconUrl(hotel.property_type),
                            scaledSize: googleMaps
                              ? new googleMaps.maps.Size(90, 90)
                              : null,
                          }}
                          onClick={() => setSelectedHotel(hotel)}
                        />
                      ))}

                      {selectedHotel && (
                        <InfoWindow
                          position={{
                            lat: parseFloat(selectedHotel.lat),
                            lng: parseFloat(selectedHotel.lng),
                          }}
                          onCloseClick={() => setSelectedHotel(null)}
                        >
                          <div style={{ width: "200px", textAlign: "center" }}>
                            {selectedHotel.image && (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_SERVER_API +
                                  selectedHotel.image
                                }
                                alt={selectedHotel.facilitie_name}
                                width={200}
                                height={100}
                                style={{
                                  borderRadius: "5px",
                                  marginBottom: "10px",
                                }}
                              />
                            )}
                            <strong>{selectedHotel.facilitie_name}</strong>
                            <p>{selectedHotel.formatted_address}</p>
                            <button
                              onClick={() =>
                                router.push(`/property-detail/${selectedHotel.name}`)
                              }
                              style={{
                                marginTop: "10px",
                                padding: "5px 10px",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                cursor: "pointer",
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </InfoWindow>
                      )}

                      <div
                        style={{
                          position: "absolute",
                          bottom: "20px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "80%",
                          zIndex: 1000,
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        <Swiper
                          spaceBetween={10}
                          navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                          }}
                          autoplay={{ delay: 3000 }}
                          pagination={{ clickable: true }}
                          rtl={true}
                          slidesPerView="auto"
                          className="mySwiper"
                        >
                          {filteredHotels.map((hotel, index) => (
                            <SwiperSlide
                              key={index}
                              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                              style={{ width: "200px" }}
                            >
                              <div className="property-card flex">
                                <div className="property-image w-1/2 h-full overflow-hidden">
                                  <Image
                                    src={
                                      process.env.NEXT_PUBLIC_SERVER_API +
                                      hotel.image
                                    }
                                    alt={hotel.facilitie_name}
                                    width={200}
                                    height={120}
                                    className="rounded-t-lg object-cover h-full w-full"
                                  />
                                </div>
                                <div className="property-info w-1/2 p-2">
                                  <h5 className="text-sm font-bold">
                                    {hotel.facilitie_name}
                                  </h5>
                                  <Link href={`/property-detail/${hotel.name}`}>
                                    <p className="mt-1 text-blue-500 hover:underline text-xs">
                                      View Details
                                    </p>
                                  </Link>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        <div
                          className="swiper-button-prev"
                          style={{ color: "#333", left: "10px" }}
                        >
                          &#10094;
                        </div>
                        <div
                          className="swiper-button-next"
                          style={{ color: "#333", right: "10px" }}
                        >
                          &#10095;
                        </div>
                      </div>
                    </GoogleMap>
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
