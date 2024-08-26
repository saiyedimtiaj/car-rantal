import {
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
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
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { RiAddLine } from "react-icons/ri";
import ThemeSwitcher from "@/utils/theme-switcher";

const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: RiDashboardFill },
    { to: "/dashboard/manage-car", label: "Manage Cars", icon: RiAddLine },
    { to: "/products", label: "Products", icon: Package },
    { to: "/customers", label: "Customers", icon: Users },
    { to: "/analytics", label: "Analytics", icon: LineChart },
];

const Dashboard = () => {
    const { pathname } = useLocation()
    return (
        <div className="min-h-screen font-epilogue w-full flex bg-background text-foreground">
            {/* Sidebar */}
            <div className="hidden md:block w-[220px] lg:w-[280px] border-r bg-muted/40">
                <div className="sticky top-0 left-0 min-h-screen flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center h-14 lg:h-[60px] border-b px-4 lg:px-6">
                            <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold">
                                <span>MetroRide</span>
                            </NavLink>
                        </div>
                        <nav className="flex-1 px-2 lg:px-4">
                            {navItems.map(({ to, label, icon: Icon }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={() =>
                                        `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname === to
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-primary"
                                        }`
                                    }
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Sidebar - Bottom */}
                    <div className="px-3 mb-2">
                        <Link
                            to='/'
                            className="flex items-center gap-4 rounded-xl px-3 py-2 transition-all text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                            <Home className="h-5 w-5" />
                            Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full">
                <header className="flex items-center h-14 lg:h-[60px] gap-4 border-b bg-muted/40 px-4 lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="md:hidden shrink-0"
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
                                        className={() =>
                                            `flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${pathname === to
                                                ? "dark:bg-muted bg-[#F3F4F6] text-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
                    <div className="flex-1 w-full"></div>
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
                <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
