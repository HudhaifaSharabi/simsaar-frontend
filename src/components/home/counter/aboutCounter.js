'use client'
import React from "react";

import CountUp from 'react-countup';

export default function AboutCounter(){
    return(
        <>
        <div className="row">
            <div className="col-4 py-3">
                <div className="counter-box text-center">
                    <h1 className="mb-0 fw-semibold"><CountUp start={0} end={1548}  className="counter-value"/>+</h1>
                    <h6 className="counter-head text-muted fw-normal">الفنادق</h6>
                </div>
            </div>

            <div className="col-4 py-3">
                <div className="counter-box text-center">
                    <h1 className="mb-0 fw-semibold"><CountUp start={0} end={25}  className="counter-value"/>+</h1>
                    <h6 className="counter-head text-muted fw-normal">الشاليهات</h6>
                </div>
            </div>

            <div className="col-4 py-3">
                <div className="counter-box text-center">
                    <h1 className="mb-0 fw-semibold"><CountUp start={0} end={9}  className="counter-value"/>+</h1>
                    <h6 className="counter-head text-muted fw-normal">الشقق المفروشة</h6>
                </div>
            </div>
            
        </div>
        </>
    )
}