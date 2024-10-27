import DashBoardChart from "@/components/DashboardHome/DashBoardChart";
import Info from "@/components/DashboardHome/Info";
import RecentBookings from "@/components/DashboardHome/RecentBookings";


const AdminDashboard = () => {
    return (
        <div>
            <Info />
            <DashBoardChart />
            <RecentBookings />
        </div>
    );
};

export default AdminDashboard;