"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { propertyData } from "@/data/data";
import { FiHome, FiHeart, FiCamera } from "@/assets/icons/vander";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "@/assets/animations/loading-animation.json"; // Adjust the path accordingly
import { useData } from "@/context/DataContext";
export default function FuaturedProperties() {
  const data = useData();
  if (!data) {
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

  if (!data) return null;

  return (
    <>
      <div className="row g-4 mt-0 justify-content-end">
        {data.slice(0, 8).map((item, index) => {
          return (
            <div className="col-lg-6 col-12" key={index}>
              <div className="card property property-list border-0 shadow position-relative overflow-hidden rounded-3 rtl">
                <div className="d-md-flex">
                  <div className="property-image position-relative overflow-hidden shadow flex-md-shrink-0 rounded-3 m-2">
                    <Image
                      src={process.env.NEXT_PUBLIC_SERVER_API + item.image}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      className="img-fluid h-100 w-100"
                      alt=""
                    />
                    <ul className="list-unstyled property-icon">
                      <li className="">
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
                  <div className="card-body content p-3">
                    <Link
                      href={`/property-detail/${item._id}`}
                      className="title fs-5 text-dark fw-medium"
                    >
                      {item.title}
                    </Link>
                    <br />
                    <i className="mdi mdi-map-marker fs-5 me-2 text-primary"></i>
                    <span className="text-muted rtl-direction">
                      {item.location.formattedAddress}{" "}
                    </span>

                    <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                      <li className="d-flex align-items-center me-3">
                        <i className="mdi mdi-bed fs-5 me-2 text-primary"></i>
                        <span className="text-muted rtl-direction">
                          {item.amenities.bedRoom}
                        </span>
                      </li>

                      <li className="d-flex align-items-center me-3">
                        <i className="mdi mdi-wifi fs-5 me-2 text-primary"></i>
                        <span className="text-muted rtl-direction">
                          {item.amenities.wifiAvailability
                            ? "متوفر"
                            : "غير متوفر"}
                        </span>
                      </li>

                      <li className="d-flex align-items-center me-3">
                        <i className="mdi mdi-car fs-5 me-2 text-primary"></i>
                        <span className="text-muted rtl-direction">
                          {item.amenities.parkingAvailability
                            ? "متوفر"
                            : "غير متوفر"}
                        </span>
                      </li>
                    </ul>
                    <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                      <li className="d-flex align-items-center me-3">
                        <i className="mdi mdi-pool fs-5 me-2 text-primary"></i>
                        <span className="text-muted rtl-direction">
                          {item.amenities.poolAvailability
                            ? "متوفر"
                            : "غير متوفر"}
                        </span>
                      </li>

                      <li className="d-flex align-items-center me-3">
                        <i className="mdi mdi-air-conditioner fs-5 me-2 text-primary"></i>
                        <span className="text-muted rtl-direction">
                          {item.amenities.airCondition ? "متوفر" : "غير متوفر"}
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
                          {item.amenities.extraBedFacility
                            ? "متوفر"
                            : "غير متوفر"}
                        </span>
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                      <li className="list-inline-item mb-0">
                        <span className="text-muted">تبدا الاسعار من</span>
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
            </div>
          );
        })}

        <div className="col-12 mt-4 pt-2">
          <div className="text-center">
            <Link href="/grid" className="mt-3 fs-6 text-primary">
              استعرض المزيد من العقارات{" "}
              <i className="mdi mdi-arrow-right align-middle"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
