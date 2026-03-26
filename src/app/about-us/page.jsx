"use client";
import React from "react";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  return (
    <div>

      {/* Hero Banner */}
      <div className="relative h-[300px] w-full">
        <Image
          src="/frame1.jpg"
          alt="SRM Tours"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-2xl lg: text-4xl font-bold p-2">About SRM Tours & Travels</h1>
        </div>
      </div>

      <div className="w-full m-auto md:w-3/4 px-4 py-10">

        {/* Intro */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          className="space-y-4 text-gray-700 leading-7"
        >
          <p class="text-2xl md:text-3xl font-bold md:font-medium">
            <strong>Welcome to SRM Tours and Travels</strong>
          </p>

          <p>
            SRM Tours and Travels is your trusted partner for comfortable,
            safe, and affordable travel services. We specialize in providing
            reliable cab and travel solutions for local trips, outstation
            journeys, airport transfers, and customized tour packages across
            Tamil Nadu and South India.
          </p>
        </motion.div>

        {/* Image + Text Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 items-center mt-10"
        >
          <Image
            src="/frame5.jpeg"
            alt="Our fleet"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold md:font-medium">Our Fleet</h2>
            <p>
              We offer a wide range of well-maintained vehicles including
              hatchbacks, sedans, SUVs, and tempo travellers to suit every
              travel need.
            </p>
            <p>
              All our vehicles are regularly serviced and inspected to ensure
              maximum safety and comfort during your journey.
            </p>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.4 }}
          className="mt-12"
        >

          <div className="grid md:grid-cols-2 gap-8 items-center py-3">
            <div class="space-y-4">

              <h2 className="text-2xl md:text-3xl font-bold md:font-medium">Our Services</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Airport pickup and drop services</li>
                <li>Local city rides</li>
                <li>Outstation cab booking</li>
                <li>Tour packages and pilgrimage trips</li>
                <li>Corporate travel services</li>
              </ul>

            </div>

            <Image
              src="/frame4.jpg"
              alt="Travel services"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.5 }}
          className="mt-12 space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold md:font-medium">Why Choose Us?</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong class="font-bold md:font-medium">Experienced Drivers:</strong> Courteous and trained drivers</li>
            <li><strong class="font-bold md:font-medium">Clean Vehicles:</strong> Sanitized and comfortable rides</li>
            <li><strong class="font-bold md:font-medium">Affordable Pricing:</strong> Transparent rates</li>
            <li><strong class="font-bold md:font-medium">24/7 Support:</strong> Always available for booking</li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutPage;