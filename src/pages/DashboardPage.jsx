import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchDashboardSummary} from "@/redux/slice/dashboardSlice";

import LeadStatsChart from "../components/dashboard/LeadStatsChart";
import {
    FaArrowTrendUp,
    FaCalendar,
    FaCalendarCheck,
    FaCalendarDay,
    FaCalendarDays,
    FaMoneyBillWave
} from "react-icons/fa6";
import {HiUserGroup} from "react-icons/hi2";
import {MdPeopleAlt} from "react-icons/md";
import {BsPersonFillCheck, BsPersonFillDash, BsPersonFillExclamation} from "react-icons/bs";
import {GiPayMoney, GiReceiveMoney} from "react-icons/gi";

const StatCard = ({title, value, percentage, icon, color}) => (
    <div className="w-full transition hover:scale-105">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded shadow-lg">
            <div className="flex-auto p-4">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full pr-4 flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs truncate">
                            {title}
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700 truncate block">{value}</span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial py-2">
                        <div
                            className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${color}`}
                        >
                            <span className="overflow-visible text-3xl">
                            {icon}
                            </span>
                        </div>
                    </div>
                </div>
                {percentage && <p className="text-sm text-blueGray-400 mt-4">
          <span
              className={`mr-2 ${
                  percentage > 0 ? "text-emerald-500" : "text-red-500"
              }`}
          >
            <i
                className={`fas ${
                    percentage > 0 ? "fa-arrow-up" : "fa-arrow-down"
                }`}
            ></i>
              {Math.abs(percentage)}%
          </span>
                    <span className="whitespace-nowrap">Since last month</span>
                </p>}
            </div>
        </div>
    </div>
);

const StatCardHead = ({title, value, percentage, icon, color}) => (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 transition hover:scale-105">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                            {title}
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">{value}</span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                        <div
                            className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${color}`}>
                            <span className={`text-4xl overflow-visible`}>
                            {icon}
                            </span>
                        </div>
                    </div>
                </div>
                {percentage ? <p className="text-sm text-blueGray-400 mt-4">
          <span
              className={`mr-2 ${
                  percentage > 0 ? "text-emerald-500" : "text-red-500"
              }`}
          >
            <i
                className={`fas ${
                    percentage > 0 ? "fa-arrow-up" : "fa-arrow-down"
                }`}
            ></i>
              {Math.abs(percentage)}%
          </span>
                        <span className="whitespace-nowrap">Since last month</span>
                    </p> :
                    // <div className="mb-8"/>
                    null
                }
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const dispatch = useDispatch();
    const {summary, status} = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardSummary());
    }, [dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className=" bg-blueGray-100">
                <div className=" bg-[#00AA55] pt-32 pb-32 mx-auto w-full">
                    <div className=" md:px-10 mx-auto w-full">
                        <div>
                            <div className="flex flex-wrap">
                                <StatCardHead
                                    title="Event this month"
                                    value={summary.eventThisMonth}
                                    // percentage={3.48}
                                    icon={<FaCalendar/>}
                                    color="bg-red-500"
                                />

                                <StatCardHead
                                    title="Total Vendor"
                                    value={summary.vendorTotal}
                                    // percentage={-3.48}
                                    icon={<HiUserGroup/>}
                                    color="bg-orange-500"
                                />

                                <StatCardHead
                                    title="Total Customer"
                                    value={summary.customerTotal}
                                    // percentage={-1.1}
                                    icon={<MdPeopleAlt/>}
                                    color="bg-pink-500"
                                />

                                <StatCardHead
                                    title="Total Income"
                                    value={`Rp ${summary?.grossIncomeAllTime?.toLocaleString()}`}
                                    // percentage={12}
                                    icon={<FaMoneyBillWave/>}
                                    color="bg-teal-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <div className="flex flex-wrap mt-4"></div>
                    <div className="container mx-auto px-4 mt-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="relative order-first lg:order-none col-span-full">
                                <div className="bg-white shadow-lg rounded-lg p-6 h-full">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                                        Financial Insights
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <StatCard
                                            title="Income Month"
                                            value={`Rp ${summary?.grossIncomeThisMonth?.toLocaleString()}`}
                                            // percentage={12}
                                            icon={<FaArrowTrendUp/>}
                                            color="bg-green-500"
                                        />
                                        <StatCard
                                            title="Revenue Month"
                                            value={`Rp ${summary?.revenueThisMonth?.toLocaleString()}`}
                                            // percentage={12}
                                            icon={<FaArrowTrendUp/>}
                                            color="bg-indigo-500"
                                        />
                                        <StatCard
                                            title="Approved Withdraw"
                                            value={`Rp ${summary?.approvedWithdrawalThisMonth?.toLocaleString()}`}
                                            // percentage={12}
                                            icon={<GiPayMoney/>}
                                            color="bg-teal-500"
                                        />
                                        <StatCard
                                            title="Total Revenue"
                                            value={`Rp ${summary?.revenueAllTime?.toLocaleString()}`}
                                            // percentage={12}
                                            icon={<GiReceiveMoney/>}
                                            color="bg-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="relative col-auto">
                                <div className="bg-white shadow-lg rounded-lg p-6 h-full">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                                        Event Overview
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                                        <StatCard
                                            title="Total Event"
                                            value={summary.totalEvent}
                                            // percentage={3.48}
                                            icon={<FaCalendarDays/>}
                                            color="bg-blue-500"
                                        />
                                        <StatCard
                                            title="Finish Event"
                                            value={summary.eventInThePast}
                                            // percentage={-3.48}
                                            icon={<FaCalendarCheck/>}
                                            color="bg-green-500"
                                        />
                                        <StatCard
                                            title="Future Event"
                                            value={summary.eventInTheFuture}
                                            // percentage={-1.1}
                                            icon={<FaCalendarDay/>}
                                            color="bg-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="relative col-auto">
                                <div className="bg-white shadow-lg rounded-lg p-6 h-full">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                                        Vendor Status
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                                        {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">*/}
                                        <StatCard
                                            title="Approved"
                                            value={summary.approvedVendor}
                                            // percentage={12}
                                            icon={<BsPersonFillCheck/>}
                                            color="bg-blue-500"
                                        />
                                        <StatCard
                                            title="Pending"
                                            value={summary.pendingVendor}
                                            // percentage={12}
                                            icon={<BsPersonFillExclamation/>}
                                            color="bg-yellow-500"
                                        />
                                        <StatCard
                                            title="Rejected"
                                            value={summary.rejectedVendor}
                                            // percentage={12}
                                            icon={<BsPersonFillDash/>}
                                            color="bg-red-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 lg:col-span-3 my-10 relative">
                            <LeadStatsChart/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
