import React from "react";
import Link from "next/link";

import {FiHexagon, FiHome, FiBriefcase, FiKey} from '@/assets/icons/vander'

export default function AboutUs(){
    let aboutData = [
        {
            icon: FiHome,
            title: 'تقييم العقار',
            desc: '.........................................................'
        },
        {
            icon: FiBriefcase,
            title: 'لقاء مع الوكيل',
            desc: '.........................................................'
        },
        {
            icon: FiKey,
            title: 'اتمام الصفقة',
            desc: '.........................................................'
        },
    ]
    return(
        <>
        <div className="row justify-content-center">
            <div className="col">
                <div className="section-title text-center mb-4 pb-2">
                    <h4 className="title mb-3">كيف نعمل</h4>
                    <p className="text-muted para-desc mb-0 mx-auto">...............................................................</p>
                </div>
            </div>
        </div>

        <div className="row g-4 mt-0">
            {aboutData.map((item, index)=> {
                let Icon = item.icon
                return(
                    <div className="col-md-4" key={index}>
                        <div className="position-relative features text-center mx-lg-4 px-md-1">
                            <div className="feature-icon position-relative overflow-hidden d-flex justify-content-center">
                                <FiHexagon className="hexagon"/>
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <Icon className="fea icon-m-md text-primary"/>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Link href="#" className="fw-medium title text-dark fs-5">{item.title}</Link>
                                <p className="text-muted mt-3 mb-0">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}