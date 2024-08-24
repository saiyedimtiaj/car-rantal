import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ReactStars from 'react-rating-star-with-type';
import { FaQuoteLeft } from "react-icons/fa";

const carousalData = [
    {
        name: "Emily Clarkson",
        comment: "I rented a car for a weekend getaway, and the experience was seamless. The vehicle was clean, well-maintained, and drove smoothly. The customer service was top-notch, helping me choose the perfect car for my trip. I highly recommend this rental service for anyone looking for reliability and quality.",
        rating: 5,
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258218/siopbuys6frspb9shepo.avif"
    },
    {
        name: "Michael Reynolds",
        comment: "The car rental process was quick and easy. The vehicle I received was in great condition and performed well during my business trip. The pricing was reasonable, and the pickup and drop-off were hassle-free. Will definitely use this service again for my next trip.",
        rating: 4,
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258219/mvrd4h1gooa8mkufj5tv.avif"
    },
    {
        name: "Camron Green",
        comment: "Rented a car for a family vacation, and it was perfect for our needs. The car was spacious, comfortable, and had all the modern features we needed. The staff was friendly and helpful, ensuring we had everything we needed for a smooth trip. Highly recommend for family travels!",
        rating: 5,
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724391040/man-with-his-arms-crossed-shirt-that-says-hes-smiling_1022944-22208_yvhvsl.avif"
    },
    {
        name: "David Johnson",
        comment: "The car I rented was in excellent condition, and the rental process was straightforward. The only downside was the limited availability of certain models, but the staff helped me find a suitable alternative. Overall, a good experience, and I would rent from here again.",
        rating: 4,
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258218/my92jirblk6nq6oasp3x.avif"
    },
];

function Testimonial() {
    return (
        <div className="container mx-auto mb-12 mt-20">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-center mb-10">What Our Customar Say</h1>
            <div className="relative flex items-center">
                <Carousel className="border-none w-full">
                    <CarouselContent className="w-full border-none">
                        {carousalData.map((item, index) => (
                            <CarouselItem key={index} className="">
                                <div className="">
                                    <Card className="border-none shadow-none">
                                        <CardContent className="flex flex-col gap-y-4 items-center justify-center p-4 h-full">
                                            <img className="w-36 h-36 rounded-full border-2 border-black object-cover" src={item.image} alt="" />
                                            <h1 className="text-2xl font-semibold">{item.name}</h1>
                                            <ReactStars size={20} activeColor="#FFCE00" value={item.rating} />
                                            <div className='relative'>
                                                <span className='text-5xl opacity-25 z-20 absolute top-1 left-3'><FaQuoteLeft /></span>
                                                <p className='mt-5 text-center'>{item.comment}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -left-6 top-1/2 transform -translate-y-1/2" />
                    <CarouselNext className="absolute -right-6 top-1/2 transform -translate-y-1/2" />
                </Carousel>
            </div>
        </div>
    );
}

export default Testimonial;