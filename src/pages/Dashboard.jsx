

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Mycontext from "../context/Mycontext";
import DOMPurify from "dompurify";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { mode } = useContext(Mycontext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      const unsubscribe = fetchUserBlogs(storedUser.email);

      return () => unsubscribe && unsubscribe(); // Cleanup listener on unmount
    }
  }, []);

  const fetchUserBlogs = (email) => {
    const q = query(collection(db, "blogs"), where("authorEmail", "==", email));

    return onSnapshot(q, (snapshot) => {
      const userBlogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt
          ? doc.data().createdAt.toDate()
          : new Date(0),
      }));
      userBlogs.sort((a, b) => b.createdAt - a.createdAt);
      setBlogs(userBlogs);
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div
      className={`min-h-screen m-4 pt-2 pb-4 transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto mt-28 mb-6 p-6 shadow-lg rounded-lg transition-all duration-300 ${
          mode === "dark" ? "bg-gray-800 text-gray-300" : "bg-white"
        }`}
      >
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              Welcome, {user.name || "User"} 👋
            </h2>
            <p className="mt-2 text-gray-500">Email: {user.email}</p>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => navigate("/create-blog")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all"
              >
                Create Blog
              </button>
            </div>

            {/* User Blogs Section */}
            <h3 className="text-xl font-semibold mt-8">Your Blogs</h3>
            {blogs.length > 0 ? (
              <div className="mt-4 p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="relative rounded-lg overflow-hidden shadow-md h-64 flex flex-col justify-end transition-transform transform hover:scale-105"
                    style={{
                      backgroundImage: `url(${
                        blog.image || "/default-image.jpg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative p-4 text-white">
                      <h3 className="text-lg font-semibold">{blog.title}</h3>

                      <p
                        className="mt-1 truncate"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            blog.content.substring(0, 100) + "..."
                          ),
                        }}
                      />

                      {/* Blog Action Buttons */}
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => navigate(`/blog/${blog.id}`)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-all cursor-pointer"
                        >
                          View Full
                        </button>

                        <button
                          onClick={() => navigate(`/edit-blog/${blog.id}`)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition-all cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">
                You have not published any blogs yet.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-red-500">
            No user found. Please login.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
