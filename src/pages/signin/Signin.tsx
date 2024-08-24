import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginUserMutation } from "@/redux/feature/auth/authApi";
import { TUser, logInUser } from "@/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import verifyToken from "@/utils/verifyToken";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signin = () => {
    const [loginUser] = useLoginUserMutation();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const email = form.email.value;
        const password = form.password.value;
        const data = { email, password }
        try {
            const res = await loginUser(data).unwrap();
            const userInfo = verifyToken(res.data?.accessToken) as TUser
            dispatch(logInUser({
                token: res?.data?.accessToken, user: {
                    email: userInfo?.email,
                    role: userInfo?.role
                }
            }))
            toast.success(res.message)
            navigate('/')
        }
        catch (err) {
            toast.error((err as any).data.message)
        }
    }
    return (
        <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
            <div className="flex items-center justify-center py-12">
                <form onSubmit={handleLogin} className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                defaultValue="saiyed@gmail.com"
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" defaultValue="123456" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="underline">
                            Sign up
                        </Link>
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