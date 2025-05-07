import { createContext, useState, useContext, useEffect } from "react";
import api from "../config/api";
import { useLocation } from "react-router-dom";
import { getUserGate } from "../routes/APIGates";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const res = await api.get(getUserGate);
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]); // gọi lại khi thay đổi route

  const login = (userData) => {
    setUser(userData);
  };

  const isAdmin = () => user?.role === "Admin";

  const isActive = () => user?.status === "active";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        isAdmin,
        isActive,
        fetchUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
