import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoEyeOffSharp,
  IoEyeSharp,
} from "react-icons/io5";

export default function signin() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <section className="sign-sec">
        <div className="xl:grid grid-cols-2">
          <div className="hidden xl:flex main-bg h-screen  items-center justify-center">
            <Image
              src="/img/s-logo.svg"
              alt="Logo"
              width={222}
              height={84}
              className="logo"
            />
          </div>
          <div className="h-screen flex flex-col   justify-center space-y-24 px-24">
            <div>
              <h1 className="text-4xl font-semibold  ">Welcome Back</h1>
            </div>
            <form>
              <div className="space-y-16">
                <div className="space-y-6">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full p-4 border-b border-[#D9D9D9] rounded outline-0"
                    />
                  </div>
                  <div className="form-group relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      className="w-full p-4 border-b border-[#D9D9D9] rounded pr-10 outline-0"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <IoEyeSharp /> : <IoEyeOffSharp />}
                    </span>
                  </div>
                  <div className="text-right">
                    <Link
                      href={'/dashboard'}
                      className="text-[#5B9425] font-semibold text-base"
                    >
                      Forget Password
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    href={"/dashboard"}
                    className="btn-b flex items-center justify-center gap-12"
                  >
                    <span className="inline-block pl-3">Sign In</span>
                    <span className="inline-block text-[#5B9425] bg-white rounded-full p-2">
                      <IoChevronForwardSharp />
                    </span>
                  </Link>
                </div>
              </div>
            </form>
            <p className="text-center text-base">
              Don't have an account?{" "}
              <Link href={'/dashboard'} className="text-[#5B9425] font-semibold ">
                Join us now!
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
