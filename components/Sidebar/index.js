import Link from "next/link";
import { useRouter } from "next/router";
import { SiAwsorganizations } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { TbDeviceMobilePin } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import { RiQrScanLine } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";

export default function SideBar({ closeSidebar }) {
  const router = useRouter();

  const isActive = (path) =>
    router.pathname === path ? "bg-[#5B9425] text-white" : "bg-white text-black";

  const isManager = router.pathname.startsWith("/manager");

  return (
    <aside className="flex flex-col w-72 max-w-full bg-white lg:bg-transparent h-screen px-5 py-8 overflow-y-auto space-y-12">
      {/* Close Button (mobile/tablet only) */}
      <button
        className="absolute top-4 right-4 text-3xl text-gray-600 lg:hidden"
        onClick={closeSidebar}
      >
        <IoClose />
      </button>

      {/* Logo */}
      <div>
        <img className="w-auto h-14 lg:m-auto" src="/img/s-logo.svg" alt="logo" />
      </div>

      {/* Nav Links */}
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex-1 -mx-3 space-y-6 pl-2">
          {/* Show in MANAGER only */}
          {isManager && (
            <Link
              className={`flex items-center px-3 py-3 transition-colors duration-300 transform rounded-lg ${isActive(
                "/manager/scan-qr"
              )} hover:bg-[#5dad12] hover:text-white border border-[#5B9425] w-fit lg:m-auto lg:mb-5`}
              href="/manager/scan-qr"
            >
              <span className="text-2xl">
                <RiQrScanLine />
              </span>
              <span className="mx-4 text-md font-medium">Scan QR</span>
            </Link>
          )}

          {/* Show in DASHBOARD only */}
          {!isManager && (
            <>
              <Link
                className={`flex items-center px-3 py-3 rounded-lg transition duration-300 ${isActive(
                  "/admin"
                )} hover:bg-[#5dad12] hover:text-white`}
                href="/admin"
              >
                <span className="text-2xl">
                  <SiAwsorganizations />
                </span>
                <span className="mx-4 text-md font-medium">Fund Distribution</span>
              </Link>

              <Link
                className={`flex items-center px-3 py-3 rounded-lg transition duration-300 ${isActive(
                  "/admin/manageusers"
                )} hover:bg-[#5dad12] hover:text-white`}
                href="/admin/manageusers"
              >
                <span className="text-2xl">
                  <FiUsers />
                </span>
                <span className="mx-4 text-md font-medium">Managing Users</span>
              </Link>

              <Link
                className={`flex items-center px-3 py-3 rounded-lg transition duration-300 ${isActive(
                  "/admin/tracking-transactions"
                )} hover:bg-[#5dad12] hover:text-white`}
                href="/admin/tracking-transactions"
              >
                <span className="text-2xl">
                  <TbDeviceMobilePin />
                </span>
                <span className="mx-4 text-md font-medium">Tracking Transactions</span>
              </Link>

              <Link
                className={`flex items-center px-3 py-3 rounded-lg transition duration-300 ${isActive(
                  "/admin/inventory-management"
                )} hover:bg-[#5dad12] hover:text-white`}
                href="/admin/inventory-management"
              >
                <span className="text-2xl">
                  <LiaFileInvoiceDollarSolid />
                </span>
                <span className="mx-4 text-md font-medium">Inventory Management</span>
              </Link>
            </>
          )}

          {/* Manager routes */}
          {isManager && (
            <>
              <Link
                className={`flex items-center px-3 py-3 rounded-lg transition duration-300 ${isActive(
                  "/manager/inventory-management"
                )} hover:bg-[#5dad12] hover:text-white`}
                href="/manager/inventory-management"
              >
                <span className="text-2xl">
                  <LiaFileInvoiceDollarSolid />
                </span>
                <span className="mx-4 text-md font-medium">Inventory Management</span>
              </Link>

              <Link
                className={`flex items-center px-3 py-3 rounded-lg transition duration-300 ${isActive(
                  "/manager/purchase-history"
                )} hover:bg-[#5dad12] hover:text-white`}
                href="/manager/purchase-history"
              >
                <span className="text-2xl">
                  <BsClockHistory />
                </span>
                <span className="mx-4 text-md font-medium">Purchase History</span>
              </Link>
            </>
          )}
        </nav>

        {/* Logout */}
        <div className="mt-6">
          <Link
            href=""
            className="text-[#5B9425] transition-colors duration-200 hover:text-gray-500 flex items-center gap-2"
          >
            <span>Logout</span>
            <AiOutlineLogout />
          </Link>
        </div>
      </div>
    </aside>
  );
}
