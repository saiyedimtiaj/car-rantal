import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAllCarsQuery } from "@/redux/feature/cars/carsApi";
import { TCar } from "@/types/car.interface";
import { FaCar } from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { MdOutlineLuggage } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AllCars = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState(() => {
        return Object.fromEntries([...searchParams]);
    });

    const { data, isLoading, isFetching } = useAllCarsQuery(params);

    useEffect(() => {
        setSearchParams(params, { replace: true });
    }, [params, setSearchParams]);

    if (isLoading || isFetching) {
        return <p>Loading....</p>;
    }

    const handleCategory = (category: string) => {
        setParams((prev) => ({ ...prev, category }));
    };

    const handleColor = (color: string) => {
        setParams((prev) => ({ ...prev, color }));
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setParams((prev) => ({ ...prev, searchTrams: formData.get("search") as string }));
    }

    return (
        <div className="font-epilogue container mx-auto px-4 mt-12">
            <div className="flex flex-col md:flex-row gap-7 w-full h-full">
                <div className="md:w-1/4 w-full px-4 py-4 rounded-lg bg-[#F3F4F6] dark:bg-[#111827]">
                    {/* Search Input */}
                    <form className="relative mt-4 mb-4" onSubmit={handleSearch}>
                        <input
                            type="text"
                            name="search"
                            defaultValue={params.searchTrams}
                            className="focus:outline-none px-6 py-2.5 w-full rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1f2937] placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="Search..."
                        />
                        <button type="submit" className="absolute inset-y-0 bg-purple-600 right-0 flex items-center px-[10px] rounded-full">
                            <IoIosSearch className="text-white text-2xl" />
                        </button>
                    </form>

                    {/* Category Filter */}
                    <div className="border-t pt-6 mb-5 border-gray-400 dark:border-gray-800">
                        <h1 className="text-2xl font-semibold mb-3">Category</h1>
                        <RadioGroup defaultValue={params.category} onValueChange={handleCategory} >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="suv" id="suv" />
                                <Label htmlFor="suv">SUV</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hybrid" id="hybrid" />
                                <Label htmlFor="hybrid">Hybrid</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sedan" id="sedan" />
                                <Label htmlFor="sedan">Sedan</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="coupe" id="coupe" />
                                <Label htmlFor="coupe">Coupe</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="luxury" id="luxury" />
                                <Label htmlFor="luxury">Luxury</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Color Filter */}
                    <div className="border-t pt-6 border-gray-400 pb-5 dark:border-gray-800">
                        <h1 className="text-2xl font-semibold mb-3">Filter Color</h1>
                        <RadioGroup defaultValue={params.color} onValueChange={handleColor} >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="white" id="white" />
                                <Label htmlFor="white">White</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="blue" id="blue" />
                                <Label htmlFor="blue">Blue</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="gray" id="gray" />
                                <Label htmlFor="gray">Gray</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="black" id="black" />
                                <Label htmlFor="black">Black</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                                    <Link to={`/details/${car?._id}`}>
                                        <button className="bg-purple-600 text-white px-4 py-1.5 text-sm rounded">Details</button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllCars;
