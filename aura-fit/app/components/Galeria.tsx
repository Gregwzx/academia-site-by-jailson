"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function PhotoCarousel() {
  const fotos = [
    "/photo1.png",
    "/photo2.png",
    "/'photo3.png",
    "/photo4.png",
    "/photo5.png"
  ];

  return (
    <div className="bg-transparent py-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {fotos.map((f, i) => (
          <SwiperSlide key={i}>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-900">
              <Image
                src={f}
                alt={`gal-${i}`}
                width={500}
                height={300}
                className="w-full h-60 object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
