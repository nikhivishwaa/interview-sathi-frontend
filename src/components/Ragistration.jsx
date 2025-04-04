import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const data = new FormData(e.currentTarget);
    
    const formData = {
      email: data.get("email"),
      phone: data.get("number"), // Phone number from the input
      first_name: data.get("first_name"), // Assuming you're adding this field
      gender: data.get("gender"), // Assuming you're adding this field
      college: data.get("college"), // Assuming you're adding this field
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
    };

    console.log("formData:", formData);

    try {
      const res = await axios.post("http://127.0.0.1:8000/signup/", formData);

      console.log("Response:", res.data);

      // Redirect to login page after successful registration
      if (res.data.status === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log("catch error:", error);
    } finally {
      setIsLoading(false);  // Stop loading
    }
  };

  return (
    <form className="max-w-lg mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-white text-2xl font-semibold text-center mb-4">Register</h2>



      {/* Email Field */}
      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        name="email"
        placeholder="Email Address"
      />

      {/* Phone Number Field */}
      <input
        className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="tel"
        name="number"
        placeholder="Phone Number"
      />

      {/* First Name Field */}
      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="first_name"
        placeholder="First Name"
      />

      {/* Gender Field */}
      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="gender"
        placeholder="Gender"
      />

      {/* College Field */}
      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="college"
        placeholder="College"
      />

      {/* Password Field */}
      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        name="password"
        placeholder="Password"
      />

      {/* Confirm Password Field */}
      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="confirm_password"
        name="confirm_password"
        placeholder="Confirm Password"
      />

      {/* Terms and Conditions Checkbox */}
      <label className="flex items-center mt-4 text-gray-300">
        <input type="checkbox" name="tc" className="mr-2" />
        I agree to the terms and conditions.
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Registration;
