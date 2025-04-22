import Link from "next/link";
import React from "react";
import { VscBell } from "react-icons/vsc";
import Image from "next/image";
import {
  IoChevronBackSharp,
  IoSettingsOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { HiOutlineUser, HiMiniPower } from "react-icons/hi2";
import { GoChecklist } from "react-icons/go";
import BottomNav from "@/components/BottomNav";

import BackBtn from "@/components/BackBtn";

export default function UserProfile() {
   
  return (
    <section className="h-screen main-bg py-16   relative">
      <div className="container mx-auto max-w-screen-2xl px-6">
        <div className="m-wrap space-y-14">
          <div className="name-warp  space-y-4">
            <BackBtn />
            <div className="text-center space-y-12">
              <div>
                <div className="w-14 h-14 bg-[#F8B13F] rounded-2xl text-center flex items-end justify-center overflow-hidden m-auto">
                  <Image
                    className="object-cover "
                    src={"/img/profile.png"}
                    width={50}
                    height={50}
                    alt="profile"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Herry</h2>
                  <h4 className="text-[13px] font-[500] text-gray-400">
                    Edit Profile
                  </h4>
                </div>
              </div>

              <div className="blance-wrap">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href={'/profile/edit-profile'}
                      className="flex gap-3 items-center bg-white drop-shadow-md rounded-2xl px-8 py-4"
                    >
                      <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#D1E7D1] text-[#5B9425] text-2xl">
                        <HiOutlineUser />
                      </span>
                      <span className="">Profile</span>
                    </Link>
                  </li>
             
                  <li>
                    <Link
                      href={'/help'}
                      className="flex gap-3 items-center bg-white drop-shadow-md rounded-2xl px-8 py-4"
                    >
                      <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#D1E7D1] text-[#5B9425] text-2xl">
                        <IoSettingsOutline />
                      </span>
                      <span className="">Helpline</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/terms-conditions"}
                      className="flex gap-3 items-center bg-white drop-shadow-md rounded-2xl px-8 py-4"
                    >
                      <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#D1E7D1] text-[#5B9425] text-2xl">
                        <GoChecklist />
                      </span>
                      <span className="">Terms and Conditions</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="logout">
                <Link
                  href={""}
                  className="flex gap-3 items-center bg-white drop-shadow-md rounded-2xl px-8 py-4"
                >
                  <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FEB5B6] text-[#5B9425] text-2xl">
                    <HiMiniPower />
                  </span>
                  <span className="">logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </section>
  );
}
