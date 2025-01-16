"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import ScrollTop from "@/components/home/scrollTop";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "@/assets/animations/loading-animation.json"; // Adjust the path accordingly
import { FiHome, FiHeart, FiCamera } from "@/assets/icons/vander";
// import SelectOne from "@/components/home/select/selectOne";
import { useData } from "@/context/DataContext";
import {today, getLocalTimeZone, isWeekend} from "@internationalized/date";
import {useLocale,I18nProvider} from "@react-aria/i18n";

import {
  Modal,

  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
  RangeCalendar,
  Select,
  SelectItem
} from "@nextui-org/react";

export const types = [
    {key: "family", label: "عائله"},
    
  ];
export const HeartIcon = ({size, height, width, ...props}) => {
    // avoid passing non-DOM attributes to svg
    const {isSelected, isIndeterminate, disableAnimation, ...otherProps} = props;
  
    return (
      <svg
        fill="fill"
        height={size || height || 24}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
        {...otherProps}
      >
        <path
          d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
          fill="currentColor"
        />
      </svg>
    );
  };
  
export default function Rooms({ params }) {

  const { id } = params;
  const globalData = useData();
  const [rooms, setRooms] = useState([]);
  const [roomsId, setRoomsID] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const itemsPerPage = 9; // Show 10 items per page
  const [isOpen, setIsOpen] = useState(false);
  let {locale} = useLocale();



// Booking variables
const [numberOfRooms, setNumberOfRooms] = useState([]);
let [value, setValue] = useState({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()).add({days: 1}),
});// State to store the selected date
const [gustNumber, setGustNumber] = useState([]);
const [childNumber, setChildNumber] = useState([]);
const [bookingType, setBookingType] = useState([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const res = await fetch(
          `/api/resource/Places?fields=["*"]`
        );
        if (!res.ok) {
          throw new Error("rooms not found");
        }
        const data = await res.json();
        setRooms(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPropertyDetails = async () => {
      if (globalData && globalData.length > 0) {
        const item = globalData.find((item) => item.name === id); // Match based on _id
        setPropertyDetails(item);
      } else {
        // If global data is not available, fetch it again for specific item

        console.error("Error fetching property details:");
      }
    };
    fetchPropertyDetails();
    fetchRoomData();
  }, [id, globalData]);

  // Calculate the items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rooms.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const handleDateChange = (range) => {
    setSelectedRange(range); // Update the selected range state
    console.log("Selected Range:", range); // Log the selected range (optional)
  };


  const handleBooking = async () => {
    // try {
    //   const response = await fetch(`/api/method/simsaar.api.booking?number_of_rooms=1&room_type=${roomsId}`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
      
    //   });
    //   if (!response.ok) throw new Error("Booking failed");
    //   alert("Booking successful!");
    // } catch (err) {
    //   alert(`Error: ${err.message}`);
    // }
    console.log(`numberOfRooms: ${numberOfRooms}, gustNumber: ${gustNumber}, childNumber: ${childNumber}, bookingType: ${bookingType}, roomsId: ${roomsId}`);
    console.log("Selected Start Date: ", value.start);
    console.log("Selected End Date: ", value.end);
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

  // Total number of pages
  const totalPages = Math.ceil(rooms.length / itemsPerPage);

  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({days: 5})],
    [now.add({days: 14}), now.add({days: 16})],
    [now.add({days: 23}), now.add({days: 24})],
  ];


  let isDateUnavailable = (date) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    );
  return (
    <>

    <Modal className="rtl" isOpen={isOpen} placement="top-center" onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">احجز الان</ModalHeader>
              <ModalBody>
              <I18nProvider locale="ar-US">
                <RangeCalendar 
                  value={value}
                  onChange={setValue}
                  minValue={today(getLocalTimeZone())}
                  aria-label="التاريخ (التقويم الميلادي)" 
                  isDateUnavailable={isDateUnavailable} 
                />
              </I18nProvider>

                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 ">
                <Select  label="اختر فئه" >
                    {types.map((type) => (
                    <SelectItem
                      value={bookingType}
                      onChange={(e) => setBookingType(e.target.value)}
                      key={type.key}>
                    {type.label}
                    </SelectItem>
                    ))}
                </Select>
                    <Input label="عدد الاشخاص" type="number" min={1} value={gustNumber} onChange={(e) => setGustNumber(e.target.value)}/>
                    <Input label="عدد الاطفال" type="number" min={1} value={childNumber} onChange={(e) => setChildNumber(e.target.value)} />
                    <Input label="عدد الغرفٍ" type="number" min={1} value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} />

                </div>
                <div className="flex py-2 px-1 justify-between">
                <Checkbox color="warning" icon={<HeartIcon />} required>
                    الموافقه على سياسات المكان
                </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  اغلاق
                </Button>
                <Button color="primary" onPress={handleBooking}>
                    حجز
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Navbar navClass="defaultscroll sticky" menuClass="navigation-menu" />
      <section
        className="bg-half-170 d-table w-100"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_API}${propertyDetails.image})`,
        }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <p className="text-white-50 para-desc mx-auto mb-0">
                  {propertyDetails.content}
                </p>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  {propertyDetails.title}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <section className="section">
        {/* <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="features-absolute">
                <div className="card border-0 bg-white shadow mt-5">
                  <SelectOne />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="container text-end">
          <div className="row g-4 mt-0 justify-content-end">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <div className="col-lg-4 col-md-6 col-12" key={index}>
                  <div className="card property border-0 shadow position-relative overflow-hidden rounded-3 ">
                    <div className="property-image position-relative overflow-hidden shadow">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_API}${item.image}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        className="img-fluid"
                        alt={item.name1}
                      />
                      <ul className="list-unstyled property-icon">
                        <li>
                          <Link
                            href="#"
                            className="btn btn-sm btn-icon btn-pills btn-primary"
                          >
                            <FiHome className="icons" />
                          </Link>
                        </li>
                        <li className="mt-1">
                          <Link
                            href="#"
                            className="btn btn-sm btn-icon btn-pills btn-primary"
                          >
                            <FiHeart className="icons" />
                          </Link>
                        </li>
                        <li className="mt-1">
                          <Link
                            href="#"
                            className="btn btn-sm btn-icon btn-pills btn-primary"
                          >
                            <FiCamera className="icons" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                 
                    <div className="card-body content p-4">
                      <Link
                        href={`/room-detail/${item.name}`}
                        className="title fs-5 text-dark fw-medium rtl-direction"
                      >
                        {item.name1}
                      </Link>

                      
                      
                      <div className="flex gap-4 items-center mt-3">
                      <Button 
                        color="primary"
                        onPress={() => {
                          setIsOpen(true);
                          setRoomsID(item.name);
                        }}
                      >
                        حجز الغرفه
                      </Button>
                        <Link
                          href={`/realView/${item.default_hotspot}/${id}/`} // Adjust the link as needed

                          
                        >
                            <Button
                            color="primary"
                            >
                            
                            عرض الغرفه التفاعلي
                            
                            </Button>
                        </Link>
                        
                      </div>
                     
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No properties available</div>
            )}
          </div>

          {/* Pagination */}
          <div className="row">
            <div className="col-12 mt-4 pt-2">
              <ul className="pagination justify-content-center mb-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <Link
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <span aria-hidden="true">
                      <i className="mdi mdi-chevron-left fs-6"></i>
                    </span>
                  </Link>
                </li>
                {/* Dynamically render page numbers */}
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                    key={index}
                  >
                    <Link
                      className="page-link"
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Link>
                  </li>
                ))}
                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  <Link
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <span aria-hidden="true">
                      <i className="mdi mdi-chevron-right fs-6"></i>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
}
