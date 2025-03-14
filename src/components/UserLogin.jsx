import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const UserLogin = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  };


  return (
    <form className="max-w-lg mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-white text-2xl font-semibold text-center mb-4">Login</h2>

      <input
        className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        name="email"
        placeholder="Email Address"
        required
      />

      <input
        className="w-full p-3 rounded mt-3 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        name="password"
        placeholder="Password"
        required
      />

      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
      >
        {/* {isLoading ? "Logging in..." : "Login"} */}
        Login
      </button>


      <div className="text-center mt-4">
        <NavLink to="/sendpasswordresetemail" className="text-blue-400 hover:underline">
          Forgot Password?
        </NavLink>
      </div>
    </form>
  );
};

export default UserLogin;
