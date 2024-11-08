import React from "react";
import { useSelector } from "react-redux";
import ApexCharts from "react-apexcharts";

const LeadStatsChart = () => {
  // Ambil data dari redux state
  const { summary } = useSelector((state) => state.dashboard);

  // Contoh data dummy untuk chart (karena keterbatasan data)
  const chartOptions = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: [
      {
        name: "Customer Acquisition",
        data: [
          Math.round(summary.customerTotal * 0.3),
          Math.round(summary.customerTotal * 0.4),
          Math.round(summary.customerTotal * 0.5),
          Math.round(summary.customerTotal * 0.6),
          Math.round(summary.customerTotal * 0.7),
          Math.round(summary.customerTotal * 0.8),
          Math.round(summary.customerTotal * 0.9),
        ],
        color: "#1A56DB",
      },
      {
        name: "Vendor Acquisition",
        data: [
          Math.round(summary.vendorTotal * 0.2),
          Math.round(summary.vendorTotal * 0.3),
          Math.round(summary.vendorTotal * 0.4),
          Math.round(summary.vendorTotal * 0.5),
          Math.round(summary.vendorTotal * 0.6),
          Math.round(summary.vendorTotal * 0.7),
          Math.round(summary.vendorTotal * 0.8),
        ],
        color: "#FDBA8C",
      },
    ],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "100%", // Mengatur lebar kolom
        endingShape: "rounded", // Bentuk akhir kolom
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    dataLabels: {
      enabled: true, // Menampilkan label data
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  // Hitung statistik
  const calculateStats = () => {
    const totalCustomers = summary.customerTotal;
    const totalVendors = summary.vendorTotal;
    const totalEvents = summary.eventThisMonth;

    // Contoh perhitungan konversi
    const conversionRate = (
      (totalCustomers / (totalVendors + totalEvents)) *
      100
    ).toFixed(1);

    return {
      totalAcquisition: totalCustomers + totalVendors,
      conversionRate: conversionRate,
      moneySpent: summary.grossIncomeThisMonth,
    };
  };

  const stats = calculateStats();

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
              {stats.totalAcquisition.toLocaleString()}
            </h5>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Total Acquisition this Month
            </p>
          </div>
        </div>
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg
              className="w-2.5 h-2.5 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
            12%
          </span>
        </div>
      </div>

      {/* Statistik Detail */}
      <div className="grid grid-cols-2 mb-4">
        <dl className="flex items-center">
          <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
            Gross Income:
          </dt>
          <dd className="text-gray-900 text-sm dark:text-white font-semibold">
            Rp {stats.moneySpent.toLocaleString()}
          </dd>
        </dl>
        <dl className="flex items-center justify-end">
          <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
            Conversion:
          </dt>
          <dd className="text-gray-900 text-sm dark:text-white font-semibold">
            {stats.conversionRate}%
          </dd>
        </dl>
      </div>

      {/* Chart */}
      <ApexCharts
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height="320"
        width="100%"
      />

      {/* Footer */}
    </div>
  );
};

export default LeadStatsChart;
