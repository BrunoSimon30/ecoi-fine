import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import Image from "next/image";
import { IoChevronBackSharp } from "react-icons/io5";
import { TfiLineDashed } from "react-icons/tfi";
import { BiScan } from "react-icons/bi";
import { useRouter } from "next/router";
import BottomNav from "@/components/BottomNav";
import BackBtn from "@/components/BackBtn";

export default function Qrscan() {
  const router = useRouter();
  return (
    <>
      <section className="h-screen main-bg py-8  px-6">
        <div className="container mx-auto max-w-screen-2xl ">
          <div className="m-wrap space-y-12">
            <div className="name-warp flex items-center justify-between ">
              <BackBtn />
              <div>
                <Link
                  href={"/qr-scan/sucessqr"}
                  className="text-2xl bg-[#5b94251f] text-[#5B9425] inline-block rounded p-2"
                >
                  <BiScan />
                </Link>
              </div>
            </div>

            <div className="blance-wrap">
              <div className="text-center    bg-white drop-shadow-md rounded-2xl px-8 py-24">
                <div className="space-y-12">
                  <div>
                    <div className="w-52 h-52 bg-gray-600   rounded-2xl m-auto"></div>
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
              <Link
                href={"/qr-scan/code"}
                className="text-white bg-[#5B9425]  px-8 py-3 rounded-full"
              >
                Generate QR
              </Link>
            </div>
          </div>
        </div>
      </section>
      <BottomNav />
    </>
  );
}
