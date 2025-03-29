import { useState } from "react";
import { FaBars, FaQuestionCircle, FaCog, FaEnvelope } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex  bg-gray-100 h-[calc(100vh-4rem)] ">
      {/* Sidebar */}
      <div className={`bg-white p-5 w-64 space-y-6 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
        <h1 className="text-xl font-semibold flex items-center">
          <IoMdDocument className="mr-2" /> Interview Prep AI
        </h1>
        <nav>
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">
            <IoMdDocument className="mr-2" /> My Interviews
          </a>
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">
            <MdOutlinePayments className="mr-2" /> Billings
          </a>
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">
            <FaCog className="mr-2" /> Settings
          </a>
        </nav>
        <hr />
        <nav>
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">
            <FaQuestionCircle className="mr-2" /> FAQ
          </a>
          <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded">
            <FaEnvelope className="mr-2" /> Contact Us
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded shadow">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-600">
            <FaBars size={20} />
          </button>
          <h2 className="text-lg font-semibold">My Interviews</h2>
          <div className="flex items-center space-x-3">
            <span className="text-gray-700">John Doe</span>
            {/* <img src="https://via.placeholder.com/40" className="w-10 h-10 rounded-full" alt="User" /> */}

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2thNrvhfUKHJQ4EY8bfciWT5jJ4Aakhedw&s"
              className="w-10 h-10 rounded-full"
              alt="AI Chat Avatar"
            />

          </div>
        </div>

        {/* Interview Table */}
        <div className="bg-white p-6 mt-6 rounded shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-200">
                <th className="p-3">Job Title</th>
                <th className="p-3">Company</th>
                <th className="p-3">Job Description</th>
                <th className="p-3">Resume</th>
                <th className="p-3">Created At</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-100">
                <td className="p-3">Software Engineer</td>
                <td className="p-3">NA</td>
                <td className="p-3 text-blue-500 cursor-pointer hover:underline">View JD</td>
                <td className="p-3 text-blue-500 cursor-pointer hover:underline">View Resume</td>
                <td className="p-3">March 27, 2025</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-300 text-gray-700 rounded">Draft</span>
                </td>
                <td className="p-3">
                  <Link to="/AI-Interviewer">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">
                      Start Now
                    </button>
                  </Link>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-100">
                <td className="p-3">ML Engineer</td>
                <td className="p-3">NA</td>
                <td className="p-3 text-blue-500 cursor-pointer hover:underline">View JD</td>
                <td className="p-3 text-blue-500 cursor-pointer hover:underline">View Resume</td>
                <td className="p-3">March 27, 2025</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-300 text-gray-700 rounded">Draft</span>
                </td>
                <td className="p-3">
                  <Link to="/AI-Interviewer">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">
                      Start Now
                    </button>
                  </Link>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-100">
                <td className="p-3">DL Engineer</td>
                <td className="p-3">NA</td>
                <td className="p-3 text-blue-500 cursor-pointer hover:underline">View JD</td>
                <td className="p-3 text-blue-500 cursor-pointer hover:underline">View Resume</td>
                <td className="p-3">March 27, 2025</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-300 text-gray-700 rounded">Draft</span>
                </td>
                <td className="p-3">
                  <Link to="/AI-Interviewer">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">
                      Start Now
                    </button>
                  </Link>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-100">
                <td className="p-3">IOT Engineer</td>
                <td className="p-3">NA</td>
                <td className="p-3 text-blue-500 cursor-pointer hover:underline">View JD</td>
                <td className="p-3 text-blue-500 cursor-pointer hover:underline">View Resume</td>
                <td className="p-3">March 27, 2025</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-300 text-gray-700 rounded">Draft</span>
                </td>
                <td className="p-3">
                  <Link to="/AI-Interviewer">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">
                      Start Now
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
