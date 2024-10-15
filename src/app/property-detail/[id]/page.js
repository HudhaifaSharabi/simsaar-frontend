"use client";
import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import PropertyDetailImg from "@/components/home/propertyDetailImg";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import ScrollTop from "@/components/home/scrollTop";
import { useData } from "@/context/DataContext";
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '@/assets/animations/loading-animation.json'; 

// import ProprtySlider from "@/components/home/propertySlider";


export default function PropertyDetails({ params }){

    const { id } = params; // Get the id from the URL params
    const globalData = useData(); // Access the global data from context
    const [itemDetails, setItemDetails] = useState(null);

  // Fetch specific item details based on the dynamic id
  useEffect(() => {
    const fetchItemDetails = async () => {
      if (globalData && globalData.length > 0) {
        const item = globalData.find((item) => item._id === id); // Match based on _id
        setItemDetails(item);
      } else {
        // If global data is not available, fetch it again for specific item
        
          console.error("Error fetching item details:");
        
      }
    };

    fetchItemDetails();
  }, [id, globalData]); // Fetch when id or global data changes

    if (!itemDetails) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: '150px', width: '150px' }}
        />
      </div>
    );
  }

    // console.log(propertyData);
    return(
        <>
        <Navbar navClass="defaultscroll sticky" menuClass = "navigation-menu nav-right"/>
        <section className="section mt-5 pt-4">
            <div className="container-fluid mt-2">
                <PropertyDetailImg gallery ={itemDetails.gallery}   />
            </div>

            <div className="container mt-100 mt-60 rtl-direction ">
                <div className="row g-4">
                    <div className="col-lg-8 col-md-7 col-12">
                        <div className="section-title">
                            <h4 className="title mb-0">{itemDetails?.title}</h4>
                            <p className="text-black-50 para-desc mx-auto mb-0">{itemDetails?.location.formattedAddress}</p>
                            
                            <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                <li className="d-flex align-items-center me-3">
                                    <i className="mdi mdi-bed fs-5 me-2 text-primary"></i>
                                    <span className="text-muted rtl-direction">{itemDetails.amenities.bedRoom}</span>
                                </li>

                                <li className="d-flex align-items-center me-3">
                                    <i className="mdi mdi-wifi fs-5 me-2 text-primary"></i>
                                    <span className="text-muted rtl-direction">{itemDetails.amenities.wifiAvailability ? 'متوفر' : 'غير متوفر'}</span>
                                </li>

                                <li className="d-flex align-items-center me-3">
                                    <i className="mdi mdi-car fs-5 me-2 text-primary"></i>
                                    <span className="text-muted rtl-direction">{itemDetails.amenities.parkingAvailability ? 'متوفر' : 'غير متوفر'}</span>
                                </li>
                            </ul>
                            <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                <li className="d-flex align-items-center me-3">
                                    <i className="mdi mdi-pool fs-5 me-2 text-primary"></i>
                                    <span className="text-muted rtl-direction">{itemDetails.amenities.poolAvailability ? 'متوفر' : 'غير متوفر'}</span>
                                </li>

                                <li className="d-flex align-items-center me-3">
                                    <i className="mdi mdi-air-conditioner fs-5 me-2 text-primary"></i>
                                    <span className="text-muted rtl-direction">{itemDetails.amenities.airCondition ? 'متوفر' : 'غير متوفر'}</span>
                                </li>

                                <li className="d-flex align-items-center me-3">
                                <Image
                                    src="/images/svg/bed-plus.svg"
                                    className="fs-5 me-2 text-primary"
                                    alt='Extra Bed Facility'
                                    width={24} // Adjust width as needed
                                    height={24} // Adjust height as needed
                                    />
                                    <span className="text-muted rtl-direction">{itemDetails.amenities.extraBedFacility ? 'متوفر' : 'غير متوفر'}</span>
                                </li>
                            </ul>

                            <p className="text-muted">{itemDetails.content}</p>


                            <div className="card map border-0">
                                <div className="card-body p-0">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" className="rounded-3" style={{border:'0'}} title="Townter" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="rounded-3 shadow bg-white sticky-bar p-4">
                            <h5 className="mb-3">السعر يبداء من</h5>

                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="mb-0">{itemDetails.price}</h5>
                                <span className="badge bg-primary">{itemDetails.condition}</span>
                            </div>

                            {/* <div className="">
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="small text-muted">Days on Towntor</span>
                                    <span className="small">124 Days</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="small text-muted">Price per sq ft</span>
                                    <span className="small">$ 186</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="small text-muted">Monthly Payment (estimate)</span>
                                    <span className="small">$ 1497/Monthly</span>
                                </div>
                            </div> */}

                            <div className="d-flex mt-3">
                                <Link href="#" className="btn btn-primary w-100 me-2">احجز الان</Link>
                                <Link href="#" className="btn btn-primary w-100">عرض واقعي</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-3">الغرف</h4>
                            <p className="text-muted para-desc mb-0 mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                        </div>
                    </div>
                </div>

                {/* <ProprtySlider/> */}
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
       

        </>
    )
}