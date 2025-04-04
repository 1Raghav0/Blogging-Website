import { useContext } from "react";
import BlogPostCard from "../components/BlogPostCard";
import Mycontext from "../context/Mycontext";

const Blog = () => {
  const { mode } = useContext(Mycontext);
  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h1 className="mt-20 text-4xl text-center font-semibold">
          All <span className="text-green-500">Blogs</span>
        </h1>
        <BlogPostCard />
      </div>
    </>
  );
};

export default Blog;
