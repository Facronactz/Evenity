import React, {useEffect, useState} from "react";
import {IoEyeSharp} from "react-icons/io5";
import {FaFilter} from "react-icons/fa";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import Modal from "@/components/Modal";
import {Badge} from "@/components/ui/badge";
import {useDispatch, useSelector} from "react-redux";
import {disableCustomer, enableCustomer, getAllCustomers, setSelectedCustomer,} from "@/redux/slice/customerSlice";

const UsersPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const {customers, status, selectedCustomer} = useSelector(
        (state) => state.customer
    );

    // Filtered and Paginated Data
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filtering Logic
    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch = customer.fullName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesStatus =
            selectedStatus === "ALL" || customer.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]);

    // Reset to first page when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedStatus]);

    const handleCustomerDetail = (customer) => {
        dispatch(setSelectedCustomer(customer));
        setIsOpen(true);
    };

    const handleToggleStatus = (customer) => {
        if (customer.status === "ACTIVE") {
            dispatch(disableCustomer(customer.id)).then(() => {
                dispatch(getAllCustomers({page: 1}));
            });
        } else {
            dispatch(enableCustomer(customer.id)).then(() => {
                dispatch(getAllCustomers({page: 1}));
            });
        }
        setIsOpen(false);
    };

    // Pagination Render
    const renderPagination = () => {
        // if (totalPages <= 1) return null;

        const renderPageButtons = () => {
            const buttons = [];
            const maxVisiblePages = 5;

            // Previous button
            if (currentPage > 1) {
                buttons.push(
                    <button
                        key="prev"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="mx-1 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                );
            }

            // Page number buttons
            let startPage = Math.max(
                1,
                currentPage - Math.floor(maxVisiblePages / 2)
            );
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`mx-1 rounded-full w-10 h-10 flex items-center justify-center ${
                            i === currentPage
                                ? "bg-[#00AA55] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        } transition duration-300`}
                    >
                        {i}
                    </button>
                );
            }

            // Next button
            if (currentPage < totalPages) {
                buttons.push(
                    <button
                        key="next"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="mx-1 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                );
            }

            return buttons;
        };

        return (
            <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-2xl py-4 z-50">
                <div className="flex justify-center items-center space-x-2">
                    {renderPageButtons()}
                </div>
            </div>
        );
    };

    // Filter Dropdown
    const renderFilterDropdown = () => {
        const statusOptions = [
            {value: "ALL", label: "All Status"},
            {value: "ACTIVE", label: "Active"},
            {value: "DISABLED", label: "Disable"},
        ];

        return (
            <div className="relative flex items-center">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="bg-[#00AA55] text-white p-3 rounded-full hover:bg-[#00AA55]/90 transition-colors duration-300 flex items-center justify-center"
                >
                    <FaFilter className="m-0"/>
                </button>

                {isFilterOpen && (
                    <div
                        className="absolute top-full right-0 mt-2 w-64 bg-white shadow-2xl rounded-2xl border-0 p-6 z-50
        ring-4 ring-[#00AA55]/10 backdrop-blur-sm"
                    >
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Status
                            </label>
                            <div className="relative flex items-center">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full px-4 py-3
                text-gray-900 bg-gray-50 
                border-2 border-gray-200 
                rounded-xl 
                focus:outline-none 
                focus:ring-2 focus:ring-[#00AA55]/50 
                focus:border-[#00AA55] 
                transition duration-300 
                appearance-none
                pr-8"
                                >
                                    {statusOptions.map((status) => (
                                        <option
                                            key={status.value}
                                            value={status.value}
                                            className="hover:bg-[#00AA55]/10"
                                        >
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                                <div
                                    className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 9l6 6 6-6"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto h-[100vh] pt-20">
            <div className="text-center pt-10">
                <h1 className="py-2 text-5xl font-bold text-center mx-auto relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-[#00AA55] hover:after:w-full after:transition-all after:duration-500 after:origin-center">
                    Customers
                </h1>
            </div>
            <div className="relative w-full flex justify-center mb-10 gap-3">
                <div className="relative w-1/2 group">
                    <input
                        type="text"
                        placeholder="Search…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-4 py-3 text-gray-900 bg-white rounded-full border-2 border-gray-300
            focus:outline-none focus:border-[#00AA55] focus:ring-2 focus:ring-[#00AA55]/30 
            transition-all duration-300 ease-in-out 
            placeholder-gray-400 
            shadow-sm hover:shadow-md"
                    />
                </div>
                {renderFilterDropdown()}
            </div>
            <div>
                {status === "loading" ? (
                    <p>Loading...</p>
                ) : (
                    <Table className="mx-auto">
                        <TableHeader className="font-bold text-white bg-[#00AA55] rounded-full">
                            <TableRow>
                                <TableHead className="text-white font-bold text-xl">
                                    Customer Name
                                </TableHead>
                                <TableHead className="text-white font-bold text-xl">
                                    Email
                                </TableHead>
                                <TableHead className="text-white font-bold text-xl">
                                    Phone Number
                                </TableHead>
                                <TableHead className="text-white text-center font-bold text-xl w-[200px]">
                                    Status
                                </TableHead>
                                <TableHead className="text-white text-center font-bold text-xl w-[200px]">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedCustomers.map((data, i) => (
                                <TableRow key={i}>
                                    <TableCell className="text-lg">{data.fullName}</TableCell>
                                    <TableCell className="text-lg">{data.email}</TableCell>
                                    <TableCell className="text-lg">{data.phoneNumber}</TableCell>
                                    <TableCell className="text-lg text-center">
                                        <Badge
                                            className={
                                                data.status === "ACTIVE"
                                                    ? "bg-[#00AA55] text-white"
                                                    : "bg-[#FF0000] text-white"
                                            }
                                        >
                                            {data.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xl">
                                        <IoEyeSharp
                                            className="cursor-pointer text-center w-full hover:scale-125 hover:text-[#00AA55]"
                                            onClick={() => handleCustomerDetail(data)}
                                            size={40}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {renderPagination()}
                <Modal
                    title={"User  Detail"}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    closeDialog={() => setIsOpen(false)}
                >
                    <div>
                        <h1 className="text-2xl font-bold">{selectedCustomer?.fullName}</h1>
                        <div className="border-b-2 border-gray-300 my-2 me-14"></div>

                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        <div className="flex flex-col gap-2">
                            <div className="flex">
                                <h1 className="w-1/2 font-semibold">Name</h1>
                                <p className="w-1/2">{selectedCustomer?.fullName}</p>
                            </div>
                            <div className="flex">
                                <h1 className="w-1/2 font-semibold">Email</h1>
                                <p className="w-1/2">{selectedCustomer?.email}</p>
                            </div>
                            <div className="flex font -semibold">
                                <h1 className="w-1/2 font-semibold">Status</h1>
                                <Badge
                                    className={
                                        selectedCustomer?.status === "ACTIVE"
                                            ? "bg-[#00AA55] text-white"
                                            : "bg-[#FF0000] text-white"
                                    }
                                >
                                    {selectedCustomer?.status}
                                </Badge>
                            </div>
                            <div className="flex">
                                <h1 className="w-1/2 font-semibold">Phone Number</h1>
                                <p className="w-1/2">{selectedCustomer?.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex">
                                <h1 className="w-1/2 font-semibold">Province</h1>
                                <p className="w-1/2">{selectedCustomer?.province}</p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">City</h1>
                                <p className="w-1/2">{selectedCustomer?.city}</p>
                            </div>
                            <div className="flex">
                                <h1 className="w-1/2 font-semibold">District</h1>
                                <p className="w-1/2">{selectedCustomer?.district}</p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Address</h1>
                                <p className="w-1/2">{selectedCustomer?.address}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => handleToggleStatus(selectedCustomer)}
                        className={`w-fit py-3 px-8 rounded-[30px] mt-4 font-bold text-xl justify-self-end ${
                            selectedCustomer?.status === "ACTIVE"
                                ? "bg-[#FF0000] text-white"
                                : "bg-[#00AA55] text-white"
                        }`}
                    >
                        {selectedCustomer?.status === "ACTIVE"
                            ? "Disable Customer"
                            : "Activate Customer"}
                    </button>
                </Modal>
            </div>
        </div>
    );
};

export default UsersPage;
