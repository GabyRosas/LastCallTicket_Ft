import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import '../index.css';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },         
            {
                path: "/login",
                element: <Login/>,
            },      
       
    ]
},
])