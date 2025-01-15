"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useData } from "@/context/DataContext";
import { FiHome, FiHeart, FiCamera } from "@/assets/icons/vander";
import dynamic from 'next/dynamic';
import styles from './FeaturedProperties.module.css';

// Import the Player component correctly
const Player = dynamic(() => 
  import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), 
  { ssr: false }
);

export default function FeaturedProperties() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);
  const globalData = useData();

  useEffect(() => {
    setMounted(true);
    if (globalData) {
      setData(globalData);
    }
  }, [globalData]);

  if (!mounted || !data) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        {mounted && <Player
          autoplay
          loop
          src="/animations/loading-animation.json"
          style={{ height: "150px", width: "150px" }}
        />}
      </div>
    );
  }

  return (
    <div className="row g-4 mt-0 justify-content-end">
      {data.slice(0, 8).map((item, index) => (
        <Link href={`/property-detail/${item.name}`} key={index} className="rtl-direction">
          <div className="col-lg-4 col-md-6 col-12">
            <div className={`property-item card rounded-md shadow-md overflow-hidden ${styles.propertyCard}`}>
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
                    
                </div>
                <div className="card-body content p-4">
                    <div className="title fs-5  fw-medium rtl-direction">
                        <p className="">{item.facilitie_name}</p>
                        <span className={`text-muted ${styles.textMuted}`}>
                            <small>{item.formatted_address}</small>
                        </span>
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
                                width={24}
                                height={24}
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
      ))}

      <div className="col-12 mt-4 pt-2">
        <div className="text-center">
          <Link href="/grid" className="mt-3 fs-6 text-primary">
            استعرض المزيد من العقارات{" "}
            <i className="mdi mdi-arrow-right align-middle"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
