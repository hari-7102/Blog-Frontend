import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../apiClient/apiClient";
import Navbar from "./Navbar";
import { UserCircle, Mail, Shield, Save, ArrowLeft } from 'lucide-react';




const AdminUpdate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check admin role
  const role = localStorage.getItem("Role");
  const isAdmin = role?.toLowerCase() === "admin";

  // Extract user ID from URL
  const id = location.state;

  // State
  const [email, setEmail] = useState<string>("");
  const [role1, setRole1] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user by ID
  const fetchUserById = async () => {
    
    try {
      const response = await apiClient.get(`/api/users/${id}`);
      console.log("Fetched user:", response.data);
      setEmail(response.data.email);
      setRole1(response.data.role);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, [id]);

  // Update user
  const handleUpdate = async (): Promise<void> => {
    if (!id) return;
    const data = { email, role: role1 };
    try {
      const response = await apiClient.put(`/api/users/${id}`, data, {
        withCredentials: true,
      });
      console.log("Update response:", response.data);
      alert("User updated successfully");
      navigate("/user");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!isAdmin) {
    return (
      <p className="text-center text-2xl font-bold mt-10">
        You are not authorized to view this page
      </p>
    );
  }

  if (loading) {
    return <p className="text-center mt-10 text-lg text-gray-500">Loading user...</p>;
  }

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navbar Placeholder */}
      

      {/* Main Content */}
      <div className="p-6 md:p-12">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Update User</h2>
            </div>
            <p className="text-slate-600 ml-14">Modify user information and permissions</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Mail className="w-4 h-4 text-slate-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Shield className="w-4 h-4 text-slate-500" />
                  User Role
                </label>
                <select
                  name="role"
                  value={role1}
                  onChange={(e) => setRole1(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  {role1 === 'admin' ? 'Full access to all features' : 'Standard user permissions'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleUpdate}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <Save className="w-4 h-4" />
                  Update User
                </button>

                <button
                  onClick={() => navigate('/user')}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </button>
              </div>
            </div>
          </div>

          {/* Info Card */}
          
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminUpdate;
