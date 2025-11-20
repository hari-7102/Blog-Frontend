// import React from 'react'

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, CheckCircle } from 'lucide-react';
import Img from '../assets/Forgot.png'
import apiClient from '../apiClient/apiClient';

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  // const [errors, setErrors] = useState({});



  const handleSubmit = async() => {
    
    // e.preventDefault();
    const data = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };
    try{
        const reponse = await apiClient.post('/forgotpassword',data)
        console.log(reponse.data);
        // alert("Password Reset Successful!.");
        // window.location.href = '/login';
    }catch (error: unknown) {
          console.error('Error registering user:', error);

          let errorMessage = 'Registration failed. Please try again.';

          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            errorMessage = axiosError.response?.data?.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          setError(errorMessage);
          
          
        }
  }


  return (
    <div className='w-full flex overflow-hidden'>

        <div className='w-1/2 '>
            <img src={Img} alt="" />
        </div>
        

        <div className="w-1/2  min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
                <p className="text-gray-600">Enter your details to reset your password</p>
            </div>

            
                <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e)=> setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 border  rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                    placeholder="you@example.com"
                    />
                </div>

                
                
                </div>

                <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                    New Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full pl-10 pr-12 py-3 border  rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                    placeholder="Enter new password"
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                
                </div>

                <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block">
                    Confirm Password
                </label>
                <div className="relative">
                    <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full pl-10 pr-12 py-3 border  rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                    placeholder="Confirm new password"
                    />
                    <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                
                </div>

                {error && <p className='text-red-600 text-center mb-2'>{error}</p>}

                <button
                 onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all shadow-lg"
                >
                Reset Password
                </button>
            
            <div className="text-center">
                <a href="/login" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Back to Login
                </a>
            </div>
            </div>
        </div>
        </div>


    </div>
  );
};

export default ForgotPassword;
