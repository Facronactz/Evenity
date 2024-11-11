import React from "react";
import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom";
import {setupAxios} from "../config/axiosConfig";

const RootLayout = () => {
    setupAxios()

    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default RootLayout;
