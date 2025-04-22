import BackBtn from "@/components/BackBtn";
import Link from "next/link";
import React, { useState } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp, IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

export default function index() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [conPasswordVisible, setConPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConPasswordVisibility = () => {
    setConPasswordVisible(!conPasswordVisible);
  };

  return (
    <>
      <section className="h-screen main-bg py-8 px-6">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="space-y-24">
            <BackBtn/>
            <div>
              <h1 className="text-4xl font-semibold md:text-center">Reset Password</h1>
            </div>
            <form>
              <div className="space-y-16">
                <div className="space-y-6">
                  {/* New Password Input */}
                  <div className="form-group relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      placeholder="New password"
                      className="w-full p-4 border-b border-[#D9D9D9] rounded pr-10 outline-0"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <IoEyeSharp /> : <IoEyeOffSharp />}
                    </span>
                  </div>
                  
                  {/* Confirm Password Input */}
                  <div className="form-group relative">
                    <input
                      type={conPasswordVisible ? "text" : "password"}
                      id="confirm-password"
                      placeholder="Confirm password"
                      className="w-full p-4 border-b border-[#D9D9D9] rounded pr-10 outline-0"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={toggleConPasswordVisibility}
                    >
                      {conPasswordVisible ? <IoEyeSharp /> : <IoEyeOffSharp />}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <Link href={'/available-balance'} className="btn-b flex items-center justify-center gap-12">
                    <span className="inline-block pl-3">Continue</span>
                    <span className="inline-block text-[#5B9425] bg-white rounded-full p-2">
                      <IoChevronForwardSharp />
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
