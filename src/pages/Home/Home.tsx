import { CalendarSelectForm } from "@/components/home/CalendarSelectForm";
import FeaturedCars from "@/components/home/FeaturedCars";
import Hero from "@/components/home/Hero";
import Highlight from "@/components/home/Highlight";
import Promote from "@/components/home/Promote";
import Testimonial from "@/components/home/Testimonial";


const Home = () => {
    return (
        <div className="font-epilogue">
            <Hero />
            <CalendarSelectForm />
            <FeaturedCars />
            <Highlight />
            <Promote />
            <Testimonial />
        </div>
    );
};

export default Home;