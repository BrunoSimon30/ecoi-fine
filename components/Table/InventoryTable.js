import Link from "next/link";
import React, { useRef, useState } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import DataTable from "react-data-table-component";
import { HiOutlineUser } from "react-icons/hi2";
import { GoChevronDown } from "react-icons/go";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiShoppingBag2Line } from "react-icons/ri";
import Popup from "../Popup";
import { imageSrc } from "@/utils";
import ImageWithFallback from "../ImageFall/ImageWithFallback";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "sonner";
import {
  useAddInventoryItemMutation,
  useDeleteInventoryItemMutation,
  useUpdateInventoryItemMutation,
} from "@/lib/redux/services/admin/inventory-manage";
import { InventorycustomStyles } from "@/utils/TableStyle/dataTableStyles";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function InventoryTable({ users, pagination, handlePageState }) {
  const [deleteInventoryItem] = useDeleteInventoryItemMutation();
  const [updateInventoryItem] = useUpdateInventoryItemMutation();
  const [addInventoryItem] = useAddInventoryItemMutation();
  const [deleteUserPopup, setDeleteUserPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [UploadSheet, setUploadSheet] = useState(false);
  const [editProductPopup, setEditProductPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    code: "",
    category: "",
    price: "",
    quantity: "",
    status: "",
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      category: "beverages",
      price: "",
      quantity: "",
      status: "in-stock",
    },
  });

  const openUploadSheet = () => setUploadSheet(true);

  console.log("data update", users);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteUserPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteInventoryItem(selectedId).unwrap();
      toast.success(res?.message || "Item deleted successfully!");
    } catch (error) {
      const message =
        error?.data?.message ||
        error?.data?.error?.message ||
        "Failed to delete item!";
      toast.error(message);
    } finally {
      setDeleteUserPopup(false);
      setSelectedId(null);
    }
  };

  // edit product
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    reset({
      name: product.name,
      code: product.code,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      status: product.status,
    });
    setEditProductPopup(true); // Show edit product popup
  };

 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("status", data.status);
    if (image) formData.append("image", image);

    try {
      let res;
      if (selectedProduct) {
        res = await updateInventoryItem({
          id: selectedProduct._id,
          data: formData,
        }).unwrap();
        toast.success(res?.message || "Product updated successfully!");
      } else {
        res = await addInventoryItem(formData).unwrap();
        toast.success(res?.message || "Product added successfully!");
      }
      setEditProductPopup(false);
      reset(); // reset form after submission
      setImage(null);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const columns = [
    {
      name: "Product Image",
      selector: (row) => row.full_name,
      sortable: true,
      width: "250px",
      cell: (row) => (
        <div className="flex items-center gap-3">
          {row?.image?.file ? (
            <ImageWithFallback
              src={imageSrc(row.image.file)} // your function
              fallbackSrc="/images/error.jpg"
              alt={row.full_name}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl text-gray-500">
                <RiShoppingBag2Line />
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.full_name,
      sortable: true,
      width: "250px",
      cell: (row) => <p className="  text-gray-800">{row.name}</p>,
    },
    {
      name: "Code",
      selector: (row) => <p className="  text-gray-800">{row.code}</p>,
    },
    {
      name: "Category",
      selector: (row) => (
        <p className="  text-gray-800 capitalize">{row.category}</p>
      ),
    },
    {
      name: "Price",
      selector: (row) => <p className="  text-gray-800">{row.price}</p>,
    },
    {
      name: "Quantity",
      selector: (row) => <p className="  text-gray-800">{row.quantity}</p>,
    },
    {
      name: "Status",
      selector: (row) => (
        <div>
          <span
            className={`px-4 py-2 rounded-full block text-sm capitalize ${
              row.status === "in-stock" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {row.status}
          </span>
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row)}
            className="bg-green-400 text-white w-8 h-8 flex items-center justify-center rounded-full text-md"
          >
            <FiEdit3 />
          </button>
          <button
            onClick={() => handleDeleteClick(row._id)}
            className="bg-red-400 text-white w-8 h-8 flex items-center justify-center rounded-full text-md"
          >
            <MdDeleteOutline />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  const handlePageChange = (page) => {
    console.log(page, "page");
    setCurrentPage(page);
    if (page >= 1 && page <= pagination.totalPages) {
      handlePageState(page);
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
                onClick={() => {
                  setProductData({
                    name: "",
                    price: "",
                    quantity: "",
                    status: "",
                  }); // Reset Form
                  setSelectedProduct(null); // No product selected = Add mode
                  setEditProductPopup(true); // Open modal
                }}
                className="bg-[#5B9425] hover:bg-green-700 text-white font-medium px-5 py-2 rounded-full text-sm"
              >
                + Add Product
              </button>
            </div>
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
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
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
                ))}
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
        </div>
        <div className="h-[600px] overflow-scroll md:overflow-x-hidden ">
          <DataTable
            columns={columns}
            data={users}
            customStyles={InventorycustomStyles}
            highlightOnHover
            pointerOnHover
            responsive
          />
        </div>
      </div>

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

      {/* delete yes or no  */}
      <Popup
        isOpen={deleteUserPopup}
        onClose={() => setDeleteUserPopup(false)}
        widthClass="w-120"
      >
        <div className="space-y-4 py-5">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Are You Sure?</h1>
            <p className="text-[15px] text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleConfirmDelete}
              className="w-full border border-gray-200 px-4 py-2 gap-4 rounded-full bg-red-600 text-white text-center"
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteUserPopup(false)}
              className="w-full px-4 py-2 gap-4 rounded-full border border-[#5B9425] text-black text-center"
            >
              No
            </button>
          </div>
        </div>
      </Popup>

      {/* Edit Product Popup */}

      <Popup
        isOpen={editProductPopup}
        onClose={() => setEditProductPopup(false)}
        widthClass="w-200"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            {selectedProduct ? "Update Product" : "Add Product"}
          </h2>

          {/* Image Upload */}
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-[#5B9425] rounded-md p-6 cursor-pointer text-center mb-4"
          >
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="rounded-full w-16 h-16"
                width={60}
                height={60}
              />
            ) : (
              <span className="text-[#5B9425] text-3xl">
                <MdOutlineFileUpload />
              </span>
            )}
            <p className="text-sm font-medium text-gray-800">
              <span className="text-[#5B9425] font-semibold">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG</p>
            <input
              id="file-upload"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {/* Name */}
          <div className="form-group">
            <label className="block text-gray-500 text-sm mb-2">
              Product Name
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Product Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="form-group">
              <label className="block text-gray-500 text-sm mb-2">
                Product Category
              </label>
              <div className="relative">
                <select
                  {...register("category")}
                  className="w-full px-4 py-3 border appearance-none border-gray-300 rounded-full mb-2 text-sm resize-none focus:outline-none"
                >
                  <option value="beverages">Beverages</option>
                  <option value="snacks">Snacks</option>
                  <option value="dairy-bakery">Dairy & Bakery</option>
                  <option value="frozen-foods">Frozen Foods</option>
                  <option value="fresh-produce">Fresh Produce</option>
                  <option value="grocery-staples">Grocery & Staples</option>
                  <option value="instant-canned-foods">
                    Instant & Canned Foods
                  </option>
                  <option value="meat-seafood">Meat & Seafood</option>
                  <option value="personal-care">Personal Care</option>
                  <option value="household-essentials">
                    Household Essentials
                  </option>
                  <option value="baby-products">Baby Products</option>
                  <option value="pet-supplies">Pet Supplies</option>
                  <option value="health-wellness">Health & Wellness</option>
                  <option value="stationery-miscellaneous">
                    Stationery & Miscellaneous
                  </option>
                </select>
                <GoChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={16}
                />
              </div>
            </div>

            {/* Code */}
            <div className="form-group">
              <label className="block text-gray-500 text-sm mb-2">Code</label>
              <input
                {...register("code", { required: true })}
                placeholder="Code"
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="form-group">
              <label className="block text-gray-500 text-sm mb-2">Price</label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none"
              />
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label className="block text-gray-500 text-sm mb-2">
                Quantity
              </label>
              <input
                {...register("quantity", { required: true })}
                type="number"
                placeholder="Quantity"
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div className="form-group">
            <label className="block text-gray-500 text-sm mb-2">Status</label>
            <div className="relative">
              <select
                {...register("status")}
                className="w-full px-4 py-3 border appearance-none border-gray-300 rounded-full mb-2 text-sm resize-none focus:outline-none"
              >
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <GoChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={16}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="border border-gray-200 px-8 py-2 gap-4 rounded-full bg-[#5B9425] text-white text-center"
            >
              {selectedProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </Popup>
    </>
  );
}
