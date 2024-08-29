import { useState } from "react";
import { useGetSingleCarQuery } from "@/redux/feature/cars/carsApi";
import { Link, useParams } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { GiCarDoor } from "react-icons/gi";
import { MdOutlineLuggage } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const CarDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleCarQuery(id);
    const [isZoomed, setIsZoomed] = useState(false);

    if (isLoading) {
        return <p>Loading....</p>;
    }

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    return (
        <div className="container mx-auto font-epilogue flex flex-col md:flex-row gap-8 px-4 mt-16">
            <div className="md:w-2/3 w-full">
                <div
                    className={`relative overflow-hidden rounded-3xl ${isZoomed ? "zoomed" : ""}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        className={`w-full h-full lg:h-[450px] object-cover transition-transform duration-500 ${isZoomed ? "scale-110" : "scale-100"}`}
                        src={data?.data?.image}
                        alt={data?.data?.name}
                    />
                </div>
                <h1 className="md:text-5xl font-semibold text-3xl mt-8">{data?.data?.name}</h1>
                <p className="text-gray-500 mt-2">{data?.data?.description}</p>

                {/* Features */}
                <div className="mt-5 space-y-2">
                    <h2 className="text-2xl font-semibold mb-3">Features</h2>
                    {data?.data?.features?.map((feature: string, idx: number) => (
                        <div className="flex items-center gap-2 text-[#9333EA]" key={idx}>
                            <span><FaCheckCircle /></span>
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Insurance Options */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-3">Insurance Options</h2>
                    <p className="text-gray-500">
                        Our cars come with a range of insurance options to suit your needs, including:
                    </p>
                    <ul className="list-disc ml-5 mt-2 text-gray-500">
                        <li>Basic Coverage: Included with all rentals.</li>
                        <li>Comprehensive Coverage: Available at an additional cost.</li>
                        <li>Roadside Assistance: Optional add-on.</li>
                    </ul>
                </div>

                {/* Cancellation Policy */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-3">Cancellation Policy</h2>
                    <p className="text-gray-500">
                        We offer a flexible cancellation policy to accommodate changes in your plans:
                    </p>
                    <ul className="list-disc ml-5 mt-2 text-gray-500">
                        <li>Free cancellation up to 24 hours before the rental start time.</li>
                        <li>50% refund for cancellations within 24 hours of the rental start time.</li>
                        <li>No refund for no-shows or cancellations after the rental start time.</li>
                    </ul>
                </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3 w-full h-[450px] sticky top-10 left-0 bg-[#F3F4F6] px-4 py-7 rounded-xl dark:bg-[#111827]">
                <div className="flex items-end border-b border-gray-300 pb-4 lg:pb-7">
                    <h1 className="flex items-center text-5xl font-bold">
                        <TbCurrencyTaka className="-mr-2 text-[40px] lg:text-[50px]" />
                        {data?.data?.pricePerHour}
                    </h1>
                    <p className="text-gray-500 font-medium">/Rent per Hour</p>
                </div>
                <div className="mt-3">
                    <div className="flex items-center justify-between text-lg gap-4">
                        <h1 className="flex items-center justify-between text-sm lg:text-base gap-1 font-medium text-gray-500">
                            <LuUsers /> <span className="mt-1">Passenger</span>
                        </h1>
                        <h1 className="font-semibold text-gray-500">{data?.data?.passenger}</h1>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-lg gap-4">
                        <h1 className="flex items-center justify-between text-sm lg:text-base gap-1 font-medium text-gray-500">
                            <GiCarDoor /> <span className="mt-1">Doors</span>
                        </h1>
                        <h1 className="font-semibold text-gray-500">{data?.data?.doors}</h1>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-lg gap-4">
                        <h1 className="flex items-center justify-between text-sm lg:text-base gap-1 font-medium text-gray-500">
                            <MdOutlineLuggage /> <span className="mt-1">Luggage</span>
                        </h1>
                        <h1 className="font-semibold text-gray-500">{data?.data?.luggage}</h1>
                    </div>
                </div>
                <div className="mt-3 border-t border-gray-500 pt-3">
                    <h2 className="lg:text-xl text-lg font-semibold mb-2">Additional Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 lg:gap-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-purple-600" />
                            Insurance
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-purple-600" />
                            GPS Navigation
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-purple-600" />
                            Child Seat
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-purple-600" />
                            Additional Driver
                        </label>
                    </div>
                </div>
                <div className="border-t border-gray-300 lg:mt-3 lg:pt-3 mt-2 pt-2">
                    <Link to='/booking'>
                        <button className="text-white px-5 py-2 rounded font-medium text-lg bg-purple-600">Book Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
