"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
export default function ContactPage() {

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const onSubmit = async (data) => {
    // console.log("Form Data:", data);

    try {
      const response = await fetch(`${baseUrl}/api/listing/contact_inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          markAsRead: false,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }
      let result = await response.json();
      // console.log(result, "data");
      reset();
      // toast.success(result.message || "Inquiry Submitted");
      // window.alert(result.message || "Inquiry Submitted")
      // data = data.filter((listing) => listing._id === slug);
      // setListing(data);
    } catch (error) {
      console.error("Error fetching listing:", error);
      // toast.error("Failed to submit inquiry");
      // setError("Failed to load the listing. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
               
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
            <h1 className="text-white text-2xl lg: text-4xl font-bold p-2">Contact With Us</h1>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 px-4 sm:px-6 lg:px-20 py-10">
          <div className=" w-full lg:w-3/5">
            <h2 className="text-2xl font-semibold mb-6">Contact With Us</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block mb-2 text-black">Name</label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none"
                        placeholder="Enter name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
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

                      {/* Mobile */}
                      <div>
                        <label className="block mb-2 text-black">Mobile</label>
                        <input
                          {...register("mobile", {
                            required: "Mobile number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Enter a valid 10-digit mobile number",
                            },
                            // minLength: {
                            //   value: 10,
                            //   message: "Minimum 10 digits",
                            // },
                          })}
                          type="tel"
                          className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none"
                          placeholder="Enter mobile number"
                        />
                        {errors.mobile && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.mobile.message}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block mb-2 text-black">Message</label>
                        <textarea
                          {...register("message", {
                            required: "Message is required",
                          })}
                          rows={4}
                          className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none resize-none"
                          placeholder="Enter message"
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded-xl"
                      >
                        Submit
                      </button>
                </form>
          </div>
          <div className="w-full lg:w-2/5">
            {/* <div className="grid md:grid-cols-2 gap-8 items-center mt-10"> */}
              <Image
                src="/frame5.jpeg"
                alt="img"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-full"
              />
            {/* </div> */}
          </div>
        </div>
    </div>
  
  )
}
