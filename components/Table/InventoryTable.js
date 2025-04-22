import Link from "next/link";
import React, { useRef, useState } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DataTable from "react-data-table-component";
import { HiOutlineUser } from "react-icons/hi2";
import { GoChevronDown } from "react-icons/go";
import { MdOutlineFileUpload,MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import Popup from "../Popup";


export default function InventoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDistributePopupOpen, setDistributePopupOpen] = useState(false);
  const [UploadSheet, setUploadSheet] = useState(false);
  const [DeleteUser, setDeleteUser] = useState(false);
  const [file, setFile] = useState(null);

  const openDistributePopup = () => setDistributePopupOpen(true);
  const openUploadSheet = () => setUploadSheet(true);
  const openDeleteUser = () => setDeleteUser(true);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const itemsPerPage = 12;

  const activeUsers = [
    {
      id: 1,
      name: "Antony Rogers",
      email: "antony@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "12747",
      type: "Monthly",
      approval: "In Review",
      usageColor: "bg-yellow-100 text-yellow-700",
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
      usageColor: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      name: "Anda Parkers",
      email: "licnda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "6",
      type: "Yearly",
      approval: "Rejected",
      usageColor: "bg-red-100 text-red-700",
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
      usageColor: "bg-yellow-100 text-yellow-700",
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
      usageColor: "bg-green-100 text-green-700",
    },
    {
      id: 6,
      name: "Anda Parkers",
      email: "licnda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "6",
      type: "Yearly",
      approval: "Rejected",
      usageColor: "bg-red-100 text-red-700",
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
      usageColor: "bg-yellow-100 text-yellow-700",
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
      usageColor: "bg-green-100 text-green-700",
    },
    {
      id: 9,
      name: "Anda Parkers",
      email: "licnda@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York",
      userid: "6",
      type: "Yearly",
      approval: "Rejected",
      usageColor: "bg-red-100 text-red-700",
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
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
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
      cell: (row) => (
        <div
          className={`text-sm px-3 py-1 rounded-full font-medium ${row.usageColor}`}
        >
          {row.approval}
        </div>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <div className="flex gap-4">
          <button className="text-[#5B9425] text-xl"><BiEditAlt/></button>
          <button  onClick={openDeleteUser} className="text-red-700 text-xl"><MdDeleteOutline /></button>
        </div>
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

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="fund-table border border-gray-200 py-6 px-6 rounded-2xl">
        <div className="md:flex justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-12 h-12 rounded-full bg-[#D1E7D1] text-2xl flex items-center justify-center">
              <HiOutlineUser />
            </span>
            Product List
          </h2>
          <div className="md:flex gap-4 space-y-4 md:space-y-0">
            <div className="flex gap-2">
              <button
                onClick={openUploadSheet}
                className="    border border-gray-200 text-gray-500 font-medium px-5 py-2 rounded-full text-sm"
              >
                + Upload Spreadsheet
              </button>
              <button
                onClick={openDistributePopup}
                className="bg-[#5B9425] hover:bg-green-700 text-white font-medium px-5 py-2 rounded-full text-sm"
              >
                + Add User
              </button>
            </div>
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
        <div className="h-[600px] overflow-scroll md:overflow-x-hidden ">
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
        isOpen={isDistributePopupOpen}
        onClose={() => setDistributePopupOpen(false)}
        widthClass="w-200"
      >
        <div className=" py-8">
          <form className="space-y-4">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#5B9425] rounded-md p-6 cursor-pointer text-center mb-4"
            >
              <span className="text-[#5B9425] text-3xl">
                <MdOutlineFileUpload />
              </span>
              <p className="text-sm font-medium text-gray-800">
                <span className="text-[#5B9425] font-semibold">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG (max, 800×400px)</p>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Inputs */}
            <div className="form-group">
              <label class="block text-gray-500 text-sm  mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Product Name"
                maxlength="50"
                class="w-full px-4 py-2 border border-gray-300 rounded-full mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    Product Category
                  </label>
                  <div className="relative">
                    <select class="w-full px-4 py-2 border appearance-none border-gray-300 rounded-full mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Choose</option>
                      <option>Electronics</option>
                      <option>Apparel</option>
                    </select>
                    <GoChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={16}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">Code</label>
                  <input
                    type="text"
                    placeholder="Enter Your Product Name"
                    maxlength="50"
                    class="w-full px-4 py-2 border border-gray-300 rounded-full mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">Price</label>
                  <input
                    type="text"
                    placeholder="Enter Your Price"
                    maxlength="50"
                    class="w-full px-4 py-2 border border-gray-300 rounded-full mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label class="block text-gray-500 text-sm  mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Quantity"
                    maxlength="50"
                    class="w-full px-4 py-2 border border-gray-300 rounded-full mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="form-group">
                <label class="block text-gray-500 text-sm  mb-2">Status</label>
                <div className="relative">
                  <select class="w-full px-4 py-2 border appearance-none border-gray-300 rounded-full mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Choose</option>
                    <option>Active</option>
                    <option>In-Active</option>
                  </select>
                  <GoChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                className="  border border-gray-200 px-8 py-2   gap-4 rounded-full bg-[#5B9425] text-white text-center"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Popup>
      <Popup
        isOpen={UploadSheet}
        onClose={() => setUploadSheet(false)}
        widthClass="w-120"
      >
        <div className=" py-8">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg w-full max-w-md mx-auto">
            <span className="text-[#5B9425] text-3xl">
              <MdOutlineFileUpload />
            </span>
            <p className="text-gray-500 mb-4">Drag and Drop File Here</p>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => console.log(e.target.files)}
            />

            <button
              onClick={handleButtonClick}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300"
            >
              Upload File
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        isOpen={DeleteUser}
        onClose={() => setDeleteUser(false)}
        widthClass="w-120"
      >
        <div className="space-y-4 py-5">
          <div className="text-center">
            <h1 className="text-xl font-semibold">
            Are You Sure?
            </h1>
            <p className="text-[15px] text-gray-500">
            Are you sure do you want to Delete this item?
            </p>
          </div>
          <div className="flex gap-2">
            <button
             
              className="w-full  border border-gray-200 px-4 py-2   gap-4 rounded-full bg-red-600 text-white text-center"
            >
             Yes
            </button>
            <button
              
              className="w-full     px-4 py-2   gap-4 rounded-full border border-[#5B9425] text-black text-center"
            >
             No
            </button>
          </div>
        </div>
        </Popup>
    </>
  );
}
