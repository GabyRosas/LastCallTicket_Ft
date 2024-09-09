import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { LayoutWithNavbar, LayoutWithoutNavbar } from "../layout/Layout";
import Login from "../pages/Login";
import Search from "../pages/Search";
import Register from "../pages/Register";
import Detail from "../pages/Detail";
import Ticketupdate from "../pages/Ticketupdate";
import '../index.css';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutWithNavbar/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },       
                       
        ]
    },
    {
        element: <LayoutWithoutNavbar />, 
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/search",
                element: <Search/>,
            },  
            {
                path: "/register",
                element: <Register/>,
            },  
            {
                path: "/ticket-details/:ticketId",
                element: <Detail/>,
            },  
            {
                path: "/ticketupdate/:ticketId",
                element: <Ticketupdate/>,
            },              
        ],
    },
])