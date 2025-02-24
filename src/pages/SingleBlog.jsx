import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import Navbar from "../components/Navbar";

const SingleBlog = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <>
    <Navbar />
        <div className="min-h-screen bg-gray-100"> 
      <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-gray-500 mt-2">By {blog.authorName || "Unknown"}</p>
        <div
          className="mt-6 text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
        />
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
    </>

  );
};

export default SingleBlog;
