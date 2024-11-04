import Modal from "@/components/Modal";
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useDispatch, useSelector} from "react-redux";
import {getAllTransactions, setSelectedTransaction} from "@/redux/slice/transactionSlice";
import {setupAxios} from "@/config/axiosConfig";
import moment from "moment";
import {formatNumberToCurrency} from "@/helper/formatter.js";


const TransactionPage = () => {

    setupAxios();

    const [isOpen, setIsOpen] = useState(false);

    // Function to open the dialog
    const openDialog = () => setIsOpen(true);

    // Function to close the dialog
    const closeDialog = () => setIsOpen(false);

    const dispatch = useDispatch();
    const {transaction, status, selectedTransaction} = useSelector(
        (state) => state.transaction
    )

    useEffect(() => {
        dispatch(getAllTransactions())
    }, [dispatch])

    const calculateTotalCost = (invoiceDetailList) => {
        const totalCost = invoiceDetailList.map((invoiceDetail) => invoiceDetail.cost).reduce((a, b) => a + b, 0);
        return (formatNumberToCurrency(totalCost))
    };

    const formatDate = (date) => {
        return moment(date).format("DD MMMM YYYY");
    }

    const handleSelectDetail = (transaction) => {
        dispatch(setSelectedTransaction(transaction))
        openDialog()
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-6xl font-bold pt-8 pb-12 text-center">Transaction</h1>
            <div className="grid gap-8 mb-20">
                {
                    transaction.map((transaction) => (
                        <div
                            onClick={() => handleSelectDetail(transaction)}
                            className="px-12 py-2 max-w-full bg-[#F4F4F4] text-black rounded-[40px] shadow-xl cursor-pointer text-left"
                        >
                            <div className="flex text-[#00AA55] header-detail">
                                <h1 className="text-2xl mb-4 w-1/2">{formatDate(transaction.startDate)}</h1>
                                <p className="text-2xl w-1/2 text-right">Rp {calculateTotalCost(transaction.invoiceDetailResponseList)}</p>
                            </div>
                            <div className="border-b-2 border-gray-300 my-2"></div>
                            <div className="flex">
                                <h1 className="text-3xl font-bold mb-4 w-1/2">{transaction.customerName}</h1>
                                <p className="text-2xl w-1/2 text-right">{transaction.eventName}</p>
                            </div>
                        </div>
                    ))

                }
            </div>
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
                                        <p className="w-1/2">{selectedTransaction ? "Rp. " + calculateTotalCost(selectedTransaction.invoiceDetailResponseList) : ""}</p>
                                    </div>
                                    <div className="flex">
                                        <h1 className="font-bold w-1/2">Transaction Status</h1>
                                        <Badge
                                            className={"bg-[#00AA55] text-white"}>{selectedTransaction?.paymentStatus}</Badge>
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
                                        <p className="w-1/2">{selectedTransaction?.district}, {selectedTransaction?.city}, {selectedTransaction?.province}</p>
                                    </div>
                                    <div className="flex">
                                        <h1 className="font-bold w-1/2">Location Detail</h1>
                                        <p className="w-1/2">{selectedTransaction?.address} ,{selectedTransaction?.district}</p>
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
                                    <TableHead className="text-white">Invoice Detail ID</TableHead>
                                    <TableHead className="text-white">
                                        Vendor Name
                                    </TableHead>
                                    <TableHead className="text-white w-[200px]">
                                        Product Name
                                    </TableHead>
                                    <TableHead className="text-white">Quantity</TableHead>
                                    <TableHead className="text-white">Price / Qty</TableHead>
                                    <TableHead className="text-right text-white">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="overflow-y-scroll h-5">
                                {
                                    selectedTransaction && selectedTransaction?.invoiceDetailResponseList.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-left">{item.invoiceDetailId}</TableCell>
                                            <TableCell className="text-left">{item.vendorName}</TableCell>
                                            <TableCell className="text-left">{item.productName}</TableCell>
                                            <TableCell className="text-left">{item.qty}</TableCell>
                                            <TableCell className="text-left">{item.cost / item.qty}</TableCell>
                                            <TableCell className="text-right">{item.cost}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
            </Modal>
        </div>
    );
};

export default TransactionPage;
