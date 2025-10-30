
import React , { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient/apiClient';
import Img from '../assets/Login.png'
const Login = () => {

  const navigate = useNavigate();
    const [email , setEmail] = React.useState("");
    const [password , setPassword] = React.useState("");
    const [showPassword , setShowPassword] = useState(false);

    const handlesubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        const data = {email , password}
        
        const response = await apiClient.post('/login' , data)
        console.log(response.data);
        localStorage.setItem('authToken' , response.data.accesstoken)
        localStorage.setItem('User Id' , response.data.user_id)
        localStorage.setItem('Role' , response.data.role)
        localStorage.setItem('Username' , response.data.username)
        window.location.href = '/blog';

    }

    const handleRouter = () => {
      navigate('/')
    }
  return (
    <div className="w-full  min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-blue-400">

      
      <div className='md:w-1/2  w-full  items-center flex justify-center'>
      <form className=" p-8 rounded-xl shadow-xl w-md ">
        <h2 className="text-2xl font-bold mb-6 text-center   ">Login</h2>

        <div className="mb-4">
          <label className="block text-lg font-medium  text-gray-900 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4      relative">
          <label className="block text-lg font-medium text-gray-900 mb-1">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'} // 👈 toggle type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
          />
          {/* 👁️ Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-11 text-gray-800 text-sm focus:outline-none cursor-pointer"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div> 

        <div className='flex justify-between items-center mb-3.5'>
        <p  onClick={handleRouter}      className='text-gray-600 hover:underline underline-offset-2 cursor-pointer'>Back to Home </p>
        <p onClick={() => navigate('/forgot')} className='text-gray-600 hover:underline underline-offset-2 cursor-pointer'>Forgot Password ?</p>
        </div>
        <button
          type="submit"
          onClick={handlesubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:scale-105  transition duration-300 cursor-pointer"
        >
          Log In
        </button>

        {/* <button className='w-full text-white py-2 rounded-md hover:bg-gray-900 bg-gray-700 mt-3'  onClick={handleRouter}>Back to Home</button> */}

        <p className="text-smd text-center mt-4 text-gray-800">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
      </div>

      <div className='w-1/2 h-full md:flex hidden items-center justify-center'>
        <img src={Img} alt="" className='rounded-xl h-screen ml-6' />
      </div>
    </div>
  );
};

export default Login;
