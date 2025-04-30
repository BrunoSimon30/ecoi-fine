import React, { useState } from "react";
import SideBar from "../Sidebar";
import { CiSearch } from "react-icons/ci";
import { HiOutlineAdjustmentsHorizontal, HiBars3 } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

export default function Dashboardlayout({ children, heading }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="dashboard-layout flex main-bg min-h-screen relative overflow-hidden">
      {/* Mobile & Tablet Overlay */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed z-50 lg:relative lg:translate-x-0 lg:block transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="w-full p-4">
        <div className="h-full bg-white rounded-2xl">
          {/* Header */}
          <header className="px-5 border-b border-gray-200 py-6">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <h1 className="text-black text-xl md:text-3xl font-semibold">{heading}</h1>
                {/* <p className="text-base text-gray-500">Lorem Ipsum Dolar</p> */}
              </div>

              {/* Right Section */}
              <div className="w-full flex gap-4 items-center justify-end">
                {/* Hamburger (Mobile + Tablet) */}
                <button
                  className="lg:hidden text-3xl"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open Sidebar"
                >
                  <HiBars3 />
                </button>

                {/* Search (Only on large screens) */}
                <div className="relative hidden lg:block w-[60%]">
                  <input
                    type="text"
                    placeholder="Search Here"
                    aria-label="Search"
                    className="w-full h-14 rounded-full drop-shadow-xl pl-14 outline-none bg-white"
                  />
                  <button
                    className="absolute text-3xl left-4 top-0 bottom-0"
                    aria-label="Search Icon"
                  >
                    <CiSearch />
                  </button>
                </div>

                {/* Filters & Profile */}
                <div className="w-14 h-14 bg-[#F8B13F] rounded-2xl overflow-hidden flex items-end justify-center">
                    <Image
                      className="object-cover"
                      src="/img/profile.png"
                      width={50}
                      height={50}
                      alt="profile"
                    />
                  </div>
              </div>
            </div>
          </header>

          {/* Body Content */}
          <div className="right-wrap px-5 py-6">{children}</div>
        </div>
      </main>
    </section>
  );
}
