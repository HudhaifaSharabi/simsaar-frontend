'use client'
import React from "react"
import { TypeAnimation } from 'react-type-animation';

export default function TextAnimation(){
    return(
        <h4 className="heading fw-bold text-white title-dark mb-3">سوف نساعدك في الحصول على <br/>اقامت
        <TypeAnimation
            sequence={[
                ' احلامك ',
                1000, 
                'ك رائعة',
                1000,
            ]}
            wrapper="span"
            speed={5}
            repeat={Infinity}
            className="typewrite text-secondary ms-2"
            cursor={false}
        /> </h4>
    )
}