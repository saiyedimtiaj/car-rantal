import { useAllCarsQuery } from "@/redux/feature/cars/carsApi";
import { TCar } from "@/types/car.interface";
import { TbCurrencyTaka } from "react-icons/tb";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LuUsers } from "react-icons/lu";
import { MdOutlineLuggage } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedCars = () => {
    const { data, isLoading, isFetching } = useAllCarsQuery(undefined);

    if (isLoading || isFetching) {
        return (
            <div className="container mx-auto mb-12 mt-10 px-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-center mb-10">Our Car Collection</h1>
                <div className="grid grid-cols-1 mt-8 gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index}>
                            <Skeleton className="w-full h-[200px]" />
                            <CardContent className="px-2 py-3">
                                <Skeleton className="h-6 w-3/4 mb-4" />
                                <div className="flex items-center justify-between pt-2 pb-4">
                                    <Skeleton className="h-5 w-1/4" />
                                    <Skeleton className="h-5 w-1/4" />
                                </div>
                                <Skeleton className="h-8 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto mb-12 mt-10 px-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-center mb-10">Our Car Collection</h1>
            <div className="grid grid-cols-1 mt-8 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {data?.data?.map((car: TCar) => (
                    <Card key={car._id}>
                        <CardContent className="px-2 py-3">
                            <img
                                className="w-full h-[200px] rounded-md object-cover"
                                src={car.image}
                                alt={car.name}
                            />
                            <h1 className="text-[20px] font-bold mt-2">{car.name}</h1>
                            <div className="flex items-center justify-between gap-4">
                                <h1 className="flex items-center text-base gap-1 font-medium text-gray-500"><FaCar /> <span className="mt-1">{car?.category}</span></h1>
                                <h1 className="flex items-center text-base gap-1 font-medium text-gray-500"><LuUsers /> <span className="mt-1">{car?.passenger}  Passenger</span></h1>
                            </div>
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <h1 className="flex items-center text-base gap-1 font-medium text-gray-500"><MdOutlineLuggage size={20} /> <span className="mt-1">{car?.luggage} Bag</span></h1>
                                <h1 className="flex items-center text-base gap-1 font-medium text-gray-500"><GiCarDoor size={20} /> <span className="mt-1">{car?.doors} Doors</span></h1>
                            </div>
                            <div className="flex items-center justify-between">
                                <h1 className="flex items-center font-semibold">
                                    <TbCurrencyTaka size={20} />
                                    <span className="">{car.pricePerHour}</span>
                                    <span className="">/Hour</span>
                                </h1>
                                <Link to={`/details/${car?._id}`}>
                                    <button className="bg-purple-600 text-white px-4 py-1.5 text-sm rounded">Details</button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCars;
