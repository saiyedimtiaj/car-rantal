import BookingModal from "@/components/Dialog/BookingModal";
import SearchForm from "@/components/SearchForm/SearchForm";
import { Card, CardContent } from "@/components/ui/card";
import { useAllCarsQuery } from "@/redux/feature/cars/carsApi";
import { TCar } from "@/types/car.interface";
import { useState } from "react";
import { FaCar } from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";
import { MdOutlineLuggage } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";

const Booking = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [carId, setCarId] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading, isFetching } = useAllCarsQuery(Object.fromEntries([...searchParams]));

    if (isLoading || isFetching) {
        return <p>Loading....</p>;
    }

    const handalModal = (id: string) => {
        setCarId(id);
        setIsOpen(true)
    }


    return (
        <div className="container font-epilogue mx-auto px-4 mt-16">
            <SearchForm searchParams={searchParams} setSearchParams={setSearchParams} />
            <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
                {data?.data?.map((car: TCar) => (
                    <Card key={car._id} className="h-[360px]">
                        <CardContent className="px-2 py-3">
                            <img
                                className="w-full h-[200px] rounded-md object-cover"
                                src={car.image}
                                alt={car.name}
                            />
                            <h1 className="text-[20px] font-bold mt-2">{car.name}</h1>
                            <div className="flex items-center justify-between gap-4">
                                <h1 className="flex items-center text-base gap-1 font-medium text-gray-500">
                                    <FaCar /> <span className="mt-1">{car?.category}</span>
                                </h1>
                                <h1 className="flex items-center text-base gap-1 font-medium text-gray-500">
                                    <LuUsers /> <span className="mt-1">{car?.passenger} Passenger</span>
                                </h1>
                            </div>
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <h1 className="flex items-center text-base gap-1 font-medium text-gray-500">
                                    <MdOutlineLuggage size={20} /> <span className="mt-1">{car?.luggage} Bag</span>
                                </h1>
                                <h1 className="flex items-center text-base gap-1 font-medium text-gray-500">
                                    <GiCarDoor size={20} /> <span className="mt-1">{car?.doors} Doors</span>
                                </h1>
                            </div>
                            <div className="flex items-center justify-between">
                                <h1 className="flex items-center font-semibold">
                                    <TbCurrencyTaka size={20} />
                                    <span className="">{car.pricePerHour}</span>
                                    <span className="">/Hour</span>
                                </h1>
                                <button onClick={() => handalModal(car._id)} className="bg-purple-600 text-white px-4 py-1.5 text-sm rounded">Book Now</button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <BookingModal isOpen={isOpen} setIsOpen={setIsOpen} id={carId as string} />
        </div>
    );
};

export default Booking;