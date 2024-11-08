import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllWithdraws } from "@/redux/slice/withdrawslice";

const WithdrawPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const dispatch = useDispatch();
  const { withdrawRequests, status, totalPages, currentPage } = useSelector(
    (state) => state.withdraw
  );
  useEffect(() => {
    dispatch(
      getAllWithdraws({
        page: currentPage,
      })
    );
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    console.log("page", page);
    dispatch(
      getAllWithdraws({
        page: page,
      })
    );
  };

  const dataList = [
    {
      date: "Kamis, 20 September 2024",
      amount: "20.000.000",
      name: "Jaya Kencana Catering",
      bank: "BCA - 200010230243",
    },
    {
      date: "Jumat, 21 September 2024",
      amount: "15.000.000",
      name: "Prima Catering Service",
      bank: "BNI - 345678901234",
    },
    {
      date: "Sabtu, 22 September 2024",
      amount: "25.000.000",
      name: "Dewa Catering",
      bank: "Mandiri - 123456789012",
    },
    {
      date: "Minggu, 23 September 2024",
      amount: "30.000.000",
      name: "Sukses Bersama Catering",
      bank: "BCA - 200012345678",
    },
  ];

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

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const renderPageButtons = () => {
      const buttons = [];
      const maxVisiblePages = 2;

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

      // Tombol next
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

  return (
    <div className="container mx-auto h-[100vh] pt-20">
      <h1 className="py-10 text-5xl font-bold text-center">
        Withdraws Approval
      </h1>
      <div className="grid grid-cols gap-8 pb-20">
        {dataList.map((data, index) => (
          <div
            key={index}
            onClick={openDialog}
            className="px-12 py-2 w-full bg-[#F4F4F4] text-black rounded-[40px] shadow-xl cursor-pointer text-left"
          >
            <div className="flex text-[#00AA55] header-detail">
              <h1 className="text-2xl mb-4 w-1/2">{data.date}</h1>
              <p className="text-2xl w-1/2 text-right">{data.amount}</p>
            </div>
            <div className="border-b-2 border-gray-300 my-2"></div>
            <div className="flex">
              <h1 className="text-3xl font-bold mb-4 w-1/2">{data.name}</h1>
              <p className="text-2xl w-1/2 text-right">{data.bank}</p>
            </div>
          </div>
        ))}
      </div>
      {renderPagination()}
      <Modal
        title={"Withdraw Detail"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeDialog={closeDialog}
      >
        <div className="w-1/2">
          <h1 className="text-xl font-bold">Joko Sound</h1>
          <div className="border-b-2 border-gray-300 my-2"></div>
        </div>

        <div className="flex">
          <div className="w-1/2">
            <div className="flex">
              <h1 className="font-bold w-full">Vendor ID</h1>
              <p className="w-1/2">22000394394393</p>
            </div>
            <div className="flex">
              <h1 className="font-bold w-full">Nominal</h1>
              <p className="w-1/2">7.000.000</p>
            </div>
            <div className="flex">
              <h1 className="font-bold w-full">Bank</h1>
              <p className="w-1/2">BCA</p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex">
              <h1 className="font-bold w-1/2">Account Number</h1>
              <p className="w-1/2">200039943923432343</p>
            </div>
            <div className="flex">
              <h1 className="font-bold w-1/2">Request</h1>
              <p className="w-1/2">20 November 2024</p>
            </div>
            <div className="flex">
              <h1 className="font-bold w-1/2">Status</h1>
              <div className="flex items-center">
                <Badge className={"bg-[#00AA55] text-white"}>Active</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col items-center mx-2">
            <button
              onClick={closeDialog}
              className="bg-[#00F279] text-white py-3 px-8 rounded-[30px] font-bold text-lg mb-2 w-36"
            >
              Approve
            </button>
          </div>
          <div className="flex flex-col items-center mx-2">
            <button
              onClick={closeDialog}
              className="bg-[#FF0000] text-white py-3 px-8 rounded-[30px] font-bold text-lg mb-2 w-36"
            >
              Reject
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WithdrawPage;
