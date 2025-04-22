import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import Image from "next/image";
import { IoChevronForwardSharp } from "react-icons/io5";

export default function scanSuccess() {
  const [otp, setOtp] = useState(["", "", "", ""]);
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
    <section className="h-screen main-bg py-8 px-6 flex items-center">
      <div className="container mx-auto max-w-screen-xl">
        <div className="m-wrap space-y-24">
          <div className="blance-wrap">
            <div className="text-center    bg-white drop-shadow-md rounded-2xl px-8 py-24">
              <div className="space-y-12">
                <div className="text-center space-y-2 -mt-32">
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
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black">Herry</h2>
                    <h4 className="text-[13px] font-[500] text-gray-400">
                      User ID : 1830
                    </h4>
                    <h4 className="text-[13px] font-[500] text-gray-400">
                      Generate Date : 12-April-2025
                    </h4>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-black">
                    Successfully Scan
                  </h2>
                  <p className="text-xl text-gray-500">
                    Lorem ipsum dolor sit amet, iz consectetur simit
                    <br /> adipiscing ele et dolore magna aliqua
                  </p>
                </div>

                <div className="space-y-2">
                  <div>
                    <h1 className="text-3xl font-semibold text-black">
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
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                          />
                        ))}
                      </div>

                      <div className="text-center">
                        <Link
                          href={" "}
                                className="w-full    px-12 py-4   gap-4 rounded-full bg-[#5B9425] text-white text-center"
                        >
                       Confirm
                          
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="w-full text-center">
                  <Image
                    src="/img/s-logo.svg"
                    alt="Logo"
                    width={112}
                    height={53}
                    className="m-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
