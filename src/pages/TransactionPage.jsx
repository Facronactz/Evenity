import Modal from "@/components/Modal";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const WithdrawPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the dialog
  const openDialog = () => setIsOpen(true);

  // Function to close the dialog
  const closeDialog = () => setIsOpen(false);

  return (
    <div className="container mx-auto">
      <h1 className="text-6xl font-bold py-20 text-center">Transaction</h1>
      <div className="grid grid-cols gap-12 mb-20">
        <div
          onClick={openDialog}
          className="px-12 py-8 w-full bg-[#F4F4F4] text-black rounded-[40px] shadow-xl cursor-pointer text-left"
        >
          <div className="flex text-[#00AA55] header-detail">
            <h1 className="text-3xl mb-4 w-1/2">Kamis, 20 September 2024</h1>
            <p className="text-3xl w-1/2 text-right">20.000.000</p>
          </div>
          <div className="border-b-2 border-gray-300 my-2"></div>
          <div className="flex">
            <h1 className="text-4xl font-bold mb-4 w-1/2">Andi Sitompul</h1>
            <p className="text-3xl w-1/2 text-right">Pengajian Akbar</p>
          </div>
        </div>
        <div
          onClick={openDialog}
          className="px-12 py-8 w-full bg-[#F4F4F4] text-black rounded-[40px] shadow-xl cursor-pointer text-left"
        >
          <div className="flex text-[#00AA55] header-detail">
            <h1 className="text-3xl mb-4 w-1/2">Kamis, 20 September 2024</h1>
            <p className="text-3xl w-1/2 text-right">20.000.000</p>
          </div>
          <div className="border-b-2 border-gray-300 my-2"></div>
          <div className="flex">
            <h1 className="text-4xl font-bold mb-4 w-1/2">Andi Sitompul</h1>
            <p className="text-3xl w-1/2 text-right">Pengajian Akbar</p>
          </div>
        </div>
        <div
          onClick={openDialog}
          className="px-12 py-8 w-full bg-[#F4F4F4] text-black rounded-[40px] shadow-xl cursor-pointer text-left"
        >
          <div className="flex text-[#00AA55] header-detail">
            <h1 className="text-3xl mb-4 w-1/2">Kamis, 20 September 2024</h1>
            <p className="text-3xl w-1/2 text-right">20.000.000</p>
          </div>
          <div className="border-b-2 border-gray-300 my-2"></div>
          <div className="flex">
            <h1 className="text-4xl font-bold mb-4 w-1/2">Andi Sitompul</h1>
            <p className="text-3xl w-1/2 text-right">Pengajian Akbar</p>
          </div>
        </div>
        <div
          onClick={openDialog}
          className="px-12 py-8 w-full bg-[#F4F4F4] text-black rounded-[40px] shadow-xl cursor-pointer text-left"
        >
          <div className="flex text-[#00AA55] header-detail">
            <h1 className="text-3xl mb-4 w-1/2">Kamis, 20 September 2024</h1>
            <p className="text-3xl w-1/2 text-right">20.000.000</p>
          </div>
          <div className="border-b-2 border-gray-300 my-2"></div>
          <div className="flex">
            <h1 className="text-4xl font-bold mb-4 w-1/2">Andi Sitompul</h1>
            <p className="text-3xl w-1/2 text-right">Pengajian Akbar</p>
          </div>
        </div>
        <div
          onClick={openDialog}
          className="px-12 py-8 w-full bg-[#F4F4F4] text-black rounded-[40px] shadow-xl cursor-pointer text-left"
        >
          <div className="flex text-[#00AA55] header-detail">
            <h1 className="text-3xl mb-4 w-1/2">Kamis, 20 September 2024</h1>
            <p className="text-3xl w-1/2 text-right">20.000.000</p>
          </div>
          <div className="border-b-2 border-gray-300 my-2"></div>
          <div className="flex">
            <h1 className="text-4xl font-bold mb-4 w-1/2">Andi Sitompul</h1>
            <p className="text-3xl w-1/2 text-right">Pengajian Akbar</p>
          </div>
        </div>
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
                    <p className="w-1/2">299302943425834</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Payment Date</h1>
                    <p className="w-1/2">2 September 2024</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Order Date</h1>
                    <p className="w-1/2">1 September 2024</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Total Cost</h1>
                    <p className="w-1/2">20.000.000</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Transaction Status</h1>
                    <Badge className={"bg-[#00AA55] text-white"}>Active</Badge>
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
                    <p className="w-1/2">Kampanye Akbar Malang</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Start Date</h1>
                    <p className="w-1/2">20 September 2024 - 00.00</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Finished Date</h1>
                    <p className="w-1/2">20 September 2024 - 23.59</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Event Theme</h1>
                    <p className="w-1/2">Haloween</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Event Location</h1>
                    <p className="w-1/2">Malang, Indonesia</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Location Detail</h1>
                    <p className="w-1/2">Jalan Sekartaji Merah Gg. 2 No. 08</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Participant</h1>
                    <p className="w-1/2">2000</p>
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
                    <p className="w-1/2">Andi Sitompul</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Phone Number</h1>
                    <p className="w-1/2">0987654322</p>
                  </div>
                  <div className="flex">
                    <h1 className="font-bold w-1/2">Address</h1>
                    <p className="w-1/2">Jalan Pucang Aji 1 no 99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h1 className="text-xl font-bold">Vendor</h1>
            <div className="border-b-2 border-gray-300 me-14"></div>
          </div>
          <ScrollArea className="m-4 h-[225px] relative rounded-md px-5">
            <Table className="relative">
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
              <TableBody className="overflow-y-scroll h-5">
                <TableRow>
                  <TableCell className="font-medium">
                    Restu Decoration
                  </TableCell>
                  <TableCell>1 Days</TableCell>
                  <TableCell>Rp. 4000.000</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Restu Decoration
                  </TableCell>
                  <TableCell>1 Days</TableCell>
                  <TableCell>Rp. 4000.000</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Restu Decoration
                  </TableCell>
                  <TableCell>1 Days</TableCell>
                  <TableCell>Rp. 4000.000</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Restu Decoration
                  </TableCell>
                  <TableCell>1 Days</TableCell>
                  <TableCell>Rp. 4000.000</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Restu Decoration
                  </TableCell>
                  <TableCell>1 Days</TableCell>
                  <TableCell>Rp. 4000.000</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Restu Decoration
                  </TableCell>
                  <TableCell>1 Days</TableCell>
                  <TableCell>Rp. 4000.000</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </Modal>
    </div>
  );
};

export default WithdrawPage;
