import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../apiClient/apiClient";
import Navbar from "./Navbar";



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

  // Fetch user by ID
  const fetchUserById = async () => {
    
    try {
      const response = await apiClient.get(`/api/users/${id}`);
      console.log("Fetched user:", response.data);
      setEmail(response.data.email);
      setRole1(response.data.role);
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

  return (
    <>
    <Navbar/>
    <div className="p-6">
      <p className="text-2xl font-semibold mb-4">Update User Page</p>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 rounded-md px-3 py-2"
        />

        <label>Role</label>
        <select
          name="role"
          value={role1}
          onChange={(e) => setRole1(e.target.value)}
          className="border border-gray-400 rounded-md px-3 py-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Update
          </button>

          <button
            onClick={() => navigate("/user")}
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminUpdate;
