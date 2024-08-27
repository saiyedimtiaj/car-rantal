import AdminProtacted from "@/components/protacted/AdminProtacted";
import UserProtacted from "@/components/protacted/UserProtacted";
import Dashboard from "@/layout/Dashboard";
import Main from "@/layout/Main";
import AddCar from "@/pages/AddCar/AddCar";
import AdminDashboard from "@/pages/AdminDashboard/AdminDashboard";
import AllBookings from "@/pages/AllBookings/AllBookings";
import AllCars from "@/pages/AllCars/AllCars";
import CarDetails from "@/pages/CarDetails/CarDetails";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Home from "@/pages/Home/Home";
import ManageCars from "@/pages/ManageCars/ManageCars";
import MyBookings from "@/pages/MyBookings/MyBookings";
import UserDashboard from "@/pages/UserDashboard/UserDashboard";
import AllUsers from "@/pages/Users/AllUsers";
import About from "@/pages/about/About";
import Signin from "@/pages/signin/Signin";
import Signup from "@/pages/signup/Signup";
import {
    createBrowserRouter
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/cars',
                element: <AllCars />
            },
            {
                path: '/details/:id',
                element: <CarDetails />
            },
            {
                path: '/user-dashboard',
                element: <UserProtacted><UserDashboard /></UserProtacted>
            },
            {
                path: "/my-bookings",
                element: <UserProtacted> <MyBookings /></UserProtacted>
            }
        ]
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: "/dashboard",
        element: <AdminProtacted><Dashboard /></AdminProtacted>,
        children: [
            {
                path: '/dashboard',
                element: <AdminDashboard />
            },
            {
                path: "/dashboard/manage-car",
                element: <ManageCars />
            },
            {
                path: '/dashboard/add-car',
                element: <AddCar />
            },
            {
                path: '/dashboard/users',
                element: <AllUsers />
            },
            {
                path: "/dashboard/bookings",
                element: <AllBookings />
            }
        ]
    }
]);

export default router