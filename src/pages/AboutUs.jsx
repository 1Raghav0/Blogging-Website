// import { motion } from "framer-motion";

// const AboutUs = () => {
//   return (
//     <div className="min-h-screen  text-gray-800 mt-14 flex flex-col items-center justify-center p-6">
//       <motion.h1
//         className="text-4xl font-bold mb-6 text-center"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         About <span className="text-green-600">Our Blogging Platform</span>
//       </motion.h1>
      
//       <motion.p
//         className="max-w-3xl text-lg text-center text-gray-700"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         Welcome to our blogging platform, a vibrant community where words come to life!
//         We believe in the power of storytelling, knowledge-sharing, and creative
//         expression. Whether you are an experienced writer or a beginner, our platform
//         offers a seamless experience to craft, share, and engage with incredible content.
//       </motion.p>

//       <motion.div
//         className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.2 }}
//       >
//         <div className="bg-white p-6 shadow-lg rounded-lg text-center">
//           <h2 className="text-xl font-semibold text-green-600">Write & Share</h2>
//           <p className="mt-2 text-gray-600">Create insightful blogs and share your thoughts with the world.</p>
//         </div>
        
//         <div className="bg-white p-6 shadow-lg rounded-lg text-center">
//           <h2 className="text-xl font-semibold text-green-600">Engage & Connect</h2>
//           <p className="mt-2 text-gray-600">Read blogs, comment, and interact with like-minded individuals.</p>
//         </div>
        
//         <div className="bg-white p-6 shadow-lg rounded-lg text-center">
//           <h2 className="text-xl font-semibold text-green-600">AI-Powered Features</h2>
//           <p className="mt-2 text-gray-600">Leverage AI to generate ideas, enhance your writing, and stay inspired.</p>
//         </div>
//       </motion.div>

//       <motion.p
//         className="mt-8 max-w-2xl text-center text-gray-700"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5 }}
//       >
//         Our goal is to empower voices from all walks of life. Start writing today and
//         be part of a growing community that values creativity, authenticity, and knowledge.
//       </motion.p>
//     </div>
//   );
// };

// export default AboutUs;


import { motion } from "framer-motion";
import { useContext } from "react";
import Mycontext from "../context/Mycontext";

const AboutUs = () => {
  const { mode } = useContext(Mycontext);

  return (
    <div
      className={`min-h-screen mt-14 flex flex-col items-center justify-center p-6 transition-colors duration-300 
      ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
    >
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About <span className="text-green-500">Our Blogging Platform</span>
      </motion.h1>

      {/* Intro Paragraph */}
      <motion.p
        className={`max-w-3xl text-lg text-center transition-colors duration-300
          ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to our blogging platform, a vibrant community where words come to life! 
        We believe in the power of storytelling, knowledge-sharing, and creative expression. 
        Whether you are an experienced writer or a beginner, our platform offers a seamless 
        experience to craft, share, and engage with incredible content.
      </motion.p>

      {/* Features Section */}
      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Feature 1 */}
        <div className={`p-6 shadow-lg rounded-lg text-center transition-colors duration-300
          ${mode === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-300"}`}>
          <h2 className="text-xl font-semibold text-green-500">Write & Share</h2>
          <p className={`mt-2 transition-colors duration-300 ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Create insightful blogs and share your thoughts with the world.
          </p>
        </div>

        {/* Feature 2 */}
        <div className={`p-6 shadow-lg rounded-lg text-center transition-colors duration-300
          ${mode === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-300"}`}>
          <h2 className="text-xl font-semibold text-green-500">Engage & Connect</h2>
          <p className={`mt-2 transition-colors duration-300 ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Read blogs, comment, and interact with like-minded individuals.
          </p>
        </div>

        {/* Feature 3 */}
        <div className={`p-6 shadow-lg rounded-lg text-center transition-colors duration-300
          ${mode === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-300"}`}>
          <h2 className="text-xl font-semibold text-green-500">AI-Powered Features</h2>
          <p className={`mt-2 transition-colors duration-300 ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Leverage AI to generate ideas, enhance your writing, and stay inspired.
          </p>
        </div>
      </motion.div>

      {/* Closing Statement */}
      <motion.p
        className={`mt-8 max-w-2xl text-center transition-colors duration-300 
          ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Our goal is to empower voices from all walks of life. Start writing today and 
        be part of a growing community that values creativity, authenticity, and knowledge.
      </motion.p>
    </div>
  );
};

export default AboutUs;
