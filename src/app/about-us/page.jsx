"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import Listing from "@/components/block/listing";

const AboutPage = () => {
  return (
    <div>
      <div className=" w-full m-auto md:w-3/4 px-4 md:mpx-0">
        <div className="my-10 text-center">
          <h1>About Us:</h1>
        </div>
        <div className="ck-content mt-6 px-4">
          <p>
            <strong>Welcome to VasuX</strong>
          </p>
          <p>
            At Vasux, we believe that buying a car should be an exciting and
            stress-free experience. Whether you are looking for a brand-new
            vehicle, a certified pre-owned car, or simply need reliable service,
            we have got you covered. Explore our wide selection of top-quality
            cars, SUVs, and trucks, all backed by our commitment to customer
            satisfaction.
          </p>
          <p>
            <strong>Our Inventory</strong>
          </p>
          <p>
            Explore our extensive inventory of vehicles from trusted brands.
            From the latest models with cutting-edge technology to
            well-maintained pre-owned vehicles, we offer something for every
            driver. Use our online tools to browse by make, model, price, and
            more to find the perfect match for your needs.
          </p>
          <p>
            <strong>Finance Options</strong>
          </p>
          <p>
            We understand that purchasing a vehicle is a significant investment.
            Our finance experts are here to guide you through the process,
            offering competitive rates and flexible terms that fit your budget.
            Whether you have excellent credit, are building your credit, or are
            somewhere in between, we have a financing solution for you.
          </p>
          <p>
            <strong>Service &amp; Parts</strong>
          </p>
          <p>
            Keep your vehicle running smoothly with our expert service and
            genuine parts. Our certified technicians are equipped with the
            latest tools and technology to handle everything from routine
            maintenance to major repairs. Schedule your service appointment
            online and let us take care of the rest.
          </p>
          <h2>
            <strong>Why Choose Us?</strong>
          </h2>
          <ul>
            <li>
              <strong>Customer-Centric Approach:</strong> Your satisfaction is
              our priority. We listen to your needs and tailor our services to
              ensure you drive away happy.
            </li>
            <li>
              <strong>Quality Assurance:</strong> Every vehicle on our lot has
              undergone rigorous inspections to meet our high standards for
              quality and safety.
            </li>
            <li>
              <strong>Transparent Pricing:</strong> No hidden fees or
              surprises—just straightforward, competitive pricing on all our
              vehicles and services.
            </li>
          </ul>
          <p>
            <strong>Visit Us Today</strong>
          </p>
          <p>
            Ready to find your next vehicle? Visit [Your Dealership Name] today
            and experience the difference. Our friendly and knowledgeable staff
            are here to assist you every step of the way. Located at [Your
            Address], we are just a short drive away from [Nearby City/Area]. We
            look forward to welcoming you!
          </p>
        </div>
      </div>

      <div className="px-1 md:px-20">
        <Listing />
      </div>
    </div>
  );
};

export default AboutPage;
