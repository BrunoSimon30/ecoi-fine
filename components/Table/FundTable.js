import Link from "next/link";
import React, { useState } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi"; // Import the icon
import DataTable from "react-data-table-component";

export default function FundTableLayout() {
  const [tab, setTab] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [weekSelections, setWeekSelections] = useState({});
  const itemsPerPage = 4;


 

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
      width:"250px",
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
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-gray-900">{row.amount}</span>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Weeks",
      selector: (row) => row.id,
      cell: (row) => {
        const selectedWeeks = weekSelections[row.id] || [];
    
        const toggleWeek = (index) => {
          setWeekSelections((prev) => {
            const prevWeeks = prev[row.id] || [];
            const isSelected = prevWeeks.includes(index);
            const newWeeks = isSelected
              ? prevWeeks.filter((w) => w !== index)
              : [...prevWeeks, index];
    
            return {
              ...prev,
              [row.id]: newWeeks,
            };
          });
        };
    
        return (
          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }, (_, index) => {
              const isSelected = selectedWeeks.includes(index);
              return (
                <div
                  key={index}
                  onClick={() => toggleWeek(index)}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-green-200 border border-green-200"
                      : "border border-gray-300 bg-transparent"
                  }`}
                  title={`Week ${index + 1}`}
                ></div>
              );
            })}
          </div>
        );
      },
    },
    {
      name: "Usage",
      selector: (row) => row.usage,
      cell: (row) => (
        <div
          className={`text-sm px-3 py-1 rounded-full font-medium ${row.usageColor}`}
        >
          {row.usage}
        </div>
      ),
    },
    {
      name: "Funds",
      selector: (row) => row.funds,
      cell: (row) =>
        typeof row.funds === "string" ? (
          <div className="px-3 py-1 rounded-full border text-sm text-gray-500 border-gray-300 inline-block">
            {row.funds}
          </div>
        ) : (
          row.funds
        ),
    },
    {
      name: "Option",
      selector: (row) => row.id, // Just a placeholder column for the icon
      cell: (row) => (
        <div className="relative">
          <HiOutlineDotsVertical
            onClick={() => handleDropdownToggle(row.id)} // Toggle dropdown visibility for specific row
            className="text-gray-500 cursor-pointer"
          />
          {dropdownVisible[row.id] && (
            <div className="absolute left-9 -bottom-9 mt-2 bg-white shadow-md rounded-lg border border-gray-300 z-20">
              <ul className="text-sm w-24">
                <li className="px-4 py-2 hover:bg-gray-100">Option 1</li>
                <li className="px-4 py-2 hover:bg-gray-100">Option 2</li>
                <li className="px-4 py-2 hover:bg-gray-100">Option 3</li>
              </ul>
            </div>
          )}
        </div>
      ),
    },
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
      amount: "$2540.58",
      date: "9-4-2025",
      usage: "60%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "1/3",
    },
    {
      id: 2,
      name: "Linda Parkers",
      email: "linda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      amount: "$1567.80",
      date: "9-4-2025",
      usage: "39%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "2/3",
    },
    {
      id: 3,
      name: "Antony Rogers",
      email: "antony@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      amount: "$2540.58",
      date: "9-4-2025",
      usage: "60%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "1/3",
    },
    {
      id: 4,
      name: "Linda Parkers",
      email: "linda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      amount: "$1567.80",
      date: "9-4-2025",
      usage: "39%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "2/3",
    },
    {
      id: 5,
      name: "Antony Rogers",
      email: "antony@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      amount: "$2540.58",
      date: "9-4-2025",
      usage: "60%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "1/3",
    },
    {
      id: 6,
      name: "Linda Parkers",
      email: "linda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      amount: "$1567.80",
      date: "9-4-2025",
      usage: "39%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "2/3",
    },
    {
      id: 7,
      name: "Antony Rogers",
      email: "antony@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      amount: "$2540.58",
      date: "9-4-2025",
      usage: "60%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "1/3",
    },
    {
      id: 8,
      name: "Linda Parkers",
      email: "linda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      amount: "$1567.80",
      date: "9-4-2025",
      usage: "39%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "2/3",
    },

  ];

  const inactiveUsers = [
    {
      id: 3,
      name: "John Hampton",
      email: "john@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      amount: "$1640.26",
      date: "9-4-2025",
      usage: "40%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "3/3",
    },
    {
      id: 4,
      name: "Mark Walter",
      email: "mark@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      amount: "$2340.58",
      date: "9-4-2025",
      usage: "100%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "3/3",
    },
    {
      id: 5,
      name: "Larissa Burton",
      email: "laris21@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      amount: "$2340.58",
      date: "9-4-2025",
      usage: "60%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: (
        <span className="px-3 py-1 text-sm rounded-full font-medium bg-green-100 text-green-600">
          Completed
        </span>
      ),
    },
    {
      id: 3,
      name: "John Hampton",
      email: "john@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      amount: "$1640.26",
      date: "9-4-2025",
      usage: "40%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "3/3",
    },
    {
      id: 4,
      name: "Mark Walter",
      email: "mark@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      amount: "$2340.58",
      date: "9-4-2025",
      usage: "100%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: "3/3",
    },
    {
      id: 5,
      name: "Larissa Burton",
      email: "laris21@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      amount: "$2340.58",
      date: "9-4-2025",
      usage: "60%",
      usageColor: "bg-yellow-100 text-yellow-700",
      funds: (
        <span className="px-3 py-1 text-sm rounded-full font-medium bg-green-100 text-green-600">
          Completed
        </span>
      ),
    },
  ];

  const data = tab === "active" ? activeUsers : inactiveUsers;
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // Slice data for the current page

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="fund-table border border-gray-200 py-4 px-6 rounded-2xl">
      {/* Tabs and Pagination (Top) */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <button
            onClick={() => setTab("active")}
            className={`px-4 py-2 rounded-full font-medium ${
              tab === "active"
                ? "bg-[#D1E7D2] text-[#5B9425]"
                : "bg-gray-100 text-[#5B9425]"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setTab("inactive")}
            className={`px-4 py-2 rounded-full font-medium ${
              tab === "inactive"
                ? "bg-[#D1E7D2] text-[#5B9425]"
                : "bg-gray-100 text-[#5B9425]"
            }`}
          >
          Fund History
          </button>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button
            
            onClick={() => handlePageChange(currentPage - 1)}
            className={`flex items-center text-[#5B9425] px-2 py-2 text-sm drop-shadow-sm rounded-xl bg-white ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <IoChevronBackSharp />
          </button>

          <div className="items-center hidden lg:flex gap-x-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
               
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded-md text-[#5B9425] ${
                  currentPage === page ? "bg-[#D1E7D1]" : "hover:bg-[#D1E7D1]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
           
            onClick={() => handlePageChange(currentPage + 1)}
            className={`flex items-center text-[#5B9425] px-2 py-2 text-sm drop-shadow-sm rounded-xl bg-white ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <IoChevronForwardSharp />
          </button>
        </div>
      </div>

      {/* Table */}
     <div className="h-[460px] overflow-scroll  md:overflow-x-hidden">
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
  );
}
