import { LuPhoneCall } from "react-icons/lu";
import { VscMail } from "react-icons/vsc";
import { TfiLocationPin } from "react-icons/tfi";
import { Label } from "../ui/label";

const ContactInfo = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8 mt-20">
            <div className="w-full md:w-1/2 bg-[#F3F4F6] dark:bg-[#111827] rounded-2xl px-6 py-10 md:py-14">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    Contact <br /> information
                </h1>
                <p className="font-medium mt-4 md:mt-5 text-sm md:text-base lg:text-lg">
                    Say something to start a live chat!
                </p>
                <div className="mt-8 md:mt-12">
                    <div className="flex items-center gap-4 md:gap-3">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl">
                            <LuPhoneCall />
                        </h1>
                        <p className="font-medium text-base md:text-lg lg:text-xl">
                            (+880) 1615 718970
                        </p>
                    </div>
                    <div className="flex items-center gap-4 md:gap-3 mt-6 md:mt-5">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl">
                            <VscMail />
                        </h1>
                        <p className="font-medium text-base md:text-lg lg:text-xl">
                            info@domain.com
                        </p>
                    </div>
                    <div className="flex items-center gap-4 md:gap-3 mt-6 md:mt-5">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl">
                            <TfiLocationPin />
                        </h1>
                        <p className="font-medium text-base md:text-lg lg:text-xl">
                            1234 Elm Street, Suite 567 <br /> Springfield, United States
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <div className="flex items-center gap-5 md:gap-8">
                    <div className="w-1/2">
                        <Label>First Name</Label> <br />
                        <input type="text" placeholder="Enter Your Name" className="focus:outline-none border-b w-full dark:text-white text-black bg-transparent border-gray-500 py-1.5" />
                    </div>
                    <div className="w-1/2">
                        <Label>Last Name</Label> <br />
                        <input type="text" placeholder="Enter Your Name" className="focus:outline-none border-b w-full dark:text-white text-black bg-transparent border-gray-500 py-1.5" />
                    </div>
                </div>
                <div className="flex items-center gap-5 md:gap-8 mt-8">
                    <div className="w-1/2">
                        <Label>Email</Label> <br />
                        <input type="text" placeholder="Enter Your Email" className="focus:outline-none border-b w-full dark:text-white text-black bg-transparent border-gray-500 py-1.5" />
                    </div>
                    <div className="w-1/2">
                        <Label>Phone</Label> <br />
                        <input type="text" placeholder="Enter Your Phone" className="focus:outline-none border-b w-full dark:text-white text-black bg-transparent border-gray-500 py-1.5" />
                    </div>
                </div>
                <div className="mt-7">
                    <Label>Message</Label><br />
                    <textarea rows={6} placeholder="Write Your Message" className="focus:outline-none border-b w-full dark:text-white text-black bg-transparent border-gray-500 py-1.5"></textarea>
                </div>
                <button className="bg-purple-600 px-5 py-3 rounded-full text-white font-medium text-lg">Send Message</button>
            </div>
        </div >
    );
};

export default ContactInfo;