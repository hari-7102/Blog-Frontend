import React, { useEffect } from 'react'
import apiClient from '../apiClient/apiClient';
import Navbar from './Navbar';
import { useNavigate  } from 'react-router-dom';
const Blog = () => {
  const navigate = useNavigate();
  const [blog , setBlog] = React.useState([]);
  
  // const location = useLocation();
      
  // const username = localStorage.getItem('Username');

    const handleLogout = async() => {
        const response = await apiClient.post('/logout' , {} ,
             {withCredentials: true}
        );
        console.log(response.data);
        localStorage.removeItem('authToken');
        localStorage.removeItem('Username');
        localStorage.removeItem('User Id');
        localStorage.removeItem('Role');
        window.location.href = '/';
      }   

  const handleDelete = async(id: string): Promise<void> => {
        try{
          alert("Are you sure you want to delete this blog?");
          const response = await apiClient.delete(`/api/blog/${id}`, {} );
          console.log(response.data);
          alert("Blog deleted successfully");
          getData();         
        }
        catch (error){
          alert ("Failed to delete blog");
          console.error("Error deleting blog:", error);
        }
      }

    const getData = async() => {
        try {
            const response = await apiClient.get('/api/blog');
            setBlog(response.data);
            console.log("Protected data:", response.data);
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
      }

      useEffect(() => {
        getData();
      }, []);

  return (
    <div>
      <Navbar />
      <h1 className='text-3xl font-bold text-center m-5'>All Blogs</h1>
      
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-5'>
        {blog && blog.map((item: any) => (
          <div key={item.id} className='border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow'>
            <div className='flex justify-between items-start mb-4'>
              <h2 
                onClick={() => navigate("/update", { state: item._id })} 
                className='font-bold text-lg md:text-2xl cursor-pointer hover:text-blue-600 transition-colors flex-1 mr-4'
              >
                {item.title}
              </h2>
              <button 
                onClick={() => handleDelete(item._id)} 
                className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer transition-colors whitespace-nowrap'
              >
                Delete
              </button>
            </div>
            <p className='text-gray-700 mb-3 line-clamp-3'>{item.content}</p>
            <p className='text-sm text-gray-500'>Author: {item.author.username}</p>
          </div>
        ))}
      </div>
            
      <div className='flex justify-center items-center mt-6'>
        <button onClick={handleLogout}   className='cursor-pointer   text-center px-5 py-2 bg-gray-600 text-white rounded-xl'>Logout</button>
      </div>
    </div>
  )
}

export default Blog
