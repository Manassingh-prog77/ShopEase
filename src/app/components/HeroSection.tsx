"use client"; // Ensure this line is at the top

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const images: string[] = [
  'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1280,h_720/https://www.tvadvertmusic.com/wp-content/uploads/iphone-12-pro-advert-8211-say-hello-to-5g-8211-music-by-yma-sumac-038-whethan-yO191CBy7GI.jpg',
  'https://img.global.news.samsung.com/ph/wp-content/uploads/2023/08/Tab-Pre-Order-1.png',
  'https://lgads.tv/wp-content/uploads/2022/02/LG-Ads-Enhanced-Ads-1200x628.jpg',
  'https://i.pinimg.com/originals/15/f4/89/15f489110026456126dcd3dccd40fd15.jpg'
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="heroSection position-relative overflow-hidden">
      <div
        className="carouselImage d-flex align-items-center justify-content-center"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center text-center text-white p-4">
          {/* Overlay and content */}
        </div>
        <button className="btn btn-light position-absolute start-0 top-50 translate-middle-y nav-btn" onClick={prevImage}>
          <span className="btn-icon">&lsaquo;</span>
        </button>
        <button className="btn btn-light position-absolute end-0 top-50 translate-middle-y nav-btn" onClick={nextImage}>
          <span className="btn-icon">&rsaquo;</span>
        </button>
      </div>
    </section>
  );
}
