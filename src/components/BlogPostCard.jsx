

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Mastering React Hooks",
    description: "A deep dive into React hooks and how to use them effectively.",
    image: "./reacthooks.webp",
    link: "/blog/react-hooks",
  },
  {
    id: 2,
    title: "Tailwind CSS for Beginners",
    description: "Learn how to style your website effortlessly with Tailwind CSS.",
    image: "./tailwind.webp",
    link: "/blog/tailwind-css",
  },
  {
    id: 3,
    title: "JavaScript ES6+ Features",
    description: "Explore the modern features of JavaScript ES6 and beyond.",
    image: "./javascript.webp",
    link: "/blog/javascript-es6",
  },
];

const BlogPostCard = () => {
  return (
    <div className="min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Latest Blog Posts</h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 cursor-pointer">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={post.image} alt={post.title} className="w-full h-48 rounded-t-xl" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.description}</p>
              <Link to={post.link} className="inline-block mt-4 text-green-500 font-semibold hover:underline">
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostCard;

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const BlogPostCard = ({ blog }) => {
//   [
//   {
//     id: 1,
//     title: "Mastering React Hooks",
//     description: "A deep dive into React hooks and how to use them effectively.",
//     image: "./reacthooks.webp",
//     link: "/blog/react-hooks",
//   },
//   {
//     id: 2,
//     title: "Tailwind CSS for Beginners",
//     description: "Learn how to style your website effortlessly with Tailwind CSS.",
//     image: "./tailwind.webp",
//     link: "/blog/tailwind-css",
//   },
//   {
//     id: 3,
//     title: "JavaScript ES6+ Features",
//     description: "Explore the modern features of JavaScript ES6 and beyond.",
//     image: "./javascript.webp",
//     link: "/blog/javascript-es6",
//   },
// ];

//   return (
//     <motion.div
//       key={blog.id}
//       className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <img src={blog.image} alt={blog.title} className="w-full h-48 rounded-t-xl" />
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold text-gray-800">{blog.title}</h2>
//         <p className="text-gray-600 mt-2">{blog.description}</p>
//         <Link to={blog.link} className="inline-block mt-4 text-green-500 font-semibold hover:underline">
//           Read More →
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// export default BlogPostCard;

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types"; // Add PropTypes for validation

// const BlogPostCard = ({ blog }) => {
//   [
//     {
//       id: 1,
//       title: "Mastering React Hooks",
//       description: "A deep dive into React hooks and how to use them effectively.",
//       image: "./reacthooks.webp",
//       link: "/blog/react-hooks",
//     },
//     {
//       id: 2,
//       title: "Tailwind CSS for Beginners",
//       description: "Learn how to style your website effortlessly with Tailwind CSS.",
//       image: "./tailwind.webp",
//       link: "/blog/tailwind-css",
//     },
//     {
//       id: 3,
//       title: "JavaScript ES6+ Features",
//       description: "Explore the modern features of JavaScript ES6 and beyond.",
//       image: "./javascript.webp",
//       link: "/blog/javascript-es6",
//     },
//   ];
//   if (!blog) return null; // Prevents errors if blog is undefined

//   return (
//     <motion.div
//       key={blog.id}
//       className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <img src={blog.image} alt={blog.title} className="w-full h-48 rounded-t-xl" />
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold text-gray-800">{blog.title}</h2>
//         <p className="text-gray-600 mt-2">{blog.description}</p>
//         <Link to={blog.link} className="inline-block mt-4 text-green-500 font-semibold hover:underline">
//           Read More →
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// // Validate props
// BlogPostCard.propTypes = {
//   blog: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     link: PropTypes.string.isRequired,
//   }),
// };

// export default BlogPostCard;
