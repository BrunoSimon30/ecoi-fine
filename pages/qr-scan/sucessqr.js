import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import BackBtn from "@/components/BackBtn";

export default function Sucessqr() {
  return (
    <section className="h-screen main-bg py-16 px-6  ">
      <div className="container mx-auto max-w-screen-2xl">
        <div className="m-wrap space-y-10">
          <div className="name-warp flex items-start justify-between ">
           <BackBtn/>
            <div className="text-center space-y-2 w-full">
              <h2 className="text-2xl font-bold text-black"> My QR Code</h2>
            </div>
          </div>

          <div className="blance-wrap">
            <div className="text-center    bg-white drop-shadow-md rounded-2xl px-8 py-16">
              <div className="space-y-10">
                <div>
                  <span className="  m-auto flex items-center justify-center w-24 h-24 bg-[#5B9425] border-2 border-white rounded-full text-white text-5xl">
                    <FaCheck />
                  </span>
                </div>
                <p className="text-lg text-gray-500 ">
                  Lorem ipsum dolor sit amet, iz
                   consectetur adipiscing ele et dolore
                    magna aliqua.
                </p>
                <div className={`w-52 h-52 bg-gray-600 m-auto blur`}>
                    <img
                      src="/img/qr.jpg"
                      alt="QR Code"
                      className="w-full h-full object-cover  "
                    />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
