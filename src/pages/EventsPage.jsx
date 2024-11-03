import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { BsFillSpeakerFill } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetail, setSelectedEvent } from "@/redux/slice/eventSlice";

const EventsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the dialog
  const openDialog = () => setIsOpen(true);

  // Function to close the dialog
  const closeDialog = () => setIsOpen(false);

  const dispatch = useDispatch();
  const { event, status, selectedEvent } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getEventDetail());
  }, []);

  const handleEventDetail = (event) => {
    dispatch(setSelectedEvent(event));
    openDialog();
  };

  // testing dummy data
  const dummyEvent = {
    name: "Event 1",
    startDate: "2023-05-01",
    startTime: "09:00",
    endDate: "2023-05-01",
    endTime: "10:00",
    city: "Jakarta",
    province: "DKI Jakarta",
    address: "Jl. Raya Jakarta",
    participant: "100",
    theme: "Theme 1",
    eventDetailResponseList: [
      {
        id: 1,
        vendorName: "Vendor 1",
        eventName: "Event 1",
        quantity: 1,
        unit: "pcs",
        cost: 100000,
        eventProgress: "Not Started",
      },
      {
        id: 2,
        vendorName: "Vendor 2",
        eventName: "Event 1",
        quantity: 2,
        unit: "pcs",
        cost: 200000,
        eventProgress: "Not Started",
      },
      {
        id: 3,
        vendorName: "Vendor 3",
        eventName: "Event 1",
        quantity: 3,
        unit: "pcs",
        cost: 300000,
        eventProgress: "Not Started",
      },
    ],
  };

  // testing dummy data
  const events = event && event.length > 0 ? event : [dummyEvent];

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold py-20">Events</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-12">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventDetail(event)}
              className="px-12 py-8 bg-[rgb(0,242,121)] text-white rounded-[40px] shadow-xl cursor-pointer text-left"
            >
              <h1 className="text-5xl font-bold mb-4 w-1/2">{event.name}</h1>
              <p className="text-xl">{event.startDate}</p>
              <p className="text-xl">
                {event.city}, {event.province}
              </p>
              <button className="bg-[#00AA55] text-white py-3 px-8 rounded-[30px] mt-12 font-bold text-xl">
                <h2>{event.startDate > new Date() ? "Start" : "Finished"} </h2>
              </button>
            </div>
          ))}
        </div>
      )}
      <Modal
        title={"Event Detail"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeDialog={closeDialog}
      >
        <h1 className="text-xl font-bold">{selectedEvent?.name}</h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-2 justify-center">
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
                {selectedEvent?.city}, {selectedEvent?.province}
              </p>
            </div>
            <div className="flex">
              <h1 className="w-1/2">Location Detail</h1>
              <p className="w-1/2">{selectedEvent?.address}</p>
            </div>
            <div className="flex">
              <h1 className="w-1/2">Participant</h1>
              <p className="w-1/2">{selectedEvent?.participant}</p>
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
                <TableCell>Rp. {vendor.cost / vendor.quantity}</TableCell>
                <TableCell className="text-right">Rp. {vendor.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Modal>
    </div>
  );
};

export default EventsPage;
