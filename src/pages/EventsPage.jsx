import Modal from '@/components/Modal'
import React, { useState } from 'react'
import { BsFillSpeakerFill } from 'react-icons/bs'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const EventsPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    // Function to open the dialog
    const openDialog = () => setIsOpen(true);
  
    // Function to close the dialog
    const closeDialog = () => setIsOpen(false);

  return (
    <div className='container mx-auto'>
        <h1 className='text-4xl font-bold py-20'>Events</h1>
        <div className="grid grid-cols-3 gap-12">
        <div onClick={openDialog} className="px-12 py-8 bg-[rgb(0,242,121)] text-white rounded-[40px] shadow-xl cursor-pointer text-left">
          <h1 className="text-5xl font-bold mb-4 w-1/2">Pengajian Akbar</h1>
          <p className="text-xl">20 Januari 2024</p>
          <p className="text-xl">Malang, Indonesia</p>
          <button className='bg-[#00AA55] text-white py-3 px-8 rounded-[30px] mt-12 font-bold text-xl'>Finished</button>
        </div>
      </div>
      <Modal title={"Event Detail"} isOpen={isOpen} setIsOpen={setIsOpen} closeDialog={closeDialog}>
        <h1 className='text-xl font-bold'>Kampanye Akbar Malang</h1>
        <div className='grid grid-cols-2 gap-10'>
            <div>
            <div className='flex justify-between'>
                <h1 className=''>Start Date</h1>
                <p>20 Januari 2024 . 20:00</p>
            </div>
            <div className='flex justify-between'>
                <h1 className=''>Finished Date</h1>
                <p>20 Januari 2024 . 20:00</p>
            </div>
            <div className='flex justify-between'>
                <h1 className=''>Event Theme</h1>
                <p>Halloween</p>
            </div>
            </div>
            <div>
            <div className='flex justify-between'>
                <h1 className=''>Event Location</h1>
                <p>Malang Indonesia</p>
            </div>
            <div className='flex justify-between'>
                <h1 className=''>Location Detail</h1>
                <p>Jalan Sekartaji Merah Gg. 2 No. 08</p>
            </div>
            <div className='flex justify-between'>
                <h1 className=''>Participant</h1>
                <p>20000</p>
            </div>
            </div>
        </div>

        <Table className="mt-10">
  <TableHeader className="font-bold text-white bg-[#00AA55] rounded-full">
    <TableRow className="">
      <TableHead className="text-white w-[200px]">Vendor Name</TableHead>
      <TableHead className="text-white">Quantity</TableHead>
      <TableHead className="text-white">Price / Qty</TableHead>
      <TableHead className="text-right text-white">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Restu Decoration</TableCell>
      <TableCell>1 Days</TableCell>
      <TableCell>Rp. 4000.000</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>

      </Modal>
    </div>
  )
}

export default EventsPage