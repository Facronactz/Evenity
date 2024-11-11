import React from 'react';
import {FaExclamationTriangle} from 'react-icons/fa'; // Import the exclamation triangle icon from react-icons
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS if not already imported

const NotFoundPage = () => {
    return (
        <div className="bg-green-100 flex items-center justify-center min-h-screen p-4">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-green-700">Evenity</h1>
                </div>
                <div className="mb-4 flex justify-center">
                    <FaExclamationTriangle className="text-4xl text-red-500"/>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-green-700">404 - Page Not Found</h2>
                <p className="text-gray-600 mb-4">Sorry, the page you are looking for does not exist.</p>
                <a href="/" className="text-green-500 font-bold hover:underline">Go back to homepage</a>
            </div>
        </div>
    );
};

export default NotFoundPage;