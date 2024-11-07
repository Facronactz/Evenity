import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/authSlice";

const link = [
  {
    link: "Dashboard",
    url: "/",
  },
  {
    link: "Vendor",
    url: "#",
  },
  {
    link: "Event",
    url: "/event",
  },
  {
    link: "User",
    url: "/user",
  },
  {
    link: "Transaction",
    url: "/withdraw",
  },
];

const Navbar = () => {

  const dispatch = useDispatch();

  return (
    <header className="w-full max-w-screen border-b border-black py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <img src={logo} alt="" />
        </div>
        <nav>
          <ul className="flex items-center gap-8">
            {link.map((item, i) => (
              <li key={i}>
                {item.link === "Vendor" ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-xl font-bold focus:outline-none">
                        Vendor
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-5 bg-white border-[0.5px] border-gray-400">
                        <DropdownMenuItem className="text-xl font-semibold">
                          <Link to="/vendor/approval">Vendor Approval</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xl font-semibold">
                          <Link to="/vendor/approved">Approved Vendor</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : item.link === "Transaction" ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-xl font-bold focus:outline-none">
                        Transaction
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-5 bg-white border-[0.5px] border-gray-400">
                        <DropdownMenuItem className="text-xl font-semibold">
                          <Link to="/transaction/withdraw">Withdraw Approval</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xl font-semibold">
                          <Link to="/transaction/approved">List Transaction</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <Link className="text-xl font-bold" to={item.url}>
                    {item.link}
                  </Link>
                )}
              </li>
            ))}
             <button onClick={() => dispatch(logout())} className="p-2 bg-red-500 text-white">Logout</button>
          </ul>
         
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
