import React from "react";
import Link from "next/link";
import Image from "next/image";

import {FiShoppingCart, FiDribbble, FiLinkedin, FiFacebook, FiInstagram, FiTwitter, FiMail, FiMapPin, FiPhone} from "@/assets/icons/vander"

export default function Footer(){
    return(
        <>
        <section className="bg-building-pic d-table w-100" style={{backgroundImage:"url('/images/building.png')"}}></section>
        <footer className="bg-footer bg-primary  rtl-direction"  
            style={{backgroundImage:"url('/images/bg/footer.png')",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="footer-py-60 footer-border">
                            <div className="row">
                                <div className="col-lg-5 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                                    <Link href="/" className="logo-footer">
                                        <Image src='/images/logo.png' width={132} height={32} alt=""/>
                                    </Link>
                                    <p className="mt-4">منصة رائعة لحجز فندق شاليه او شقه مفروشه او لشراء وبيع وتأجير عقاراتك دون أي وسيط أو عمولات.</p>
                                    <ul className="list-unstyled social-icon foot-social-icon mb-0 mt-4">
                                        <li className="list-inline-item"><Link href="https://1.envato.market/towntor-next" target="_blank" className="rounded-3"><FiShoppingCart className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link href="https://dribbble.com/shreethemes" target="_blank" className="rounded-3"><FiDribbble className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link href="http://linkedin.com/company/shreethemes" target="_blank" className="rounded-3"><FiLinkedin className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link href="https://www.facebook.com/shreethemes" target="_blank" className="rounded-3"><FiFacebook className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link href="https://www.instagram.com/shreethemes/" target="_blank" className="rounded-3"><FiInstagram className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link href="https://twitter.com/shreethemes" target="_blank" className="rounded-3"><FiTwitter className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link href="mailto:support@shreethemes.in" className="rounded-3"><FiMail className="fea icon-sm align-middle"/></Link></li>
                                    </ul>
                                </div>
                                
                                <div className="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    
                                    <ul className="list-unstyled footer-list mt-4">
                                        <li><h5 className="footer-head">الشركة</h5></li>
                                        <li><Link href="#" className="text-foot"><i className="mdi mdi-chevron-right align-middle me-1"></i>حول الشركه</Link></li>
                                        <li><Link href="#" className="text-foot"><i className="mdi mdi-chevron-right align-middle me-1"></i> خدمات</Link></li>
                                        <li><Link href="#" className="text-foot"><i className="mdi mdi-chevron-right align-middle me-1"></i> الشروط</Link></li>
                                        <li><Link href="#" className="text-foot"><i className="mdi mdi-chevron-right align-middle me-1"></i> الاسعار</Link></li>

                                    </ul>
                                </div>
                                
                           
                                <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    <h5 className="footer-head">معلونات التواصل</h5>

                                    <div className="d-flex mt-4">
                                        <FiMapPin className="fea icon-sm text-primary mt-1 me-3"/>
                                        <div className="">
                                            <p className="mb-2">صنعاء امانة العاصمة <br/> حده المدينه <br/> خلف التوفير</p>
                                            {/* <Link href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" data-type="iframe" className="lightbox">View on Google map</Link> */}
                                        </div>
                                    </div>
        
                                    <div className="d-flex mt-4">
                                        <FiMail className="fea icon-sm text-primary mt-1 me-3"/>
                                        <Link href="mailto:contact@example.com" className="footer-text">info@simsaar.co</Link>
                                    </div>
                                    
                                    <div className="d-flex mt-4">
                                        <FiPhone className="fea icon-sm text-primary mt-1 me-3"/>
                                        <Link href="tel:+152534-468-854" className="footer-text">776696100</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-py-30 footer-bar">
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="text-center">
                                <p className="mb-0">© {new Date().getFullYear()} سمسار. تصميم وتطوير <i className="mdi mdi-heart text-danger"></i>  <Link href="https://shreethemes.in/" target="_blank" className="text-reset">سمسار تكنولوجي</Link>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}