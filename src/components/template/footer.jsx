'use client'

import React from 'react';
import { Image } from '@nextui-org/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#a8cade] text-black pt-12 pb-5 px-6 md:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3 ">
            <Image src="/logo1.png" className='object-contain rounded-md overflow-hidden' alt="Madurai SRM Tourism & Travels" width={120} height={70} />
            <p className="mt-4 text-center md:text-left text-gray-700">
              Book reliable and affordable cab services with Madurai SRM Tourism & Travels. Enjoy safe, comfortable rides for local,rental and outstation trips anytime.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {/* <div className="bg-[#1877F2] p-2 rounded-full">
                <FaFacebookF className="text-white text-xl cursor-pointer" />
              </div>
              <div className="bg-[#1DA1F2] p-2 rounded-full">
                <FaTwitter className="text-white text-xl cursor-pointer" />
              </div>
              <div className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#833AB4] p-2 rounded-full">
                <FaInstagram className="text-white text-xl cursor-pointer" />
              </div> */}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-around">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h3 className="font-bold text-lg text-gray-900 mb-0">Quick Links</h3>
              <p onClick={() => router.push('/')} className="hover:text-gray-500 cursor-pointer">Home</p>
              <p onClick={() => router.push('/about-us')} className="hover:text-gray-500 cursor-pointer">About Us</p>
              <p onClick={() => router.push('/cars')} className="hover:text-gray-500 cursor-pointer">Book a Cab</p>
              <p onClick={() => router.push('/contact-us')} className="hover:text-gray-500 cursor-pointer">Contact</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Contact Us</h3>
            <p className="flex items-center justify-center md:justify-start text-gray-700 mb-2">
              <FaMapMarkerAlt className="mr-2" /> Madurai, Tamil Nadu, India
            </p>
            <a href="mailto:ranjithkumarsrmtravels@gmail.com" className="flex items-center justify-center md:justify-start text-gray-700 mb-2">
              <FaEnvelope className="mr-2" /> ranjithkumarsrmtravels@gmail.com
            </a>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 text-gray-700">
              <a href="tel:+917871082904" className="flex items-center mb-2">
                <FaPhoneAlt className="mr-2" /> +91 7871082904
              </a>
              <span className="hidden md:inline mb-2 text-gray-400">|</span>
              <a href="tel:+917806816229" className="flex items-center mb-2">
                <FaPhoneAlt className="mr-2" /> +91 7806816229
              </a>
            </div>
          </div>
        </div>
        <p className="text-center md:text-left text-sm text-gray-600 mt-8">
          © {currentYear} Madurai SRM Tourism & Travels. All rights reserved. Designed with ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
