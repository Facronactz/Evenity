import React, { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "@/components/Modal";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  setSelectedCustomer,
  enableCustomer,
  disableCustomer,
} from "@/redux/slice/customerSlice";
import axios from "axios";

const UsersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTotalPages, setSearchTotalPages] = useState(0);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const dispatch = useDispatch();
  const { customers, status, selectedCustomer, totalPages, currentPage } =
    useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getAllCustomers({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      dispatch(getAllCustomers({ page: currentPage }));
      setSearchResults([]);
      setSearchTotalPages(0);
    }
  }, [dispatch, searchQuery, currentPage]);

  const handleCustomerDetail = (customer) => {
    dispatch(setSelectedCustomer(customer));
    openDialog();
  };

  const handleToggleStatus = async (customer) => {
    console.log("customer", customer);
    console.log("status", customer.status);
    console.log("customer.id", customer.id);
    if (customer.status === "ACTIVE") {
      dispatch(disableCustomer(customer.id)).then(() => {
        dispatch(getAllCustomers({ page: currentPage }));
      });
    } else {
      dispatch(enableCustomer(customer.id)).then(() => {
        dispatch(getAllCustomers({ page: currentPage }));
      });
    }
    closeDialog();
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
        `/auth/search?name=${searchQuery}&page=${page}&size=8`
      );
      const filteredResults = response.data.data.filter(
        (customer) => customer.role === "ROLE_CUSTOMER"
      );
      setSearchResults(filteredResults);
      setSearchTotalPages(response.data.pagingResponse.totalPages);
      setSearchCurrentPage(page);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handlePageChange = (page) => {
    dispatch(getAllCustomers({ page: page }));
  };

  const handleSearchPageChange = (page) => {
    fetchSearchResults(page);
  };

  const renderPagination = () => {
    const totalPagesToRender =
      searchResults.length > 0 ? searchTotalPages : totalPages;

    const currentPageToRender =
      searchResults.length > 0 ? searchCurrentPage : currentPage;

    if (totalPagesToRender <= 1) return null;

    const renderPageButtons = () => {
      const buttons = [];
      const maxVisiblePages = 5;

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

    return (
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-2xl py-4 z-50">
        <div className="flex justify-center items-center space-x-2">
          {renderPageButtons()}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto h-[100vh] pt-20">
      <div className="text-center pt-10">
        <h1
          className=" py-2 text-5xl font-bold text-center mx-auto
  relative inline-block
  after:content-[''] after:absolute after:bottom-0 after:left-0 
  after:w-0 after:h-1 after:bg-[#00AA55] 
  hover:after:w-full after:transition-all after:duration-500 
  after:origin-center"
        >
          Users
        </h1>
      </div>
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
            placeholder="Search…"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white rounded-full border-2 border-gray-300 
      focus:outline-none focus:border-[#00AA55] focus:ring-2 focus:ring-[#00AA55]/30 
      transition-all duration-300 ease-in-out 
      placeholder-gray-400 
      shadow-sm hover:shadow-md"
          />
          <button
            onClick={fetchSearchResults}
            className="absolute right-4 top-1/2 -translate-y-1/2 
      bg-[#00AA55] text-white rounded-full 
      px-4 py-2
      hover:bg-[#00AA55]/90 
      focus:outline-none focus:ring-2 focus:ring-[#00AA55]/50 
      transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </button>
        </div>
      </div>
      <div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <Table className=" mx-auto">
            <TableHeader className="font-bold text-white bg-[#00AA55] rounded-full">
              <TableRow className="">
                <TableHead className="text-white font-bold text-xl ">
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
              {(searchResults.length > 0 ? searchResults : customers).map(
                (data, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-lg">{data.fullName}</TableCell>
                    <TableCell className="text-lg">{data.email}</TableCell>
                    <TableCell className="text-lg">
                      {data.phoneNumber}
                    </TableCell>
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
                )
              )}
            </TableBody>
          </Table>
        )}
        {renderPagination()}
        <Modal
          title={"User Detail"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeDialog={closeDialog}
        >
          <div>
            <h1 className="text-2xl font-bold">{selectedCustomer?.fullName}</h1>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Name</h1>
                <p>{selectedCustomer?.fullName}</p>
              </div>
              <div className="flex justify-between items-center ">
                <h1 className="font-semibold">Email</h1>
                <p>{selectedCustomer?.email}</p>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <h1 className="font-semibold">Status</h1>
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
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Phone Number</h1>
                <p>{selectedCustomer?.phoneNumber}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Province</h1>
                <p>{selectedCustomer?.province}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">City</h1>
                <p>{selectedCustomer?.city}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">District</h1>
                <p>{selectedCustomer?.district}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Address</h1>
                <p>{selectedCustomer?.address}</p>
              </div>
            </div>
          </div>     
          <button
            onClick={() => handleToggleStatus(selectedCustomer)}
            className={`
          w-fit py-3 px-8 rounded-[30px] mt-4 font-bold text-xl justify-self-end 
          ${
            selectedCustomer?.status === "ACTIVE"
              ? "bg-[#FF0000] text-white"
              : "bg-[#00AA55] text-white"
          }
        `}
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
