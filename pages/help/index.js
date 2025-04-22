import BackBtn from "@/components/BackBtn";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import React from "react";

export default function Help() {
  return (
    <>
      <section className="h-screen main-bg py-16   relative">
        <div className="container mx-auto max-w-screen-2xl px-6">
          <div className="m-wrap space-y-10">
            <div className="name-warp flex items-center justify-between ">
              <BackBtn />
              <div className="text-center space-y-2 w-full">
                <h2 className="text-xl font-bold text-black">Helpline</h2>
              </div>
            </div>
            <div className="bg-white rounded-2xl py-4 ">
              <div className="max-w-md mx-auto p-4 space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Subject
                  </label>
                  <input
                    id=""
                    name=""
                    type="text"
                    value=""
                    placeholder="Enter your subject"
                    className="w-full bg-green-100 text-gray-700 px-4 py-2 rounded-full text-sm outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Message
                  </label>
                  <textarea
                    id=""
                    name=""
                    type="text"
                    value=""
                    placeholder="Enter your message"
                    className="w-full bg-green-100 text-gray-700 px-4 py-2 rounded-xl text-sm outline-none cursor-not-allowed h-[250px]"
                  />
                </div>
                <div className="flex flex-col space-y-2 items-center">
                  <button className="w-fit text-sm border border-gray-200 px-8 py-2   gap-4 rounded-full bg-[#5B9425] text-white text-center">
                  Submit
                  </button>
                  <Link href={""} className="text-[12px] text-gray-500">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BottomNav />
    </>
  );
}
