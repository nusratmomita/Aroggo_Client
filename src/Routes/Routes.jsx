import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import JoinUs from "../Pages/JoinUs/JoinUs";
import Login from "../Pages/Login/Login";



export const routers = createBrowserRouter([
    {
        path: "/",
        // errorElement: <ErrorPage/>,
        Component: Root,
        children: [
            {
                index: true,
                path: "/",
                Component: Home
            },
            {
                path: "/shop",
                Component: Shop
            },
            {
                path: "/register",
                Component: JoinUs
            },
            {
                path: "/login",
                Component: Login
            }
        ]
    },

])