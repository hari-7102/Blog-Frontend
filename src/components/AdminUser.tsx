import React , { useState } from 'react'
import apiClient from '../apiClient/apiClient';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


interface AdminUser {
    _id : string,
    email : string,
    username : string,
    role :string
}
const AdminUser = () => {
    const [user , setUser] = useState([]);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    

    const fetchUsers = async() => {
        setLoading(true);
        try {   
            const response = await apiClient.get('/api/users' , {
                withCredentials: true
            });
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }   
        setLoading(false);
    }
    React.useEffect(() => {
        fetchUsers();
    } , []);

    const handleDelete = async(id: string): Promise<void> => {
        const ConformDelete = window.confirm("Are you want to delete the User ")
        if(ConformDelete) {
            try{
                console.log("id" ,id)
                const response = await apiClient.delete(`/api/users/${id}`, {} )
                console.log(response.data);
                alert("Blog deleted successfully");
                fetchUsers(); 
            }catch(error) {
                console.log(error)
            }
        } else {
            
            window.location.href = "/user"

        }
        }
  return (
    <div className='min-h-screen bg-gray-50'>
    <Navbar/>
    {loading ? (
        <div className='flex justify-center items-center h-screen'>
            <p className='text-xl text-gray-600'>Loading...</p>
        </div>
    ) : (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold text-center mt-16'>All Users</h1>   
            
            {/* Grid layout for users */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-3'>
                {user && user.map((item:AdminUser) => (
                    <div  
                        
                        key={item._id} 
                        className='border border-gray-200 rounded-lg p-6 bg-white shadow-md hover:shadow-xl transition-all  hover:scale-105 hover:border-blue-500'
                    >   <div className='flex justify-between items-center'>
                        <h2   onClick={() => navigate('/userup', {state : item._id})}   className='cursor-pointer font-bold text-xl mb-3 text-gray-800 hover:text-blue-600'>{item.username}</h2>
                        <button onClick={() => handleDelete(item._id)}  className='px-3 py-1.5 bg-red-500 text-white rounded-md'>Delete</button>
                        </div>
                        <p className='text-gray-600 mb-2'>
                            <span    className='font-semibold'>Email:</span> {item.email}
                        </p>
                        <p className='text-gray-600'>
                            <span className='font-semibold'>Role:</span> 
                            <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                item.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                                {item.role}
                            </span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Back button */}
            <div className='flex justify-center'>
                <button 
                    onClick={() => navigate('/blog')} 
                    className='px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-md'
                >
                    ← Back to Blog
                </button>
            </div>
        </div>
    )}
</div>
  )
}

export default AdminUser


