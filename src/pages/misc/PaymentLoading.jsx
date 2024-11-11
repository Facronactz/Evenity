import React from 'react';
import {FaSpinner} from 'react-icons/fa'; // Importing the spinner icon from react-icons
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS if not already imported

const PaymentLoading = () => {
    return (
        <div className="bg-green-100 flex items-center justify-center min-h-screen p-4">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-green-700">Evenity</h1>
                </div>
                <div className="mb-4 flex justify-center">
                    <FaSpinner className="animate-spin text-4xl text-green-500"/>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-green-700">Processing Your Payment</h2>
                <p className="text-gray-600 mb-4">Please wait while we process your payment. This may take a few
                    moments.</p>
                <p className="text-gray-600 mb-4">Thank you for your patience!</p>
                <p className="text-green-700 font-bold">Make Your Event, Easy With Us!</p>
                {/*<p className="text-green-700 font-bold">Easy With Us</p>*/}
            </div>
        </div>
    );
};

export default PaymentLoading;