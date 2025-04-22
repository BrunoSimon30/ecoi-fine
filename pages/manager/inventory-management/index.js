import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import Popup from "@/components/Popup";
import Image from "next/image";
import React, { useState } from "react";

import { HiOutlineUser } from "react-icons/hi2";

export default function InventoryManagement() {
  const [quantity, setQuantity] = useState(12);
  const [DeleteUser, setDeleteUser] = useState(false);
  const openDeleteUser = () => setDeleteUser(true);
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 0 ? q - 1 : 0));
  const products = [
    {
      name: "Eggs",
      price: 12,
      image: "/img/egg.jpg",
    },
    {
      name: "Eggs",
      price: 12,
      image: "/img/egg.jpg",
    },
    {
      name: "Eggs",
      price: 12,
      image: "/img/egg.jpg",
    },
    {
      name: "Eggs",
      price: 12,
      image: "/img/egg.jpg",
    },
    {
      name: "Eggs",
      price: 12,
      image: "/img/egg.jpg",
    },
    {
      name: "Eggs",
      price: 12,
      image: "/img/egg.jpg",
    },
  ];
  return (
    <>
      <Dashboardlayout heading={"Inventory Managerment"}>
        <div className="users-wrap space-y-6">
          <div className="xl:grid grid-cols-3 gap-6 space-y-4 xl:space-y-0">
            <div className="col-span-2   border border-gray-200 py-6 px-6 rounded-2xl space-y-8">
              <div className="top-h">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="w-12 h-12 rounded-full bg-[#D1E7D1] text-2xl flex items-center justify-center">
                    <HiOutlineUser />
                  </span>
                  Categories
                </h2>
              </div>
              <div className="md:grid grid-cols-3 gap-8 space-y-4 md:space-y-0">
                {products.map((product, index) => (
                  <div className="border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col   space-y-4">
                    <div className="text-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded-md m-auto"
                      />
                    </div>
                    <div className="flex gap-4 justify-between items-end">
                      <div>
                        <p className="font-medium text-xl">{product.name}</p>
                        <p className="text-gray-600 text-sm  ">
                          ${product.price}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={decrement}
                          className="text-gray-500 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          –
                        </button>
                        <span className="text-sm font-medium">{quantity}</span>
                        <button
                          onClick={increment}
                          className="text-white bg-green-600 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="  border border-gray-200 py-6 px-6 rounded-2xl">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-black text-xl font-semibold">
                    Calculator
                  </h3>
                  <div className="flex gap-3 items-center ">
                    <div className="w-14 h-14 bg-[#F8B13F] rounded-2xl text-center flex items-end justify-center overflow-hidden  ">
                      <Image
                        className="object-cover"
                        src={"/img/profile.png"}
                        width={50}
                        height={50}
                        alt="profile"
                      />
                    </div>
                    <div>
                      <h4 className="text-black text-lg  ">Herry</h4>
                      <p className="text-sm text-gray-500">$2,000</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 min-h-[400px]">
                  <h3 className="text-black text-xl font-semibold">Items</h3>
                  <div class="overflow-x-auto overflow-y-scroll h-[300px]">
                    <table class="min-w-full divide-y divide-gray-200  ">
                      <thead class="bg-gray-100 whitespace-nowrap">
                        <tr>
                          <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Name
                          </th>
                          <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Qty
                          </th>
                          <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Price
                          </th>
                        </tr>
                      </thead>

                      <tbody class="bg-white divide-y divide-gray-200 ">
                        {Array(20)
                          .fill()
                          .map((_, index) => (
                            <tr>
                              <td class="px-4 py-4 text-sm text-slate-900 font-medium">
                                Egg
                              </td>
                              <td class="px-4 py-4 text-sm text-slate-600 font-medium">
                                12
                              </td>
                              <td class="px-4 py-4 text-sm text-slate-600 font-medium">
                                $12
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-right">
                    <span>Total :</span> $12,00
                  </h4>

                  <button
                    onClick={openDeleteUser}
                    className="w-full  border border-gray-200 px-4 py-2   gap-4 rounded-full bg-[#5B9425] text-white text-center"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dashboardlayout>
      <Popup
        isOpen={DeleteUser}
        onClose={() => setDeleteUser(false)}
        widthClass="w-120"
      >
        <div className="space-y-4 py-3">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Receipt</h1>
            <p className="text-sm text-gray-500">Time : 12:00</p>
            <p className="text-sm text-gray-500">Date : 12-April-2025</p>
          </div>
          <div className="space-y-4 ">
            <div className="space-y-4">
              <h3 className="text-black text-xl font-semibold">Calculator</h3>
              <div className="flex gap-3 items-center ">
                <div className="w-14 h-14 bg-[#F8B13F] rounded-2xl text-center flex items-end justify-center overflow-hidden  ">
                  <Image
                    className="object-cover"
                    src={"/img/profile.png"}
                    width={50}
                    height={50}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="text-black text-lg  ">Herry</h4>
                  <p className="text-sm text-gray-500">$2,000</p>
                </div>
              </div>
            </div>
            <div className="space-y-2  ">
              <h3 className="text-black text-xl font-semibold">Items</h3>
              <div class="overflow-x-auto overflow-y-scroll h-[250px]">
                <table class="min-w-full divide-y divide-gray-200  ">
                  <thead class="bg-gray-100 whitespace-nowrap">
                    <tr>
                      <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        Name
                      </th>
                      <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        Qty
                      </th>
                      <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody class="bg-white divide-y divide-gray-200 ">
                    {Array(20)
                      .fill()
                      .map((_, index) => (
                        <tr>
                          <td class="px-4 py-4 text-sm text-slate-900 font-medium">
                            Egg
                          </td>
                          <td class="px-4 py-4 text-sm text-slate-600 font-medium">
                            12
                          </td>
                          <td class="px-4 py-4 text-sm text-slate-600 font-medium">
                            $12
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-4">
                  <h4 className="text-right">
                    <span>Total :</span> $12,00
                  </h4>

                  <button
                   
                    className="w-full  border border-gray-200 px-4 py-2   gap-4 rounded-full bg-[#5B9425] text-white text-center"
                  >
                    Confirm
                  </button>
                </div>
          </div>
        </div>
      </Popup>
    </>
  );
}
