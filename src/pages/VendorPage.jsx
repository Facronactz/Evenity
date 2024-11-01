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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}  closeDialog={closeDialog} />
    </div>
  );
};

export default VendorPage;
