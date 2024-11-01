import React, { useState } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Modal from '@/components/Modal';
import { Badge } from '@/components/ui/badge';

  const dummyData = [{
    name: "Restu Decoration",
    email: "1 Days",
    phone: "08123456789",
  },
  {
    name: "Restu Decoration",
    email: "1 Days",
    phone: "08123456789",
  },
  {
    name: "Restu Decoration",
    email: "1 Days",
    phone: "08123456789",
  },
  {
    name: "Restu Decoration",
    email: "1 Days",
    phone: "08123456789",
  },
  {
    name: "Restu Decoration",
    email: "1 Days",
    phone: "08123456789",
  },
]

const UsersPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    // Function to open the dialog
    const openDialog = () => setIsOpen(true);
  
    // Function to close the dialog
    const closeDialog = () => setIsOpen(false);

  return (
    <div className='container mx-auto'>
        <h1 className='text-4xl font-bold py-20'>Users</h1>
        <div>
        <Table className="mt-10 max-w-screen-lg mx-auto">
  <TableHeader className="font-bold text-white bg-[#00AA55] rounded-full">
    <TableRow className="">
      <TableHead className="text-white font-bold text-xl ">Customer Name</TableHead>
      <TableHead className="text-white font-bold text-xl">Email</TableHead>
      <TableHead className="text-white font-bold text-xl">Phone Number</TableHead>
      <TableHead className="text-white font-bold text-xl w-[200px]">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        dummyData.map((data, i) => (
            <TableRow>
            <TableCell className="text-lg">{data.name}</TableCell>
            <TableCell className="text-lg">{data.email}</TableCell>
            <TableCell className="text-lg">{data.phone}</TableCell>
            <TableCell className="text-right text-xl">
                <IoEyeSharp className='cursor-pointer' onClick={openDialog} size={40} />
            </TableCell>
          </TableRow>
        ))
    }
  
  </TableBody>
</Table>
<Modal title={"User Detail"} isOpen={isOpen} setIsOpen={setIsOpen} closeDialog={closeDialog}>
    <div>
    <h1 className='text-2xl font-bold'>Andi Sitompul</h1>
    </div>
   <div className='grid grid-cols-2 gap-10'>
    <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
            <h1 className='font-semibold'>Username</h1>
            <p>andi123</p>
        </div>
        <div className='flex justify-between items-center '>
            <h1 className='font-semibold'>Email</h1>
            <p>andisitompul123</p>
        </div>
        <div className='flex justify-between items-center font-semibold'>
            <h1 className='font-semibold'>Status</h1>
            <Badge className={"bg-[#00AA55] text-white"}>Active</Badge>
        </div>
    </div>
    <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
            <h1 className='font-semibold'>Phone Number</h1>
            <p>08123123</p>
        </div>
        <div className='flex justify-between items-center'>
            <h1 className='font-semibold'>Address</h1>
            <p>Jl Situbondo No. 12</p>
        </div>

    </div>
   </div>
   <button className='bg-[#00AA55] text-white py-3 px-8 rounded-[30px] mt-12 font-bold text-xl justify-self-end w-fit'>Activate Customer</button>
</Modal>
        </div>
    </div>
  )
}

export default UsersPage