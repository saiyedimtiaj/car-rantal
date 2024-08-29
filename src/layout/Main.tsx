import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import { Outlet } from "react-router-dom";


const Main = () => {
    return (
        <div>
            <div className="min-h-[calc(100vh-68px)]">
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;