


import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import toast from "react-hot-toast";
import Mycontext from "../context/Mycontext";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mode } = useContext(Mycontext);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
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
        toast.error("Error fetching blog");
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
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-2xl w-full p-10 shadow-lg rounded-lg transition-all duration-300 ${
          mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center">Edit Blog</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Content</label>
            <textarea
              name="content"
              value={blog.content}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={blog.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-600 transition-all"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;