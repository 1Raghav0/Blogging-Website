

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import Navbar from "../components/Navbar";
import Mycontext from "../context/Mycontext";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { mode } = useContext(Mycontext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/"); // Redirect to home after logout
    });
  };

  return (
    <div className={`min-h-screen pt-10 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-28 p-6 bg-white shadow-lg rounded-lg">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Welcome, {user.name} 👋</h2>
            <p className="text-gray-600 mt-2">Email: {user.email}</p>
            
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => navigate("/create-blog")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
              >
                Create Blog
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">No user found. Please login.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
