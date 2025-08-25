import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { analytics, setAnalyticsUser } from "../helpers/analytics";

const API = import.meta.env.VITE_BACKEND || "http://localhost:8000";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  const initiateAuthConfirmation = async () => {
    const authStatus = async () => {
      try {
        const auth = secureLocalStorage.getItem("token");
        const userData = JSON.parse(secureLocalStorage.getItem("user"));
        const lastLogin = parseInt(secureLocalStorage.getItem("lastLogin"));
        if (auth && !isNaN(lastLogin)) {
          const isExpired =
            new Date().getTime() - lastLogin > 1000 * 3600 * 24 * 4;
          console.log(isExpired);
          if (isExpired) {
            secureLocalStorage.clear();
            setUser(null);
            setToken("");
            return false;
          }
          setUser(userData);
          setToken(auth);
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    };
    const authStatusResult = await authStatus();
    if (authStatusResult) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    initiateAuthConfirmation();
  }, []);

  useEffect(() => {
    setAnalyticsUser(user?.id);
  }, [user]);

  const logout = () => {
    analytics.event({
      category: "User Authentication",
      action: "Logout",
      label: "successful",
    });
    setAnalyticsUser();
    secureLocalStorage.clear();
    initiateAuthConfirmation();
    navigate("/", { replace: true });
    setTimeout(() => toast.success("Logged out successfully!"), 150);
  };

  const updateUser = (userData) => {
    setUser(userData);
    secureLocalStorage.setItem("user", JSON.stringify(userData));
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(undefined);
    try {
      await axios.post(`${API}/users/password/reset/`, { email });
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Failed to send reset email.");
      toast.error("Failed to send reset email.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    setLoading(true);
    setError(undefined);
    try {
      await axios.post(`${API}/users/password/reset/confirm/`, {
        token,
        password,
      });
      toast.success("Password reset successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Failed to reset password.");
      toast.error("Failed to reset password.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    token,
    isAuthenticated,
    updateUser,
    setIsAuthenticated,
    initiateAuthConfirmation,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
