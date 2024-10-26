import { Link } from 'react-router-dom';

const Promote = () => {
    return (
        <section className="flex flex-col lg:flex-row gap-6 p-6 h-full max-h-[600px]">
            {/* Explore Cars Section */}
            <div className="w-full md:w-2/5 px-6 py-14 rounded-lg bg-red-500 text-white dark:bg-red-700 dark:text-gray-200 h-full max-h-[600px]">
                <h2 className="text-2xl font-bold">EXPLORE CARS</h2>
                <p className="mt-2 text-lg">Making every journey comfortable and elegant.</p>
                <Link to="/cars">
                    <button className="mt-4 px-4 py-2 bg-transparent border border-white dark:border-gray-200 text-white dark:text-gray-200 rounded">
                        OUR CARS <span aria-hidden="true">↗</span>
                    </button>
                </Link>
            </div>

            {/* Book a Car Section */}
            <div
                className="w-full relative px-6 py-[68px] rounded-lg text-white dark:text-gray-200 bg-cover bg-center h-full max-h-[600px]"
                style={{
                    backgroundImage: "url('https://kits.roxthemes.com/roxride/wp-content/uploads/2024/10/Hero-bg-1.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div> {/* Dark overlay for text readability */}

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold">BOOK A CAR</h2>
                    <p className="mt-2 text-lg">Experience a smooth and stylish ride, making every journey comfortable and elegant.</p>

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-3">
                        <Link to='booking'>
                            <button className="px-4 py-2 bg-red-600 text-white rounded dark:bg-red-800 dark:text-gray-200">
                                BOOK NOW
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Promote;
