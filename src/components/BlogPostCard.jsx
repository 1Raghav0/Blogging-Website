import { useEffect, useState, useContext } from "react";
import { db } from "../firebase/Firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Mycontext from "../context/Mycontext";

const BlogPostCard = () => {
  const { mode } = useContext(Mycontext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`min-h-screen py-10 transition-colors duration-300 
        ${
          mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
    >
      <h1 className="text-3xl font-bold text-center mb-10">
        Latest <span className="text-green-500">Blog Posts</span>
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {blogs.length > 0 ? (
          blogs.map((post) => (
            <motion.div
              key={post.id}
              className={`shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300 
                ${
                  mode === "dark"
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-blue-100"
                }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={post.image || "/default-image.jpg"}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold">{post.title}</h2>

                <p
                  className="mt-2 transition-colors duration-300"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      post.content.length > 100
                        ? post.content.substring(0, 100) + "..."
                        : post.content
                    ),
                  }}
                />

                {post.authorName && (
                  <p className="text-lg mt-2 transition-colors duration-300">
                    <span className="font-semibold">By:</span> {post.authorName}
                    <br></br>
                    <span className="font-semibold">Published on:</span>{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}

                <Link
                  to={`/blog/${post.id}`}
                  className="inline-block mt-4 text-green-500 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPostCard;
