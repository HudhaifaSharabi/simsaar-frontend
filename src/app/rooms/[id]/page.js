"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import ScrollTop from "@/components/home/scrollTop";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "@/assets/animations/loading-animation.json"; // Adjust the path accordingly
import { FiHome, FiHeart, FiCamera } from "@/assets/icons/vander";
import SelectOne from "@/components/home/select/selectOne";
import { useData } from "@/context/DataContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

export default function Rooms({ params }) {
  const { id } = params;
  const globalData = useData();
  const [rooms, setRooms] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const itemsPerPage = 9; // Show 10 items per page

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
  export const MailIcon = (props) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
          fill="currentColor"
        />
      </svg>
    );
  };
  
  export const LockIcon = (props) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
          fill="currentColor"
        />
        <path
          d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
          fill="currentColor"
        />
      </svg>
    );
  };
  return (
    <>
    <section>
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
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
                    <Button color="primary" onPress={onOpen}>
        Open Modal
      </Button>
                    <div className="card-body content p-4">
                      <Link
                        href={`/room-detail/${item.name}`}
                        className="title fs-5 text-dark fw-medium rtl-direction"
                      >
                        {item.name1}
                      </Link>

                      
                      <div className="text-center mt-3">
                        <Link
                          href={`/roomsView/${item.default_hotspot}/${id}/`} // Adjust the link as needed

                          className="btn btn-primary  w-100"
                        >
                          عرض الغرفه التفاعلي
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
