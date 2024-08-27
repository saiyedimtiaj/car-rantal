import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const UserProtacted = ({ children }: { children: ReactNode }) => {
    const { token } = useAppSelector(state => state.auth);

    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
};

export default UserProtacted;
