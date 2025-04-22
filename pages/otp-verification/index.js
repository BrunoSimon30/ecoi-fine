import BackBtn from "@/components/BackBtn";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

export default function Otpverification() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input if value is entered and it's not the last field
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  return (
    <>
      <section className="h-screen main-bg py-8 px-6">
        <div className="container mx-auto max-w-screen-2xl  ">
          <div className="space-y-24">
           <BackBtn/>
            <div>
              <h1 className="text-4xl font-semibold md:text-center">
                Enter Your OTP
              </h1>
            </div>
            <form>
              <div className="space-y-16">
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      placeholder="-"
                      className="w-20 h-20 rounded-lg text-center text-xl bg-gray-200 focus:outline-none"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    href={"/available-balance"}
                    className="btn-b flex items-center justify-center gap-12"
                  >
                    <span className="inline-block pl-3">Verify</span>
                    <span className="inline-block text-[#5B9425] bg-white rounded-full p-2">
                      <IoChevronForwardSharp />
                    </span>
                  </Link>
                </div>
              </div>
            </form>
            <div className="m-auto relative w-32 h-32">
              <svg
                className="absolute top-0 left-0 w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                />
                <path
                  className="text-black"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap=""
                  fill="none"
                  strokeDasharray={`${((60 - timeLeft) / 60) * 100}, 100`}
                  d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                />
              </svg>
              <div className="absolute inset-0 flex justify-center items-center text-sm font-medium">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
