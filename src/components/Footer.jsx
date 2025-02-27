

import { Link } from "react-router-dom";
import { useContext } from "react";
import Mycontext from "../context/Mycontext";

const Footer = () => {
  const { mode } = useContext(Mycontext);

  return (
    <footer
      className={`py-6 px-4 transition-colors duration-300 
        ${mode === "dark" ? "bg-gray-900 text-gray-400" : "bg-gray-700 text-gray-300"}`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo & About Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">MyBlog</h2>
          <p className="mt-2 text-sm">
            Sharing ideas, knowledge, and inspiration one post at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            {["Home", "Blog", "About", "Contact"].map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-green-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-2"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            {[
              { href: "#", icon: "ri-facebook-circle-fill", color: "hover:text-blue-500" },
              { href: "#", icon: "ri-twitter-x-line", color: "hover:text-black" },
              { href: "#", icon: "ri-instagram-fill", color: "hover:text-pink-400" },
              { href: "#", icon: "ri-linkedin-box-fill", color: "hover:text-blue-500" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`text-xl ${social.color} transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-1`}
                aria-label="Social Media Link"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 border-t border-gray-600 pt-4 text-center text-sm">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
