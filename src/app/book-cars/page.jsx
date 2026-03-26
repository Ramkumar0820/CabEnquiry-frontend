"use client";

import React, { useEffect, useState } from "react";
import { FaUsers, FaSnowflake } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem, Slider, Skeleton } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { getCurrencySymbol, resolveImageUrl } from '../../components/utils/helper';

export default function BookingPage() {
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
  } = useForm({
    // defaultValues: {
    //   tripType: "Local",
    // },
  });

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

  const openBooking = (vehicle) => {
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
      reset();
      alert("Inquiry submitted successfully");
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
      {/* ================= Header Filters ================= */}
      <div className="bg-gray-100 p-6 text-center">
        <div className="relative h-[300px] w-full">
          <Image
            src="/frame1.jpg"
            alt="SRM Tours"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-white text-2xl lg: text-4xl font-bold p-2">Book Your Cab</h1>
            <div className="flex justify-center gap-3 md:gap-10 items-center mt-5 flex-col md:flex-row ">
              <Select
                label="Trip Type"
                color='secondary'
                selectedKeys={[tripType]}
                labelPlacement="outside"
                className="max-w-xs w-80"
                onChange={(e) => setTripType(e.target.value)}
              >
                <SelectItem key="Local">Local</SelectItem>
                <SelectItem key="Outstation">Outstation</SelectItem>
                <SelectItem key="Rental">Rental</SelectItem>
              </Select>

              <div className="w-60">
                <p className="text-sm">Max Price: ₹{price} / km</p>
                <Slider
                  classNames={{
                  base: "max-w-md gap-3 w-80",
                  track: "border-s-secondary-100",
                  filler: "bg-gradient-to-r from-secondary-100 to-secondary-500"
                  }}
                  minValue={0}
                  maxValue={100}
                  step={5}
                  value={price}
                  onChange={(v) => setPrice(Array.isArray(v) ? v[0] : v)}
                />
              </div>
            </div>
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
                    <FaSnowflake className="mr-1" />
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
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= Booking Modal ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h2 className="text-xl font-bold mb-3">
              Booking for {selectedVehicle.make} {selectedVehicle.model}
            </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Trip Type */}
                {/* <div>
                  <label className="block mb-2">Trip Type</label>
                  <select
                    {...register("tripType", { required: true })}
                    className="w-full rounded-xl bg-gray-100 px-4 py-3"
                  >
                    <option value="Local">Local</option>
                    <option value="Outstation">Outstation</option>
                    <option value="Rental">Rental</option>
                  </select>
                </div> */}

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

            <button
              onClick={() => setShowForm(false)}
              className="mt-3 text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
