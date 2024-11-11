import React, { useEffect, useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWithdraws,
  approveWithdraw,
  rejectWithdraw,
} from "@/redux/slice/withdrawslice";
import Modal from "@/components/Modal";

const WithdrawPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const dispatch = useDispatch();

  const { withdrawRequests, status, totalPages, currentPage } = useSelector(
    (state) => state.withdraw
  );

  useEffect(() => {
    dispatch(getAllWithdraws({ page: currentPage }));
  }, [dispatch, currentPage]);

  // Sorting dan Filtering
  const processedWithdraws = useMemo(() => {
    let filtered = [...withdrawRequests];

    // Filter berdasarkan status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (withdraw) => withdraw.approvalStatus === statusFilter
      );
    }

    // Sorting: PENDING -> REJECTED -> APPROVED
    return filtered.sort((a, b) => {
      const statusOrder = {
        PENDING: 1,
        REJECTED: 2,
        APPROVED: 3,
      };
      return statusOrder[a.approvalStatus] - statusOrder[b.approvalStatus];
    });
  }, [withdrawRequests, statusFilter]);

  // Handler untuk membuka modal detail
  const openWithdrawDetail = (withdraw) => {
    setSelectedWithdraw(withdraw);
    setIsOpen(true);
  };

  // Handler untuk approve/reject
  const handleApprove = () => {
    if (selectedWithdraw) {
      dispatch(approveWithdraw(selectedWithdraw.id));
      setIsOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedWithdraw) {
      dispatch(rejectWithdraw(selectedWithdraw.id));
      setIsOpen(false);
    }
  };

  // Status Badge
  const getStatusBadge = (status) => {
    const badgeColors = {
      PENDING: "bg-yellow-500",
      APPROVED: "bg-green-500",
      REJECTED: "bg-red-500",
    };
    return (
      <Badge className={`${badgeColors[status]} text-white uppercase`}>
        {status.toLowerCase()}
      </Badge>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-2xl py-4 z-50">
        <div className="flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => dispatch(getAllWithdraws({ page }))}
              className={`
                px-4 py-2 rounded-full 
                ${
                  currentPage === page
                    ? "bg-[#00AA55] text-white"
                    : "bg-gray-200 text-gray-700"
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className=" container mx-auto flex-grow pt-20 px-4">
        <div className="flex flex-col items-center">
        <h1 className="py-10 text-4xl font-bold text-center text-gray-800">
          Withdraw Requests
        </h1>

        {/* Status Filter */}
        <div className="flex justify-center space-x-4 mb-8">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`
                px-4 py-2 rounded-full transition duration-300
                ${
                  statusFilter === status
                    ? "bg-[#00AA55] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
            >
              {status}
            </button>
          ))}
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 pb-20">
          {processedWithdraws.map((withdraw) => (
            <div
              key={withdraw.id}
              onClick={() => openWithdrawDetail(withdraw)}
              className="px-6 py-4 bg-[#F4F4F4] text-black rounded-3xl shadow-lg cursor-pointer transform transition hover:scale-105"
            >
              <div className="flex justify-between text-[#00AA55] mb-4">
                <h2 className="text-xl font-semibold">
                  {new Date(withdraw.createdDate).toLocaleDateString()}
                </h2>
                <p className="text-xl font-bold">
                  Rp {withdraw.amount.toLocaleString()}
                </p>
              </div>
              <div className="border-b border-gray-300 my-2"></div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">{withdraw.vendorName}</h3>
                {getStatusBadge(withdraw.approvalStatus)}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail */}
        {isOpen && selectedWithdraw && (
          <Modal
            title="Withdraw Detail"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeDialog={() => setIsOpen(false)}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {selectedWithdraw.vendorName}
                </h2>
                {getStatusBadge(selectedWithdraw.approvalStatus)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Vendor ID</p>
                  <p className="font-semibold">{selectedWithdraw.vendorId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Amount</p>
                  <p className="font-semibold">
                    Rp {selectedWithdraw.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold">{selectedWithdraw.userName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Request Date</p>
                  <p className="font-semibold">
                    {new Date(selectedWithdraw.createdDate).toLocaleString()}
                  </p>
                </div>
              </div>

              {selectedWithdraw.approvalStatus === "PENDING" && (
                <div className="flex justify-center space-x-4 mt-6">
                  <button
                    onClick={handleApprove}
                    className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </Modal>
        )}

        {renderPagination()}
      </div>
    </div>
  );
};

export default WithdrawPage;
