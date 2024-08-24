import { CalendarSelectForm } from "@/components/home/CalendarSelectForm";
import FeaturedCars from "@/components/home/FeaturedCars";
import Hero from "@/components/home/Hero";
import Testimonial from "@/components/home/Testimonial";


const Home = () => {
    return (
        <div>
            <Hero />
            <CalendarSelectForm />
            <FeaturedCars />
            <Testimonial />
        </div>
    );
};

export default Home;