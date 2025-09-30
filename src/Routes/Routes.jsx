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
import PaymentIntegration from "../Pages/PaymentGateway/PaymentIntegration";
import InvoicePage from "../Pages/InvoicePage/InvoicePage";
import ManagePayment from "../Pages/PagesForAdmin/ManagePayment/ManagePayment";
import ManageUsers from "../Pages/PagesForAdmin/ManageUsers/ManageUsers";
import ManageCategories from "../Pages/PagesForAdmin/ManageCategories/ManageCategories";
import SalesReport from "../Pages/PagesForAdmin/SalesReport/SalesReport";
import ApproveAds from "../Pages/PagesForAdmin/ApproveAds/ApproveAds";
import AdminHome from "../Pages/PagesForAdmin/AdminHome/AdminHome";
import SellerHome from "../Pages/SellerPages/SellerHome/SellerHome";
import AdminPrivateRoute from "../Pages/PrivateRoute/AdminPrivateRoute";
import SellerPrivateRoute from "../Pages/PrivateRoute/SellerPrivateRoute";
import ForbiddenRoute from "../Pages/ForbiddenRoute/ForbiddenRoute";
import CategoryDetails from "../Pages/CategoryDetails/CategoryDetails";
import UserPrivateRoute from "../Pages/PrivateRoute/UserPrivateRoute";
import PaymentHistoryUser from "../Pages/PagesForUser/PaymentHistoryUser/PaymentHistoryUser";
import DashboardDefault from "../Root/DashboardDefault";
import UserProfile from "../Pages/UserProfile/UserProfile";
import SellerProfile from "../Pages/SellerPages/SellerProfile/SellerProfile";
import ProfileView from "../Pages/PagesForAdmin/ProfileView/ProfileView";




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
                loader: () => fetch("http://localhost:5000/medicineCount"), 
                element: <PrivateRoute> <Shop></Shop> </PrivateRoute>
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
            {
                path: "/forbiddenRoute",
                Component: ForbiddenRoute
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardRoot></DashboardRoot>,
        children: [
            {
                index: true, // this matches "/dashboard"
                element: <DashboardDefault/>
            },
            {
                path: "/dashboard/manageMedicine",
                element: <SellerPrivateRoute> <ManageMedicine></ManageMedicine> </SellerPrivateRoute>
            },
            {
                path: "/dashboard/paymentHistory",
                element : <SellerPrivateRoute> <PaymentHistory></PaymentHistory> </SellerPrivateRoute>
            },
            {
                path: "/dashboard/askForAd",
                element : <SellerPrivateRoute> <AskForAd></AskForAd> </SellerPrivateRoute>

            },
            {
                path: "/dashboard/manageUsers",
                element: <AdminPrivateRoute> <ManageUsers></ManageUsers> </AdminPrivateRoute>
            },
            {
                path: "/dashboard/manageCategories",
                element: <AdminPrivateRoute> <ManageCategories></ManageCategories> </AdminPrivateRoute>
            },
            {
                path: "/dashboard/managePayments",
                element: <AdminPrivateRoute> <ManagePayment></ManagePayment> </AdminPrivateRoute>
            },
            {
                path: "/dashboard/salesReport",
                element: <AdminPrivateRoute> <SalesReport></SalesReport> </AdminPrivateRoute>
            },
            {
                path: "/dashboard/approveAds",
                element: <AdminPrivateRoute> <ApproveAds></ApproveAds> </AdminPrivateRoute>
            },
            {
                path: "/dashboard/adminHome",
                element: <AdminPrivateRoute> <AdminHome></AdminHome> </AdminPrivateRoute>
            },
            {
                path: "/dashboard/adminProfile",
                element: <AdminPrivateRoute> <ProfileView></ProfileView> </AdminPrivateRoute>
            },
            {
                path: "/dashboard/sellerHome",
                element: <SellerPrivateRoute> <SellerHome></SellerHome> </SellerPrivateRoute>
            },
            {
                path: "/dashboard/sellerProfile",
                element: <SellerPrivateRoute> <SellerProfile></SellerProfile> </SellerPrivateRoute>
            },
            {
                path: "/dashboard/paymentHistoryUser",
                element: <UserPrivateRoute> <PaymentHistoryUser></PaymentHistoryUser> </UserPrivateRoute>
            },
            {
                path: "/dashboard/userProfile",
                element: <UserPrivateRoute> <UserProfile></UserProfile> </UserPrivateRoute>
            }
        ]
    }
])