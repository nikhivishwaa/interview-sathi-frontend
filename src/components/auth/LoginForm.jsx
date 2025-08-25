import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { emailValidator } from "../../helpers/validators";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { analytics, setAnalyticsUser } from "../../helpers/analytics";

const LoginForm = () => {
  const { initiateAuthConfirmation, updateUser } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = () => {
    if (!email.length) {
      setValidEmail(false);
      setEmailError("Please enter email / mobile no.");
    }
    if (isNaN(parseInt(email))) {
      if (!emailValidator(email)) {
        setValidEmail(false);
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
        setValidEmail(true);
      }
    } else {
      // validate phone number
      if (email.search(/^\d{10}$/) === -1) {
        setValidEmail(false);
        setEmailError("Please enter a valid phone number");
      } else {
        setEmailError("");
        setValidEmail(true);
      }
    }
  };

  const validatePassword = () => {
    if (!password.length) {
      setValidPassword(false);
      setPasswordError("Please enter password");
    } else {
      setPasswordError("");
      setValidPassword(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("checking login form");
    validateEmail();
    validatePassword();
    if (validEmail && validPassword) {
      console.log({ email, password });
      setSubmitting(true);
      handleSignIn();
    }
  };
  async function handleSignIn() {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND;
      const response = await axios.post(
        `${apiUrl}/users/login/`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const { access, refresh, user } = response.data.data;
        setAnalyticsUser(user.id);
        analytics.event({
          category: "User Authentication",
          action: "user_logged_in",
          label: `success`,
          value: user.id,
        });
        secureLocalStorage.setItem("token", access);
        secureLocalStorage.setItem("refresh_token", refresh);
        updateUser(user);
        secureLocalStorage.setItem("lastLogin", new Date().getTime());
        initiateAuthConfirmation();
        toast.success(
          `Welcome, ${
            user?.first_name[0]?.toUpperCase() + user?.first_name.slice(1)
          }!`
        );
        // getAuth();
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      console.log("Error while signing in: ", error);
      console.log(error.response.status);
      if (error.response.status === 404) toast.error("Account not Exist!");
      else if (error.response.status === 400)
        toast.error("Invalid Credentials!");
      else toast.error("Something went wrong. Try again!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-sathi-primary hover:underline"
          >
            create a new account
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email / Phone
            </label>
            <input
              readOnly={submitting}
              type="text"
              id="email"
              name="email"
              className="sathi-input mt-1"
              placeholder="email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              onBlur={validateEmail}
              style={{ borderColor: validEmail ? "#555" : "red" }}
            />
            <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
              {emailError}
            </span>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                className="sathi-input pr-10"
                placeholder="••••••••"
                readOnly={submitting}
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                style={{ borderColor: validPassword ? "#555" : "red" }}
                onBlur={validatePassword}
              />
              <button
                type="button"
                className="absolute right-0 top-[8px] pr-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
              <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                {passwordError}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 text-sathi-primary focus:ring-sathi-primary border-gray-300 rounded"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-sathi-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="sathi-btn-primary w-full"
          >
            {submitting ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
