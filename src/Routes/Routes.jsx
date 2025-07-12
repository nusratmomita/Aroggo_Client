import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";



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
            }
        ]
    },

])