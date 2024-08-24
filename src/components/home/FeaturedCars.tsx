import { useAllCarsQuery } from "@/redux/feature/cars/carsApi";


const FeaturedCars = () => {
    const { data } = useAllCarsQuery(undefined);
    console.log(data);
    return (
        <div>

        </div>
    );
};

export default FeaturedCars;