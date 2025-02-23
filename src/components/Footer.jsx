

// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-700 text-gray-300 py-10">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Logo & About Section */}
//         <div>
//           <h2 className="text-2xl font-bold text-white">MyBlog</h2>
//           <p className="mt-3 text-sm text-gray-400">
//             Sharing ideas, knowledge, and inspiration one post at a time.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-xl font-semibold text-white">Quick Links</h3>
//           <ul className="mt-3 space-y-2">
//             <li><Link to="/" className="hover:text-green-400">Home</Link></li>
//             <li><Link to="/blog" className="hover:text-green-400">Blog</Link></li>
//             <li><Link to="/about" className="hover:text-green-400">About</Link></li>
//             <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
//           </ul>
//         </div>

//         {/* Social Media Links */}
//         <div>
//           <h3 className="text-xl font-semibold text-white">Follow Us</h3>
//           <div className="flex space-x-4 mt-3">
//             <a href="#" className="text-xl hover:text-green-400"><i className="ri-facebook-circle-fill"></i></a>
//             <a href="#" className="text-xl hover:text-green-400"><i className="ri-twitter-fill"></i></a>
//             <a href="#" className="text-xl hover:text-green-400"><i className="ri-instagram-fill"></i></a>
//             <a href="#" className="text-xl hover:text-green-400"><i className="ri-linkedin-box-fill"></i></a>
//           </div>
//         </div>
//       </div>

//       {/* Copyright Section */}
//       <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
//         © {new Date().getFullYear()} MyBlog. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 py-6 px-4">
      <div className="max-w-xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo & About Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">MyBlog</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sharing ideas, knowledge, and inspiration one post at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/blog" className="hover:text-green-400">Blog</Link></li>
            <li><Link to="/about" className="hover:text-green-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="#" className="text-xl hover:text-blue-500"><i className="ri-facebook-circle-fill"></i></a>
            <a href="#" className="text-xl hover:text-black"><i className="ri-twitter-x-line"></i></a>
            <a href="#" className="text-xl hover:text-pink-400"><i className="ri-instagram-fill"></i></a>
            <a href="#" className="text-xl hover:text-blue-500"><i className="ri-linkedin-box-fill"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
