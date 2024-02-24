import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    return false ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;