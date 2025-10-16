
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { TextAlignJustify } from 'lucide-react';
import { useState } from 'react';


const Navbar = () => {

    const [isOpen , SetisOpen] = useState(false)
    const username = localStorage.getItem('Username')
    const role = localStorage.getItem('Role')
    const Admin = role === 'admin';
    const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center bg-gray-600 text-white px-6 py-4 shadow-md fixed w-full top-0 ">
      {/* Left side - App Name */}
      <div className='flex justify-center items-center gap-7'>
      <div   onClick={() => navigate('/blog')} className="cursor-a text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
               BlogSpace
      </div>

      {
        Admin ?(
          <button  
          className='mt-2 px-5 py-1.5 rounded-xl bg-blue-400 text-white hover:bg-blue-400 transition duration-300'
          onClick={() => navigate('/user')}
          >Manage User
          </button>
        ) :  null
      } 

      </div>
      {/* Right side - Username + Create Blog */}

      <div className="md:flex hidden items-center space-x-6">
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

      <div className='md:hidden flex items-center justify-center '>
        <button onClick={() => SetisOpen(!isOpen)}>
          {isOpen ? (
            <X size={23} className="text-white  cursor-pointer" />
          ) : (
            <TextAlignJustify size={23} className="text-white    cursor-pointer" />
          )}
        </button>
        
      </div>

            {isOpen && (
        <div className="absolute top-18 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-3 py-4 md:hidden shadow-lg transition-all">
          <p className="text-lg">{username}</p>
          <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
