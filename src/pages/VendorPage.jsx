import React, {useCallback, useEffect, useMemo, useState} from "react";
import Modal from "@/components/Modal";
import {Badge} from "@/components/ui/badge";
import {useDispatch, useSelector} from "react-redux";
import {
    approveVendor,
    disableVendor,
    getAllVendors,
    getProductByVendorId,
    setSelectedVendor,
} from "@/redux/slice/vendorSlice";
import VendorPageCard from "@/components/VendorPageCard";
import {FaFilter, FaSearch} from "react-icons/fa";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {formatNumberToCurrency} from "@/helper/formatter.js";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const VendorPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const dispatch = useDispatch();
    const {vendors, status, selectedVendor, selectedProduct} = useSelector((state) => state.vendor);

    const categories = ["ALL", "VENUE", "PARKING", "SECURITY", "CATERING", "FLOWER_AND_DECORATION", "PHOTOGRAPHY_AND_VIDEOGRAPHY", "TECHNOLOGY_AND_MULTIMEDIA", "ENTERTAINER",];

    const statusOptions = [{value: "ALL", label: "All Status"}, {value: "ACTIVE", label: "Active"}, {
        value: "INACTIVE",
        label: "Inactive"
    }, // { value: "PENDING", label: "Pending" },
    ];

    const sortOptions = [
    {value: 'startDate', label: 'Start Date'},
    {value: 'modifiedDate', label: 'Modified Date'},
];

    // useEffect(() => {
    //     dispatch(getAllVendors());
    // }, [dispatch]);

    // Wrap the dispatch in useCallback
    const fetchVendors = useCallback(() => {
        dispatch(getAllVendors());
    }, [dispatch]);

    // Use the callback in useEffect
    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);

    useEffect(() => {
        if (selectedVendor) {
            dispatch(getProductByVendorId(selectedVendor.id));
        }
    }, [dispatch, selectedVendor]);

    const filteredVendors = useMemo(() => {
        return vendors.filter((vendor) => {
            const matchesStatus = selectedStatus === "ALL" || vendor.status === selectedStatus;
            const matchesCategory = selectedCategory === "ALL" || vendor.mainCategory === selectedCategory;
            const matchesSearch = searchQuery.trim() === "" || vendor.name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesStatus && matchesCategory && matchesSearch;
        });
    }, [vendors, selectedStatus, selectedCategory, searchQuery]);

    const paginatedVendors = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredVendors.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredVendors, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

    const handleVendorDetail = (vendor) => {
        console.log(vendor);
        dispatch(setSelectedVendor(vendor));
        setIsOpen(true);
    };
    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleToggleStatus = (vendor) => {
        if (vendor.status === "ACTIVE") {
            dispatch(disableVendor(vendor.id));
        } else {
            dispatch(approveVendor(vendor.id));
        }
        setIsOpen(false);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const renderPageButtons = () => {
            const buttons = [];
            const maxVisiblePages = 5;

            // Previous button
            if (currentPage > 1) {
                buttons.push(<button
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
                </button>);
            }

            // Page number buttons
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(<button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`mx-1 rounded-full w-10 h-10 flex items-center justify-center ${i === currentPage ? "bg-[#00AA55] text-white" : "text-gray-600 hover:bg-gray-100"} transition duration-300`}
                >
                    {i}
                </button>);
            }

            // Next button
            if (currentPage < totalPages) {
                buttons.push(<button
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
                </button>);
            }

            return buttons;
        };

        return (<div className="flex justify-center items-center space-x-2">
            {renderPageButtons()}
        </div>);
    };

    return (<div className="container mx-auto h-screen pt-16 pb-20">
        <div className="text-center py-10">
            <h1
                className="py-2 text-5xl font-bold text-center mx-auto relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-[#00AA55] hover:after:w-full after:transition-all after:duration-500 after:origin-center"
            >
                Vendors
            </h1>
        </div>

        {/* Search and Filter Section */}
        <div className="relative w-full flex justify-center mb-10 space-x-4 items-center">
            <div className="relative w-1/2 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <FaSearch
                        className="h-6 w-6 text-gray-400 group-focus-within:text-[#00AA55] transition-colors duration-300"/>
                </div>
                <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white rounded-full border-2 border-gray-300
            focus:outline-none focus:border-[#00AA55] focus:ring-2 focus:ring-[#00AA55]/30 
            transition-all duration-300 ease-in-out 
            placeholder-gray-400 
            shadow-sm hover:shadow-md"
                />
            </div>

            <div className="relative">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="bg-[#00AA55] text-white p-3 rounded-full hover:bg-[#00AA55]/90
    transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                    <FaFilter/>
                </button>

                {isFilterOpen && (<div
                    className="absolute right-0 mt-2 w-72 bg-white
      shadow-2xl rounded-2xl border-0 p-6 z-50 
      transform transition-all duration-300 ease-in-out 
      origin-top-right scale-100 opacity-100
      ring-4 ring-[#00AA55]/10 
      backdrop-blur-sm"
                >
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Status
                        </label>
                        <div className="relative">
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
            appearance-none"
                            >
                                {statusOptions.map((status) => (<option
                                    key={status.value}
                                    value={status.value}
                                    className="hover:bg-[#00AA55]/10"
                                >
                                    {status.label}
                                </option>))}
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category
                        </label>
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3
            text-gray-900 bg-gray-50 
            border-2 border-gray-200 
            rounded-xl 
            focus:outline-none 
            focus:ring-2 focus:ring-[#00AA55]/50 
            focus:border-[#00AA55] 
            transition duration-300 
            appearance-none"
                            >
                                {categories.map((category) => (<option
                                    key={category}
                                    value={category}
                                    className="hover:bg-[#00AA55]/10"
                                >
                                    {category.replace(/_/g, " ")}
                                </option>))}
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(status === "loading" && paginatedVendors.length === 0) && (Array.from({length: 6}).map((_, index) => (
                <Skeleton
                    key={index}
                    className="px-12 rounded-[40px] shadow-xl"
                    style={{height: "280px", width: "100%"}}
                />
            )))}
            {paginatedVendors.map((vendor) => (<VendorPageCard
                key={vendor.id}
                vendor={vendor}
                onClick={() => handleVendorDetail(vendor)}
                onToggleStatus={() => handleToggleStatus(vendor)}
            />))}
        </div>

        {/* Pagination */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl py-4 z-50">
            <div className="container mx-auto flex justify-center">
                {renderPagination()}
            </div>
        </div>

        {/* Modal for Vendor Details */}
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeDialog={handleCloseModal}
        >
            <h1 className="text-4xl font-bold mb-6">{selectedVendor?.name}</h1>
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <h1 className="text-xl font-bold">Vendor</h1>
                    <div className="border-b-2 border-gray-300 my-2 me-14"></div>

                    <div className="flex flex-col gap-2 justify-center">
                        <div className="flex">
                            <h1 className="w-1/2 font-semibold">Vendor ID</h1>
                            <p className="w-1/2">{selectedVendor?.id}</p>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Type</h1>
                            <p className="w-1/2">Arts & Decoration</p>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Owner</h1>
                            <p className="w-1/2">{selectedVendor?.owner}</p>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Phone Number</h1>
                            <p className="w-1/2">{selectedVendor?.phoneNumber}</p>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Location</h1>
                            <p className="w-1/2">
                                {selectedVendor?.city}, {selectedVendor?.province}
                            </p>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Address</h1>
                            <p className="w-1/2">{selectedVendor?.address}</p>
                        </div>
                       <div className="flex items-center">
                            <h1 className="font-semibold w-1/2">Status</h1>
                            <Badge className={`text-white ${selectedVendor?.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}>
                                {selectedVendor?.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-bold">Product</h1>
                    <div className="border-b-2 border-gray-300 my-2 me-14"></div>

                    <div className="flex flex-col gap-2 justify-center">
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Product Name</h1>
                            <p className="w-1/2">tes</p>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Product Type</h1>
                            <p className="w-1/2">Arts & Decoration</p>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Product Price</h1>
                            <p className="w-1/2"></p>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Unit</h1>
                            <p className="w-1/2"></p>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold w-1/2">Description</h1>
                            <p className="w-1/2"></p>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollArea className=" h-[300px] w-full relative rounded-md overflow-scroll mt-10">
            <Table className="">
                <TableHeader className="font-bold text-white bg-[#00AA55] rounded-full">
                    <TableRow className="">
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Category</TableHead>
                        <TableHead className="text-white">Price / Unit</TableHead>
                        {/*<TableHead className="text-right text-white">Total</TableHead>*/}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedProduct?.map((product) => (<TableRow key={product.id}>
                        <TableCell className="font-medium">
                            {product.name}
                        </TableCell>
                        <TableCell className="font-medium">
                            {product.categoryName}
                        </TableCell>
                        <TableCell>
                            Rp. {formatNumberToCurrency(product.price)} / {product.productUnit}
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
            </ScrollArea>
            <div className="flex justify-center items-center gap-10 mt-5">
                <button
                    onClick={() => {
                        handleToggleStatus(selectedVendor);
                    }}
                    className={`w-fit py-3 px-8 rounded-[30px] mt-4 font-bold text-xl justify-self-end ${selectedVendor?.status === "ACTIVE" ? "bg-[#FF0000] text-white" : "bg-[#00AA55] text-white"}`}
                >
                    {selectedVendor?.status === "ACTIVE" ? "Disable Vendor" : "Activate Vendor"}
                </button>
            </div>
        </Modal>
    </div>);
};

export default VendorPage;
