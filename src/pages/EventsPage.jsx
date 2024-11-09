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
import { useDispatch, useSelector } from "react-redux";
import { getEventDetail, setSelectedEvent } from "@/redux/slice/eventSlice";
import { formatNumberToCurrency } from "@/helper/formatter.js";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const EventsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]);

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => setIsOpen(false);

  const dispatch = useDispatch();
  const { event, status, selectedEvent, totalPages, currentPage } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    dispatch(getEventDetail({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    console.log("page", page);
    console.log("currentPage", currentPage);

    dispatch(getEventDetail({ page: page }));
  };

  const handleEventDetail = (event) => {
    dispatch(setSelectedEvent(event));
    openDialog();
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  const fetchSearchResults = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`/auth/search?name=${searchQuery}`);
      console.log("response", response.data);
      setSearchResults(response.data);
      console.log("searchResults", searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const renderPageButtons = () => {
      const buttons = [];
      const maxVisiblePages = 5;

      // Tombol previous
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

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <div className="container mx-auto h-[120vh] pt-20">
        <div className="text-center py-10">
          <h1
            className=" py-2 text-5xl font-bold text-center mx-auto
  relative inline-block
  after:content-[''] after:absolute after:bottom-0 after:left-0 
  after:w-0 after:h-1 after:bg-[#00AA55] 
  hover:after:w-full after:transition-all after:duration-500 
  after:origin-center"
          >
            Events
          </h1>
        </div>

        {status === "loading" ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="px-12 py-8  text-white rounded-[40px] shadow-xl"
                style={{ height: "350px", width: "100%" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
            {event.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventDetail(event)}
                className="px-12 py-8 bg-[rgb(0,242,121)] text-white rounded-[40px] shadow-xl cursor-pointer text-left flex flex-col justify-between transition hover:scale-105"
              >
                <div>
                  <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
                  <div>
                    <p className="text-xl">{event.startDate}</p>
                    <p className="text-xl">
                      {event.city}, {event.province}
                    </p>
                  </div>
                </div>
                <button
                  className={
                    event.startDate > new Date()
                      ? "bg-[#00AA55] text-white py-3 px-8 rounded-[30px] mt-12 font-bold text-xl"
                      : "bg-[#FF5500] text-white py-3 px-8 rounded-[30px] mt-12 font-bold text-xl"
                  }
                >
                  <h2>
                    {event.startDate > new Date()
                      ? "Finished"
                      : "Not Yet Started"}{" "}
                  </h2>
                </button>
              </div>
            ))}
          </div>
        )}

        {renderPagination()}
        <Modal
          title={"Event Detail"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeDialog={closeDialog}
        >
          <h1 className="text-xl font-bold">{selectedEvent?.name}</h1>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-2 justify-start">
              <div className="flex">
                <h1 className="w-1/2">Start Date</h1>
                <p className="w-1/2">
                  {selectedEvent?.startDate} . {selectedEvent?.startTime}
                </p>
              </div>
              <div className="flex">
                <h1 className="w-1/2">Finished Date</h1>
                <p className="w-1/2">
                  {selectedEvent?.endDate} . {selectedEvent?.endTime}
                </p>
              </div>
              <div className="flex">
                <h1 className="w-1/2">Event Theme</h1>
                <p className="w-1/2">{selectedEvent?.theme}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex">
                <h1 className="w-1/2">Event Location</h1>
                <p className="w-1/2">
                  {selectedEvent?.district}, {selectedEvent?.city},{" "}
                  {selectedEvent?.province}
                </p>
              </div>
              <div className="flex">
                <h1 className="w-1/2">Location Detail</h1>
                <p className="w-1/2">{selectedEvent?.address}</p>
              </div>
              <div className="flex">
                <h1 className="w-1/2">Participant</h1>
                <p className="w-1/2">
                  {selectedEvent?.participant} Participant
                </p>
              </div>
            </div>
          </div>

          <Table className="mt-10">
            <TableHeader className="font-bold text-white bg-[#00AA55] rounded-full">
              <TableRow className="">
                <TableHead className="text-white w-[200px]">
                  Vendor Name
                </TableHead>
                <TableHead className="text-white">Quantity</TableHead>
                <TableHead className="text-white">Price / Qty</TableHead>
                <TableHead className="text-right text-white">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedEvent?.eventDetailResponseList?.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">
                    {vendor.vendorName}
                  </TableCell>
                  <TableCell>
                    {vendor.quantity} {vendor.unit}
                  </TableCell>
                  <TableCell>
                    Rp. {formatNumberToCurrency(vendor.cost / vendor.quantity)}
                  </TableCell>
                  <TableCell className="text-right">
                    Rp. {formatNumberToCurrency(vendor.cost)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Modal>
      </div>
    </div>
  );
};

export default EventsPage;
