import {Outlet} from "react-router-dom";
import NavbarLandingPage from "../components/NavbarLandingPage";
import {setupAxios} from "@/config/axiosConfig.js";

export default function PublicLayout() {
    setupAxios()
    return (
        <>
            <NavbarLandingPage/>
            <Outlet/>
        </>
    );
}
