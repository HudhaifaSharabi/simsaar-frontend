import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Lightbox from 'react-18-image-lightbox';
import "react-18-image-lightbox/style.css";

export default function PropertyDetailImg({ gallery }) {
    const images = gallery && gallery.length > 0 ? gallery : [];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [open, setIsOpen] = useState(false);

    const handleMovePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + images.length - 1) % images.length);
    };

    const handleMoveNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleImageClick = (index) => {
        console.log("Image clicked:", index); // Log clicked image index
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    useEffect(() => {
        console.log("Current image index:", currentImageIndex); // Log current image index
    }, [currentImageIndex]);

    const currentImage = images.length > 0 ? process.env.NEXT_PUBLIC_SERVER_API+images[currentImageIndex] : null;

    return (
        <div className="row g-2">
            <div className="col-md-6">
                {images.length > 0 && (
                    <Link href="#" onClick={() => handleImageClick(0)} className="lightbox" title="">
                        <Image src={process.env.NEXT_PUBLIC_SERVER_API + images[0]} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} className="img-fluid rounded-3 shadow" alt="" />
                    </Link>
                )}
            </div>

            <div className="col-md-6">
                <div className="row g-2">
                    {images.slice(1).map((imgSrc, index) => (
                        <div className="col-6" key={index}>
                            <Link href="#" onClick={() => handleImageClick(index + 1)} className="lightbox" title="">
                                <Image src={process.env.NEXT_PUBLIC_SERVER_API + imgSrc} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} className="img-fluid rounded-3 shadow" alt="" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {open && currentImage && (
                <Lightbox
                    mainSrc={currentImage}
                    prevSrc={images[(currentImageIndex + images.length - 1) % images.length]}
                    nextSrc={images[(currentImageIndex + 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={handleMovePrev}
                    onMoveNextRequest={handleMoveNext}
                />
            )}
        </div>
    );
}
