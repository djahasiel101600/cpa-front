import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    isAuth: boolean;
    children: React.ReactNode;
}

const ProtectedRoute = ({isAuth, children} : ProtectedRouteProps) => {
    return isAuth ? <>{children}</> : <Navigate to={'/login'} replace />;  
}

export default ProtectedRoute;