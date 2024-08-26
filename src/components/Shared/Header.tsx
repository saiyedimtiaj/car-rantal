import { Link } from "react-router-dom";
import banner from "../../assets/page-header-bg.jpg";

const Header = ({ label }: { label: string }) => {
    return (
        <div className="relative">
            <img className="w-full rounded-3xl" src={banner} alt="" />
            <div className="absolute inset-0 rounded-3xl bg-black/40 flex flex-col items-center justify-center">
                <h1 className="text-[25px] font-bold md:text-5xl text-white">{label}</h1>
                <h1 className="flex items-center font-medium text-base md:text-xl gap-2 mt-3">
                    <Link className="text-white" to='/'>Home</Link>
                    <p className="text-white">/</p>
                    <p className="text-red-500">{label}</p>
                </h1>
            </div>
        </div>
    );
};

export default Header;
