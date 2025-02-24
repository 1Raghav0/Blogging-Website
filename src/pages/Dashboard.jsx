

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/Firebase";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Mycontext from "../context/Mycontext";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]); 
  const navigate = useNavigate();
  const { mode } = useContext(Mycontext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchUserBlogs(storedUser.email);
    }
  }, []);

  const fetchUserBlogs = (email) => {
    const q = query(
      collection(db, "blogs"),
      where("authorEmail", "==", email),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userBlogs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(0), 
        };
      });
      userBlogs.sort((a, b) => b.createdAt - a.createdAt);
      setBlogs(userBlogs);
    });

    return unsubscribe;
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className={`min-h-screen pt-10 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <div className="max-w-4xl mx-auto mt-28 p-6 bg-white shadow-lg rounded-lg">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Welcome, {user.name} 👋</h2>
            <p className="text-gray-600 mt-2">Email: {user.email}</p>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => navigate("/create-blog")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition cursor-pointer"
              >
                Create Blog
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition cursor-pointer"
              >
                Logout
              </button>
            </div>

            <h3 className="text-xl font-semibold mt-8">Your Blogs</h3>
            {blogs.length > 0 ? (
              <div className="mt-4 grid gap-6 grid-cols-1 md:grid-cols-2">
                {blogs.map((blog) => (
                  <div key={blog.id} className="border p-4 rounded-lg shadow-md bg-gradient-to-tr from-black to-gray-400">
                    <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
                    
                    {/* Render sanitized HTML content correctly */}
                    <div 
                      className="text-white mt-1 truncate"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content.substring(0, 100) + "...") }}
                    />

                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => navigate(`/blog/${blog.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                      >
                        View Full
                      </button>

                      <button
                        onClick={() => navigate(`/edit-blog/${blog.id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">You have not published any blogs yet.</p>
            )}
          </div>
        ) : (
          <p className="text-center text-red-500">No user found. Please login.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
