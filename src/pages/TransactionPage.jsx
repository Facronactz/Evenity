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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const dispatch = useDispatch();
  const { transaction, status, selectedTransaction, totalPages, currentPage } =
    useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(
      getAllTransactions({
        page: currentPage,
      })
    );
  }, [dispatch, currentPage]);

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
    dispatch(
      getAllTransactions({
        page: page,
      })
    );
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
    if (totalPages <= 1) return null;

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

  const filteredTransactions = transaction.filter(
    (t) => t.paymentStatus === "COMPLETE" || t.paymentStatus === "UNPAID"
  );

  return (
    <div className="container mx-auto h-[100vh] pt-20">
      <h1 className="py-10 text-5xl font-bold text-center">Transaction</h1>
      <div className="grid gap-8 mb-20">
        {filteredTransactions.map((transaction) => (
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
                          {item?.forwardPaymentStatus !== "COMPLETE" && (
                            <button
                              className="mt-4 bg-[#00AA55] text-white py-2 px-4 rounded"
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
