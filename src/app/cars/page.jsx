"use client";

import React, { useEffect, useState } from "react";
import { FaUsers, FaGasPump } from "react-icons/fa";
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
  const [vehicleType, setVehicleType] = useState("All");

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
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

    // Price filter
    if (price > 0) {
      data = data.filter((v) => Number(v.price) <= price);
    }

    // Vehicle type filter (case insensitive)
    if (vehicleType !== "All") {
      data = data.filter(
        (v) =>
          v.title &&
          v.title.toLowerCase() === vehicleType.toLowerCase()
      );
    }

    setFiltered(data);
  }, [price, vehicleType, vehicles]);

  // ================= Booking =================
  const openBooking = (vehicle) => {
    if (!tripType) {
      alert("Please select trip type before booking");
      return;
    }
    setSelectedVehicle(vehicle);
    setShowForm(true);
  };

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

      const message = `
🚖 SRM Tours & Travels - MADURAI
--------------------------
🚗 New Booking Request

Name: ${data.name}
Phone: ${data.mobile}
Trip Type: ${tripType}

Vehicle: ${selectedVehicle.make} ${selectedVehicle.model}
Category: ${selectedVehicle.title}

Pickup: ${data.pickup}
Drop: ${data.drop}
Date: ${data.date}

Price: ₹${selectedVehicle.price}/km
--------------------------
Contact: +91 7871082904
`;

      const whatsappUrl = `https://wa.me/917871082904?text=${encodeURIComponent(
        message
      )}`;

      window.location.href = whatsappUrl;

      reset();
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry");
    }
  };

  // ================= Skeleton =================
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
            alt="Madurai SRM Tours & Travels"
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
        <h1 className="text-center text-2xl font-bold">
          Filter Cars by Type and Price
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
          {/* Trip Type */}
          <Select
            label="Trip Type"
            selectedKeys={[tripType]}
            labelPlacement="outside"
            className="w-72"
            onChange={(e) => setTripType(e.target.value)}
          >
            <SelectItem key="Local">Local</SelectItem>
            <SelectItem key="Outstation">Outstation</SelectItem>
            <SelectItem key="Rental">Rental</SelectItem>
            <SelectItem key="Airport">Airport</SelectItem>
          </Select>

          {/* Vehicle Type */}
          <Select
            label="Vehicle Type"
            selectedKeys={[vehicleType]}
            labelPlacement="outside"
            className="w-72"
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <SelectItem key="All">All</SelectItem>
            <SelectItem key="Mini">Mini</SelectItem>
            <SelectItem key="Sedan">Sedan</SelectItem>
            <SelectItem key="SUV">SUV</SelectItem>
            <SelectItem key="Traveller">Travellers</SelectItem>
          </Select>

          {/* Price */}
          <div className="w-72">
            <p className="text-sm">Max Price: ₹{price}</p>
            <Slider
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
                  {v.title} - {v.make} | {v.model}
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
                  className="mt-4 w-full bg-[#154a87] text-white py-2 rounded"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              Booking: {selectedVehicle.make} {selectedVehicle.model}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                {...register("name", { required: true })}
                placeholder="Name"
                className="w-full border p-2"
              />
              <input
                {...register("mobile", { required: true })}
                placeholder="Mobile"
                className="w-full border p-2"
              />
              <input
                {...register("pickup", { required: true })}
                placeholder="Pickup"
                className="w-full border p-2"
              />
              <input
                {...register("drop")}
                placeholder="Drop"
                className="w-full border p-2"
              />

              <button
                type="submit"
                className="bg-green-600 text-white w-full py-2"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}