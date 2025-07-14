import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import JoinUs from "../Pages/JoinUs/JoinUs";
import Login from "../Pages/Login/Login";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
import MyCart from "../Pages/MyCart/MyCart";
import DashboardRoot from "../Root/DashboardRoot";
import ManageMedicine from "../Pages/SellerPages/ManageMedicine/ManageMedicine";
import PaymentHistory from "../Pages/SellerPages/PaymentHistory/PaymentHistory";
import AskForAd from "../Pages/SellerPages/AskForAd/AskForAd";



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
                path: "/myCart",
                element: <PrivateRoute> <MyCart></MyCart> </PrivateRoute>
            },
            {
                path: "/login",
                Component: Login
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute> <DashboardRoot></DashboardRoot> </PrivateRoute>,
        children: [
            {
                path: "/dashboard/manageMedicine",
                Component: ManageMedicine
            },
            {
                path: "/dashboard/paymentHistory",
                Component: PaymentHistory
            },
            {
                path: "/dashboard/askForAd",
                Component: AskForAd
            }
        ]
    }
])