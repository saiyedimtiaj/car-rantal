import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "@/redux/feature/auth/authApi";
import { toast } from "sonner";

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
    const navigate = useNavigate()
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
            phone: ""
        }
        try {
            const res = await registerUser(userInfo).unwrap();
            toast.success(res?.message)
            navigate('/signin')
        }
        catch (err) {
            toast.error((err as any)?.data?.message)
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

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <h1 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">
                            Register Account 🦑
                        </h1>

                        <p className="mt-2 leading-relaxed text-gray-500">
                            Enter your information to create an account
                        </p>

                        <form className="mt-5 grid grid-cols-6 gap-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="FirstName" className="block text-sm font-medium">
                                    First Name
                                </label>
                                <Input
                                    {...register("first_name")}
                                    id="FirstName"
                                    className="mt-1 w-full rounded-md text-sm shadow-sm"
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-sm">{errors.first_name.message}</p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="LastName" className="block text-sm font-medium">
                                    Last Name
                                </label>
                                <Input
                                    {...register("last_name")}
                                    id="LastName"
                                    className="mt-1 w-full rounded-md text-sm shadow-sm"
                                />
                                {errors.last_name && (
                                    <p className="text-red-500 text-sm">{errors.last_name.message}</p>
                                )}
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium"> Email </label>
                                <Input
                                    {...register("email")}
                                    id="Email"
                                    className="mt-1 w-full rounded-md text-sm shadow-sm"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium"> Password </label>
                                <Input
                                    {...register("password")}
                                    id="Password"
                                    type="password"
                                    className="mt-1 w-full rounded-md text-sm shadow-sm"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium">
                                    Password Confirmation
                                </label>
                                <Input
                                    {...register("password_confirmation")}
                                    id="PasswordConfirmation"
                                    type="password"
                                    className="mt-1 w-full rounded-md text-sm shadow-sm"
                                />
                                {errors.password_confirmation && (
                                    <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
                                )}
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="trams" className="flex gap-4">
                                    <Input
                                        {...register("trams")}
                                        type="checkbox"
                                        id="trams"
                                        className="size-5 rounded-md shadow-sm"
                                    />
                                    <span className="text-sm">
                                        I want to receive emails about events, product updates and company announcements.
                                    </span>
                                </label>
                                {errors.trams && (
                                    <p className="text-red-500 text-sm">{errors.trams.message}</p>
                                )}
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a className="underline cursor-pointer"> terms and conditions </a>
                                    and
                                    <a className=" underline cursor-pointer"> privacy policy</a>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <Link to="/signin" className="underline">Log in</Link>.
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
