import { useLoginMutation } from "@/lib/redux/services/auth.api";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  IoChevronForwardSharp,
  IoEyeOffSharp,
  IoEyeSharp,
} from "react-icons/io5";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { BiLoaderAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await login({ email, password }).unwrap();

      if (res.success) {
        const user = res.data.user;
        const token = res.data.token;

        const response = await signIn("accessToken", {
          accessToken: token,
          user: JSON.stringify(user),
          redirect: false,
        });

        if (response?.error) {
          toast.error(response.error);
          return;
        }

        if (user.userType === "admin") {
          router.push("/admin");
        } else if (user.userType === "manager") {
          router.push("/manager/inventory-management");
        } else if (user.userType === "user") {
          user.is_verified
            ? router.push("/available-balance")
            : router.push("/auth/otp-verification");
        } else {
          toast.error("Unauthorized user type!");
          router.push("/auth");
        }

        toast.success("Login successful!");
      } else {
        toast.error(res.error?.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err?.data?.error?.message || "Error occurred during login!");
    }
  };

  return (
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
        <div className="h-screen main-bg-login flex flex-col justify-center space-y-24 px-24">
          <div>
            <h1 className="text-4xl font-semibold">Welcome Back</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-16">
              <div className="space-y-6">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-4 border-b border-[#D9D9D9] rounded outline-0"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="form-group relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-4 border-b border-[#D9D9D9] rounded pr-10 outline-0"
                    {...register("password", {
                      required: "Password is required",
                     
                    })}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <IoEyeSharp /> : <IoEyeOffSharp />}
                  </span>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
                <div className="text-right">
                  <Link
                    href="/auth/forget-password"
                    className="text-[#5B9425] font-semibold text-base"
                  >
                    Forget Password
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className={`btn-b flex items-center justify-center gap-12 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isLoading}
                >
                  <span className="inline-block pl-3">
                    {isLoading ? (
                      <BiLoaderAlt className="animate-spin text-2xl text-white" />
                    ) : (
                      "Sign In"
                    )}
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
    </section>
  );
}
