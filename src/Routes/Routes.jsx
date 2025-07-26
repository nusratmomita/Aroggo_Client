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
import CategoryDetails from "../CategoryDetails/CategoryDetails";
import PaymentIntegration from "../Pages/PaymentGateway/PaymentIntegration";
import InvoicePage from "../Pages/InvoicePage/InvoicePage";
import ManagePayment from "../Pages/PagesForAdmin/ManagePayment/ManagePayment";
import ManageUsers from "../Pages/PagesForAdmin/ManageUsers/ManageUsers";
import ManageCategories from "../Pages/PagesForAdmin/ManageCategories/ManageCategories";
import SalesReport from "../Pages/PagesForAdmin/SalesReport/SalesReport";
import ApproveAds from "../Pages/PagesForAdmin/ApproveAds/ApproveAds";
import AdminHome from "../Pages/PagesForAdmin/AdminHome/AdminHome";



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
            },
            {
                path: "/category/:categoryName",
                element: <PrivateRoute> <CategoryDetails></CategoryDetails> </PrivateRoute>
            },
            {
                path: "/myCart",
                element: <PrivateRoute> <MyCart></MyCart> </PrivateRoute>
            },
            {
                path: "/payment",
                element: <PrivateRoute> <PaymentIntegration></PaymentIntegration> </PrivateRoute>
            },
            {
                path: "/invoicePage",
                element: <PrivateRoute> <InvoicePage></InvoicePage> </PrivateRoute>
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
            },
            {
                path: "/dashboard/manageUsers",
                Component: ManageUsers
            },
            {
                path: "/dashboard/manageCategories",
                Component: ManageCategories
            },
            {
                path: "/dashboard/managePayments",
                Component: ManagePayment
            },
            {
                path: "/dashboard/salesReport",
                Component: SalesReport
            },
            {
                path: "/dashboard/approveAds",
                Component: ApproveAds
            },
            {
                path: "/dashboard/adminHome",
                Component: AdminHome
            }
        ]
    }
])