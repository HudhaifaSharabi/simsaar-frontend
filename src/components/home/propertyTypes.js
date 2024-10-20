import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PropertyType() {
  let data = [
    {
      image: "/images/icons/house.png",
      name: "عقارات",
      title: "46 ",
    },
    {
      image: "/images/icons/bungalow.png",
      name: "شاليهات",
      title: "124 ",
    },
    {
      image: "/images/icons/buildings.png",
      name: "فنادق",
      title: "265 ",
    },
    {
      image: "/images/icons/commercial.png",
      name: "شقق مفروشة",
      title: "452 ",
    },
  ];
  return (
    <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 mt-0 rtl-direction justify-content-center">
      {data.map((item, index) => {
        return (
          <div className="col" key={index}>
            <div className="categories position-relative overflow-hidden rounded-3 p-4 text-center">
              <Image
                src={item.image}
                width={65}
                height={65}
                className="avatar avatar-small"
                alt="Townter"
              />

              <div className="mt-4">
                <Link href="" className="title text-dark fs-5 fw-medium">
                  {item.name}
                </Link>
                <p className="text-muted small mb-0">{item.title}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
