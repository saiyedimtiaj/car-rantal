import banner from "../../assets/hero_img.png"

const Hero = () => {
    return (
        <div className="container mx-auto px-4 h-[calc(100vh-72px)] md:flex items-center justify-center">
            <div className="flex flex-col-reverse md:flex-row lg:justify-between gap-10 md:py-0 py-12 lg:items-center">
                <div className="max-w-[500px] space-y-3">
                    <h1 className="text-4xl font-bold">Easy and fast way to <br /> <span className="text-purple-600">Rent</span> a car with MetroRide</h1>
                    <p className="text-gray-600 text-[17px] font-normal">We offer a wide extend of rental cars to suit your needs.Wather you'ar arrenging a weekend travle or a buisness trip.</p>
                    <button className="text-white font-medium px-5 py-2 rounded bg-purple-600">Get Started</button>
                </div>
                <div>
                    <img className="lg:h-[400px] h-full w-full" src={banner} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Hero;