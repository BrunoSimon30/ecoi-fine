import Dashboardlayout from "@/components/Layout/Dashboardlayout";
import { HiOutlineUser } from "react-icons/hi2";
import { useState } from "react";
import FundTableLayout from "@/components/Table/FundTable";
import Popup from "@/components/Popup";
import InvoiceTable from "@/components/Table/InvoiceTable";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TrackingTransactions() {
  const [isDistributePopupOpen, setDistributePopupOpen] = useState(false);

  const [donutData] = useState({
    series: [60, 40],
    options: {
      chart: { type: "donut" },
      colors: ["#76a9fa", "#1d7e25"],
      labels: ["Transaction", "Usage"],
      legend: {
        position: "bottom",
        markers: { radius: 12 },
        labels: { colors: "#333" },
      },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              value: {
                show: true,
                fontSize: "20px",
                fontWeight: 600,
                color: "#000",
                formatter: () => "$10,000",
              },
              total: {
                show: true,
                label: "5% growth",
                fontSize: "14px",
                color: "#666",
              },
            },
          },
        },
      },
    },
  });

  const [lineData] = useState([
    {
      name: "Blue Area",
      type: "area",
      data: [20, 40, 35, 50, 49, 60, 70],
    },
    {
      name: "Green Line",
      type: "line",
      data: [10, 30, 25, 45, 40, 55, 60],
    },
    {
      name: "Black Line with Dots",
      type: "line",
      data: [35, 50, 45, 60, 55, 65, 75],
    },
  ]);

  const [lineOptions] = useState({
    chart: {
      height: 300,
      type: "line",
      toolbar: {
        show: false, // 👈 disables the toolbar
      },
    },
    stroke: { width: [0, 2, 2], curve: "smooth" },
    fill: { opacity: [0.4, 1, 1] },
    markers: {
      size: [0, 0, 5],
      colors: ["#000"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    colors: ["#87CEFA", "#2E7D32", "#000000"],
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: { show: false },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yaxis: {
      labels: { show: false },
    },
  });

  const handlePopupClose = () => setDistributePopupOpen(false);
  const handleApplyFund = () => setDistributePopupOpen(false);

  return (
    <Dashboardlayout heading="Tracking management">
      <div className="space-y-6">
        <div className="xl:grid grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="col-span-2 space-y-6">
            <div className="xl:grid grid-cols-2 gap-6 space-y-4 xl:space-y-0">
              {/* Card: Total Transaction */}
              <Card
                title="Total Transaction"
                value="$10,000"
                icon={<HiOutlineUser />}
                badge="22% than the last month"
              />

              {/* Card: Total Donate Per Person */}
              <Card
                title="Total Donate Per Person"
                value="$2,000"
                icon={<HiOutlineUser />}
                badge="5 Per Person"
              />
            </div>

            {/* Fund Table */}
            <InvoiceTable/>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            {/* Transaction Chart */}
            <div className="border border-gray-200 p-4 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-black">Transaction</h3>
                <button className="bg-[#FAD89C] rounded-full px-4 py-2 text-sm">
                  Monthly
                </button>
              </div>

              <button
                onClick={() => setDistributePopupOpen(true)}
                className="w-full border border-gray-200 rounded-full px-4 py-2 text-[#0069FF]"
              >
                Total Transaction
              </button>

              <div className="space-y-2">
                <h3 className="text-3xl font-semibold text-black">$10,000</h3>
                <p className="text-sm text-gray-500">
                  This month’s sales volume is 16% <br /> higher than last month.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Chart options={lineOptions} series={lineData} type="line" height={150} />
                <Chart options={lineOptions} series={lineData} type="line" height={150} />
              </div>
            </div>

            {/* Donut Chart */}
            <div className="border border-gray-200 p-4 rounded-2xl space-y-2">
              <h3 className="text-xl font-semibold text-black">Transaction View</h3>
              <Chart
                options={donutData.options}
                series={donutData.series}
                type="donut"
                width="55%"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      <Popup
        isOpen={isDistributePopupOpen}
        onClose={handlePopupClose}
        widthClass="w-120"
      >
        <div className="py-5 space-y-4 text-center">
          <h1 className="text-xl font-semibold">Emergency Fund Period Ended</h1>
          <p className="text-sm text-gray-500">
            Your 3-month emergency fund has ended. You can provide feedback or apply for another fund.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleApplyFund}
              className="w-full bg-[#5B9425] text-white rounded-full py-2"
            >
              Apply Another Fund
            </button>
            <button
              onClick={handleApplyFund}
              className="w-full border border-[#5B9425] text-black rounded-full py-2"
            >
              Provide Feedback
            </button>
          </div>
        </div>
      </Popup>
    </Dashboardlayout>
  );
}

function Card({ title, value, icon, badge }) {
  return (
    <div className="border border-gray-200 p-6 rounded-2xl space-y-6">
      <div className="flex items-center gap-4">
        <span className="w-12 h-12 rounded-full bg-[#D1E7D1] text-2xl flex items-center justify-center">
          {icon}
        </span>
        <h3 className="text-black text-xl font-medium">{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-semibold text-black">{value}</h3>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm">
          {badge}
        </button>
      </div>
    </div>
  );
}
