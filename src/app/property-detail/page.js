import React from "react";
import Link from "next/link";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import ProprtySlider from "../components/propertySlider";
import PropertyDetailImg from "../components/propertyDetailImg";


export default function PropertyDetails(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky" menuClass = "navigation-menu nav-left"/>
        <section className="section mt-5 pt-4">
            <div className="container-fluid mt-2">
                <PropertyDetailImg/>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row g-4">
                    <div className="col-lg-8 col-md-7 col-12">
                        <div className="section-title">
                            <h4 className="title mb-0">10765 Hillshire Ave, Baton Rouge, LA 70810, USA</h4>
                            
                            <ul className="list-unstyled mb-0 py-3">
                                <li className="list-inline-item">
                                    <span className="d-flex align-items-center me-4">
                                        <i className="mdi mdi-arrow-expand-all fs-4 me-2 text-primary"></i>
                                        <span className="text-muted fs-5">8000sqf</span>
                                    </span>
                                </li>

                                <li className="list-inline-item">
                                    <span className="d-flex align-items-center me-4">
                                        <i className="mdi mdi-bed fs-4 me-2 text-primary"></i>
                                        <span className="text-muted fs-5">4 Beds</span>
                                    </span>
                                </li>

                                <li className="list-inline-item">
                                    <span className="d-flex align-items-center">
                                        <i className="mdi mdi-shower fs-4 me-2 text-primary"></i>
                                        <span className="text-muted fs-5">4 Baths</span>
                                    </span>
                                </li>
                            </ul>

                            <p className="text-muted">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                            <p className="text-muted">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                            <p className="text-muted">Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>

                            <div className="card map border-0">
                                <div className="card-body p-0">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" className="rounded-3" style={{border:'0'}} title="Townter" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="rounded-3 shadow bg-white sticky-bar p-4">
                            <h5 className="mb-3">Price:</h5>

                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="mb-0">$ 45,231</h5>
                                <span className="badge bg-primary">For Sale</span>
                            </div>

                            <div className="">
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
                            </div>

                            <div className="d-flex mt-3">
                                <Link href="#" className="btn btn-primary w-100 me-2">Book Now</Link>
                                <Link href="#" className="btn btn-primary w-100">Offer now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-3">Related Properties</h4>
                            <p className="text-muted para-desc mb-0 mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                        </div>
                    </div>
                </div>

                <ProprtySlider/>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}