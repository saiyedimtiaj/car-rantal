import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginUserMutation } from "@/redux/feature/auth/authApi";
import { TUser, logInUser } from "@/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import verifyToken from "@/utils/verifyToken";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const Signin = () => {
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { email, password };

        try {
            const res = await loginUser(data).unwrap();
            const userInfo = verifyToken(res?.data?.accessToken) as TUser;
            dispatch(logInUser({
                token: res?.data?.accessToken,
                user: {
                    email: userInfo?.email,
                    role: userInfo?.role,
                },
            }));
            toast.success(res.message);
            navigate('/');
        } catch (err) {
            toast.error((err as any)?.data?.message);
        }
    };

    const handleDemoCredential = (role: string) => {
        switch (role) {
            case "user":
                setEmail("user@gmail.com");
                setPassword("123456");
                break;
            case "admin":
                setEmail("admin@gmail.com");
                setPassword("123456");
                break;
            default:
                setEmail("");
                setPassword("");
        }
    };

    return (
        <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
            <div className="flex flex-col items-center py-12">
                <Button
                    type="button"
                    variant="ghost"
                    className="self-start ml-4 mb-6 flex items-center gap-2"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Button>
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <div className="border-dashed border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4">
                    <h2 className="text-center font-semibold text-gray-700 dark:text-gray-300 mb-2">Demo Credentials</h2>
                    <div className="flex justify-center gap-2">
                        <Button variant="outline" onClick={() => handleDemoCredential("user")}>User</Button>
                        <Button variant="outline" onClick={() => handleDemoCredential("admin")}>Admin</Button>
                    </div>
                </div>
                <form onSubmit={handleLogin} className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Login"}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                    <div className="mt-6">
                        <p className="text-sm text-gray-500">
                            By creating an account, you agree to our
                            <a className="underline cursor-pointer"> terms and conditions </a>
                            and
                            <a className=" underline cursor-pointer"> privacy policy</a>.
                        </p>
                    </div>
                </form>
            </div>
            <div className="hidden bg-muted lg:block">
                <aside className="relative hidden lg:block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>
            </div>
        </div>
    );
};

export default Signin;
