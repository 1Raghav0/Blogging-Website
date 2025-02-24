

import { useEffect, useState } from "react";
import { db } from "../firebase/Firebase"; // Import Firestore instance
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

const BlogPostCard = () => {
  const [blogs, setBlogs] = useState([]); // State to store blogs

  useEffect(() => {
    // Reference the blogs collection and order by createdAt (newest first)
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));

    // Fetch blogs in real-time
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogList = snapshot.docs.map((doc) => ({
        id: doc.id, // Unique Firestore ID
        ...doc.data(), // Get blog data
      }));
      setBlogs(blogList);
    });

    return () => unsubscribe(); // Cleanup Firestore listener
  }, []);

  return (
    <div className="min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Latest Blog Posts</h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 cursor-pointer">
        {blogs.length > 0 ? (
          blogs.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={post.image || "/default-image.jpg"} // Default image if none is provided
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                
                {/* Safely Render Sanitized Content */}
                <p
                  className="text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      post.content.length > 100
                        ? post.content.substring(0, 100) + "..."
                        : post.content
                    ),
                  }}
                />

                {/* Display Author's Name */}
                {post.authorName && (
                  <p className="text-lg text-gray-500 mt-2">
                    <span className="font-semibold">By:</span> {post.authorName}
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
