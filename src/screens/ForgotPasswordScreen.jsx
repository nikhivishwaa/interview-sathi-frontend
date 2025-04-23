import React, { useEffect } from "react";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordScreen = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto text-center mb-10">
      <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto h-12 w-auto rounded-lg border-1 border-[#ecedee]"
          />
        </Link>
        <Link to="/">
          <h1 className="text-3xl font-bold text-sathi-primary">
            Interview Sathi
          </h1>
        </Link>
        <p className="mt-2 text-gray-600">Reset your password</p>
      </div>

      <div className="mx-auto w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
