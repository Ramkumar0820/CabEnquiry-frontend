"use client";
import {
  FaCheckCircle,
  FaCar,
  FaCalendarAlt,
  FaPalette,
  FaDoorClosed,
  FaGasPump,
  FaUsers,
  FaExchangeAlt,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import RelatedCars from "./relatedCars";
import { Image } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { useForm } from "react-hook-form";
import { resolveImageUrl, getCurrencySymbol } from "@/components/utils/helper";

export default function ListingPage({ slug }) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tripType: "Local",
    },
  });

  const tripType = watch("tripType");

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/api/listing/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          productName: listing[0].title,
          vehicleId: listing[0].id,
          vehicleName: `${listing[0].make} ${listing[0].model}`,
          vehicleImg: listing[0].image,
          price: listing[0].price,
          markAsRead: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit inquiry");

      await response.json();
      reset();
      alert("Inquiry submitted successfully");
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry");
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/listing`);
        let data = await response.json();
        data = data.filter((listing) => listing._id === slug);
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
        setError("Failed to load the listing. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-20 mt-3 md:mt-10">
      {listing?.map((item) => (
        <div className="flex flex-col lg:flex-row gap-10" key={item.id}>
          <div className="w-full lg:w-3/5">
            <Image
              alt="Car Image"
              src={resolveImageUrl(item.image)}
              height={450}
              width={1000}
              shadow="sm"
              className="w-full image-carlist"
            />

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-4 px-4">
              <h1 className="font-semibold text-2xl lg:text-3xl">
                {item.title}
              </h1>
              <h1 className="font-semibold text-4xl drop-shadow-lg">
                {getCurrencySymbol(item.priceCurrency)} {item.price}
              </h1>
            </div>

            <h2 className="text-xl font-semibold mt-4 pl-4">Car Overview</h2>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: FaCar, label: "Make", value: item.make },
                { icon: FaCalendarAlt, label: "Year", value: item.year },
                { icon: FaPalette, label: "Color", value: item.color },
                { icon: FaDoorClosed, label: "Doors", value: item.numberOfDoors },
                { icon: FaGasPump, label: "Fuel", value: item.fuelType },
                { icon: FaUsers, label: "Seating", value: item.vehicleSeatingCapacity },
                { icon: FaExchangeAlt, label: "Transmission", value: item.vehicleTransmission },
              ].map(({ icon: Icon, label, value }, index) => (
                <p key={index} className="grid grid-cols-2 gap-4 p-2 shadow-1">
                  <span className="flex gap-2 items-center">
                    <Icon /> {label}:
                  </span>
                  <span>{value}</span>
                </p>
              ))}
            </div>

            {/* ================= Inquiry Form ================= */}
            <div className="mt-5">
              <h2 className="text-2xl font-semibold mb-6">Send Inquiry</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Trip Type */}
                <div>
                  <label className="block mb-2">Trip Type</label>
                  <select
                    {...register("tripType", { required: true })}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3"
                  >
                    <option value="Local">Local</option>
                    <option value="Outstation">Outstation</option>
                    <option value="Rental">Rental</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3"
                    placeholder="Enter name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2">Mobile</label>
                  <input
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit number",
                      },
                    })}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3"
                    placeholder="Enter mobile number"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm">{errors.mobile.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-black">Email</label>
                  <input
                  {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                  })}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none"
                  placeholder="Enter email"
                  />
                  {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                  )}
                </div>
                {/* Pickup */}
                <div>
                  <label className="block mb-2">Pickup Location</label>
                  <input
                    {...register("pickup", { required: "Pickup is required" })}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3"
                    placeholder="Enter pickup area"
                  />
                  {errors.pickup && (
                    <p className="text-red-500 text-sm">{errors.pickup.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Pickup Land Mark</label>
                  <input
                    {...register("pickupLandmark")}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3"
                    placeholder="Enter pickup Land mark"
                  />
                  {/* {errors.pickup && (
                    <p className="text-red-500 text-sm">{errors.pickup.message}</p>
                  )} */}
                </div>
                {/* Drop (Hidden for Rental) */}
                {tripType !== "Rental" && (
                  <div>
                    <label className="block mb-2">Drop Location</label>
                    <input
                      {...register("drop", {
                        required: tripType !== "Rental" && "Drop is required",
                      })}
                      className="w-full rounded-xl bg-gray-100 px-4 py-3"
                      placeholder="Enter drop area"
                    />
                    {errors.drop && (
                      <p className="text-red-500 text-sm">{errors.drop.message}</p>
                    )}
                  </div>
                )}

                {/* Rental Hours */}
                {tripType === "Rental" && (
                  <div>
                    <label className="block mb-2">Rental Hours</label>
                    <input
                      {...register("rentalHours", {
                        required: "Rental hours required",
                      })}
                      className="w-full rounded-xl bg-gray-100 px-4 py-3"
                      placeholder="Enter hours (e.g. 8)"
                    />
                    {errors.rentalHours && (
                      <p className="text-red-500 text-sm">{errors.rentalHours.message}</p>
                    )}
                  </div>
                )}

                {/* Date */}
                <div>
                  <label className="block mb-2">Travel Date</label>
                  <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 rounded-xl"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="w-full lg:w-2/5 sticky top-4 self-start">
            <h4 className="mb-3 font-semibold">Related Cars</h4>
            <RelatedCars />
          </div>
        </div>
      ))}
    </div>
  );
}
