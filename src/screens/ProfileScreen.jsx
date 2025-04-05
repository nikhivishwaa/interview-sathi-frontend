import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: user?.firstName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    college: user?.college || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // This would normally call an API to update the user's profile
    toast.success("Profile updated successfully");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
            <p className="text-gray-600">Manage your account settings</p>
          </div>

          <div className="sathi-card mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Personal Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="sathi-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    readOnly
                    className="sathi-input bg-gray-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="sathi-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="college"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    College/University
                  </label>
                  <input
                    id="college"
                    name="college"
                    type="text"
                    value={formData.college}
                    onChange={handleChange}
                    className="sathi-input"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="sathi-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="sathi-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Account Settings
            </h2>

            <div className="space-y-6">
              <div>
                <button
                  onClick={() => navigate("/change-password")}
                  className="sathi-btn-secondary"
                >
                  Change Password
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-red-600 border border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
