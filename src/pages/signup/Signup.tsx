import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "@/redux/feature/auth/authApi";
import { toast } from "sonner";
import { AiOutlineArrowLeft } from "react-icons/ai";

const schema = z
    .object({
        first_name: z.string().min(1, "First Name is required"),
        last_name: z.string().min(1, "Last Name is required"),
        email: z.string().min(1, "Email is required").email("Email is invalid"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        password_confirmation: z.string().min(6, "Password confirmation must be at least 6 characters"),
        trams: z.boolean().refine((val) => val === true, "You must accept the marketing terms"),
    })
    .superRefine(({ password, password_confirmation }, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["password_confirmation"],
            });
        }
    });

type FormData = z.infer<typeof schema>;

const Signup = () => {
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const userInfo = {
            name: `${data.first_name} ${data.last_name}`,
            email: data.email,
            password: data.password,
            role: "user",
            address: "",
            phone: "",
        };
        try {
            const res = await registerUser(userInfo).unwrap();
            toast.success(res?.message);
            navigate('/signin');
        } catch (err) {
            toast.error((err as any)?.data?.message);
        }
    };

    return (
        <section>
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative hidden lg:block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main className="flex flex-col items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    {/* Back to Home Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                        <AiOutlineArrowLeft size={20} /> Back to Home
                    </button>

                    <div className="max-w-xl lg:max-w-3xl">
                        <h1 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">
                            Register Account 🦑
                        </h1>

                        <p className="mt-2 leading-relaxed text-gray-500">
                            Enter your information to create an account
                        </p>

                        <form className="mt-5 grid grid-cols-6 gap-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <Input
                                    {...register("first_name")}
                                    type="text"
                                    id="first_name"
                                    placeholder="First Name"
                                    className="mt-1 w-full"
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-sm">{errors.first_name.message}</p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <Input
                                    {...register("last_name")}
                                    type="text"
                                    id="last_name"
                                    placeholder="Last Name"
                                    className="mt-1 w-full"
                                />
                                {errors.last_name && (
                                    <p className="text-red-500 text-sm">{errors.last_name.message}</p>
                                )}
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Input
                                    {...register("email")}
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mt-1 w-full"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Input
                                    {...register("password")}
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mt-1 w-full"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <Input
                                    {...register("password_confirmation")}
                                    type="password"
                                    id="password_confirmation"
                                    placeholder="Confirm Password"
                                    className="mt-1 w-full"
                                />
                                {errors.password_confirmation && (
                                    <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
                                )}
                            </div>

                            <div className="col-span-6">
                                <label className="flex gap-4">
                                    <input
                                        {...register("trams")}
                                        type="checkbox"
                                        className="h-5 w-5 rounded-md border-gray-300 bg-white shadow-sm"
                                    />
                                    <span className="text-sm text-gray-700">
                                        I want to receive marketing emails.
                                    </span>
                                </label>
                                {errors.trams && (
                                    <p className="text-red-500 text-sm">{errors.trams.message}</p>
                                )}
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    Create Account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <Link to="/signin" className="text-gray-700 underline ml-2">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default Signup;
