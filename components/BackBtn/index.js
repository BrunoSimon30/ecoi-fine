import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";

export default function BackBtn() {
  const router = useRouter();
  return (
    <div className="back-btn">
      <button
        onClick={() => router.back()}
        className="text-xl bg-[#5b94251f] text-[#5B9425] inline-block rounded p-2"
      >
        <IoChevronBackSharp />
      </button>
    </div>
  );
}
