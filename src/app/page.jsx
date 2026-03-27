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
  return (
    <div>
      <div className="top-main relative">
        {/* <img
          className="w-full h-500 object-cover object-center relative"
          src="/bg.svg"
          alt="Showroom" /> */}
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
              Book a cab in seconds and travel with comfort, safety, and unbeatable pricing.
            </p>
          </div>

          <img className="h-72 md:w-1/2  w-full object-contain drop-shadow-lg" src="/car.png" alt="Cars" />
        </div>
      </div>
      {/* <div className="-mt-10 md:-mt-20">
        <Make />
      </div> */}
      <div className="lisitng-box mt-4 px-10 md:px-20">
        <DestinationCarousel />
      </div>
      <div className="lisitng-box mt-4 px-0 md:px-20">
        <h2 className="text-2xl font-bold mb-4">Available Vehicles</h2>
        <Listing />
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-gray-100 py-12 mt-10">
        <div className="px-5 md:px-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose SRM Tourisum & Travels?</h2>

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

      {/* <div className="flex flex-col md:flex-row justify-between items-center mt-10 px-5 md:px-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10 gap-8 md:gap-0">
        <div className="flex justify-center items-center gap-5">
          <img src="/customer.png" alt="Happy Customers" className="w-24 h-24 md:w-32 md:h-32" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">200k+</h1>
            <h2 className="text-base md:text-lg">Happy Customers</h2>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <img src="/mechanic.png" alt="Years of Experience" className="w-24 h-24 md:w-32 md:h-32" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">10+</h1>
            <h2 className="text-base md:text-lg">Years of Experience</h2>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <img src="/support.png" alt="Customer Support" className="w-24 h-24 md:w-32 md:h-32" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">24/7</h1>
            <h2 className="text-base md:text-lg">Customer Support</h2>
          </div>
        </div>
      </div>
      <div className='mt-3 md:mt-12 px-3 md:px-20 mb-4'>
      <SingleBox></SingleBox>
      </div>
      <div className='mt-3 md:mt-12 px-3 md:px-20 mb-4'>
      <BlogPost></BlogPost>
      </div> */}
    </div>
  );
}
