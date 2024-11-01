import React, { useState } from "react";
import { BsFillSpeakerFill } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Modal from "@/components/Modal";

const VendorPage = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the dialog
  const openDialog = () => setIsOpen(true);

  // Function to close the dialog
  const closeDialog = () => setIsOpen(false);

  return (
    <div className="container mx-auto">
      <h1 className="py-20 text-4xl font-bold">
        {type === "approved" ? "Approved Vendor" : "Vendor Approval"}
      </h1>
      <div className="grid grid-cols-3 gap-12">
        <div onClick={openDialog} className="px-12 py-8 bg-[rgb(0,242,121)] text-white rounded-[40px] shadow-xl cursor-pointer text-left">
          <h1 className="text-5xl font-bold mb-4 w-1/2">Soni Soundman</h1>
          <p className="text-xl">Sound engineer and utility</p>
          <p className="text-xl">Malang, Indonesia</p>
          <div className="h-fit w-fit bg-white rounded-full flex justify-self-end">
            <BsFillSpeakerFill className="text-6xl text-black" />
          </div>
        </div>
        <div onClick={openDialog} className="px-12 py-8 bg-[rgb(0,242,121)] text-white rounded-[40px] shadow-xl cursor-pointer text-left">
          <h1 className="text-5xl font-bold mb-4 w-1/2">Soni Soundman</h1>
          <p className="text-xl">Sound engineer and utility</p>
          <p className="text-xl">Malang, Indonesia</p>
          <div className="h-fit w-fit bg-white rounded-full flex justify-self-end">
            <BsFillSpeakerFill className="text-6xl text-black" />
          </div>
        </div>
        <div onClick={openDialog} className="px-12 py-8 bg-[rgb(0,242,121)] text-white rounded-[40px] shadow-xl cursor-pointer text-left">
          <h1 className="text-5xl font-bold mb-4 w-1/2">Soni Soundman</h1>
          <p className="text-xl">Sound engineer and utility</p>
          <p className="text-xl">Malang, Indonesia</p>
          <div className="h-fit w-fit bg-white rounded-full flex justify-self-end">
            <BsFillSpeakerFill className="text-6xl text-black" />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}  closeDialog={closeDialog} >
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h1 className="text-xl font-bold py-4">Vendor</h1>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex justify-between">
              <h1 className="font-semibold">Vendor ID</h1>
              <p>121212113123</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold">Type</h1>
              <p>Arts & Decoration</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold">Owner</h1>
              <p>Joko Susilo</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold">Phone Number</h1>
              <p>08123456789</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold">Location</h1>
              <p>Malang Indonesia</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold">Address</h1>
              <p>Jl Asia Afrika</p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Status</h1>
              <p className="p-2 rounded-xl bg-[#00AA55] text-white">
                Active
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold py-4">Product</h1>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex justify-between">
              <h1 className="font-semibold">Product Name</h1>
              <p>121212113123</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold">Product Type</h1>
              <p>Arts & Decoration</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold">Product Price</h1>
              <p>Joko Susilo</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold">Unit</h1>
              <p>08123456789</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold">Description</h1>
              <p>Malang Indonesia</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex-1 flex justify-center items-center">
          <button
            onClick={closeDialog}
            className=" w-fit h-fit bg-[#00AA55] text-white py-3 px-8 rounded-[30px] font-bold text-lg"
          >
            See Transaction Detail
          </button>
        </div>
        <div className="flex-1 flex-col justify-center justify-self-center items-center">
          <button
            onClick={closeDialog}
            className="w-fit bg-[#00F279] text-white py-3 px-8 rounded-[30px] font-bold text-lg mb-2"
          >
            Active Vendor
          </button>
        </div>
      </div>
        </Modal>
    </div>
  );
};

export default VendorPage;
