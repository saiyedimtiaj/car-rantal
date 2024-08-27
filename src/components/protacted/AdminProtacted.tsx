import { TUser } from "@/redux/feature/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import verifyToken from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


const AdminProtacted = ({ children }: { children: ReactNode }) => {
    const { token } = useAppSelector(state => state.auth);

    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    const user = verifyToken(token) as TUser
    if (user?.role !== "admin") {
        return <Navigate to="/*" replace />;
    }

    return <>{children}</>;
};

export default AdminProtacted;