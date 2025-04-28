import Link from "next/link";
import React, { useState } from "react";
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoHourglassOutline,
} from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import DataTable from "react-data-table-component";
import {
  useUpdateUserStatusMutation,
  useGetUserListQuery,
} from "@/lib/redux/services/admin/user-manage.api";
import { FaCheckCircle, FaTimesCircle, FaUserCheck } from "react-icons/fa";
import { toast } from "sonner";
import { FiEye } from "react-icons/fi";
import Popup from "@/components/Popup";
import Image from "next/image";
import {   userscustomStyles } from "@/utils/TableStyle/dataTableStyles";

export default function UserTableLayout({ users, pagination, handlePageState }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDistributePopupOpen, setDistributePopupOpen] = useState(false);
  const [approvalStatusMap, setApprovalStatusMap] = useState({});

  const [updateUserStatus] = useUpdateUserStatusMutation();

  console.log(users);

  const handlePageChange = (page) => {
    console.log(page, "page");
setCurrentPage(page);
    if (page >= 1 && page <= pagination.totalPages) {
      handlePageState(page);
    }
  };

  const handleApprovalChange = async (rowId, value) => {
    setApprovalStatusMap((prev) => ({
      ...prev,
      [rowId]: value,
    }));

    try {
      await updateUserStatus({
        userId: rowId,
        approval_status: value,
      }).unwrap();
      toast.success("User status updated successfully!");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status. Please try again.");
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
              <div className="font-semibold text-gray-800">{row.full_name}</div>
              <div className="text-sm text-gray-500">{row.email}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Location",
      selector: (row) => row.location?.type, // Optional chaining to avoid crash
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-gray-900">
          {row.location?.type || "N/A"}
        </span>
      ),
    },
    {
      name: "User ID",
      selector: (row) => (
        <p>
          <p>{row._id ? row._id : "N/A"}</p>
        </p>
      ),
      sortable: true,
    },
    {
      name: "Processing Type",
      selector: (row) => (
        <p className="capitalize">{row.processing_type || "N/A"}</p>
      ),
      sortable: true,
    },
    {
      name: "Approval",
      selector: (row) => row.approval_status,
      cell: (row) => {
        const selected = approvalStatusMap[row._id] || row.approval_status;

        const handleChange = (e) => {
          const newStatus = e.target.value;

          if (newStatus !== selected && newStatus !== "in-review") {
            handleApprovalChange(row._id, newStatus);
          }
        };

        const getColorClass = (status) => {
          switch (status) {
            case "onboarded":
              return "bg-blue-100 text-blue-700 border-blue-300";
            case "rejected":
              return "bg-red-100 text-red-700 border-red-300";
            case "completed":
              return "bg-green-100 text-green-700 border-green-300";
            case "in-review":
              return "bg-yellow-100 text-yellow-700 border-yellow-300";
            default:
              return "bg-yellow-100 text-yellow-700 border-yellow-300";
          }
        };

        const isCompleted = selected === "completed";

        return (
          <div>
            {selected === "completed" && (
              <span className="bg-green-100 text-green-700 border-green-300 block px-4 py-2 rounded-full">
                Completed
              </span>
            )}

            {selected !== "completed" && (
              <select
                value={selected}
                disabled={isCompleted}
                onChange={handleChange}
                className={`text-sm px-3 py-1 rounded-full font-medium border ${getColorClass(
                  selected
                )}`}
              >
                <option value="in-review" disabled={isCompleted}>
                  In Review
                </option>
                <option value="onboarded">Onboarded</option>
                <option value="rejected">Rejected</option>
              </select>
            )}
          </div>
        );
      },
    },

    {
      name: "Status",
      selector: (row) => row.id,
      cell: (row) => {
        switch (row.approval_status) {
          case "completed":
            return <FaCheckCircle className="text-green-500 text-lg" />;
          case "rejected":
            return <FaTimesCircle className="text-red-500 text-lg" />;
          case "onboarded":
            return <FaUserCheck className="text-blue-500 text-lg" />;
          case "in-review":
            return <IoHourglassOutline className="text-yellow-500 text-lg" />;
          default:
            return null;
        }
      },
    },
    {
      name: "View",
      selector: (row) => row.id,
      cell: (row) => {
        return (
          <button
            onClick={() => {
              setSelectedUser(row); // Set the selected user
              setDistributePopupOpen(true); // Open the popup
            }}
            className="px-2 text-green-500 text-lg py-2 rounded-full bg-[#5B9425] hover:bg-[#4a7b1e]"
          >
            <FiEye className="text-white text-sm" />
          </button>
        );
      },
    },
  ];

  return (
    <div className="fund-table border border-gray-200 py-6 px-6 rounded-2xl">
      {/* Header */}
      <div className="md:flex justify-between items-center mb-4 space-y-6 md:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="w-12 h-12 rounded-full bg-[#D1E7D1] text-2xl flex items-center justify-center">
            <HiOutlineUser />
          </span>
          Managing Users
        </h2>

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
      <div className="h-[600px] overflow-scroll md:overflow-x-hidden">
        <DataTable
          columns={columns}
          data={users}
          customStyles={userscustomStyles}
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>
      <Popup
        isOpen={isDistributePopupOpen}
        onClose={() => setDistributePopupOpen(false)} // Close the popup
        widthClass="w-full md:w-250"
      >
        {/* Display the selected user data in the popup */}
        {selectedUser && (
          <div className="space-y-4">
            <div className="text-center flex justify-center items-center gap-2">
              <h1 className="text-2xl font-semibold">User Information</h1>
              <span
                className={`px-4 rounded-full text-sm capitalize border ${
                  {
                    onboarded: "bg-blue-100 text-blue-700 border-blue-300",
                    rejected: "bg-red-100 text-red-700 border-red-300",
                    completed: "bg-green-100 text-green-700 border-green-300",
                    "in-review":
                      "bg-yellow-100 text-yellow-700 border-yellow-300",
                  }[selectedUser.approval_status] ||
                  "bg-yellow-100 text-yellow-700 border-yellow-300"
                }`}
              >
                {selectedUser.approval_status}
              </span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full text-center flex items-end justify-center overflow-hidden m-auto">
                <Image
                  className="object-cover "
                  width={60}
                  height={60}
                  src={selectedUser.avatar || "/img/pframe.jpg"}
                  alt={selectedUser.full_name}
                />
              </div>
              <div>
                <h4 className="text-md font-[500] text-gray-5">
                  {selectedUser.full_name}
                </h4>
              </div>
            </div>

            <form className="space-y-8 ">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Name
                  </label>
                  <input
                    disabled
                    type="text"
                    value={selectedUser.full_name}
                    placeholder="Enter Your Name"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Email
                  </label>
                  <input
                    disabled
                    value={selectedUser.email}
                    placeholder="Enter Your Email"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Number
                  </label>
                  <input
                    disabled
                    value={selectedUser.phone}
                    placeholder="Enter Your Number"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    User Id
                  </label>
                  <input
                    disabled
                    value={selectedUser._id}
                    placeholder="Enter User (ID)"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Gender
                  </label>
                  <input
                    disabled
                    value={selectedUser.gender || "N/A"}
                    type="text"
                    placeholder="Enter Gender"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Age
                  </label>
                  <input
                    disabled
                    value={selectedUser.age || "N/A"}
                    type="text"
                    placeholder="Enter Your Age"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Yearly Income
                  </label>
                  <input
                    disabled
                    value={selectedUser.yearly_income || "N/A"}
                    type="text"
                    placeholder="$00,0000"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Location
                  </label>
                  <input
                    disabled
                    value={selectedUser.location.type || "N/A"}
                    placeholder="Enter User Location"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Marital Status
                  </label>
                  <input
                    disabled
                    value={selectedUser.marital_status || "N/A"}
                    type="text"
                    placeholder="Married"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Current Health Prolem (If any)
                  </label>
                  <input
                    disabled
                    value={selectedUser.marital_status || "N/A"}
                    placeholder="Heart Pattient"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    Children
                  </label>
                  <input
                    disabled
                    value={selectedUser.marital_status || "N/A"}
                    placeholder="Children"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-500 text-sm  mb-2">
                    House Hold
                  </label>
                  <input
                    disabled
                    value={selectedUser.marital_status || "N/A"}
                    placeholder="Enter User Location"
                    maxlength="50"
                    className="w-full p-2 border-b border-gray-300   mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
}
