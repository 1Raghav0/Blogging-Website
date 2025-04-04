import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import Mycontext from "../context/Mycontext";

const SingleBlog = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const { mode } = useContext(Mycontext);

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
      <div
        className={`min-h-screen p-6 ${
          mode === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        <div
          className={`max-w-3xl mx-auto mt-20 p-16 shadow-lg rounded-lg ${
            mode === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <p
            className={`mt-4 ${
              mode === "dark" ? "text-gray-300" : "text-zinc-800"
            }`}
          >
            <span className="font-semibold"> By: </span>{" "}
            {blog.authorName || "Unknown"}
          </p>
          <span className="font-semibold">Published on:</span>{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          <div
            className={`mt-6 ${
              mode === "dark" ? "text-gray-300" : "text-zinc-800"
            }`}
            dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
          />
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
