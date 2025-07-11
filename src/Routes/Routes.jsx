import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";



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
        ]
    },

])