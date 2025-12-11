import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.token) return <Navigate to="/login" replace />;

  if (auth.user?.role !== "admin") {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default AdminRoute;
