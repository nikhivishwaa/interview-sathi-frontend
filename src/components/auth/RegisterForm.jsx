import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import { emailValidator, passwordValidator } from "../../helpers/validators";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [userInput, setUserInput] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    phone: "",
    email: "",
    college: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({
    fnameError: "",
    lnameError: "",
    genderError: "",
    phoneError: "",
    emailError: "",
    collegeError: "",
    passwordError: "",
    repasswordError: "",
  });

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  // check first name
  const validateFname = () => {
    if (userInput.first_name.length < 3) {
      return "First Name must have 3 or more characters";
    } else if (userInput.first_name.trim().search(/^[a-zA-Z]{3,}$/)) {
      return "First Name must have alphabets only";
    } else {
      return "";
    }
  };
  // check last name if given
  const validateLname = () => {
    if (userInput.last_name.length) {
      let last_name = userInput.last_name.trim();
      if (
        last_name.search(/^[a-z\sA-Z]{2,}$/) !== 0 ||
        last_name.search(/\s{2,}/) !== -1
      ) {
        return "Remove extra spaces or number from Last Name";
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  // check gender
  const validateGender = () => {
    if (!userInput.gender) return "Please select gender";
    else return "";
  };

  // check email
  const validateEmail = () => {
    if (!userInput.email.length) return "Please enter email";
    else if (!emailValidator(userInput.email))
      return "Please enter a valid email address";
    else {
      return "";
    }
  };

  // check phone
  const validatePhone = () => {
    if (!userInput.phone.length) return "Please enter phone number";
    else if (userInput.phone.search(/^\d{10}$/) === -1)
      return "Please enter a valid phone number";
    else return "";
  };

  // check college
  const validateCollege = () => {
    if (userInput.college.trim().length < 3) {
      return "Please enter college name properly";
    } else {
      return "";
    }
  };
  // check password
  const validatePassword = () => {
    if (!userInput.password.length) {
      return "Please enter password";
    } else if (userInput.password.length < 8) {
      return "Password must be 8 character long";
    } else if (!passwordValidator(userInput.password)) {
      return "Password must contain alphanumeric (a-z, A-Z, 0-9) and @, !, $, %, ^, &, *, (, ), +, -, ?, /";
    } else {
      return "";
    }
  };

  // check confirm password
  const validateRepassword = () => {
    if (!userInput.confirm_password.length) {
      return "Please enter confirm password";
    } else if (userInput.confirm_password !== userInput.password) {
      return "Confirm Password should be same as password";
    } else if (userInput.confirm_password === userInput.password) {
      return validatePassword();
    } else {
      return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    console.log("checking login form");
    const checks = {};
    checks.fnameError = validateFname();
    checks.lnameError = validateLname();
    checks.genderError = validateGender();
    checks.phoneError = validatePhone();
    checks.emailError = validateEmail();
    checks.collegeError = validateCollege();
    checks.passwordError = validatePassword();
    checks.repasswordError = validateRepassword();

    setError(checks);
    let errorCount = 0;
    for (const err in checks) {
      errorCount += checks[err].length ? 1 : 0;
    }
    if (!errorCount) {
      console.log(userInput);
      setSubmitting(true);
      handleSignUp();
    } else {
      toast.warning("Please correct the details");
    }
  };

  async function handleSignUp() {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND;
      const response = await axios.post(`${apiUrl}/users/signup/`, userInput, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        console.log(response.data);
        toast.success("Registration successful! Please log in.");
        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      console.log("Error while signing in: ", error);
      if (error.response.status === 409)
        toast.error("User Already Exist. Continue with Login!");
      else toast.error("Something went wrong. Try again!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-sathi-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              className="sathi-input mt-1"
              placeholder="Your First Name"
              readOnly={submitting}
              value={userInput.first_name}
              onChange={handleChange}
              required={true}
              style={{
                borderColor: !error.fnameError.length ? "#555" : "red",
              }}
            />
            <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
              {error?.fnameError}
            </span>
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              className="sathi-input mt-1"
              readOnly={submitting}
              placeholder="Your Last Name"
              value={userInput?.last_name}
              onChange={handleChange}
              style={{
                borderColor: !error.lnameError.length ? "#555" : "red",
              }}
            />
            <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
              {error?.lnameError}
            </span>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="sathi-input mt-1"
              placeholder="your-email@example.com"
              readOnly={submitting}
              value={userInput?.email}
              onChange={handleChange}
              required={true}
              style={{
                borderColor: !error.emailError.length ? "#555" : "red",
              }}
            />
            <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
              {error?.emailError}
            </span>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="sathi-input mt-1"
              placeholder="9876543210"
              readOnly={submitting}
              pattern="[0-9]{10}"
              value={userInput?.phone}
              onChange={handleChange}
              required={true}
              style={{
                borderColor: !error.phoneError.length ? "#555" : "red",
              }}
            />
            <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
              {error?.phoneError}
            </span>
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required={true}
              readOnly={submitting}
              value={userInput.gender}
              onChange={handleChange}
              className="sathi-input mt-1"
            >
              <option value="">Select</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="x">Other</option>
            </select>
            <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
              {error?.genderError}
            </span>
          </div>

          <div>
            <label
              htmlFor="college"
              className="block text-sm font-medium text-gray-700"
            >
              College/University
            </label>
            <input
              id="college"
              name="college"
              type="text"
              className="sathi-input mt-1"
              placeholder="Your Institution"
              readOnly={submitting}
              value={userInput?.college}
              onChange={handleChange}
              required={true}
              style={{
                borderColor: !error.collegeError.length ? "#555" : "red",
              }}
            />
            <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
              {error?.collegeError}
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
                name="password"
                type={showPassword ? "text" : "password"}
                className="sathi-input pr-10"
                placeholder="••••••••"
                readOnly={submitting}
                value={userInput?.password}
                onChange={handleChange}
                required={true}
                style={{
                  borderColor: !error.passwordError.length ? "#555" : "red",
                }}
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
                {error.passwordError}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <input
                id="confirm_password"
                className="sathi-input mt-1"
                placeholder="••••••••"
                readOnly={submitting}
                type={showRePassword ? "text" : "password"}
                name="confirm_password"
                value={userInput?.confirm_password}
                onChange={handleChange}
                required={true}
                style={{
                  borderColor: !error.repasswordError.length ? "#555" : "red",
                }}
              />
              <button
                type="button"
                className="absolute right-0 top-[10px] pr-3 text-gray-500"
                onClick={() => setShowRePassword(!showRePassword)}
              >
                {showRePassword ? (
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
                {error?.repasswordError}
              </span>
            </div>
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
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
