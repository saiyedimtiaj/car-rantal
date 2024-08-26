import { MdCheck } from "react-icons/md";
import { FaCar, FaCrown, FaBolt, FaSubway } from "react-icons/fa";

const team = [
    {
        id: 1,
        image: "https://demo.awaikenthemes.com/html-preview/novaride/light/images/team-1.jpg",
        name: "John Smith",
        role: "Senior Chauffeur"
    },
    {
        id: 2,
        image: "https://demo.awaikenthemes.com/html-preview/novaride/light/images/team-2.jpg",
        name: "Taylor Smith",
        role: "City Tour Guide"
    },
    {
        id: 3,
        image: "https://demo.awaikenthemes.com/html-preview/novaride/light/images/team-3.jpg",
        name: "Jordan Brown",
        role: "Distance Driver"
    },
    {
        id: 4,
        image: "https://demo.awaikenthemes.com/html-preview/novaride/light/images/team-4.jpg",
        name: "Davis Casey",
        role: "Travel Specialist"
    },
]

const fleet = [
    {
        id: 1,
        icon: <FaCar className="text-6xl text-gray-600" />,
        name: "Economy",
        description: "Affordable and fuel-efficient, perfect for city driving."
    },
    {
        id: 2,
        icon: <FaCrown className="text-6xl text-gray-600" />,
        name: "Luxury",
        description: "Experience the ultimate comfort and style on the road."
    },
    {
        id: 3,
        icon: <FaSubway className="text-6xl text-gray-600" />,
        name: "SUVs",
        description: "Spacious and powerful, ideal for family trips and off-road adventures."
    },
    {
        id: 4,
        icon: <FaBolt className="text-6xl text-gray-600" />,
        name: "Electric",
        description: "Eco-friendly options with advanced technology and zero emissions."
    },
];


const About = () => {
    return (
        <div className="container mx-auto px-4 font-epilogue">
            <div className="flex items-start gap-8 flex-col lg:flex-row mt-10">
                <div className="lg:w-1/2 w-full relative p-4">
                    <img className="h-3/4 py-10" src="https://webdesignmastery.github.io/RentalX_20-07-24/assets/header.png" alt="Header" />
                    <div className="absolute -z-[99999] rounded-3xl left-1/2 -translate-x-1/2 w-2/3 bg-purple-600 h-full top-0"></div>
                </div>
                <div className="lg:w-1/2 w-full">
                    <p className="text-xl font-medium text-indigo-600">About Us</p>
                    <h1 className="lg:text-5xl text-2xl font-bold mt-2">Your trusted partner in reliable car rental</h1>
                    <p className="mt-3 text-gray-500 text-lg font-medium">We offer a wide selection of vehicles to fit your every need, with a seamless booking process and 24/7 support to ensure your journey is smooth.</p>
                    <div className="flex items-center gap-4 mt-5">
                        <div>
                            <img className="w-full h-28 dark:hidden" src="https://demo.awaikenthemes.com/html-preview/novaride/light/images/icon-about-trusted-1.svg" alt="Trusted Icon 1" />
                            <img className="w-full h-28 hidden dark:block" src="https://demo.awaikenthemes.com/html-preview/novaride/dark/images/icon-about-trusted-1.svg" alt="Trusted Icon 1 Dark" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">Easy booking process</h2>
                            <p className="text-lg mt-2">Our optimized booking process ensures a hassle-free experience from start to finish.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-5">
                        <div>
                            <img className="w-full h-28 dark:hidden" src="https://demo.awaikenthemes.com/html-preview/novaride/light/images/icon-about-trusted-2.svg" alt="Trusted Icon 2" />
                            <img className="w-full h-28 hidden dark:block" src="https://demo.awaikenthemes.com/html-preview/novaride/dark/images/icon-about-trusted-2.svg" alt="Trusted Icon 2 Dark" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">Convenient pick-up & return process</h2>
                            <p className="text-lg mt-2">With multiple locations, pick-up and return are as easy as driving your rental off the lot.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse gap-10 mt-20">
                <div className="w-full lg:w-1/2">
                    <img className="rounded-3xl" src="https://demo.awaikenthemes.com/html-preview/novaride/dark/images/our-vision-img.jpg" alt="" />
                </div>
                <div className="w-full lg:w-1/2">
                    <p className="text-xl font-medium text-indigo-600">Company History</p>
                    <h2 className="lg:text-5xl text-2xl font-bold mt-2">Pioneering excellence in car rental services</h2>
                    <p className="mt-4 text-gray-500 text-lg font-medium">
                        Founded in 2010, our mission has always been to provide reliable and affordable car rental services to customers worldwide. We started with a small fleet of vehicles and a commitment to customer satisfaction, and today, we have grown into a global brand recognized for our quality services.
                    </p>
                    <div className="space-y-4 mt-10">
                        <div className="flex items-center gap-2">
                            <span className="bg-purple-600 p-1.5 text-white font-semibold text-[19px] rounded-full"><MdCheck /></span>
                            <span className="text-xl font-normal">Our customers are our top priority</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-purple-600 p-1.5 text-white font-semibold text-[19px] rounded-full"><MdCheck /></span>
                            <span className="text-xl font-normal">Quality is at the heart of everything we do</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-purple-600 p-1.5 text-white font-semibold text-[19px] rounded-full"><MdCheck /></span>
                            <span className="text-xl font-normal">every vehicle leaves care looking its absolute best</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <h2 className="lg:text-5xl text-2xl font-bold text-center mt-2">
                    Ensuring your safety and <br />
                    comfort on every journey
                </h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:grid-cols-4">
                    {
                        team?.map((team) => <div key={team.id} className="flex flex-col items-center justify-center">
                            <div className="overflow-hidden">
                                <img
                                    className="rounded-lg transition-transform transform hover:scale-105"
                                    src={team.image}
                                    alt={team.name}
                                />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">{team.name}</h1>
                            <p className="text-lg text-gray-500">{team.role}</p>
                        </div>)
                    }
                </div>
            </div>
            <div className="mt-16">
                <h2 className="lg:text-5xl text-2xl font-bold text-center mt-2 text-gray-900 dark:text-gray-100">Our Fleet</h2>
                <p className="text-lg text-center text-gray-500 dark:text-gray-400 mt-4">Choose from a wide variety of vehicles to suit your needs.</p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        fleet.map((car) => (
                            <div key={car.id} className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
                                <div className="mb-4">
                                    {car.icon}
                                </div>
                                <h1 className="text-2xl font-bold mt-2 text-gray-900 dark:text-gray-100">{car.name}</h1>
                                <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 text-center">{car.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default About;
