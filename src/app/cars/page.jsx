"use client";

import React, { useEffect, useState } from "react";
import { FaUsers, FaSnowflake, FaGasPump } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem, Slider, Skeleton } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  getCurrencySymbol,
  resolveImageUrl,
} from "../../components/utils/helper";

export default function Listing() {
  const [vehicles, setVehicles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [tripType, setTripType] = useState("Local");

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // ================= Load Vehicles =================
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/listing`);
        const data = await res.json();
        setVehicles(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to load vehicles", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ================= Filtering =================
  useEffect(() => {
    let data = [...vehicles];
    if (price > 0) data = data.filter((v) => v.price <= price);
    setFiltered(data);
  }, [price, vehicles]);

  // ================= Require tripType before booking =================
  const openBooking = (vehicle) => {
    if (!tripType) {
      alert("Please select trip type before booking");
      return;
    }
    setSelectedVehicle(vehicle);
    setShowForm(true);
  };

  // ================= Submit Booking =================
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/api/listing/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          tripType,
          productName: selectedVehicle.title,
          vehicleId: selectedVehicle.id,
          vehicleName: `${selectedVehicle.make} ${selectedVehicle.model}`,
          vehicleImg: selectedVehicle.image,
          price: selectedVehicle.price,
          markAsRead: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit inquiry");

      await response.json();

       // ==========================
    // Build WhatsApp message
    // ==========================
    const message = `
    🚖 *SRM Tourisms & Travels - MADURAI*
    --------------------------
    🚗 *New Booking Request*

    *Name:* ${data.name}
    *Phone:* ${data.mobile}
    *Trip Type:* ${tripType}

    *Vehicle:* ${selectedVehicle.make} ${selectedVehicle.model}
    *Category:* ${selectedVehicle.title}

    *Pickup:* ${data.pickup}
    *Drop:* ${data.drop}
    *Date:* ${data.date}

    *Price:* ₹${selectedVehicle.price}/km
    --------------------------
    📍 *Madurai's Trusted Travel Partner*
    📞 *Contact: +91 7871082904 | +91 7806816229*
    `;
      // *Booking ID:* ${result.postId}

    const encodedMessage = encodeURIComponent(message);

    // ==========================
    // Open WhatsApp
    // ==========================
    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/917871082904?text=${encodedMessage}`;

    // Redirect instead of window.open
    window.location.href = whatsappUrl;
      reset();
      alert("Booking saved! Redirecting to WhatsApp...");
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry");
    }
  };

  const skeleton = () => (
    <div className="p-4 bg-white shadow rounded">
      <Skeleton className="h-40 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );

  return (
    <div>
      {/* ================= Header ================= */}
      <div className="bg-gray-100 text-center">
        <div className="relative h-[300px] w-full">
          <Image
            src="/frame1.jpg"
            alt="Madurai SRM Tourisms & Travels"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-white text-2xl lg:text-4xl font-bold p-2">
              Book Your Cab
            </h1>
          </div>
        </div>
      </div>

      {/* ================= Filters ================= */}
      <div className="p-4">
        <div className="text-center mt-3">
            <h1 className="text-2xl p-2 md:text-3xl font-bold md:font-medium">
            Filter Cars by Trip Type, and Price Range
            </h1>
        </div>
        <div className="flex justify-center gap-3 md:gap-10 items-center mt-5 p-2 flex-col md:flex-row">
            <Select
            label="Trip Type"
            color="#154a87d6"
            selectedKeys={[tripType]}
            labelPlacement="outside"
            className="max-w-xs w-80 "
            onChange={(e) => setTripType(e.target.value)}
            >
            <SelectItem key="Local">Local</SelectItem>
            <SelectItem key="Outstation">Outstation</SelectItem>
            <SelectItem key="Rental">Rental</SelectItem>
            </Select>

            <div className="">
            <p className="text-sm">Max Price: ₹{price} / km</p>
            <Slider
                classNames={{
                base: "max-w-md gap-3 w-80",
                track: "border-s-secondary-100",
                filler:
                    "bg-gradient-to-r from-secondary-100 to-secondary-500",
                }}
                minValue={0}
                maxValue={100}
                step={5}
                value={price}
                onChange={(v) =>
                setPrice(Array.isArray(v) ? v[0] : v)
                }
            />
            </div>
        </div>
      </div>

      {/* ================= Vehicle List ================= */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {[...Array(6)].map((_, i) => (
            <div key={i}>{skeleton()}</div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {filtered.map((v) => (
            <div key={v._id} className="bg-white shadow rounded">
              <img
                src={resolveImageUrl(v.image)}
                className="h-40 w-full object-cover rounded-t"
              />

              <div className="p-4">
                <h2 className="font-semibold text-lg">
                  {v.make} {v.model}
                </h2>

                <Divider className="my-2" />

                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <FaUsers className="mr-1" />
                    {v.vehicleSeatingCapacity} Seats
                  </span>
                  <span className="flex items-center">
                    <FaGasPump className="mr-1" />
                    {v.fuelType}
                  </span>
                </div>

                <div className="flex justify-between mt-2">
                  <span className="flex items-center text-sm">
                    <TbSteeringWheel className="mr-1" />
                    Driver Included
                  </span>

                  <span className="font-bold text-blue-600">
                    ₹{v.price} / km
                  </span>
                </div>

                <button
                  onClick={() => openBooking(v)}
                  className="mt-4 w-full bg-[#154a87] hover:bg-[#154a87d6] text-white py-2 rounded"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= Booking Modal ================= */}
      {showForm && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-full overfloy-y-auto">
          <div className="bg-white p-6 rounded w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Booking for {selectedVehicle.make} {selectedVehicle.model}
            </h2>

            {/* ================= Responsive Grid Form ================= */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block mb-2">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3"
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                  <p className="text-red-500 text-sm">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Pickup Location</label>
                <input
                  {...register("pickup", {
                    required: "Pickup is required",
                  })}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3"
                  placeholder="Enter pickup area"
                />
              </div>

              <div>
                <label className="block mb-2">Pickup Landmark</label>
                <input
                  {...register("pickupLandmark")}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3"
                  placeholder="Enter pickup landmark"
                />
              </div>

              {tripType !== "Rental" && (
                <div>
                  <label className="block mb-2">Drop Location</label>
                  <input
                    {...register("drop", {
                      required: "Drop is required",
                    })}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3"
                    placeholder="Enter drop area"
                  />
                </div>
              )}

              {tripType === "Rental" && (
                <div>
                  <label className="block mb-2">Rental Hours</label>
                  <input
                    {...register("rentalHours", {
                      required: "Rental hours required",
                    })}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3"
                    placeholder="Enter hours"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block mb-2">Travel Date</label>
                <input
                  type="date"
                  {...register("date", {
                    required: "Date is required",
                  })}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                    <button
                        type="submit"
                        className="w-full lg:w-auto bg-[#154a87] hover:bg-[#154a87d6] text-white py-2 rounded text-white px-4"
                    >
                    Submit
                    </button>
                    <button
                        onClick={() => setShowForm(false)}
                        className="w-full lg:w-auto border border-black text-gray-500 py-2 rounded px-4 "
                    >
                        Cancel
                    </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}