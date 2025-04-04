import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    number: "",
    email: "",
    password: "",
    password2: "",
    tc: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.number) {
      newErrors.number = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = "Phone number must be 10 digits.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.password2) {
      newErrors.password2 = "Confirm your password.";
    } else if (formData.password !== formData.password2) {
      newErrors.password2 = "Passwords do not match.";
    }

    if (!formData.tc) {
      newErrors.tc = "You must agree to the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Registration successful!");
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] px-4">
      <form
        className="w-full max-w-md bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-700 
          flex flex-col justify-between h-[90vh]"
        onSubmit={handleSubmit}
      >
        <div className="overflow-auto flex-1">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Create Account
          </h2>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Phone Number</label>
            <input
              data-tooltip-id="phone-tooltip"
              data-tooltip-content="Enter a valid 10-digit phone number"
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="9876543210"
            />
            {errors.number && (
              <p className="text-red-500 text-xs mt-1">{errors.number}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              data-tooltip-id="email-tooltip"
              data-tooltip-content="Use a valid email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              data-tooltip-id="password-tooltip"
              data-tooltip-content="Minimum 6 characters"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Confirm Password</label>
            <input
              data-tooltip-id="password2-tooltip"
              data-tooltip-content="Repeat the password above"
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="••••••••"
            />
            {errors.password2 && (
              <p className="text-red-500 text-xs mt-1">{errors.password2}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="mb-4 flex items-center">
            <input
              data-tooltip-id="tc-tooltip"
              data-tooltip-content="You must accept to proceed"
              type="checkbox"
              name="tc"
              checked={formData.tc}
              onChange={handleChange}
              className="mr-2 w-4 h-4 accent-blue-600"
            />
            <label className="text-gray-300 text-sm">
              I agree to the Terms & Conditions
            </label>
          </div>
          {errors.tc && <p className="text-red-500 text-xs">{errors.tc}</p>}
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 py-1 h-auto bg-[#1e293b]">

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 text-sm"
          >
            Register
          </button>
        </div>

        {/* Tooltips */}
        <Tooltip id="phone-tooltip" place="right" />
        <Tooltip id="email-tooltip" place="right" />
        <Tooltip id="password-tooltip" place="right" />
        <Tooltip id="password2-tooltip" place="right" />
        <Tooltip id="tc-tooltip" place="top" />
      </form>
    </div>
  );
};

export default Registration;
