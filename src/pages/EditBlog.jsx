

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import toast from "react-hot-toast";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "", // Ensure image field exists
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog(docSnap.data());
        } else {
          toast.error("Blog not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, blog);
      toast.success("Blog updated successfully");
      navigate("/dashboard"); // Redirect after update
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10  bg-white shadow-lg rounded-lg mt-28">
      <h2 className="text-2xl font-semibold text-center">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg mt-1"
        />

        <label className="block text-gray-700 mt-4">Content</label>
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border rounded-lg mt-1"
        />

        <label className="block text-gray-700 mt-4">Image URL</label>
        <input
          type="text"
          name="image"
          value={blog.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg mt-1"
        />

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
