import Link from "next/link";
import React, { useState } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi"; // Import the icon
import DataTable from "react-data-table-component";
import { userscustomStyles } from "@/utils/TableStyle/dataTableStyles";
import ImageWithFallback from "../ImageFall/ImageWithFallback";
import { HiOutlineUser } from "react-icons/hi2";
import { imageSrc } from "@/utils";

export default function FundTableLayout({
  users,
  pagination,
  handlePageState,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [weekSelections, setWeekSelections] = useState({});

  const handlePageChange = (page) => {
    console.log(page, "page");
    setCurrentPage(page);
    if (page >= 1 && page <= pagination.totalPages) {
      handlePageState(page);
    }
  };

  console.log(users, "users");
  

  const columns = [
     
    {
      name: "Name",
      selector: (row) => row?.user?.full_name,
      sortable: true,
      width: "250px",
      cell: (row) => (
        <div className="flex items-center gap-3">
         <div className="flex items-center gap-3">
          {row?.user?.image?.file ? (
            <ImageWithFallback
              src={imageSrc(row?.user?.image?.file)} // your function
              fallbackSrc="/images/error.jpg"
              alt={row?.user?.image.file}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl text-gray-500">
                <HiOutlineUser />
              </span>
            </div>
          )}
        </div>
          <div>
            <div className="font-semibold text-gray-800">{row?.user?.full_name || 'N/A'} </div>
            <div className="text-sm text-gray-500">{row?.user?.email}</div>
          </div>
        </div>
      ),
    },

    {
      name: "Amount",
      selector: (row) => row.total_amount,
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-gray-900">{`$${row.total_amount}`}</span>
      ),
    },
    {
      name: "Date",
      selector: (row) => row?.createdAt,
      cell: (row) => {
        const date = new Date(row?.createdAt);
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
    },
    {
      name: "Weeks",
      selector: (row) => row._id,
      cell: (row) => {
        const weekArray = row?.distributed_amounts?.[0]?.week || [];
    
        return (
          <div className="flex items-center gap-1">
            {weekArray.map((val, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full border transition-all duration-200 ${
                  val === 1
                    ? "bg-green-200 border-green-200"
                    : "bg-transparent border-gray-300"
                }`}
                title={`Week ${index + 1}`}
              ></div>
            ))}
          </div>
        );
      },
    },
    {
      name: "Usage",
      selector: (row) => row.usage,
      cell: (row) => (
        <div
          className={`text-sm px-3 py-1 rounded-full font-medium  bg-orange-200`}
        >
          {row.usage || '60%' } 
        </div>
      ),
    },
    {
      name: "Funds",
      selector: (row) => row.funds,
      cell: (row) => (
        <div
          className={`text-sm px-3 py-1 rounded-full font-medium  bg-green-200`}
        >
         {row.funds || '1/3'} 
        </div>
      ),
    },
  ];

  return (
    <div className="fund-table border border-gray-200 py-4 px-6 rounded-2xl">
      {/* Tabs and Pagination (Top) */}
      <div className="flex justify-end items-center mb-4">
        {/* Pagination */}
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

      {/* Table */}
      <div className="h-[460px] overflow-scroll  md:overflow-x-hidden">
        <DataTable
          columns={columns}
          data={users}
          customStyles={userscustomStyles}
          highlightOnHover
          pointerOnHover
          responsive={true}
        />
      </div>
    </div>
  );
}
