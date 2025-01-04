"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import Navbar from "@/components/home/navbar";
import TextAnimation from "@/components/home/textAnimation";
import SelectThree from "@/components/home/select/selectThree";
import AboutCounter from "@/components/home/counter/aboutCounter";
import PropertyType from "@/components/home/propertyTypes";
import AboutUs from "@/components/home/about";
import Footer from "@/components/home/footer";
import ScrollTop from "@/components/home/scrollTop";

// Dynamically import components with loading fallback
const FeaturedProperties = dynamic(
  () => import('@/components/home/featuredProperties'),
  {
    ssr: false,
    loading: () => (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        Loading...
      </div>
    ),
  }
);

const VideoTwo = dynamic(
  () => import('@/components/home/modalVideo/videoTwo'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export default function Home() {
  return (
    <>
      <Navbar navClass="defaultscroll sticky" menuClass="navigation-menu" />
      <section className="position-relative mt-5 pt-4">
        <div className="container-fluid px-md-4 px-2 mt-2">
          <div className="bg-home-one d-table w-100 shadow rounded-3 overflow-hidden" id="home">
            <div
              className="bg-overlay image-wrap"
              id="hero-images"
              style={{ backgroundImage: "url('/images/bg/01.webp')" }}
            ></div>
            <div className="bg-overlay bg-black opacity-50"></div>

            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="title-heading">
                    <TextAnimation />
                    <p className="para-desc text-white title-dark mb-0">
                      مرحبًا بكم في جولة الغرف التفاعلية
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container rtl-direction">
          <SelectThree />
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="about-left">
                <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
                  <Image
                    src="/images/hero.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    className="img-fluid rounded-top-pill rounded-5"
                    alt=""
                  />
                  <VideoTwo />
                  <div className="position-absolute top-0 start-0 z-n1">
                    <Image
                      src="/images/svg/dots.svg"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      className="avatar avatar-xl-large"
                      alt=""
                    />
                  </div>
                </div>

                <div className="img-two shadow rounded-3 overflow-hidden p-2 bg-white">
                  <Image
                    src="/images/1.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    className="img-fluid rounded-3"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ms-lg-5 rtl-direction">
                <h6 className="text-primary fw-medium mb-2">قصتنا: سمسار</h6>
                <h4 className="title mb-3">
                  كفاءة. <br /> الشفافية. التحكم.
                </h4>
                <p className="text-muted para-desc mb-0">
                  طورت سمسار منصة لسوق الحجز والعقارات تتيح للعملاء والبائعين
                  تنفيذ المعاملات بأنفسهم بكل سهولة. توفر المنصة ميزات تتيح
                  للعملاء تصفح جميع أنواع أماكن الإقامة بشكل تفاعلي، سواء كانت
                  عقارًا أو فندقًا أو شاليهًا أو شقة مفروشة. سمسار تعيد تعريف
                  الإقامة.
                </p>
                <AboutCounter />
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-3">أنواع الاقامات</h4>
                <p className="text-muted para-desc mx-auto mb-0">
                  منصة رائعة لحجز فندق شاليه او شقه مفروشه او لشراء وبيع وتأجير
                  عقاراتك دون أي وسيط أو عمولات.
                </p>
              </div>
            </div>
          </div>
          <PropertyType />
        </div>

        <div className="container mt-100 mt-60">
          <FeaturedProperties />
        </div>

        <div className="container mt-100 mt-60">
          <AboutUs />
        </div>
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
}
