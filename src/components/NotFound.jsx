import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-400 mt-2 text-center px-6">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      
      <Link 
        to="/" 
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition duration-300"
      >
        Go Back Home
      </Link>

      <div className="mt-10">
        <img
          src="https://cdni.iconscout.com/illustration/free/thumb/free-404-page-not-found-6755383-5669053.png"
          alt="Not Found"
          className="w-80"
        />
      </div>
    </div>
  );
};

export default NotFound;
