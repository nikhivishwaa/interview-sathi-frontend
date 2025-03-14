import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("number"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      tc: data.get("tc"),
    };

   
  };

  return (
    <form className="max-w-lg mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-white text-2xl font-semibold text-center mb-4">Register</h2>

      <input
        className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="tel"
        name="number"
        placeholder="Phone Number"
      />

      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        name="email"
        placeholder="Email Address"
      />

      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        name="password"
        placeholder="Password"
      />

      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        name="password2"
        placeholder="Confirm Password"
      />

      <label className="flex items-center mt-4 text-gray-300">
        <input type="checkbox" name="tc" className="mr-2" />
        I agree to the terms and conditions.
      </label>

      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
      >
        {/* {isLoading ? "Registering..." : "Register"} */}
        Register
      </button>
    </form>
  );
};

export default Registration;
