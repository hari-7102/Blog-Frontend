import React, { useState, useEffect } from "react";
import {  useNavigate , useLocation } from "react-router-dom";
import apiClient from '../apiClient/apiClient';
import Navbar from "./Navbar";
// Define Blog type
interface Blog {
  _id?: string;
  title: string;
  content: string;
}



const UpdateBlog: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // blog id from URL
const location = useLocation();
const id = location.state
  console.log("id" , id)
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await apiClient.get(`/api/blog/${id}`);
        console.log("reposne",res.data)
        if (!res) throw new Error("Failed to fetch blog");
        const data: Blog = res.data;
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // 📝 Handle update
  const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const updatedBlog: Blog = { title, content };
    console.log("upateditem", updatedBlog)

    try {
      const res = await apiClient.put(`/api/blog/${id}`, {
        title: updatedBlog.title,
        content: updatedBlog.content
      });

      if (res.status === 200) {
        alert("Blog updated successfully!");
        navigate("/blog"); // Redirect to home or blog list
      } else {
        alert("Failed to update blog");
      }
    } catch (error) {
      alert("Error updating blog");
      console.error("Error updating blog:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg text-gray-500">Loading blog...</p>;
  }

  return (
    <>

    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Blog
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Blog Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 h-48 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
          >
            Update Blog
          </button>
        </form>
        <button onClick={() => navigate('/blog')}    className="px-5 py-2 mt-3 text-white bg-gray-700 rounded-xl">Back to Blog</button>
      </div>
    </div>
    </>
  );
};

export default UpdateBlog;
