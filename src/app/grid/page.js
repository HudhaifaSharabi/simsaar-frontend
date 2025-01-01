"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import ScrollTop from "@/components/home/scrollTop";
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '@/assets/animations/loading-animation.json';
import { FiHome, FiHeart, FiCamera } from "@/assets/icons/vander";
import SelectOne from "@/components/home/select/selectOne";
import { useData } from "@/context/DataContext";

export default function Grid() {
    const data = useData() || []; // Ensure data is always an array
    const [currentPage, setCurrentPage] = useState(1); // State for the current page
    const itemsPerPage = 9; // Show 9 items per page

    // Calculate indices for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Calculate the items to display for the current page
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!data.length) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Player
                    autoplay
                    loop
                    src={animationData}
                    style={{ height: "150px", width: "150px" }}
                />
            </div>
        );
    }

    return (
        <>
            <Navbar navClass="defaultscroll sticky" menuClass="navigation-menu" />
            <section className="bg-half-170 d-table w-100" style={{ backgroundImage: "url('/images/bg/03.jpg')" }}>
                <div className="bg-overlay bg-gradient-overlay-2"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <p className="text-white-50 para-desc mx-auto mb-0">عرض</p>
                                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">القائمة</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="position-relative">
                <div className="shape overflow-hidden text-white">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="features-absolute">
                                <div className="card border-0 bg-white shadow mt-5">
                                    <SelectOne />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row g-4 mt-0 justify-content-start ">
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <Link href={`/property-detail/${item.name}`} key="index"  className="rtl-direction" >
                                <div className="col-lg-4 col-md-6 col-12" key={index}>
                                    <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                                        <div className="property-image position-relative overflow-hidden shadow">
                                            <Image
                                                src={process.env.NEXT_PUBLIC_SERVER_API + item.image}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ width: '100%', height: 'auto' }}
                                                className="img-fluid"
                                                alt={item.title}
                                            />
                                            <ul className="list-unstyled property-icon">
                                                <li>
                                                    <Link href="#" className="btn btn-sm btn-icon btn-pills btn-primary">
                                                        <FiHome className="icons" />
                                                    </Link>
                                                </li>
                                                <li className="mt-1">
                                                    <Link href="#" className="btn btn-sm btn-icon btn-pills btn-primary">
                                                        <FiHeart className="icons" />
                                                    </Link>
                                                </li>
                                                <li className="mt-1">
                                                    <Link href="#" className="btn btn-sm btn-icon btn-pills btn-primary">
                                                        <FiCamera className="icons" />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-body content p-4">
                                            
                                            <div className="title fs-5 text-dark fw-medium rtl-direction">
                                                <p className="">{item.facilitie_name}</p>
                                                <span className="text-muted "><small>{item.formatted_address}</small></span>
                                            </div>
                                        
                                            <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-bed fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">
                                                {item.bed_room}
                                                </span>
                                            </li>

                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-wifi fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">
                                                {item.wifi_availability == 1
                                                    ? "متوفر" 
                                                    : "غير متوفر"}
                                                </span>
                                            </li>

                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-car fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">
                                                {item.parking_availability == 1
                                                    ? "متوفر"
                                                    : "غير متوفر"}
                                                </span>
                                            </li>
                                            </ul>
                                            <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-pool fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">
                                                {item.pool_availability == 1
                                                    ? "متوفر"
                                                    : "غير متوفر"}
                                                </span>
                                            </li>

                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-air-conditioner fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">
                                                {item.air_condition == 1 ? "متوفر" : "غير متوفر"}
                                                </span>
                                            </li>

                                            <li className="d-flex align-items-center me-3">
                                                <Image
                                                src="/images/svg/bed-plus.svg"
                                                className="fs-5 me-2 text-primary"
                                                alt="Extra Bed Facility"
                                                width={24} // Adjust width as needed
                                                height={24} // Adjust height as needed
                                                />
                                                <span className="text-muted rtl-direction">
                                                {item.extra_bedFacility == 1
                                                    ? "متوفر"
                                                    : "غير متوفر"}
                                                </span>
                                            </li>
                                            </ul>
                                            <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                                                <li className="list-inline-item mb-0">
                                                    <span className="text-muted"> الاسعار </span>
                                                    <p className="fw-medium mb-0">{item.price}</p>
                                                </li>
                                                <li className="list-inline-item mb-0 text-muted">
                                                    <span className="text-muted">التقييم</span>
                                                    <ul className="fw-medium text-warning list-unstyled mb-0">
                                                    <li className="list-inline-item mb-0">
                                                        <i className="mdi mdi-star"></i>
                                                    </li>
                                                    <li className="list-inline-item mb-0">
                                                        <i className="mdi mdi-star"></i>
                                                    </li>
                                                    <li className="list-inline-item mb-0">
                                                        <i className="mdi mdi-star"></i>
                                                    </li>
                                                    <li className="list-inline-item mb-0">
                                                        <i className="mdi mdi-star"></i>
                                                    </li>
                                                    <li className="list-inline-item mb-0">
                                                        <i className="mdi mdi-star"></i>
                                                    </li>
                                                    <li className="list-inline-item mb-0 text-dark">
                                                        5.0(30)
                                                    </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            ))
                        ) : (
                            <div>No properties available</div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="row">
                        <div className="col-12 mt-4 pt-2">
                            <ul className="pagination justify-content-center mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                                        <span aria-hidden="true"><i className="mdi mdi-chevron-left fs-6"></i></span>
                                    </Link>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                        <Link className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </Link>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <Link className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
                                        <span aria-hidden="true"><i className="mdi mdi-chevron-right fs-6"></i></span>
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
