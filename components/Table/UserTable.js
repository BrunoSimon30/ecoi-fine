import Link from "next/link";
import React, { useState } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { HiOutlineUser } from "react-icons/hi2";
import { IoHourglassOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Popup from "../Popup";
import Image from "next/image";

export default function UserTableLayout() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [approvalStatusMap, setApprovalStatusMap] = useState({});
  const [isDistributePopupOpen, setDistributePopupOpen] = useState(false);
  const openDistributePopup = () => setDistributePopupOpen(true);
  const itemsPerPage = 8;

  const openApplyPopup = () => {
    setDistributePopupOpen(false);
  };
  
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

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "250px",
      cell: (row) => (
        <div className="userwrp relative">
          {row.apply && (
            <span className="bg-[#5B9425] text-white px-4 py-1 rounded-full absolute -top-6 -left-5">
              Re applied
            </span>
          )}
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
        </div>
      ),
    },
    {
      name: "Location",
      selector: (row) => row.amount,
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-gray-900">{row.location}</span>
      ),
    },
    {
      name: "User ID",
      selector: (row) => row.userid,
      sortable: true,
    },
    {
      name: "Processing Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Approval",
      selector: (row) => row.approval,
      cell: (row) => {
        const selectedValue = approvalStatusMap[row.id] || row.approval;
    
        const getColorClass = (value) => {
          switch (value) {
            case "Onboarded":
              return "bg-green-100 text-green-700 border-green-300";
            case "Rejected":
              return "bg-red-100 text-red-700 border-red-300";
            case "In Review":
            default:
              return "bg-yellow-100 text-yellow-700 border-yellow-300";
          }
        };
    
        return (
          <select
            value={selectedValue}
            onChange={(e) =>
              setApprovalStatusMap((prev) => ({
                ...prev,
                [row.id]: e.target.value,
              }))
            }
            className={`text-sm px-3 py-1 rounded-full font-medium ${getColorClass(
              selectedValue
            )}`}
          >
            <option value="In Review">In Review</option>
            <option value="Onboarded">Onboarded</option>
            <option value="Rejected">Rejected</option>
          </select>
        );
      },
    }, 
    {
      name: "Edit",
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex items-center justify-center space-x-2 text-lg text-gray-500">
          {row.approval === "Onboarded" ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <IoHourglassOutline className="" />
          )}
        </div>
      ),
    }
  ];

  const handleDropdownToggle = (id) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle visibility for the clicked row's dropdown
    }));
  };

  const activeUsers = [
    {
      id: 1,
      name: "Antony Rogers",
      email: "antony@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "12747",
      type: "Monthly",
      approval: "Rejected",
      funds: "1/3",
      apply: true,
    },
    {
      id: 2,
      name: "Linda Parkers",
      email: "linda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      location: "New York",
      userid: "25747",
      type: "Yearly",
      approval: "Onboarded",
      funds: "2/3",
      apply: false,
    },
    {
      id: 3,
      name: "anda Parkers",
      email: "licnda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "6",
      type: "Yearly",
      approval: "Rejected",
      funds: "2/3",
      apply: false,
    },
    {
      id: 4,
      name: "Antony Rogers",
      email: "antony@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "12747",
      type: "Monthly",
      approval: "In Review",
      funds: "1/3",
      apply: false,
    },
    {
      id: 5,
      name: "Linda Parkers",
      email: "linda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      location: "New York",
      userid: "25747",
      type: "Yearly",
      approval: "Onboarded",
      funds: "2/3",
      apply: true,
    },
    {
      id: 6,
      name: "anda Parkers",
      email: "licnda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "6",
      type: "Yearly",
      approval: "Rejected",
      funds: "2/3",
      apply: true,
    },
    {
      id: 7,
      name: "Antony Rogers",
      email: "antony@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "12747",
      type: "Monthly",
      approval: "In Review",
      funds: "1/3",
      apply: false,
    },
    {
      id: 8,
      name: "Linda Parkers",
      email: "linda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      location: "New York",
      userid: "25747",
      type: "Yearly",
      approval: "Onboarded",
      funds: "2/3",
      apply: false,
    },
    {
      id: 9,
      name: "anda Parkers",
      email: "licnda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "6",
      type: "Yearly",
      approval: "Rejected",
      funds: "2/3",
      apply: false,
    },
  ];
  

 

  const data = activeUsers; // or use inactiveUsers or any other default data

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="fund-table border border-gray-200 py-6 px-6 rounded-2xl">
        {/* Header and Pagination (Top) */}
        <div className="md:flex justify-between items-center mb-4 space-y-6 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-12 h-12 rounded-full bg-[#D1E7D1] text-2xl flex items-center justify-center">
                <HiOutlineUser />
              </span>
              Managing Users
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={openDistributePopup}
              className="bg-[#5B9425] hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <span className="w-6 h-6 bg-white rounded-full text-black flex  items-center justify-center"><FaPlus /></span>
             <span> Add User</span>
            </button>
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
        </div>

        {/* Data Table */}
        <div className="h-[600px] overflow-scroll md:overflow-x-hidden">
          <DataTable
            columns={columns}
            data={paginatedData}
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            responsive={true}
          />
        </div>
      </div>
      <Popup
        isOpen={isDistributePopupOpen}
        onClose={() => setDistributePopupOpen(false)}
        widthClass="w-full md:w-250"
      >
        <div className="space-y-4 py-5">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Demographics Information</h1>
          </div>
          <div className="h-[500px] overflow-scroll md:h-full md:overflow-auto  ">
            <form className="space-y-8 ">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full text-center flex items-end justify-center overflow-hidden m-auto">
                  <Image
                    className="object-cover "
                    src={"/img/pframe.jpg"}
                    width={60}
                    height={60}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="text-md font-[500] text-gray-5">
                    Antony Rogers
                  </h4>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    Number
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Number"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    User Id
                  </label>
                  <input
                    type="email"
                    placeholder="Enter User (ID)"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    Gender
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Gender"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">Age</label>
                  <input
                    type="email"
                    placeholder="Enter Your Age"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    Yearly Income
                  </label>
                  <input
                    type="email"
                    placeholder="$00,0000"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    Location
                  </label>
                  <input
                    type="email"
                    placeholder="Enter User Location"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    Marital Status
                  </label>
                  <input
                    type="text"
                    placeholder="Married"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    Current Health Prolem (If any)
                  </label>
                  <input
                    type="email"
                    placeholder="Heart Pattient"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    Children
                  </label>
                  <input
                    type="email"
                    placeholder="Children"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    House Hold
                  </label>
                  <input
                    type="email"
                    placeholder="Enter User Location"
                    maxlength="50"
                    class="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="doc-wrap space-y-8">
                <div className="text-center">
                  <h1 className="text-2xl font-semibold">Documents</h1>
                </div>
                <div className="flex gap-12">
                  {Array(3)
                    .fill()
                    .map((_, index) => (
                      <div className="space-y-2 ">
                        <Image
                          src={"/img/doc.svg"}
                          className="mx-auto"
                          width={43}
                          height={54}
                          alt="doc"
                        />
                        <p className="text-sm text-gray-500">Document Name</p>
                      </div>
                    ))}
                </div>
              </div>
              <div className="text-center ">
                <button
                  onClick={openApplyPopup}
                  className="    border border-gray-200 px-8 py-2   gap-4 rounded-full bg-[#5B9425] text-white text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Popup>
    </>
  );
}
