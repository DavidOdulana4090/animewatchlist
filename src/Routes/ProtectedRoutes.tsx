import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";


function ProtectedRoutes() {
    const { isLoggedIn  } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    } else {
        return(<Outlet />);
    }
}

export default ProtectedRoutes;