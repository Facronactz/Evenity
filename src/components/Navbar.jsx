import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/authSlice";

const link = [
  { link: "Dashboard", url: "/dashboard" },
  { link: "Vendor", url: "#" },
  { link: "Event", url: "/event" },
  { link: "User", url: "/user" },
  { link: "Transaction", url: "/withdraw" },
];

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {link.map((item, i) => (
            <div key={i} className="relative group">
              {item.link === "Vendor" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-lg font-medium text-gray-700 hover:text-black transition-colors group-hover:text-[#0F9D58]">
                    Vendor
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute mt-2 bg-white shadow-lg rounded-lg border border-gray-200 py-2 min-w-[200px]">
                    <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/vendor/approval" className="block">
                        Vendor Approval
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/vendor/approved" className="block">
                        Approved Vendor
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : item.link === "Transaction" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-lg font-medium text-gray-700 hover:text-black transition-colors group-hover:text-[#0F9D58]">
                    Transaction
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute mt-2 bg-white shadow-lg rounded-lg border border-gray-200 py-2 min-w-[200px]">
                    <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/transaction/withdraw" className="block">
                        Withdraw Approval
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/transaction/approved" className="block">
                        List Transaction
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to={item.url}
                  className="text-lg font-medium text-gray-700  transition-colors hover:text-[#00AA55]"
                >
                  {item.link}
                </Link>
              )}
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
    </header>
  );
};

export default Navbar;
