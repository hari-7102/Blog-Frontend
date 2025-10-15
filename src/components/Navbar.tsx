

import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const username = localStorage.getItem('Username')
    const role = localStorage.getItem('Role')
    const Admin = role === 'admin';
    const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center bg-gray-600 text-white px-6 py-4 shadow-md fixed w-full top-0 ">
      {/* Left side - App Name */}
      <div className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
               BlogSpace
            </div>
      {
        Admin ?(
          <button
          onClick={() => navigate('/user')} 
          >Manage Users 
          </button>
        ) :  null

      } 
      {/* Right side - Username + Create Blog */}
      <div className="flex items-center space-x-6">
        {/* Username */}
        <span className="text-lg font-medium"> Hii , {username}</span>

        {/* Create Blog Button */}
        <button
          onClick={() => window.location.href = '/create'}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          New Blog
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
