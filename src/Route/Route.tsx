import Dashboard from "@/layout/Dashboard";
import Main from "@/layout/Main";
import AddCar from "@/pages/AddCar/AddCar";
import AdminDashboard from "@/pages/AdminDashboard/AdminDashboard";
import CarDetails from "@/pages/CarDetails/CarDetails";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Home from "@/pages/Home/Home";
import ManageCars from "@/pages/ManageCars/ManageCars";
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
                path: '/details/:id',
                element: <CarDetails />
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
        element: <Dashboard />,
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
            }
        ]
    }
]);

export default router