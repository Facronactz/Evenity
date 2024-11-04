import React, {useEffect, useState} from "react";
import Modal from "@/components/Modal";
import {Badge} from "@/components/ui/badge";
import {useDispatch, useSelector} from "react-redux";
import {approveVendor, getAllVendors, getProductByVendorId, setSelectedVendor,} from "@/redux/slice/vendorSlice";

import VendorPageCard from "@/components/VendorPageCard";

const VendorPage = ({type}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Function to open the dialog
    const openDialog = () => setIsOpen(true);

    // Function to close the dialog
    const closeDialog = () => setIsOpen(false);

    const dispatch = useDispatch();
    const {
        vendors_pending,
        vendors_active,
        status,
        selectedVendor,
        productSelected,
    } = useSelector((state) => state.vendor);

    const handleVendorDetail = (vendor) => {
        dispatch(setSelectedVendor(vendor));
        openDialog();
        console.log("productSelected", productSelected.productList);
    };

    useEffect(() => {
        dispatch(getAllVendors());
    }, [dispatch]);

    useEffect(() => {
        if (selectedVendor) {
            console.log("selectedVendor", selectedVendor);
            dispatch(getProductByVendorId(selectedVendor.id));
        }
    }, [dispatch, selectedVendor]);

    const handleApproveVendor = (e, id) => {
        e.preventDefault();
        dispatch(approveVendor(id)).then(() => {
            dispatch(getAllVendors());
            closeDialog();
        });
    };

    return (
        <div className="container mx-auto">
            <h1 className="py-10 text-5xl font-bold">
                {type === "approved" ? "Approved Vendor" : "Vendor Approval"}
            </h1>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-3 gap-8">
                    {type === "approved"
                        ? vendors_active.map((vendor) => (
                            <VendorPageCard
                                key={vendor.id}
                                vendor={vendor}
                                handleVendorDetail={handleVendorDetail}
                            />
                        ))
                        : vendors_pending.map((vendor) => (
                            <VendorPageCard
                                key={vendor.id}
                                vendor={vendor}
                                handleVendorDetail={handleVendorDetail}
                            />
                        ))}
                </div>
            )}
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeDialog={closeDialog}>
                <h1 className="text-4xl font-bold mb-6">{selectedVendor?.name}</h1>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <h1 className="text-xl font-bold">Vendor</h1>
                        <div className="border-b-2 border-gray-300 my-2 me-14"></div>

                        <div className="flex flex-col gap-2 justify-center">
                            <div className="flex">
                                <h1 className="w-1/2 font-semibold">Vendor ID</h1>
                                <p className="w-1/2">{selectedVendor?.id}</p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Type</h1>
                                <p className="w-1/2">Arts & Decoration</p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Owner</h1>
                                <p className="w-1/2">{selectedVendor?.owner}</p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Phone Number</h1>
                                <p className="w-1/2">{selectedVendor?.phoneNumber}</p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Location</h1>
                                <p className="w-1/2">
                                    {selectedVendor?.city}, {selectedVendor?.province}
                                </p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Address</h1>
                                <p className="w-1/2">{selectedVendor?.address}</p>
                            </div>
                            <div className="flex items-center">
                                <h1 className="font-semibold w-1/2">Status</h1>
                                <Badge className={"text-white bg-[#00AA55]"}>
                                    {selectedVendor?.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Product</h1>
                        <div className="border-b-2 border-gray-300 my-2 me-14"></div>

                        <div className="flex flex-col gap-2 justify-center">
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Product Name</h1>
                                <p className="w-1/2">{productSelected?.productList?.name}</p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Product Type</h1>
                                <p className="w-1/2">Arts & Decoration</p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Product Price</h1>
                                <p className="w-1/2"></p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Unit</h1>
                                <p className="w-1/2"></p>
                            </div>
                            <div className="flex">
                                <h1 className="font-semibold w-1/2">Description</h1>
                                <p className="w-1/2"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-10 mt-12">
                    <button
                        onClick={(e) => {
                            handleApproveVendor(e, selectedVendor?.id);
                        }}
                        className={`w-fit bg-[#00F279] text-white py-3 px-8 rounded-[30px] font-bold text-lg mb-2 ${
                            selectedVendor?.status === "ACTIVE" ? "hidden" : ""
                        }`}
                        disabled={selectedVendor?.status === "ACTIVE"}
                    >
                        Active Vendor
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default VendorPage;
