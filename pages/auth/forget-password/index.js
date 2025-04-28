import BackBtn from "@/components/BackBtn";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useForgetPasswordMutation } from "@/lib/redux/services/auth.api";
import { toast } from "sonner";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgetPassword({ email }).unwrap();
console.log(res);

      if (res.success) {
        toast.success(res.message);
        router.push("/otp-verification"); // Redirect to OTP verification
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error(err?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <>
      <section className="sign-sec">
        <div className="xl:grid grid-cols-2">
          <div className="hidden xl:flex main-bg h-screen items-center justify-center">
            <Image
              src="/img/s-logo.svg"
              alt="Logo"
              width={222}
              height={84}
              className="logo"
            />
          </div>
          <div className="h-screen main-bg-login flex flex-col px-24 py-12 space-y-12">
            <BackBtn />
            <div className="flex-1 flex flex-col justify-center space-y-24">
              <div>
                <h1 className="text-4xl font-semibold md:text-center">
                  Forget Password
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-16">
                  <div className="space-y-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 border-b border-[#D9D9D9] rounded outline-0"
                        required
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn-b flex items-center justify-center gap-12"
                      disabled={isLoading}
                    >
                      <span className="inline-block pl-3">
                        {isLoading ? "Sending..." : "Continue"}
                      </span>
                      <span className="inline-block text-[#5B9425] bg-white rounded-full p-2">
                        <IoChevronForwardSharp />
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
