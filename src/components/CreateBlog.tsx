import React, { useState  }   from "react";
import apiClient from '../apiClient/apiClient';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

  interface Blog {
      title: string;
      content: string;
  }

const CreateBlog = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [blog , setBlog] = useState<string[]>([]);
  const [loading , setLoading] = useState<boolean>(false);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();

    setLoading(true);
    const newBlog: Blog = { title, content };
    console.log("Blog Submitted:", newBlog);
    
    const resposne = await apiClient.post('/api/blog' , newBlog);

    console.log(resposne.data);
    setLoading(false);
    setBlog([...blog , resposne.data]);
    // alert("Blog Created Successfully!");
    navigate("/");
    // Clear form fields

    setTitle("");
    setContent("");
  };

  return (   
    <>
    <Navbar/>
    <div className="flex justify-center items-start pt-16 h-screen bg-gray-100 overflow-hidden">
      
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
           Create New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Blog Content
            </label>
            <textarea
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              
              className="w-full h-40 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          {
            loading ? (
              <button
                type="button" 
                className="w-full bg-gray-700 text-white py-2 rounded-lg cursor-not-allowed "
                disabled
              >
                Publishing...
              </button>
            ) : 
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
          >
            Publish Blog
          </button>
        }
        </form>

        <button    onClick={() => navigate("/") }   className="px-5 py-2 mt-3 bg-gray-600 text-white rounded-xl">
            Back to Blogs
        </button>
      </div>
    </div>
    </>
  );
};

export default CreateBlog;



