'use client'
import Link from "next/link"
import React,{useState} from "react";

import ModalVideo from 'react-modal-video';
import "../../../../node_modules/react-modal-video/css/modal-video.css"

export default function VideoOne(){
    let [isOpen, setOpen] = useState(false)
    return(
        <>
        <div className="cta-video">
            <Link href="#!" scroll={false} onClick={() => setOpen(true)}  className="avatar avatar-md-md rounded-pill shadow card d-flex justify-content-center align-items-center lightbox">
                <i className="mdi mdi-play mdi-24px text-primary"></i>
            </Link>
        </div>
        <ModalVideo
            channel="youtube"
            youtube={{ mute: 0, autoplay: 0 }}
            isOpen={isOpen}
            videoId="yba7hPeTSjk"
            onClose={() => setOpen(false)} 
        />
        </>
    )
}