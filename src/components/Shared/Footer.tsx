import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="mt-20 bg-gray-100 dark:bg-gray-900">
            <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 lg:grid-cols-4 gap-5 lg:justify-center py-10 px-3">
                <div>
                    <div className="flex items-end cursor-pointer">
                        <Link to='/' className="text-xl font-bold">
                            <span className="text-gray-800 dark:text-gray-100">Metro</span>
                            <span className="text-purple-600 dark:text-purple-400">Ride</span>
                        </Link>
                    </div>
                    <p>Rent a car imperdiet sapien porttito the bibenum ellentesue the commodo erat nesuen.</p>
                    <div className="flex gap-2 mt-3">
                        <span className="border border-gray-800 dark:border-gray-100 cursor-pointer p-2 text-lg rounded-full text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <FaFacebookF />
                        </span>
                        <span className="border border-gray-800 dark:border-gray-100 cursor-pointer p-2 text-lg rounded-full text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <FaInstagram />
                        </span>
                        <span className="border border-gray-800 dark:border-gray-100 cursor-pointer p-2 text-lg rounded-full text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <FaTwitter />
                        </span>
                    </div>
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">Information</h4>
                    <ul className="mt-4 space-y-2 font-medium">
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                            Home
                        </li>
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                            About Us
                        </li>
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                            Booking
                        </li>
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                            Contact
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">Helpful Links</h4>
                    <ul className="mt-4 space-y-2 font-medium">
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                            Support
                        </li>
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                            Terms & Conditions
                        </li>
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                            Privacy
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">Contact</h4>
                    <ul className="mt-4 space-y-1 font-medium">
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                            +880 1615-718970
                        </li>
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                            metroride209@gmail.com
                        </li>
                    </ul>
                </div>
            </div>
            <div className="py-4 text-center border-t border-gray-300 dark:border-gray-700 max-w-[1200px] mx-auto">
                <p className="text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Metro Ride Inc. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
