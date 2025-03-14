import React from 'react';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
import logo from '../assets/logoupdatedd1.webp';

const Navbar = () => {
  const { access_token } = getToken();

  return (
    <div className="mx-auto w-full">
      <nav className="bg-purple-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center" style={{ paddingTop: '28px' }}> {/* Add paddingTop or marginTop */}
              <img 
                src={logo} 
                alt="Logo" 
                height={130}
                width={130}
                className=" object-contain mr-3" // Increased image size here
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-2"> {/* Reduced space between items */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium'
                    : 'text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300'
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium'
                    : 'text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300'
                }
              >
                Contact
              </NavLink>

              <NavLink
                to="/prediction-list"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium'
                    : 'text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300'
                }
              >
                Predictors
              </NavLink>

              {access_token ? (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium'
                      : 'text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300'
                  }
                >
                  Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium'
                      : 'text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300'
                  }
                >
                  Login/Registration
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium'
                  : 'text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300'
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium'
                  : 'text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300'
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/prediction-list"
              className={({ isActive }) =>
                isActive
                  ? 'bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium'
                  : 'text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300'
              }
            >
              Predictors
            </NavLink>

            {access_token ? (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300'
                }
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300'
                }
              >
                Login/Registration
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
