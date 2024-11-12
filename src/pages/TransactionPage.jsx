import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaFilter } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTransactions,
  setSelectedTransaction,
  forwardPaidVendor,
} from "@/redux/slice/transactionSlice";
import { setupAxios } from "@/config/axiosConfig";
import moment from "moment";
import { formatNumberToCurrency } from "@/helper/formatter.js";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const TransactionPage = () => {
  setupAxios();
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const { transaction, status, selectedTransaction } =
    useSelector((state) => state.transaction);
 // Filtered and Paginated Data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const filteredTransactions = transaction.filter(
  (t) => {
    const matchesSearch = t.customerName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
      || t.eventName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "ALL" || t.paymentStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  }
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedStatus]);

  const calculateTotalCost = (invoiceDetailList) => {
    const totalCost = invoiceDetailList
      .map((invoiceDetail) => invoiceDetail.cost)
      .reduce((a, b) => a + b, 0);
    return formatNumberToCurrency(totalCost);
  };

  const formatDate = (date) => {
    return moment(date).format("DD MMMM YYYY");
  };

  const handleSelectDetail = (transaction) => {
    dispatch(setSelectedTransaction(transaction));
    openDialog();
  };

  const handlePageChange = (page) => {
    // dispatch(
    //   getAllTransactions({
    //     page: page,
    //   })
    // );
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchSearchResults = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`/auth/search?name=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  const renderPagination = () => {
    // if (totalPages <= 1) return null;

    const renderPageButtons = () => {
      const buttons = [];
      const maxVisiblePages = 5;

      if (currentPage > 1) {
        buttons.push(
          <button
            key="prev"
            onClick={() => handlePageChange(currentPage - 1)}
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
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        buttons.push(
          <button
            key="first"
            onClick={() => handlePageChange(1)}
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
            onClick={() => handlePageChange(i)}
            className={`mx-1 rounded-full w-10 h-10 flex items-center justify-center transition duration-300 ${
              currentPage === i
                ? "bg-[#00AA55] text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(
            <span key="ellipsis-end" className="mx-2 text-gray-400">
              ...
            </span>
          );
        }
        buttons.push(
          <button
            key="last"
            onClick={() => handlePageChange(totalPages)}
            className="mx-1 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition duration-300"
          >
            {totalPages}
          </button>
        );
      }

      if (currentPage < totalPages) {
        buttons.push(
          <button
            key="next"
            onClick={() => handlePageChange(currentPage + 1)}
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

  const handleForwardPayment = (item) => {
    try {
      console.log("item", item);
      dispatch(forwardPaidVendor(item.invoiceDetailId));
      dispatch(getAllTransactions({ page: currentPage }));
      closeDialog();
    } catch (error) {
      console.error("Error forwarding payment:", error);
    }
  };

  

    const renderFilterDropdown = () => {
    const statusOptions = [
      { value: "ALL", label: "All Status" },
      { value: "COMPLETE", label: "Complete" },
      { value: "UNPAID", label: "Unpaid" },
    ];

    return (
      <div className="relative flex items-center">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-[#00AA55] text-white p-3 rounded-full hover:bg-[#00AA55]/90 transition-colors duration-300 flex items-center justify-center"
        >
          <FaFilter className="m-0" />
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
                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
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
      <h1 className="py-10 text-5xl font-bold text-center">Transaction</h1>
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
      <div className="grid gap-8 mb-20">
        {paginatedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            onClick={() => handleSelectDetail(transaction)}
            className="px-12 py-2 max-w-full bg-[#F4F4F4] text-black rounded-[40px] shadow-xl cursor-pointer text-left transition hover:scale-105"
          >
            <div className="flex text-[#00AA55] header-detail">
              <h1 className="text-2xl mb-4 w-1/2">
                {formatDate(transaction.startDate)}
              </h1>
              <p className="text-2xl w-1/2 text-right">
                Rp {calculateTotalCost(transaction.invoiceDetailResponseList)}
              </p>
            </div>
            <div className="border-b-2 border-gray-300 my-2"></div>
            <div className="flex">
              <h1 className="text-3xl font-bold mb-4 w-1/2">
                {transaction.customerName}
              </h1>
              <p className="text-2xl w-1/2 text-right">
                {transaction.eventName}
              </p>
            </div>
          </div>
        ))}
      </div>
      {renderPagination()}
      <Modal
        title={"Transaction Detail"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeDialog={closeDialog}
      >
        <div className="">
          <div className="flex">
            <div className="w-1/2">
              <div>
                <h1 className="text-xl font-bold">Transaction</h1>
                <div className="border-b-2 border-gray-300 my-2 me-14"></div>
              </div>
              <div className="">
                <div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Transaction ID</h1>
                    <p className="w-1/2">{selectedTransaction?.invoiceId}</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Payment Date</h1>
                    <p className="w-1/2">{selectedTransaction?.paymentDate}</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Order Date</h1>
                    <p className="w-1/2">{selectedTransaction?.startDate}</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Total Cost</h1>
                    <p className="w-1/2">
                      {selectedTransaction
                        ? "Rp. " +
                          calculateTotalCost(
                            selectedTransaction.invoiceDetailResponseList
                          )
                        : ""}
                    </p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Transaction Status</h1>
                    <Badge className={"bg-[#00AA55] text-white"}>
                      {selectedTransaction?.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <div>
                <h1 className="text-xl font-bold">Event</h1>
                <div className="border-b-2 border-gray-300 my-2 me-14"></div>
              </div>
              <div className="">
                <div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Event Name</h1>
                    <p className="w-1/2">{selectedTransaction?.eventName}</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Start Date</h1>
                    <p className="w-1/2">{selectedTransaction?.startDate}</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Finished Date</h1>
                    <p className="w-1/2">{selectedTransaction?.endDate}</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Event Theme</h1>
                    <p className="w-1/2">{selectedTransaction?.theme}</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Event Location</h1>
                    <p className="w-1/2">
                      {selectedTransaction?.district},{" "}
                      {selectedTransaction?.city},{" "}
                      {selectedTransaction?.province}
                    </p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Location Detail</h1>
                    <p className="w-1/2">
                      {selectedTransaction?.address} ,
                      {selectedTransaction?.district}
                    </p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Participant</h1>
                    <p className="w-1/2">{selectedTransaction?.participant}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2">
              <div>
                <h1 className="text-xl font-bold">Customer</h1>
                <div className="border-b-2 border-gray-300 my-2 me-14"></div>
              </div>
              <div className="">
                <div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Customer Name</h1>
                    <p className="w-1/2">{selectedTransaction?.customerName}</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Phone Number</h1>
                    <p className="w-1/2">{selectedTransaction?.phoneNumber}</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Address</h1>
                    <p className="w-1/2">{selectedTransaction?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h1 className="text-xl font-bold">Vendor</h1>
            <div className="border-b-2 border-gray-300 me-14"></div>
          </div>
          <ScrollArea className="m-4 h-[225px] relative rounded-md">
            <Table className="w-full">
              <TableHeader className="font-bold text-white bg-[#00AA55] rounded-full">
                <TableRow className="">
                  <TableHead className="text-white text-center">
                    Invoice Detail ID
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Vendor Name
                  </TableHead>
                  <TableHead className="text-white w-[200px] text-center">
                    Product Name
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Quantity
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Price / Qty
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Total
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Forward
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-scroll h-5">
                {selectedTransaction &&
                  selectedTransaction?.invoiceDetailResponseList.map(
                    (item, index) => (
                      <TableRow
                        key={index}
                        className="border-b-2 flex-row items-center"
                      >
                        <TableCell className="text-left">
                          {item.invoiceDetailId}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.vendorName}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.productName}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.qty}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.cost / item.qty}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.cost}
                        </TableCell>
                        <TableCell className="text-center pb-5">
                          { item.forwardPaymentStatus !== "COMPLETE" && (
                            <button
                              className="mt-4 bg-[#00AA55] text-white py-2 px-4 rounded-xl"
                              onClick={() => handleForwardPayment(item)}
                            >
                              Forward Payment
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </Modal>
    </div>
  );
};

export default TransactionPage;
