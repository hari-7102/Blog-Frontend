
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
      <div className='w-full '>
        <div className='md:flex hidden justify-between items-center bg-gray-600 py-3 px-6 '>
            <p onClick={() => navigate('/blog')} className="cursor-a text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
              BlogSpace
            </p>

            <p className='flex justify-center items-center gap-4'>
              <p className='text-white'>Hii , {username}</p>
              <button >
                {Admin ? (
                    <button onClick={() => navigate('/user')} className='px-4 py-1.5 text-white bg-green-600 rounded-xl'>Manage User</button>
                ) : null}
              </button>
              <button onClick={() => window.location.href = '/create'} className='px-4 py-1.5 rounded-xl text-white bg-blue-400
              '>New Blog</button>
            </p>
        </div>

        <div className='md:hidden flex justify-between items-center p-4 bg-gray-600'>
            <p  onClick={() => navigate('/blog')} className="cursor-a text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent" >
              BlogSpace
            </p>

            <div>
              {isOpen ? (
                  <X size={23} onClick={() => SetisOpen(!isOpen)} className='text-white'/>
              ) : (<TextAlignJustify size={23}  onClick={() => SetisOpen(!isOpen)}   className='text-white'/>)
            }
            </div>
        </div>

        {isOpen && (
          <div className='flex flex-col justify-center items-center gap-2.5 h-screen  '>
              <p className='text-black'>Hii , {username}</p>
              <button >
                {Admin ? (
                    <button onClick={() => navigate('/user')} className='px-4 py-1.5 text-white bg-green-600 rounded-xl'>Manage User</button>
                ) : null}
              </button>
              <button onClick={() => window.location.href = '/create'} className='px-4 py-1.5 rounded-xl text-white bg-blue-400
              '>New Blog</button>
          </div>
        )}
      </div>
  );
};

export default Navbar;
