

import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mycontext from "../context/Mycontext";
import "remixicon/fonts/remixicon.css";
import SearchDialog from "./SearchDialog";
import ShareDialogBox from "../components/ShareDialogBox";
import { auth } from "../firebase/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { mode, toggleMode } = useContext(Mycontext);
  const [shareOpen, setShareOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    //  Fetch stored user info from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    //  Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          name: currentUser.displayName || "User",
          email: currentUser.email,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); //  Store in localStorage
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user"); 
      setUser(null);  
      navigate("/");  
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto h-20 px-6 py-2 flex justify-between items-center">
          {/* Logo */}
          <div>
            <img src="./logo.jpg" className="w-15 h-auto rounded-lg" alt="Logo" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
            <li><Link to="/" className="hover:text-green-500">Home</Link></li>
            <li><Link to="/about-us" className="hover:text-green-500">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-green-500">Blog</Link></li>
            <li><Link to="/dashboard" className="hover:text-green-500">Admin Dashboard</Link></li>
            <li><Link to="/contact" className="hover:text-green-500">Contact Us</Link></li>
            <li>
              <i 
                onClick={() => setSearchOpen(true)} 
                className="ri-search-eye-line text-xl cursor-pointer hover:text-green-500 transition"
              ></i>
            </li>
            <li>
              <i
                className="ri-share-line text-xl cursor-pointer hover:text-green-500 transition"
                onClick={() => setShareOpen(true)}
              ></i>
            </li>
            <li>
              <button
                onClick={toggleMode}
                className="px-4 py-2 rounded-lg transition text-sm font-semibold border border-gray-500 cursor-pointer"
                style={{
                  background: mode === "dark" ? "white" : "black",
                  color: mode === "dark" ? "black" : "white",
                }}
              >
                {mode === "dark" ? "Light Mode 🌞" : "Dark Mode 🌙"}
              </button>
            </li>
          </ul>

          {/* Authentication Button (Visible only on large screens) */}
          <div className="hidden lg:block">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Hello, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth">
                <button className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition cursor-pointer">
                AdminLogin
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <i className="ri-menu-line text-3xl cursor-pointer"></i>
            </button>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 w-72 h-full bg-gray-300 shadow-lg z-50 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform ease-in-out duration-600`}
        >
          <div className="p-6">
            {/* Close Button */}
            <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 cursor-pointer">
              <i className="ri-close-line text-3xl"></i>
            </button>

            {/* Sidebar Links */}
            <ul className="flex flex-col gap-6 text-lg font-medium mt-8">
              <li><Link to="/" className="hover:text-green-500" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about-us" className="hover:text-green-500" onClick={() => setMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/blog" className="hover:text-green-500" onClick={() => setMenuOpen(false)}>Blog</Link></li>
              <li><Link to="/dashboard" className="hover:text-green-500" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link></li>
              <li><Link to="/contact" className="hover:text-green-500" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
              <li className="flex items-center gap-x-10">
                <i 
                  onClick={() => setSearchOpen(true)} 
                  className="ri-search-eye-line text-xl cursor-pointer hover:text-green-500 transition"
                ></i>
                <i
                  className="ri-share-line text-xl cursor-pointer hover:text-green-500 transition"
                  onClick={() => setShareOpen(true)}
                ></i>
              </li>
              <li>
                <button
                  onClick={toggleMode}
                  className="px-4 py-2 rounded-lg transition text-sm font-semibold border border-gray-500 cursor-pointer"
                  style={{
                    background: mode === "dark" ? "white" : "black",
                    color: mode === "dark" ? "black" : "white",
                  }}
                >
                  {mode === "dark" ? "Light Mode 🌞" : "Dark Mode 🌙"}
                </button>
              </li>
              <li>
              {user ? (
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Hello, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth">
                <button className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition cursor-pointer">
                AdminLogin
                </button>
              </Link>
            )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search Dialog */}
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Share Dialog */}
      <ShareDialogBox isOpen={shareOpen} onClose={() => setShareOpen(false)} shareUrl={window.location.href} />
    </>
  );
};

export default Navbar;

