"use client"
import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Make from "@/components/block/make";
import SingleBox from "@/components/block/singleBox";
// import FiltterList from "@/components/block/filtterList";
import Listing from "@/components/block/listing";
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

      <div className="lisitng-box mt-4 px-0 md:px-20">
        <Listing />
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
