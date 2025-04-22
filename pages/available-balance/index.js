"use client";
import Link from "next/link";
import React, { useState } from "react";
import { VscBell } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaExclamation, FaCheck } from "react-icons/fa6";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import Popup from "@/components/Popup";

export default function AvailableBalance() {
  const [showAmount, setShowAmount] = useState(false);
  const [isDistributePopupOpen, setDistributePopupOpen] = useState(false);
  const [isApplyPopupOpen, setApplyPopupOpen] = useState(false);
  const [isSubmitfundOpen, setSubmitfundOpen] = useState(false);

  return (
    <>
      <section className="h-screen main-bg py-8">
        <div className="container mx-auto max-w-screen-2xl px-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Hello,</h3>
                <h2 className="text-4xl font-semibold">Herry</h2>
              </div>
              <button onClick={() => setDistributePopupOpen(true)} className="relative">
                <span className="absolute -right-2 -top-2 w-6 h-6 bg-red-600 text-white text-[13px] flex items-center justify-center rounded-full">
                  1
                </span>
                <VscBell className="text-3xl" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Here"
                className="w-full h-14 rounded-full px-5 outline-none bg-white"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl">
                <CiSearch />
              </button>
            </div>

            {/* Balance */}
            <div className="bg-[#5B9425] rounded-2xl px-8 py-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-white">Available Balance</h3>
                  <h4 className="text-[13px] font-medium text-white">Today, 01 May 2025</h4>
                </div>
                <div className="flex gap-3 items-center">
                  <h2 className={`text-4xl font-bold text-white ${!showAmount ? "blur" : ""}`}>
                    $90.00
                  </h2>
                  <span className="text-2xl text-white cursor-pointer" onClick={() => setShowAmount(!showAmount)}>
                    {showAmount ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-2xl px-8 py-6 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black">Transaction History</h3>
                <Link href="#" className="text-sm font-bold text-[#5B9425]">View All</Link>
              </div>
              <div className="space-y-1 h-[300px] overflow-y-scroll scrollbar-hide">
                {Array(20).fill().map((_, index) => (
                  <div key={index} className="flex items-center justify-between mt-4 drop-shadow-md bg-white rounded-2xl px-4 py-3">
                    <div className="flex gap-3 items-center">
                      <div className="w-14 h-14 bg-[#E6F1FE] rounded-2xl flex items-center justify-center">
                        <Image src="/img/coin.svg" width={30} height={30} alt="coin" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-black">E-COI Store</h3>
                        <h4 className="text-sm text-[#B1B1B1]">8:01am</h4>
                      </div>
                    </div>
                    <Link href="/grocery" className="text-sm font-bold text-red-500 bg-[#FECECE] px-4 py-1 rounded-2xl">
                      -$42.00
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Popups */}
      <Popup isOpen={isDistributePopupOpen} onClose={() => setDistributePopupOpen(false)} widthClass="w-120">
        <div className="space-y-4 py-5 text-center relative">
          <span className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-red-500 border-2 border-white rounded-full text-white text-xl">
            <FaExclamation />
          </span>
          <h1 className="text-xl font-semibold">Emergency Fund Period Ended</h1>
          <p className="text-sm text-gray-500">
            Your 3-month emergency fund has ended. You can provide feedback or apply for another fund.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button onClick={() => { setDistributePopupOpen(false); setApplyPopupOpen(true); }} className="w-full px-4 py-2 rounded-full bg-[#5B9425] text-white">
              Apply Another Fund
            </button>
            <Link href={'/feedback'}  className="w-full border border-[#5B9425] px-4 py-2 rounded-full text-black">
              Provide Feedback
            </Link>
          </div>
        </div>
      </Popup>

      <Popup isOpen={isApplyPopupOpen} onClose={() => setApplyPopupOpen(false)} widthClass="w-150">
        <div className="space-y-4 py-2">
          <h1 className="text-2xl font-semibold">Continued Support Request Form</h1>
          <p className="text-sm text-gray-500 mb-4">Please fill in the required details to proceed</p>
          <form className="space-y-4">
            {/* Example form fields */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Current Financial/Employment Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2"><input type="radio" name="status" /> Yes</label>
                <label className="flex items-center gap-2"><input type="radio" name="status" /> No</label>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">If Yes, please describe the changes.</label>
              <input type="text" maxLength={50} placeholder="0/50" className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Are you currently employed?</label>
              <input type="text" maxLength={50} placeholder="0/50" className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Do you still require financial assistance?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2"><input type="radio" name="assist" /> Yes</label>
                <label className="flex items-center gap-2"><input type="radio" name="assist" /> No</label>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Reason for continued assistance.</label>
              <input type="text" maxLength={50} placeholder="0/50" className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm" />
            </div>
            <div className="text-center">
              <button type="button" onClick={() => { setApplyPopupOpen(false); setSubmitfundOpen(true); }} className="bg-[#5B9425] text-white px-8 py-2 rounded-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Popup>

      <Popup isOpen={isSubmitfundOpen} onClose={() => setSubmitfundOpen(false)} widthClass="w-96">
        <div className="space-y-4 py-5 text-center relative">
          <span className="absolute -top-11 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#5B9425] border-2 border-white rounded-full text-white flex items-center justify-center text-xl">
            <FaCheck />
          </span>
          <h1 className="text-xl font-semibold">Successfully Submitted</h1>
          <p className="text-sm text-gray-500">Your request has been submitted successfully.</p>
          <button onClick={() => { setSubmitfundOpen(false); setApplyPopupOpen(true); }} className="w-full px-4 py-2 rounded-full bg-[#5B9425] text-white">
            Back
          </button>
        </div>
      </Popup>
    </>
  );
}
