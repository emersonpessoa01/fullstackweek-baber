"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import dynamic from "next/dynamic";

// Carregar o Slider dinamicamente para evitar problemas no lado do servidor
const Slider = dynamic(() => import("react-slick"), { ssr: false });

// Importar as imagens
// import Desktop from "../../public/image/banner-desktop.webp";

const images = [
  {
    desktopSrc: "/image/banner-desktop.webp",
    mobileSrc: "/image/banner-mobile.webp",
    alt: "Banner 1",
  },
  {
    desktopSrc: "/image/banner-desktop2.webp",
    mobileSrc: "/image/banner-mobile2.webp",
    alt: "Banner 2",
  },
];

const SliderImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "ease",
  };

  return (
    <div className="slider-container group relative mt-6 w-full overflow-hidden rounded-2xl">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-[400px] w-full">
            <picture>
              {/* Imagem para Mobile */}
              <source srcSet={image.mobileSrc} media="(max-width: 768px)" />
              {/* Imagem para Desktop */}
              <Image
                src={image.desktopSrc}
                alt={image.alt}
                fill
                priority
                className="rounded-2xl object-cover"
              />
            </picture>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderImage;
