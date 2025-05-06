import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

// Use this to protected logged-in user from accessing login/register/...
const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default GuestRoute;
