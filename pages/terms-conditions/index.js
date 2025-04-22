import Link from "next/link";
import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import BottomNav from "@/components/BottomNav";
import BackBtn from "@/components/BackBtn";

export default function TermCondition() {
  return (
    <>
      <section className="h-screen main-bg py-16 px-6  ">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="m-wrap space-y-10">
            <div className="name-warp flex items-center justify-between ">
              <BackBtn />
              <div className="text-center space-y-2 w-full">
                <h2 className="text-xl font-bold text-black">
                  Terms and Conditions
                </h2>
              </div>
            </div>

            <div className="blance-wrap">
              <div className="    bg-white drop-shadow-md rounded-2xl px-4 py-10">
                <div className="space-y-6">
                  <div className="over-wrap space-y-1 h-[420px] overflow-y-scroll scrollbar-hide pr-4">
                    <p className="text-sm text-gray-500 ">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      suscipit commodo enim tellus et nascetur at leo accumsan,
                      odio habitanLorem ipsum dolor sit amet consectetur
                      adipiscing elit suscipit commodo enim tellus et nascetur
                      at leo accumsan, odio habitan Lorem ipsum dolor sit amet
                      consectetur adipiscing elit suscipit commodo enim tellus
                      et nascetur at leo accumsan, odio habitanLorem ipsum dolor
                      sit amet consectetur adipiscing elit suscipit commodo enim
                      tellus et nascetur at leo tellus et nascetur at leo
                      accumsan, odio habitan Lorem ipsum dolor sit amet
                      consectetur adipiscing elit suscipit commodo enim tellus
                      et nascetur at leo accumsan, odio habitanLorem ipsum dolor
                      sit amet consectetur adipiscing elit accumsan, odio
                      habitan Lorem ipsum dolor sit amet consectetur adipiscing
                      elit suscipit commodo enim tellus et nascetur at leo
                      accumsan, odio habitanLorem ipsum dolor sit amet
                      consectetur adipiscing elit suscipit commodo enim tellus
                      et nascetur at leo accumsan, odio habitan. Lorem ipsum
                      dolor sit amet consectetur adipiscing elit suscipit
                      commodo enim tellus et nascetur at leo accumsan, odio
                      habitanLorem ipsum dolor sit amet consectetur adipiscing
                      elit suscipit commodo enim tellus et nascetur at leo
                      accumsan, odio habitan Lorem ipsum dolor sit amet
                      consectetur adipiscing elit suscipit commodo enim tellus
                      et nascetur at leo accumsan, odio habitanLorem ipsum dolor
                      sit amet consectetur adipiscing elit suscipit commodo enim
                      tellus et nascetur at leo tellus et nascetur at leo
                      accumsan, odio habitan Lorem ipsum dolor sit amet
                      consectetur adipiscing elit suscipit commodo enim tellus
                      et nascetur at leo accumsan, odio habitanLorem ipsum dolor
                      sit amet consectetur adipiscing elit accumsan, odio
                      habitan Lorem ipsum dolor sit amet consectetur adipiscing
                      elit suscipit commodo enim tellus et nascetur at leo
                      accumsan, odio habitanLorem ipsum dolor sit amet
                      consectetur adipiscing elit suscipit commodo enim tellus
                      et nascetur at leo accumsan, odio habitan.
                    </p>
                  </div>
                  <button className="w-full  border border-gray-200 px-4 py-2   gap-4 rounded-full bg-[#5B9425] text-white text-center">
                    Download
                  </button>
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
