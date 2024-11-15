import React from 'react';
import Modal from "@/components/Modal";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatNumberToCurrency} from "@/helper/formatter.js";

const EventDetailModal = ({isOpen, setIsOpen, closeDialog, selectedEvent}) => {
    return (
        <Modal
            title="Event Detail"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeDialog={closeDialog}
        >
            <EventDetails event={selectedEvent}/>
            <VendorTable eventDetails={selectedEvent?.eventDetailResponseList}/>
        </Modal>
    );
};

const EventDetails = ({event}) => (
    <>
        <h1 className="text-xl font-bold">{event?.name}</h1>
        <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-2 justify-start">
                <div className="flex">
                    <h1 className="w-1/2">Start Date</h1>
                    <p className="w-1/2">
                        {event?.startDate} . {event?.startTime}
                    </p>
                </div>
                <div className="flex">
                    <h1 className="w-1/2">Finished Date</h1>
                    <p className="w-1/2">
                        {event?.endDate} . {event?.endTime}
                    </p>
                </div>
                <div className="flex">
                    <h1 className="w-1/2">Event Theme</h1>
                    <p className="w-1/2">{event?.theme}</p>
                </div>
                <div className="flex">
                    <h1 className="w-1/2">Event Status</h1>
                    <p className={` rounded-full py-2 text-white font-outfit font-bold text-center w-[100px] ${event?.isCancelled == true ? "bg-red-500" : "bg-green-500"}`}>{event?.isCancelled == true ? "Canceled" : "Active"}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 ">
                <div className="flex">
                    <h1 className="w-1/2">Event Location</h1>
                    <p className="w-1/2">
                        {event?.district}, {event?.city},{" "}
                        {event?.province}
                    </p>
                </div>
                <div className="flex">
                    <h1 className="w-1/2">Location Detail</h1>
                    <p className="w-1/2">{event?.address}</p>
                </div>
                <div className="flex">
                    <h1 className="w-1/2">Participant</h1>
                    <p className="w-1/2">
                        {event?.participant} Participant
                    </p>
                </div>
            </div>
        </div>
    </>
);

const VendorTable = ({eventDetails}) => (
    <Table className="mt-10">
        <TableHeader className="font-bold text-white bg-[#00AA55] rounded-full">
            <TableRow>
                <TableHead className="text-white w-[200px]">Vendor Name</TableHead>
                <TableHead className="text-white">Quantity</TableHead>
                <TableHead className="text-white">Price / Qty</TableHead>
                <TableHead className="text-right text-white">Total</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {eventDetails?.map((vendor) => (
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
);

export default EventDetailModal;