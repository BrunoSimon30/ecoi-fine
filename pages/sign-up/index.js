import Link from "next/link";
import React from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { FaApple, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";
import BackBtn from "@/components/BackBtn";

export default function Signup() {
  const router = useRouter();
  return (
    <>
      <section className="h-screen main-bg py-8 px-6">
        <div className="container mx-auto max-w-screen-2xl  ">
          <div className="space-y-14">
            <BackBtn />
            <div>
              <h1 className="text-4xl font-semibold md:text-center">
                Create Account
              </h1>
            </div>
            <form>
              <div className="space-y-16">
                <div className="space-y-6">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="w-full p-4 border-b border-[#D9D9D9] rounded outline-0"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full p-4 border-b border-[#D9D9D9] rounded outline-0"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className="w-full p-4 border-b border-[#D9D9D9] rounded outline-0"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    href={"/otp-verification"}
                    className="btn-b flex items-center justify-center gap-12"
                  >
                    <span className="inline-block pl-3">Sign Up</span>
                    <span className="inline-block text-[#5B9425] bg-white rounded-full p-2">
                      <IoChevronForwardSharp />
                    </span>
                  </Link>
                </div>
              </div>
            </form>
            <div className="text-center space-y-10">
              <h3 className="font-semibold text-xl">OR</h3>
              <div className="flex items-center justify-center gap-4  ">
                <Link className="bg-[#F8B13F] p-4 text-2xl rounded" href={""}>
                  <FaApple />
                </Link>
                <Link className="bg-[#F8B13F] p-4 text-2xl rounded" href={""}>
                  <FaGoogle />
                </Link>
              </div>
            </div>
            <p className="text-center text-base">
              Already Have An Account?{" "}
              <Link href={"/sign-in"} className="text-[#5B9425] font-semibold ">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
