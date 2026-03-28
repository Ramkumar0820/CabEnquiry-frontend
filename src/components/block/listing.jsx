"use client";

import React, { useState, useEffect } from "react";
import { FaCar, FaGasPump, FaUsers } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { Divider } from "@nextui-org/divider";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { getCurrencySymbol, resolveImageUrl } from "../utils/helper";

function Listing() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/listing`);
        let data = await response.json();

        // Sort latest first
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Show only active listings
        data = data.filter((item) => item.visibility === "Active");

        // Check if more than 4 cars exist
        if (data.length > 4) {
          setHasMore(true);
          setListing(data.slice(0, 4));
        } else {
          setListing(data);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [baseUrl]);

  const renderSkeleton = () => (
    <div className="relative shadow-md rounded-lg overflow-hidden p-4">
      <Skeleton className="w-full h-48 mb-2 rounded-md" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-5 w-1/2 mb-2" />
      <Skeleton className="h-5 w-full mb-1" />
      <Skeleton className="h-5 w-full" />
    </div>
  );

  return (
    <div className="p-4">
      {/* ================= Car Grid ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
              ))}
          </>
        ) : (
          listing.map((item) => (
            <div
              key={item._id}
              className="relative shadow-md rounded-lg overflow-hidden bg-white"
            >
              <div className="p-4">
                {/* ================= Image ================= */}
                <div className="overflow-hidden rounded-md mb-2 relative">
                  <img
                    src={resolveImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />

                  {item.itemCondition === "Used" && (
                    <p className="absolute top-2 left-3 bg-red-600 text-white px-2 py-1 text-xs rounded-md">
                      Used
                    </p>
                  )}
                </div>

                {/* ================= Title + Price ================= */}
                <Link href={`/cars/${item._id}`}>
                  <h1 className="text-blue-950 text-lg font-semibold flex justify-between items-center cursor-pointer">
                    {item.title.length > 13
                      ? `${item.title.substring(0, 13)}...`
                      : item.title}

                    <span className="text-xl font-bold">
                      {getCurrencySymbol(item.priceCurrency)} {item.price}
                    </span>
                  </h1>
                </Link>

                <Divider className="my-2" />

                {/* ================= Specs ================= */}
                <div className="flex justify-between text-sm">
                  <p className="flex items-center">
                    <FaGasPump className="mr-2 text-blue-950" />
                    {item.fuelType}
                  </p>

                  <p className="flex items-center">
                    <FaCar className="mr-2 text-blue-950" />
                    {item.make} - {item.model}
                  </p>
                </div>

                <div className="flex justify-between text-sm mt-1">
                  <p className="flex items-center">
                    <FaUsers className="mr-2 text-blue-950" />
                    {item.vehicleSeatingCapacity} Seats
                  </p>

                  <p className="flex items-center">
                    <TbSteeringWheel className="mr-2 text-blue-950" />
                    {item.vehicleTransmission}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= View All Cars Button ================= */}
      {!loading && hasMore && (
        <div className="flex justify-center mt-8">
          <Link
            href="/cars"
            className="bg-blue-950 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            View All Cars
          </Link>
        </div>
      )}
    </div>
  );
}

export default Listing;