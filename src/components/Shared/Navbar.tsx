import { Link, NavLink } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { BiMenuAltRight } from "react-icons/bi";
import { Button } from "../ui/button";
import ThemeSwitcher from "@/utils/theme-switcher";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOutUser } from "@/redux/feature/auth/authSlice";

const Navbar = () => {
    const { user } = useAppSelector(state => state.auth);
    const distatch = useAppDispatch();

    const handleLogout = () => {
        distatch(logOutUser())
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-4 py-4">
                <div>
                    <Link to='/' className="text-2xl font-bold">
                        <span>Metro</span>
                        <span className="text-purple-600">Ride</span>
                    </Link>
                </div>
                <div className="hidden lg:flex items-center gap-5">
                    <NavLink to="/" className="text-lg font-medium">Home</NavLink>
                    <NavLink to="/about" className="text-lg font-medium">About Us</NavLink>
                    <NavLink to="/booking" className="text-lg font-medium">Booking</NavLink>
                    <NavLink to="/Contact" className="text-lg font-medium">Contact</NavLink>
                </div>
                <div className="flex items-center -gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="lg:hidden"><BiMenuAltRight size={27} /></DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-3 lg:hidden">
                            <DropdownMenuLabel><NavLink to="/" className="text-lg font-medium">Home</NavLink></DropdownMenuLabel>
                            <DropdownMenuItem><NavLink to="/about" className="text-lg font-medium">About Us</NavLink></DropdownMenuItem>
                            <DropdownMenuItem><NavLink to="/booking" className="text-lg font-medium">Booking</NavLink></DropdownMenuItem>
                            <DropdownMenuItem><NavLink to="/contact" className="text-lg font-medium">Contact</NavLink></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ThemeSwitcher />
                    {
                        user ? <Button onClick={handleLogout}>Logout</Button> : <Link to='/signin'>
                            <Button>Login</Button>
                        </Link>
                    }
                </div>
            </div>
        </div >
    );
};

export default Navbar;