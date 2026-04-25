import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";


function ProtectedRoutes() {
    const { isUserLoggedIn  } = useAuth();

    if (!isUserLoggedIn) {
        return <Navigate to="/login" replace />;
    } else {
        return(<Outlet />);
    }
}

export default ProtectedRoutes;