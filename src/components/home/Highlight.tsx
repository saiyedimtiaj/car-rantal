import { RiArrowRightUpLine } from "react-icons/ri";
import { FaCarSide, FaShieldAlt, FaHandsHelping, FaCogs } from "react-icons/fa";

const Highlight = () => {
    return (
        <div className="container mx-auto mb-12 mt-10 px-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-center mb-10">Why Choose Us</h1>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {/* Card 1 */}
                <div className="relative p-5 rounded-md dark:bg-[#000000] bg-[#F3F4F6] overflow-hidden group">
                    <div className="absolute inset-0 bg-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <div className="relative z-10">
                        <FaCarSide className="w-14 h-14 mb-7 text-purple-600 group-hover:text-white transition-colors duration-300" />
                        <h1 className="text-xl mt-3 font-semibold group-hover:text-white transition-colors duration-300">Car Rental with Driver</h1>
                        <p className="mt-2 group-hover:text-white transition-colors duration-300">Enhance your rental experience with additional options.</p>
                        <button className="p-3 rounded-full bg-purple-600 mt-8 text-white font-bold transition-colors duration-300 group-hover:bg-white group-hover:text-purple-600 dark:group-hover:bg-black dark:group-hover:text-white">
                            <RiArrowRightUpLine size={23} className="transition-transform duration-300 group-hover:rotate-45" />
                        </button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="relative p-5 rounded-md dark:bg-[#000000] bg-[#F3F4F6] overflow-hidden group">
                    <div className="absolute inset-0 bg-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <div className="relative z-10">
                        <FaShieldAlt className="w-14 h-14 mb-7 text-purple-600 group-hover:text-white transition-colors duration-300" />
                        <h1 className="text-xl mt-3 font-semibold group-hover:text-white transition-colors duration-300">business car rental</h1>
                        <p className="mt-2 group-hover:text-white transition-colors duration-300">Drive with peace of mind knowing you're fully covered.</p>
                        <button className="p-3 rounded-full bg-purple-600 mt-8 text-white font-bold transition-colors duration-300 group-hover:bg-white group-hover:text-purple-600 dark:group-hover:bg-black dark:group-hover:text-white">
                            <RiArrowRightUpLine size={23} className="transition-transform duration-300 group-hover:rotate-45" />
                        </button>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="relative p-5 rounded-md dark:bg-[#000000] bg-[#F3F4F6] overflow-hidden group">
                    <div className="absolute inset-0 bg-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <div className="relative z-10">
                        <FaHandsHelping className="w-14 h-14 mb-7 text-purple-600 group-hover:text-white transition-colors duration-300" />
                        <h1 className="text-xl mt-3 font-semibold group-hover:text-white transition-colors duration-300">24/7 Support</h1>
                        <p className="mt-2 group-hover:text-white transition-colors duration-300">Our team is here to help you anytime, anywhere.</p>
                        <button className="p-3 rounded-full bg-purple-600 mt-8 text-white font-bold transition-colors duration-300 group-hover:bg-white group-hover:text-purple-600 dark:group-hover:bg-black dark:group-hover:text-white">
                            <RiArrowRightUpLine size={23} className="transition-transform duration-300 group-hover:rotate-45" />
                        </button>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="relative p-5 rounded-md dark:bg-[#000000] bg-[#F3F4F6] overflow-hidden group">
                    <div className="absolute inset-0 bg-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <div className="relative z-10">
                        <FaCogs className="w-14 h-14 mb-7 text-purple-600 group-hover:text-white transition-colors duration-300" />
                        <h1 className="text-xl mt-3 font-semibold group-hover:text-white transition-colors duration-300">Custom Options</h1>
                        <p className="mt-2 group-hover:text-white transition-colors duration-300">Tailor your rental experience to suit your needs.</p>
                        <button className="p-3 rounded-full bg-purple-600 mt-8 text-white font-bold transition-colors duration-300 group-hover:bg-white group-hover:text-purple-600 dark:group-hover:bg-black dark:group-hover:text-white">
                            <RiArrowRightUpLine size={23} className="transition-transform duration-300 group-hover:rotate-45" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Highlight;
