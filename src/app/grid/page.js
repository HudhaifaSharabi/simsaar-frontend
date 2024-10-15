"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import ScrollTop from "@/components/home/scrollTop";
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '@/assets/animations/loading-animation.json'; // Adjust the path accordingly
import { FiHome, FiHeart, FiCamera } from "@/assets/icons/vander";
import SelectOne from "@/components/home/select/selectOne";

export default function Grid() {
    const [property, setProperty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);  // State for the current page
    const itemsPerPage = 9;  // Show 10 items per page

    useEffect(() => {
        fetchRoomData();
    }, []);

    const fetchRoomData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/api/property`);
            if (!res.ok) {
                throw new Error('Property not found');
            }
            const data = await res.json();
            setProperty(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Calculate the items to display for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = property.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Player autoplay loop src={animationData} style={{ height: '300px', width: '300px' }} />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Total number of pages
    const totalPages = Math.ceil(property.length / itemsPerPage);

    return (
        <>
            <Navbar navClass="defaultscroll sticky" logolight={true} menuClass="navigation-menu nav-right nav-light" />
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
                                        <Link href={`/property-detail/${item._id}`} className="title fs-5 text-dark fw-medium rtl-direction">
                                            <div className="rtl-direction">
                                                <p className="">{item.title}</p>
                                                <span className='text-muted '><small>{item.location.formattedAddress}</small></span>
                                            </div>
                                        </Link>

                                        <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-bed fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">{item.amenities.bedRoom}</span>
                                            </li>

                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-wifi fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">{item.amenities.wifiAvailability ? 'متوفر' : 'غير متوفر'}</span>
                                            </li>

                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-car fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">{item.amenities.parkingAvailability ? 'متوفر' : 'غير متوفر'}</span>
                                            </li>
                                        </ul>
                                        <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-pool fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">{item.amenities.poolAvailability ? 'متوفر' : 'غير متوفر'}</span>
                                            </li>

                                            <li className="d-flex align-items-center me-3">
                                                <i className="mdi mdi-air-conditioner fs-5 me-2 text-primary"></i>
                                                <span className="text-muted rtl-direction">{item.amenities.airCondition ? 'متوفر' : 'غير متوفر'}</span>
                                            </li>

                                            <li className="d-flex align-items-center me-3">
                                            <Image
                                                src="/images/svg/bed-plus.svg"
                                                className="fs-5 me-2 text-primary"
                                                alt='Extra Bed Facility'
                                                width={24} // Adjust width as needed
                                                height={24} // Adjust height as needed
                                                />
                                                <span className="text-muted rtl-direction">{item.amenities.extraBedFacility ? 'متوفر' : 'غير متوفر'}</span>
                                            </li>
                                        </ul>

                                        <ul className="list-unstyled d-flex justify-content-end mt-2 mb-0"> {/* Align items to the right */}
                                            <li className="list-inline-item mb-0 text-center">
                                                <span className="text-muted">التقييم</span>
                                                <ul className="fw-medium text-warning list-unstyled mb-0">

                                                </ul>
                                                <ul className="fw-medium text-warning list-unstyled mb-0 d-flex justify-content-end"> {/* Align stars to the right */}
                                                <li className="list-inline-item mb-0 text-dark rtl-direction">5.0(30)</li>
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <li key={starIndex} className="list-inline-item mb-0">
                                                    <i className="mdi mdi-star"></i>
                                                    </li>
                                                ))}
                                                </ul>
                                            </li>
                                            <li className="list-inline-item mb-0 text-end"> {/* Align text to the end */}
                                                <span className="text-muted">تبداء الاسعار من</span>
                                                <p className="fw-medium mb-0 rtl-direction">
                                                {item.price} ريال
                                                </p>
                                            </li>
                                        </ul>

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
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                                        <span aria-hidden="true"><i className="mdi mdi-chevron-left fs-6"></i></span>
                                    </Link>
                                </li>
                                {/* Dynamically render page numbers */}
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
