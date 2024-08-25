import { useAllCarsQuery } from "@/redux/feature/cars/carsApi";
import { TCar } from "@/types/car.interface";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
                        <img
                            className="w-full h-[200px] object-cover"
                            src="https://img.freepik.com/premium-photo/orange-sports-car-with-license-plate-number-6099_1015384-117429.jpg?w=740"
                            alt={car.name}
                        />
                        <CardContent className="px-2 py-3">
                            <h1 className="text-2xl font-bold">{car.name}</h1>
                            <div className="flex items-center justify-between pt-2 pb-4">
                                <h1 className="flex items-center">
                                    <TbCurrencyTaka size={24} />
                                    <span className="text-xl font-medium">{car.pricePerHour}</span>
                                    <span className="text-lg">/Hour</span>
                                </h1>
                                <h1 className="flex items-center text-gray-500">
                                    <IoLocationSharp size={20} />
                                    <span className="font-medium">Dhaka</span>
                                </h1>
                            </div>
                            <Button variant="outline" className="w-full">View Details</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCars;
