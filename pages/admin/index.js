import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import { HiOutlineUser } from "react-icons/hi2";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlineArrowForward } from "react-icons/md";
import Popup from "@/components/Popup";
import FundTableLayout from "@/components/Table/FundTable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function FundDistributionPage() {
  const [isDistributePopupOpen, setDistributePopupOpen] = useState(false);
  const [isSubmitfundOpen, setSubmitfundOpen] = useState(false);

  const openDistributePopup = () => setDistributePopupOpen(true);
  const openSubmitfundOpen = () => setSubmitfundOpen(true);

   

  return (
    <Dashboardlayout heading={"Fund Distribution"}>
      <div className="fund-wrap space-y-6">
        {/* Top Cards */}
        <div className="fund-top flex flex-col md:flex-row gap-6">
          {/* Total Funds */}
          <div className="border border-gray-200 py-4 px-6 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-[#D1E7D1] text-2xl flex items-center justify-center">
                  <HiOutlineUser />
                </span>
                <h3 className="text-black text-xl font-semibold">
                  Total Funds
                </h3>
              </div>
              <button
                onClick={openSubmitfundOpen}
                className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full"
              >
                <span className="w-7 h-7 text-white rounded-full bg-[#5B9425] flex items-center justify-center">
                  <FiPlus />
                </span>
                <span className="text-sm font-semibold">Enter Funds</span>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <h3 className="text-black text-3xl font-semibold">$10,000</h3>
              <button
                onClick={openDistributePopup}
                className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full bg-[#5B9425]"
              >
                <span className="w-7 h-7 rounded-full bg-[#D1E7D1] flex items-center justify-center">
                  <MdOutlineArrowForward />
                </span>
                <span className="text-sm text-white font-semibold">
                  Distribute Now
                </span>
              </button>
            </div>
          </div>

          {/* Distribution */}
          <div className="border border-gray-200 py-4 px-6 rounded-2xl space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-[#D1E7D1] text-2xl flex items-center justify-center">
                <HiOutlineUser />
              </span>
              <h3 className="text-black text-xl font-semibold">Distribution</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <h3 className="text-black text-3xl font-semibold">$2,000</h3>
              <button className="border border-gray-200 px-4 py-2 rounded-full bg-gray-300 text-gray-700 text-sm">
                Per Person
              </button>
            </div>
          </div>
        </div>

        {/* Fund Table */}
        <FundTableLayout />
      </div>

      {/* Distribute Popup */}
      <Popup
        isOpen={isDistributePopupOpen}
        onClose={() => setDistributePopupOpen(false)}
        widthClass="w-120"
      >
        <div className="space-y-4 py-5 text-center">
          <h1 className="text-xl font-semibold">
            Do you want to distribute this amount?
          </h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="w-full border border-gray-200 px-4 py-2 rounded-full bg-[#5B9425] text-white">
              Yes
            </button>
            <button className="w-full border border-[#5B9425] px-4 py-2 rounded-full text-black">
              No
            </button>
          </div>
        </div>
      </Popup>

      {/* Enter Fund Popup */}
      <Popup
        isOpen={isSubmitfundOpen}
        onClose={() => setSubmitfundOpen(false)}
        widthClass="w-96"
      >
        <div className="space-y-4 py-2">
          <h1 className="text-2xl font-semibold">Enter Your Funds</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-500 mb-2">
                Enter Your Amount
              </label>
              <input
                type="number"
                placeholder="$10,000"
                className="w-full p-2 border border-gray-300 rounded-full text-sm"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="border border-gray-200 px-8 py-2 rounded-full bg-[#5B9425] text-white"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </Popup>
    </Dashboardlayout>
  );
}
