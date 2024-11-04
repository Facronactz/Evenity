import React, {useEffect, useState} from 'react'
import {IoEyeSharp} from "react-icons/io5";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import Modal from '@/components/Modal';
import {Badge} from '@/components/ui/badge';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCustomers, setSelectedCustomer} from '@/redux/slice/customerSlice';

const UsersPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    // Function to open the dialog
    const openDialog = () => setIsOpen(true);


    const handleCustomerDetail = (customer) => {
        dispatch(setSelectedCustomer(customer))
        openDialog()
    }

    // Function to close the dialog
    const closeDialog = () => setIsOpen(false);


    const dispatch = useDispatch();
    const {customers, status, selectedCustomer} = useSelector((state) => state.customer);

    useEffect(() => {
        dispatch(getAllCustomers())
    }, [dispatch])

    return (
        <div className='container mx-auto'>
            <h1 className='text-5xl font-bold py-10'>Users</h1>
            <div>
                {
                    status === "loading" ? <p>Loading...</p> :
                        <Table className=" mx-auto">
                            <TableHeader className="font-bold text-white bg-[#00AA55] rounded-full">
                                <TableRow className="">
                                    <TableHead className="text-white font-bold text-xl ">Customer Name</TableHead>
                                    <TableHead className="text-white font-bold text-xl">Email</TableHead>
                                    <TableHead className="text-white font-bold text-xl">Phone Number</TableHead>
                                    <TableHead
                                        className="text-white text-center font-bold text-xl w-[200px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    customers && customers.map((data, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="text-lg">{data.fullName}</TableCell>
                                            <TableCell className="text-lg">{data.email}</TableCell>
                                            <TableCell className="text-lg">{data.phoneNumber}</TableCell>
                                            <TableCell className="text-xl">
                                                <IoEyeSharp
                                                    className='cursor-pointer text-center w-full hover:scale-125 hover:text-[#00AA55]'
                                                    onClick={() => handleCustomerDetail(data)} size={40}/>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                }

                <Modal title={"User Detail"} isOpen={isOpen} setIsOpen={setIsOpen} closeDialog={closeDialog}>
                    <div>
                        <h1 className='text-2xl font-bold'>{selectedCustomer?.fullName}</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-10'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-semibold'>Name</h1>
                                <p>{selectedCustomer?.fullName}</p>
                            </div>
                            <div className='flex justify-between items-center '>
                                <h1 className='font-semibold'>Email</h1>
                                <p>{selectedCustomer?.email}</p>
                            </div>
                            <div className='flex justify-between items-center font-semibold'>
                                <h1 className='font-semibold'>Status</h1>
                                <Badge className={"bg-[#00AA55] text-white"}>Active</Badge>
                            </div>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-semibold'>Phone Number</h1>
                                <p>{selectedCustomer?.phoneNumber}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-semibold'>Province</h1>
                                <p>{selectedCustomer?.province}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-semibold'>City</h1>
                                <p>{selectedCustomer?.city}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-semibold'>District</h1>
                                <p>{selectedCustomer?.district}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-semibold'>Address</h1>
                                <p>{selectedCustomer?.address}</p>
                            </div>

                        </div>
                    </div>
                    <button
                        // className='bg-[#00AA55] text-white py-3 px-8 rounded-[30px] mt-12 font-bold text-xl justify-self-end w-fit'>Activate Customer
                        className='bg-[#FF0000] text-white py-3 px-8 rounded-[30px] mt-4 font-bold text-xl justify-self-end w-fit'>
                        Deactivate Customer
                    </button>
                </Modal>
            </div>
        </div>
    )
}

export default UsersPage