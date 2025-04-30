import BackBtn from "@/components/BackBtn";
import { useVerifyOtpMutation } from "@/lib/redux/services/auth.api";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";

export default function Otpverification() {
  const router = useRouter();
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
  const [timeLeft, setTimeLeft] = useState(60);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerify = async (data) => {
    const fullOtp = Object.values(data).join("");
    if (fullOtp.length !== 4) return;

    try {
      await verifyOtp({
        otp: fullOtp,
        otpType: "verification",
      }).unwrap();
      router.push("/available-balance");
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      setValue(`otp${index}`, value);
      // Auto-focus next input if value is entered and it's not the last field
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <section className="h-screen main-bg py-8 px-6">
      <div className="container mx-auto max-w-screen-2xl">
        <div className="space-y-24">
          <BackBtn />
          <div>
            <h1 className="text-4xl font-semibold md:text-center">Enter Your OTP</h1>
          </div>
          <form onSubmit={handleSubmit(handleVerify)}>
            <div className="space-y-16">
              <div className="flex gap-2 justify-center">
                {[...Array(4)].map((_, index) => (
                  <Controller
                    key={index}
                    name={`otp${index}`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        placeholder="-"
                        className="w-20 h-20 rounded-lg text-center text-xl bg-gray-200 focus:outline-none"
                        value={field.value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                      />
                    )}
                  />
                ))}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-b flex items-center justify-center gap-12 mx-auto"
                  disabled={isLoading}
                >
                  <span className="inline-block pl-3">
                    {isLoading ? "Verifying..." : "Verify"}
                  </span>
                  <span className="inline-block text-[#5B9425] bg-white rounded-full p-2">
                    <IoChevronForwardSharp />
                  </span>
                </button>
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
  );
}
