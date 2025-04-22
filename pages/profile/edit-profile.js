import BackBtn from "@/components/BackBtn";
import BottomNav from "@/components/BottomNav";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";

export default function EditProfile() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("/img/profile.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const data = {
    name: "Herry",
    email: "herry9@gmail.com",
    number: "00080089",
    income: "$86,070",
    userId: "1830",
    location: "Paris",
    gender: "Male",
    maritalStatus: "Married",
    healthProblem: "Heart Patient",
    children: "3",
    household: "5",
  };

  const fields = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Number", value: data.number },
    { label: "Yearly Income", value: data.income },
    { label: "User Id", value: data.userId },
    { label: "Location", value: data.location },
    { label: "Gender", value: data.gender },
    { label: "Marital Status", value: data.maritalStatus },
    { label: "Current Health Problem (If Any)", value: data.healthProblem },
    { label: "Children", value: data.children },
    { label: "House Hold", value: data.household },
  ];
  return (
    <>
      <section className="h-screen main-bg py-16   relative">
        <div className="container mx-auto max-w-screen-2xl px-6">
          <div className="m-wrap space-y-10">
            <div className="name-warp flex items-center justify-between ">
              <BackBtn />
              <button className="text-sm border border-gray-200 px-4 py-2   gap-4 rounded-xl bg-[#5B9425] text-white text-center">
                save
              </button>
            </div>
            <div className="bg-white rounded-2xl py-4 over-wrap space-y-1 h-[630px] overflow-y-scroll scrollbar-hide pr-4">
              <div className="text-center ">
                <div className="w-14 h-14 bg-[#F8B13F] rounded-2xl text-center flex items-end justify-center m-auto relative">
                  {/* Edit Button */}
                  <button
                    onClick={handleEditClick}
                    className="text-white bg-[#5B9425] text-[8px] w-6 h-6 rounded-full absolute flex items-center justify-center -right-2 -top-2"
                  >
                    <FaPen />
                  </button>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />

                  {/* Profile Image */}
                  <Image
                    className="object-cover rounded-2xl"
                    src={selectedImage}
                    width={60}
                    height={60}
                    alt="profile"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Herry</h2>
                </div>
              </div>

              <div className="max-w-md mx-auto p-4 space-y-3">
                {fields.map((field, index) => (
                  <div key={index}>
                    <label
                      htmlFor={field.name}
                      className="block text-gray-700 text-sm mb-1"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.value}
                      className="w-full bg-green-100 text-gray-700 px-4 py-2 rounded-full text-sm outline-none cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <BottomNav />
    </>
  );
}
