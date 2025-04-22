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

export default function InvoiceTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const [HistoryUser, setHistoryUser] = useState(false);
  const [file, setFile] = useState(null);

  const openHistoryUser = () => setHistoryUser(true);

  const itemsPerPage = 6;

  const activeUsers = [
    {
      id: 1,
      name: "Antony Rogers",
      email: "antony@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      userid: "12747",
      status: "completed",
      date: "21/4/2025",
      usageColor: "bg-yellow-100 text-yellow-700",
    },
    {
        id: 1,
        name: "Antony Rogers",
        email: "antony@gmail.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        userid: "12747",
        status: "completed",
        date: "21/4/2025",
        usageColor: "bg-yellow-100 text-yellow-700",
      },
      {
        id: 1,
        name: "Antony Rogers",
        email: "antony@gmail.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        userid: "12747",
        status: "completed",
        date: "21/4/2025",
        usageColor: "bg-yellow-100 text-yellow-700",
      },
      {
        id: 1,
        name: "Antony Rogers",
        email: "antony@gmail.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        userid: "12747",
        status: "completed",
        date: "21/4/2025",
        usageColor: "bg-yellow-100 text-yellow-700",
      },
      {
        id: 1,
        name: "Antony Rogers",
        email: "antony@gmail.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        userid: "12747",
        status: "completed",
        date: "21/4/2025",
        usageColor: "bg-yellow-100 text-yellow-700",
      },
      {
        id: 1,
        name: "Antony Rogers",
        email: "antony@gmail.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        userid: "12747",
        status: "completed",
        date: "21/4/2025",
        usageColor: "bg-yellow-100 text-yellow-700",
      },
      {
        id: 1,
        name: "Antony Rogers",
        email: "antony@gmail.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        userid: "12747",
        status: "completed",
        date: "21/4/2025",
        usageColor: "bg-yellow-100 text-yellow-700",
      },
  ];

  const totalPages = Math.ceil(activeUsers.length / itemsPerPage);
  const paginatedData = activeUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "250px",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold text-gray-800">{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },

    {
      name: "User ID",
      selector: (row) => row.userid,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row) => row.date,
      cell: (row) => <div>{row.date}</div>,
    },
    {
      name: "status",
      cell: (row) => (
        <div> 
          <span className="text-gray-500 bg-green-100 text-sm px-5 py-2 rounded-full">
            Completed
          </span>
        </div>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
            onClick={openHistoryUser}
            className="text-gray-500 bg-green-100 text-sm px-5 py-2 rounded-full"
          >
            View
          </button>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        borderRadius: "16px",
        border: "none",
        width: "100%",
      },
    },
    head: {
      style: {
        minHeight: "72px",
        width: "99%",
        margin: "10px 2px",
        backgroundColor: "#E5F0FE",
        borderRadius: "8px",
        outline: "1px solid #E5F0FE",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: "#E5F0FE",
        fontSize: "16px",
      },
    },
    rows: {
      style: {
        minHeight: "72px",
        width: "99%",
        margin: "10px 2px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        outline: "1px solid #ebe6e7",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f1f5ff",
        borderRadius: "8px",
        outline: "1px solid #3b82f6",
      },
    },
    cells: {
      style: {
        paddingLeft: "20px",
        paddingRight: "20px",
        fontSize: "14px",
      },
    },
    pagination: {
      style: {
        padding: "12px 20px",
      },
    },
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
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
              onClick={() => handlePageChange(currentPage - 1)}
              className={`flex items-center text-[#5B9425] px-2 py-2 text-sm drop-shadow-sm rounded-xl bg-white ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <IoChevronBackSharp />
            </Link>
            <div className="items-center hidden lg:flex gap-x-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Link
                    href="#"
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-sm rounded-md text-[#5B9425] ${
                      currentPage === page
                        ? "bg-[#D1E7D1]"
                        : "hover:bg-[#D1E7D1]"
                    }`}
                  >
                    {page}
                  </Link>
                )
              )}
            </div>
            <Link
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={`flex items-center text-[#5B9425] px-2 py-2 text-sm drop-shadow-sm rounded-xl bg-white ${
                currentPage === totalPages
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
          data={paginatedData}
          customStyles={customStyles}
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
