import Link from "next/link";
import React, { useRef, useState } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DataTable from "react-data-table-component";
import { HiOutlineUser } from "react-icons/hi2";
import { GoChevronDown } from "react-icons/go";
import { MdOutlineFileUpload, MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import Popup from "../Popup";
import Image from "next/image";
import { userscustomStyles } from "@/utils/TableStyle/dataTableStyles";

export default function InvoiceTable({ users, pagination, handlePageState }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [HistoryUser, setHistoryUser] = useState(false);

  const openHistoryUser = () => setHistoryUser(true);
  console.log(users, "tracking users data");

  const handlePageChange = (page) => {
    console.log(page, "page");
    setCurrentPage(page);
    if (page >= 1 && page <= pagination.totalPages) {
      handlePageState(page);
    }
  };

  const columns = [
   {
        name: "Name",
        selector: (row) => row.full_name,
        sortable: true,
        width: "250px",
        cell: (row) => (
          <div className="relative">
            {row.apply && (
              <span className="bg-[#5B9425] text-white px-4 py-1 rounded-full absolute -top-6 -left-5">
                Re-applied
              </span>
            )}
            <div className="flex items-center gap-3">
              {row.avatar ? (
                <img
                  src={row.avatar}
                  alt={row.full_name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg">
                    {" "}
                    <HiOutlineUser />
                  </span>
                </div>
              )}
              <div>
                <div className="font-semibold text-gray-800">{row?.user?.full_name || 'N/A'}</div>
                <div className="text-sm text-gray-500">{row?.user?.email || 'N/A'}</div>
              </div>
            </div>
          </div>
        ),
      },

    {
      name: "User ID",
      selector: (row) => (
        <p>
          {row?.user?._id || "N/A"}
        </p>
      ),
      sortable: true,
    },

    {
      name: "Date",
      selector: (row) => row?.transactionDate,
      cell: (row) => {
        const date = new Date(row?.transactionDate);
        return (
          <p>
            {date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        );
      },
    }
    ,
    {
      name: "status",
      cell: (row) => (
        <div>
          <span className="text-gray-500 bg-green-200 text-sm px-5 py-2 rounded-full capitalize">
            {row?.status}
          </span>
        </div>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          onClick={openHistoryUser}
          className="text-white bg-green-600 text-sm px-5 py-2 rounded-full"
        >
          View
        </button>
      ),
    },
  ];

  

  return (
    <>
      <div className="fund-table border border-gray-200 py-3 px-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-12 h-12 rounded-full bg-[#D1E7D1] text-2xl flex items-center justify-center">
              <HiOutlineUser />
            </span>
            All Invoie
          </h2>
          <div className="flex items-center gap-2">
          <Link
            href="#"
            onClick={() => {
              if (pagination.prev) handlePageChange(pagination.prev);
            }}
            className={`flex items-center text-[#5B9425] px-2 py-2 text-sm rounded-xl bg-white ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <IoChevronBackSharp />
          </Link>

          <div className="hidden lg:flex gap-x-3 items-center">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Link
                  href="#"
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm rounded-md text-[#5B9425] ${
                    currentPage === page ? "bg-[#D1E7D1]" : "hover:bg-[#D1E7D1]"
                  }`}
                >
                  {page}
                </Link>
              )
            )}
          </div>

          <Link
            href="#"
            onClick={() => {
              if (pagination.next) handlePageChange(pagination.next);
            }}
            className={`flex items-center text-[#5B9425] px-2 py-2 text-sm rounded-xl bg-white ${
              currentPage === pagination.totalCount
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            <IoChevronForwardSharp />
          </Link>
        </div>
        </div>
        <div className="h-[460px] overflow-scroll md:overflow-x-hidden ">
          <DataTable
            columns={columns}
            data={users}
            customStyles={userscustomStyles}
            highlightOnHover
            pointerOnHover
            responsive
          />
        </div>
      </div>

      <Popup
        isOpen={HistoryUser}
        onClose={() => setHistoryUser(false)}
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
              <div className="overflow-x-auto overflow-y-scroll h-[250px]">
                <table className="min-w-full divide-y divide-gray-200  ">
                  <thead className="bg-gray-100 whitespace-nowrap">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {Array(20)
                      .fill()
                      .map((_, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4 text-sm text-slate-900 font-medium">
                            Egg
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-600 font-medium">
                            12
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-600 font-medium">
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

              <button className="w-full  border border-gray-200 px-4 py-2   gap-4 rounded-full bg-[#5B9425] text-white text-center">
                Download
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}
