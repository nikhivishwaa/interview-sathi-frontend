import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/react.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mx-auto w-full">
      <nav className="shadow-lg bg-gradient-to-r from-blue-950 to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center pt-1">
              <img 
                src={logo} 
                alt="Logo" 
                height={20}
                width={50}
                className="object-contain mr-3 animate-spin-slow"
              />
            </div>

            <div className="hidden md:flex space-x-2">
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
                to="/not-found"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium'
                    : 'text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300'
                }
              >
                Not-Found
              </NavLink>

              <NavLink
                to="/AI-Interviewer"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium'
                    : 'text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300'
                }
              >
                AI-Interviewer
              </NavLink>

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
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300">
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
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/"
                onClick={toggleMenu}
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
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300'
                }
              >
                Contact
              </NavLink>

              <NavLink
                to="/not-found"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300'
                }
              >
                Not-Found
              </NavLink>

              <NavLink
                to="/AI-Interviewer"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300'
                }
              >
                AI-Interviewer
              </NavLink>

              <NavLink
                to="/login"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300'
                }
              >
                Login/Registration
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
