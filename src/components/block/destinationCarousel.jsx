"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const destinations = [
  { name: "Ooty", image: "/destinations/ooty.jpg" },
  { name: "Kodaikanal", image: "/destinations/kodaikanal.jpg" },
  { name: "Rameswaram", image: "/destinations/rameshwaram.jpg" },
  { name: "Munnar", image: "/destinations/munnar.jpg" },
  { name: "Madurai", image: "/destinations/madurai.jpg" },
{ name: "Kanyakumari", image: "/destinations/kanyakumari.jpg" },
];

export default function DestinationCarousel() {
  return (
    <div className="px-5 md:px-20 my-12">
      <h2 className="text-3xl font-bold text-center pb-6">
        Popular Destinations
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        loop={true}               // 🔁 infinite loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={false}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
        }}
      >
        {destinations.map((place) => (
          <SwiperSlide key={place.name}>
            <div className="relative rounded-xl overflow-hidden shadow">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-64 object-cover"
              />

              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center py-2 text-lg font-semibold">
                {place.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}