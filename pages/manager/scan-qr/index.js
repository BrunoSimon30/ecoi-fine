import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import Image from "next/image";
import { IoChevronBackSharp } from "react-icons/io5";
import { TfiLineDashed } from "react-icons/tfi";
import { BiScan } from "react-icons/bi";
import BackBtn from "@/components/BackBtn";

export default function ScanQrCode() {
  return (
    <section className="h-screen main-bg py-8 px-6 flex items-center">
    <div className="container mx-auto max-w-screen-xl">
      <div className="m-wrap space-y-24">
        <div className="name-warp flex items-center  ">
       <BackBtn/>
          <div className="w-full text-center">
          <h1 className="text-2xl font-semibold">Scan QR</h1>
          </div>
        </div>
       
        <div className="blance-wrap">
            
          <div className="text-center    bg-white drop-shadow-md rounded-2xl px-8 py-24">
            <div className="space-y-12">
                <p className="text-xl text-gray-500">
                Lorem ipsum dolor sit amet, iz consectetur simit adipiscing ele et dolore magna aliqua
                </p>
              <div> 
                <div className="w-52 h-52 bg-gray-600   rounded-2xl m-auto">

                </div>
              </div>
              <div className="w-full text-center">
                <Image
                  src="/img/s-logo.svg"
                  alt="Logo"
                  width={112}
                  height={53}
                  className="m-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-invice text-center">
              <Link href={'/manager/scan-qr/scan-success'} className="text-white bg-[#5B9425]  px-8 py-3 rounded-full">
              Next Step scan Success
              </Link>
            </div>
      </div>
    </div>
  </section>
  )
}
