import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const LayoutWithNavbar = () => (
    <>
        <Navbar />
        <main><Outlet /></main>
    </>
);

const LayoutWithoutNavbar = () => (
    <main><Outlet /></main>
);

export { LayoutWithNavbar, LayoutWithoutNavbar };