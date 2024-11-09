import { Outlet } from "react-router-dom";
import NavbarLandingPage from "../components/NavbarLandingPage";

export default function PublicLayout() {
  return (
    <>
      <NavbarLandingPage />
      <Outlet />
    </>
  );
}
