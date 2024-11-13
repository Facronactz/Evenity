import React from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "@/redux/slice/authSlice";
import logo from "../assets/logo.png";
import {AnimatePresence, motion} from "framer-motion";

const link = [
    {link: "Dashboard", url: "/dashboard"},
    {link: "Vendors", url: "/vendor"},
    {link: "Events", url: "/event"},
    {link: "Customers", url: "/user"},
    {link: "Withdrawals", url: "/withdraw"},
    {link: "Transactions", url: "/transaction"},
];

const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    // Page transition variants
    const pageVariants = {
        initial: {opacity: 0, x: "-100%"},
        in: {opacity: 1, x: 0},
        out: {opacity: 0, x: "100%"}
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-10 w-auto"/>
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                    {link.map((item, i) => (
                        <div key={i} className="relative group">
                            <Link
                                to={item.url}
                                className={`
                                    text-lg font-medium transition-all duration-300 ease-in-out
                                    ${location.pathname === item.url
                                    ? 'text-[#00AA55] font-bold scale-105'
                                    : 'text-gray-700 hover:text-[#00AA55]'}
                                `}
                            >
                                {item.link}
                                {location.pathname === item.url && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-[-4px] left-0 right-0 h-[3px] bg-[#00AA55]"
                                    />
                                )}
                            </Link>
                        </div>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => dispatch(logout())}
                        className="bg-[#ff1818] text-white px-4 py-2 rounded-full hover:bg-[#ff4d4d] transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Page Transition Wrapper */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="absolute"
                >
                    {/* Your page content will be wrapped with this */}
                </motion.div>
            </AnimatePresence>
        </header>
    );
};

export default Navbar;