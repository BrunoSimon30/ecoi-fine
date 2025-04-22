import BackBtn from "@/components/BackBtn";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function FeedBack() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rating:", rating);
    console.log("Feedback:", message);
    // You can integrate API submission here
  };
  return (
    <>
      <section className="h-screen main-bg py-16   relative">
        <div className="container mx-auto max-w-screen-2xl px-6">
          <div className="m-wrap space-y-10">
            <div className="name-warp flex items-center justify-between ">
              <BackBtn />
              <div className="text-center space-y-2 w-full">
                <h2 className="text-xl font-bold text-black">Feedback</h2>
              </div>
            </div>
            <div className="bg-white rounded-2xl py-4 ">
              <div className="max-w-md mx-auto p-4 space-y-10">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <FaStar
                        size={28}
                        className={`cursor-pointer ${
                          (hover || rating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1">
                     Your feedback
                  </label>
                  <textarea
                    id=""
                    name=""
                    type="text"
                    value=""
                    placeholder="Enter your feedback"
                    className="w-full bg-green-100 text-gray-700 px-4 py-2 rounded-xl text-sm outline-none cursor-not-allowed h-[250px]"
                  />
                </div>
               
              </div>
              <div className="text-center">
                  <button className="w-fit text-sm border border-gray-200 px-8 py-2   gap-4 rounded-full bg-[#5B9425] text-white text-center">
                    Submit
                  </button>
                </div>
            </div>
          </div>
        </div>
      </section>
      <BottomNav />
    </>
  );
}
