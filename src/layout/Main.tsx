import Navbar from "@/components/Shared/Navbar";
import { Outlet } from "react-router-dom";


const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;