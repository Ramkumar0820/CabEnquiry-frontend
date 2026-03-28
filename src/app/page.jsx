"use client"
import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Make from "@/components/block/make";
import SingleBox from "@/components/block/singleBox";
// import FiltterList from "@/components/block/filtterList";
import Listing from "@/components/block/listing";
import DestinationCarousel from "@/components/block/destinationCarousel";
import BlogPost from "@/components/block/blogPost";

export default function App() {
  const message = `
    Hi Madurai SRM Tours & Travels,
    I would like to book a cab.
  `;

const whatsappLink =
  `https://wa.me/917871082904?text=${encodeURIComponent(message)}`;
  return (
    <div>
      <div className="top-main relative">
        <video
          className="w-full h-[500px] object-cover object-center"
          src="/cover.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="h-full w-full absolute top-0 left-0 flex justify-between items-center px-5 md:px-20 flex-col md:flex-row pt-4">
          <div className="mw-1/2 pr-0 md:pr-10 text-center md:text-start mt-0 md:mt-3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Your Journey, Our Priority
            </h1>
            <p className="text-xl mb-2 md:mb-8 text-white">
              From booking to arrival, your trip is our top priority. Travel with peace of mind—safe, comfortable, and affordable.
            </p>
          </div>

          <img className="h-72 md:w-1/2  w-full object-contain drop-shadow-lg" src="/car.png" alt="Cars" />
        </div>
      </div>
      {/* <div className="-mt-10 md:-mt-20">
        <Make />
      </div> */}
      <div className="lisitng-box mt-4 px-0 md:px-20">
        <DestinationCarousel />
      </div>
      <div className="lisitng-box mt-4 px-2 md:px-20">
        <h2 className="text-2xl font-bold mb-4">Available Vehicles</h2>
        <Listing />
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-gray-100 py-12 mt-10">
        <div className="px-5 md:px-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose SRM Tours & Travels?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow rounded-xl">
              <h3 className="font-semibold text-lg mb-2">🚗 Clean Vehicles</h3>
              <p>All cars are sanitized and well-maintained for safe travel.</p>
            </div>

            <div className="bg-white p-6 shadow rounded-xl">
              <h3 className="font-semibold text-lg mb-2">👨‍✈️ Professional Drivers</h3>
              <p>Experienced drivers who know the best routes and ensure your safety.</p>
            </div>

            <div className="bg-white p-6 shadow rounded-xl">
              <h3 className="font-semibold text-lg mb-2">💰 Best Pricing</h3>
              <p>Affordable and transparent pricing with no hidden charges.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAP ================= */}
      <div className="px-5 md:px-20 py-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Location</h2>

        <iframe
          className="w-full h-[400px] rounded-xl border"
          src="https://www.google.com/maps?q=Madurai,Tamil Nadu&output=embed"
          loading="lazy"
        />
      </div>
      {/* ================= CTA ================= */}
      <div className="bg-black text-white py-10 text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Need a ride right now?
        </h2>
        <p className="mb-4">Book your cab instantly via WhatsApp</p>

        <a
          href={whatsappLink}
          target="_blank"
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          Book on WhatsApp
        </a>
      </div>

    </div>
  );
}
