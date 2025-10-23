import React, { useState } from 'react';
import apiClient from '../apiClient/apiClient';
import Img from '../assets/Sign.png'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',

  });

  const [showpassword, setShowPassword] = useState(false);

  const [role] = useState('user');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add form validation and API call
    console.log('Form submitted:', formData, role);
    const data = { ...formData, role };
    try {
        const response = await apiClient.post('/api/users' , data);
        console.log(response.data);
        alert("Registration Successful!.");
        window.location.href = '/login';
    } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full  min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-300">

      <div className='w-1/2 hidden  md:flex items-center justify-center'>
        <img src={Img} alt="" className='rounded-lg h-screen mr-7'/>
      </div>                  

      <div className='w-full md:w-1/2 items-center flex justify-center'>
        <div
          
          className=" p-8 rounded-xl shadow-xl w-full max-w-md "
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Full Name :
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Email :
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Password :
            </label>
            <input
              type={showpassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button onClick={()=> setShowPassword(!showpassword)} className='absolute right-4 bottom-2.5'>{showpassword ? "Hide" : "show"}</button>
          </div>

          {/* <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
              Role :
          </label>
          <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
          </select>
          </div> */}


          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
            <button onClick={() => window.location.href='/'} className='w-full bg-black text-white rounded-md py-1.5  mt-2'>
              Back 
            </button>
          <p className="text-md text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>    

    </div>
  );
};

export default Register;
