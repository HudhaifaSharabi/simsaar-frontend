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
import { FiHome, FiHeart, FiCamera } from "@/assets/icons/vander";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { propertyData } from "@/data/data";

SwiperCore.use([Navigation, Pagination, Autoplay]);
import { Swiper, SwiperSlide } from "swiper/react";

const mapContainerStyle = {
  height: "calc(100vh - 80px)", // Adjust height to fill the screen, minus navbar height
  width: "100%",
};
const libraries = ["places"]; // Specify the libraries you need

const center = {
  lat: 15.3597304,
  lng: 44.1958892,
};

export default function IndexFour() {
  const router = useRouter();
  const [property, setProperty] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [map, setMap] = useState(null);
  const [googleMaps, setGoogleMaps] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState("all"); // Default to show all properties

  useEffect(() => {
    fetchRoomData();
    fetchPropertyTypes(); // Fetch property types
  }, []);

  useEffect(() => {
    if (map) {
      const bounds = map.getBounds();
      if (bounds) {
        const visibleHotels = property.filter((hotel) => {
          const lat = parseFloat(hotel.location.lat);
          const lng = parseFloat(hotel.location.lng);
          return bounds.contains({ lat, lng });
        });
        setFilteredHotels(visibleHotels);
      }
    }
  }, [map, property]);

  const fetchRoomData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/property`
      );
      if (!res.ok) {
        throw new Error("Property not found");
      }
      const data = await res.json();
      setProperty(data);
      setFilteredHotels(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyTypes = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/propertyType`
      );
      if (!res.ok) {
        throw new Error("Property types not found");
      }
      const data = await res.json();
      setPropertyTypes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
    setGoogleMaps(window.google);
  };

  const handleSearch = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        setMap((prevMap) => {
          prevMap.panTo({ lat: lat(), lng: lng() });
          prevMap.setZoom(12);
          return prevMap;
        });
        setFilteredHotels(
          property.filter((hotel) => {
            const hotelLat = parseFloat(hotel.location.lat);
            const hotelLng = parseFloat(hotel.location.lng);
            return (
              hotelLat >= lat() - 0.1 &&
              hotelLat <= lat() + 0.1 && // Adjust range as needed
              hotelLng >= lng() - 0.1 &&
              hotelLng <= lng() + 0.1
            );
          })
        );
      }
    }
  };

  const handlePropertyTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedPropertyType(selectedType);

    // Filter properties based on the selected type
    if (selectedType === "all") {
      setFilteredHotels(property);
    } else {
      setFilteredHotels(
        property.filter((hotel) => hotel.propertyType === selectedType)
      );
    }
  };

  const getIconUrl = (propertyTypeId) => {
    const type = propertyTypes.find((pt) => pt._id === propertyTypeId);
    return type
      ? process.env.NEXT_PUBLIC_SERVER_API + type.icon
      : `${process.env.NEXT_PUBLIC_SERVER_API}/images/hotelMapMarker.png`; // Default icon if not found
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
              <div className="col-lg-12">
                <div className="features-absolute subscribe-search">
                  <div
                    className="row"
                    style={{
                      position: "absolute",
                      top: "150px", // Adjust the value for the vertical position
                      left: "50%",
                      transform: "translateX(-50%)", // Center horizontally
                      width: "80%",
                      zIndex: 1000,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="col-lg-7 col-md-9">
                      <div className="text-center subscribe-form">
                        <form style={{ maxWidth: "800px" }}>
                          <div className="mb-0">
                            {/* Autocomplete Input */}
                            <Autocomplete
                              onLoad={(ref) => setAutocomplete(ref)}
                              onPlaceChanged={handleSearch}
                              restrictions={{ country: "YE" }} // Restrict search to Yemen
                            >
                              <input
                                type="text"
                                placeholder="ابحث عن موقع في اليمن" // Arabic placeholder
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="border shadow rounded-3 bg-white text-right p-2 w-full" // Ensure RTL and centering
                                style={{ direction: "rtl" }} // For RTL language support
                              />
                            </Autocomplete>
                            <select
                              value={selectedPropertyType}
                              onChange={handlePropertyTypeChange}
                              className="form-control filter-input-box bg-light border-0"
                              style={{
                                position: "absolute",
                                top: "80px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                zIndex: 1000,
                                direction: "rtl",
                              }}
                            >
                              <option value="all">All Property Types</option>
                              {propertyTypes.map((type) => (
                                <option key={type._id} value={type._id}>
                                  {type.type}
                                </option>
                              ))}
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                            const visibleHotels = property.filter((hotel) => {
                              const lat = parseFloat(hotel.location.lat);
                              const lng = parseFloat(hotel.location.lng);
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
                            lat: parseFloat(hotel.location.lat),
                            lng: parseFloat(hotel.location.lng),
                          }}
                          icon={{
                            url: getIconUrl(hotel.propertyType), // Use the propertyType to get the icon URL
                            scaledSize: googleMaps
                              ? new googleMaps.maps.Size(90, 90)
                              : null, // Adjust size as needed
                          }}
                          onClick={() => setSelectedHotel(hotel)}
                        />
                      ))}

                      {selectedHotel && (
                        <InfoWindow
                          position={{
                            lat: parseFloat(selectedHotel.location.lat),
                            lng: parseFloat(selectedHotel.location.lng),
                          }}
                          onCloseClick={() => setSelectedHotel(null)}
                        >
                          <div
                            style={{
                              width: "200px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {selectedHotel.image && (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_SERVER_API +
                                  selectedHotel.image
                                }
                                alt={selectedHotel.title}
                                width={200}
                                height={100}
                                style={{
                                  borderRadius: "5px",
                                  marginBottom: "10px",
                                }}
                              />
                            )}
                            <strong>{selectedHotel.title}</strong>
                            <br />
                            <p style={{ textAlign: "center", margin: "0" }}>
                              {selectedHotel.location.formattedAddress}
                            </p>
                            <button
                              onClick={() =>
                                router.push(
                                  `/property-detail/${selectedHotel.id}`
                                )
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
                      {/* Hotel Cards Section */}
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
                            nextEl: ".swiper-button-next", // Custom selectors for arrows
                            prevEl: ".swiper-button-prev",
                          }}
                          autoplay={{ delay: 3000 }}
                          pagination={{ clickable: true }}
                          rtl={true} // Enable right-to-left swiping
                          slidesPerView="auto" // Automatically adjust based on screen width
                          breakpoints={{
                            640: {
                              // Mobile devices
                              spaceBetween: 10,
                            },
                            768: {
                              // Tablets
                              spaceBetween: 20,
                            },
                            1024: {
                              // Desktop
                              spaceBetween: 30,
                            },
                            1440: {
                              // Larger screens
                              spaceBetween: 40,
                            },
                          }}
                          className="mySwiper"
                        >
                          {filteredHotels.map((hotel, index) => (
                            <SwiperSlide
                              key={index}
                              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                              style={{ width: "200px" }} // Reduced width by 20%
                            >
                              <div className="property-card flex">
                                {/* Image Section - Right */}
                                <div className="property-image w-1/2 h-full overflow-hidden">
                                  <Image
                                    src={
                                      process.env.NEXT_PUBLIC_SERVER_API +
                                      hotel.image
                                    }
                                    alt={hotel.title}
                                    width={200} // Reduced width by 20%
                                    height={120} // Adjusted height proportionally
                                    className="rounded-t-lg object-cover h-full w-full" // Ensure image fits within the card
                                  />
                                </div>

                                {/* Information Section - Left */}
                                <div className="property-info w-1/2 p-2">
                                  {" "}
                                  {/* Adjust padding */}
                                  <h5 className="text-sm font-bold">
                                    {hotel.title}
                                  </h5>{" "}
                                  {/* Adjust font size */}
                                  <Link href={`/property-detail/${hotel._id}`}>
                                    <p className="mt-1 text-blue-500 hover:underline text-xs">
                                      View Details
                                    </p>{" "}
                                    {/* Adjust font size */}
                                  </Link>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        {/* Custom arrow styles */}
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
