import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  approveVendor,
  getAllVendors,
  getProductByVendorId,
  setSelectedVendor,
} from "@/redux/slice/vendorSlice";

import VendorPageCard from "@/components/VendorPageCard";
import axios from "axios";

const VendorPage = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const {
    vendors_pending,
    vendors_active,
    status,
    selectedVendor,
    productSelected,
    totalPages,
    currentPage,
  } = useSelector((state) => state.vendor);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const [searchTotalPages, setSearchTotalPages] = useState(0);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);

  const handleVendorDetail = (vendor) => {
    dispatch(setSelectedVendor(vendor));
    openDialog();
  };

  useEffect(() => {
    dispatch(
      getAllVendors({
        page: currentPage,
        type: type === "approved" ? "approved" : "approval",
      })
    );
  }, [dispatch, currentPage, type]);

  useEffect(() => {
    if (selectedVendor) {
      dispatch(getProductByVendorId(selectedVendor.id));
    }
  }, [dispatch, selectedVendor]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      dispatch(
        getAllVendors({
          page: currentPage,
          type: type === "approved" ? "approved" : "approval",
        })
      );
      setSearchResults([]);
    }
  }, [dispatch, searchQuery, currentPage, type]);

  const handleApproveVendor = (e, id) => {
    e.preventDefault();
    dispatch(approveVendor(id)).then(() => {
      dispatch(getAllVendors(currentPage));
      closeDialog();
    });
  };

  const handlePageChange = (page) => {
    console.log("currentPage", currentPage);
    dispatch(
      getAllVendors({
        page: page,
        type: type === "approved" ? "approved" : "approval",
      })
    );
  };
  const handleSearchPageChange = (page) => {
    fetchSearchResults(page);
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      fetchSearchResults(1);
    } else {
      setSearchResults([]);
      setSearchTotalPages(0);
    }
  };
  const fetchSearchResults = async (page = 1) => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setSearchTotalPages(0);
      setSearchCurrentPage(1);
      return;
    }

    try {
      const response = await axios.get(
        `/auth/search?name=${searchQuery}&page=${page}&size=6`
      );
      console.log("response", response.data);
      const filteredResults = response.data.data.filter(
        (customer) => customer.role === "ROLE_VENDOR"
      );
      setSearchResults(filteredResults);
      setSearchTotalPages(response.data.pagingResponse.totalPages);
      setSearchCurrentPage(page);
      console.log("searchResults", filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const renderVendorGrid = () => {
    const vendorsToRender =
      searchResults.length > 0
        ? searchResults
        : type === "approved"
        ? vendors_active
        : vendors_pending;

    return (
      <div className="grid grid-cols-3 gap-8">
        {vendorsToRender.map((vendor) => (
          <VendorPageCard
            key={vendor.id || vendor.detail?.id}
            vendor={vendor.detail || vendor}
            handleVendorDetail={handleVendorDetail}
          />
        ))}
      </div>
    );
  };

  const renderPagination = () => {
    const totalPagesToRender =
      searchResults.length > 0 ? searchTotalPages : totalPages;

    const currentPageToRender =
      searchResults.length > 0 ? searchCurrentPage : currentPage;

    // Fungsi untuk menghasilkan tombol pagination
    const renderPageButtons = () => {
      const buttons = [];
      const maxVisiblePages = 5; // Jumlah halaman yang ditampilkan

      // Tombol previous
      if (currentPageToRender > 1) {
        buttons.push(
          <button
            key="prev"
            onClick={() =>
              searchResults.length > 0
                ? handleSearchPageChange(currentPageToRender - 1)
                : handlePageChange(currentPageToRender - 1)
            }
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

      let startPage = Math.max(
        1,
        currentPageToRender - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(
        totalPagesToRender,
        startPage + maxVisiblePages - 1
      );

      if (startPage > 1) {
        buttons.push(
          <button
            key="first"
            onClick={() =>
              searchResults.length > 0
                ? handleSearchPageChange(1)
                : handlePageChange(1)
            }
            className="mx-1 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition duration-300"
          >
            1
          </button>
        );
        if (startPage > 2) {
          buttons.push(
            <span key="ellipsis-start" className="mx-2 text-gray-400">
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() =>
              searchResults.length > 0
                ? handleSearchPageChange(i)
                : handlePageChange(i)
            }
            className={`mx-1 rounded-full w-10 h-10 flex items-center justify-center transition duration-300 ${
              currentPageToRender === i
                ? "bg-[#00AA55] text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPagesToRender) {
        if (endPage < totalPagesToRender - 1) {
          buttons.push(
            <span key="ellipsis-end" className="mx-2 text-gray-400">
              ...
            </span>
          );
        }
        buttons.push(
          <button
            key="last"
            onClick={() =>
              searchResults.length > 0
                ? handleSearchPageChange(totalPagesToRender)
                : handlePageChange(totalPagesToRender)
            }
            className="mx-1 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition duration-300"
          >
            {totalPagesToRender}
          </button>
        );
      }

      if (currentPageToRender < totalPagesToRender) {
        buttons.push(
          <button
            key="next"
            onClick={() =>
              searchResults.length > 0
                ? handleSearchPageChange(currentPageToRender + 1)
                : handlePageChange(currentPageToRender + 1)
            }
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

    return totalPagesToRender > 1 ? (
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-2xl py-4 z-50">
        <div className="flex justify-center items-center space-x-2">
          {renderPageButtons()}
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="container mx-auto h-[100vh] pt-20">
      <div className="pb-28">
        <div className="text-center py-10">
          <h1
            className=" py-2 text-5xl font-bold text-center mx-auto
  relative inline-block
  after:content-[''] after:absolute after:bottom-0 after:left-0 
  after:w-0 after:h-1 after:bg-[#00AA55] 
  hover:after:w-full after:transition-all after:duration-500 
  after:origin-center"
          >
            {type === "approved" ? "Approved Vendor" : "Vendor Approval"}
          </h1>
        </div>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error loading vendors.</p>}
        {status === "success" && (
          <div>
            <div className="relative w-full flex justify-center mb-10">
              <div className="relative w-1/2 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400 group-focus-within:text-[#00AA55] transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white rounded-full border-2 border-gray-300 
      focus:outline-none focus:border-[#00AA55] focus:ring-2 focus:ring-[#00AA55]/30 
      transition-all duration-300 ease-in-out 
      placeholder-gray-400 
      shadow-sm hover:shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {searchQuery && (
                <button
                  onClick={fetchSearchResults}
                  className="ml-4 px-6 py-3 bg-[#00AA55] text-white rounded-full 
      hover:bg-[#00AA55]/90 
      focus:outline-none focus:ring-2 focus:ring-[#00AA55]/50 
      transition-all duration-300 
      flex items-center justify-center"
                >
                  <span className="font-semibold">Search</span>
                </button>
              )}
            </div>
            {renderVendorGrid()}
          </div>
        )}
        {renderPagination()}
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeDialog={closeDialog}>
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
                  <Badge className={"text-white bg-[#00AA55]"}>
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
                  <p className="w-1/2">{productSelected?.productList?.name}</p>
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
          <div className="flex justify-center items-center gap-10 mt-12">
            <button
              onClick={(e) => {
                handleApproveVendor(e, selectedVendor?.id);
              }}
              className={`w-fit bg-[#00F279] text-white py-3 px-8 rounded-[30px] font-bold text-lg mb-2 ${
                selectedVendor?.status === "ACTIVE" ? "hidden" : ""
              }`}
              disabled={selectedVendor?.status === "ACTIVE"}
            >
              Active Vendor
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default VendorPage;
