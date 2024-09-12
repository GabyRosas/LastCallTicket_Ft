import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const LayoutWithNavbar = () => (
    <>
        <Navbar />
        <main><Outlet /></main>
        <Footer />
    </>
);

const LayoutWithoutNavbar = () => (
    <>
    <main><Outlet /></main>
    <Footer />
    </>
    
);

export { LayoutWithNavbar, LayoutWithoutNavbar };