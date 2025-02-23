


// import BlogPostCard from "../components/BlogPostCard"; // Import the BlogPostCard component
// import { useEffect, useState } from "react";

// const AllBlogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     // Fetch blog posts from your backend API or Firebase
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch("https://your-api-endpoint.com/blogs"); // Replace with your actual API
//         const data = await response.json();
//         setBlogs(data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//         All Blog Posts
//       </h1>

//       {/* Display Blog Post Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {blogs.length > 0 ? (
//           blogs.map((blog) => (
//             <BlogPostCard key={blog.id} blog={blog} />
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No blogs found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllBlogs;


import BlogPostCard from "../components/BlogPostCard"; 

const AllBlogs = () => {

  return (
    <>
    <div className="h-full w-auto">
      <h1 className="text-6xl text-center font-semibold">All Posts</h1>
      <BlogPostCard />
    </div>
    </>
   
  );
};

export default AllBlogs;
