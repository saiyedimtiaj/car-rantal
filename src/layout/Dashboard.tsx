import {
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    ShoppingCart,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import ThemeSwitcher from "@/utils/theme-switcher";

const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: RiDashboardFill },
    { to: "/orders", label: "Orders", icon: ShoppingCart },
    { to: "/products", label: "Products", icon: Package },
    { to: "/customers", label: "Customers", icon: Users },
    { to: "/analytics", label: "Analytics", icon: LineChart },
];

const Dashboard = () => {
    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden border-r bg-muted/40 md:block w-[220px] lg:w-[280px]">
                <div className="flex min-h-screen sticky top-0 left-0 flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <NavLink to="/" className="flex items-center gap-2 font-semibold">
                                <span>MetroRide</span>
                            </NavLink>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                {navItems.map(({ to, label, icon: Icon }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive
                                                ? "bg-muted text-primary"
                                                : "text-muted-foreground hover:text-primary"
                                            }`
                                        }
                                    >
                                        <Icon className="h-4 w-4" />
                                        {label}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div className="px-3 mb-2">
                        <Link to='/' className="mx-[-0.65rem] flex items-center gap-4 font-medium rounded-xl px-3 py-2 transition-all text-muted-foreground hover:text-foreground">
                            <Home />
                            home
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                {navItems.map(({ to, label, icon: Icon }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        className={({ isActive }) =>
                                            `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${isActive
                                                ? "bg-muted text-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                            }`
                                        }
                                    >
                                        <Icon className="h-5 w-5" />
                                        {label}
                                    </NavLink>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1"></div>
                    <div className="flex items-center gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ThemeSwitcher />
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
