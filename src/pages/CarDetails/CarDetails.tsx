import { useState } from "react";
import { useGetSingleCarQuery } from "@/redux/feature/cars/carsApi";
import { useParams } from "react-router-dom";
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
        <div className="container mx-auto font-epilogue flex gap-8 px-4 mt-16">
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
                <div className="mt-5 space-y-2">
                    {data?.data?.features?.map((feature: string, idx: number) => (
                        <div className="flex items-center gap-2 text-[#9333EA]" key={idx}>
                            <span><FaCheckCircle /></span>
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:w-1/3 w-full h-[350px] sticky top-10 left-0 bg-[#F3F4F6] px-4 py-7 rounded-xl dark:bg-[#111827]">
                <div className="flex items-end border-b border-gray-300 pb-7">
                    <h1 className="flex items-center text-5xl font-bold"><TbCurrencyTaka className="-mr-2 text-[50px]" />{data?.data?.pricePerHour}</h1>
                    <p className="text-gray-500 font-medium">/Rent per Hour</p>
                </div>
                <div className="mt-6">
                    <div className="flex items-center justify-between text-lg gap-4">
                        <h1 className="flex items-center justify-between text-base gap-1 font-medium text-gray-500"><LuUsers /> <span className="mt-1">Passenger</span></h1>
                        <h1 className="font-semibold text-gray-500">{data?.data?.passenger}</h1>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-lg gap-4">
                        <h1 className="flex items-center justify-between text-base gap-1 font-medium text-gray-500"><GiCarDoor /> <span className="mt-1">Doors</span></h1>
                        <h1 className="font-semibold text-gray-500">{data?.data?.doors}</h1>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-lg gap-4">
                        <h1 className="flex items-center justify-between text-base gap-1 font-medium text-gray-500"><MdOutlineLuggage /> <span className="mt-1">Luggage</span></h1>
                        <h1 className="font-semibold text-gray-500">{data?.data?.luggage}</h1>
                    </div>
                </div>
                <div className="border-t border-gray-300 mt-7 pt-4">
                    <button className="text-white px-5 py-2 rounded font-medium text-lg bg-purple-600">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
