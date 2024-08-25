import Dashboard from "@/layout/Dashboard";
import Main from "@/layout/Main";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Home from "@/pages/Home/Home";
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
        element: <Dashboard />
    }
]);

export default router