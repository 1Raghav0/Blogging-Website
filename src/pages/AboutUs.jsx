import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen  text-gray-800 mt-14 flex flex-col items-center justify-center p-6">
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About <span className="text-green-600">Our Blogging Platform</span>
      </motion.h1>
      
      <motion.p
        className="max-w-3xl text-lg text-center text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to our blogging platform, a vibrant community where words come to life!
        We believe in the power of storytelling, knowledge-sharing, and creative
        expression. Whether you are an experienced writer or a beginner, our platform
        offers a seamless experience to craft, share, and engage with incredible content.
      </motion.p>

      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-semibold text-green-600">Write & Share</h2>
          <p className="mt-2 text-gray-600">Create insightful blogs and share your thoughts with the world.</p>
        </div>
        
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-semibold text-green-600">Engage & Connect</h2>
          <p className="mt-2 text-gray-600">Read blogs, comment, and interact with like-minded individuals.</p>
        </div>
        
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-semibold text-green-600">AI-Powered Features</h2>
          <p className="mt-2 text-gray-600">Leverage AI to generate ideas, enhance your writing, and stay inspired.</p>
        </div>
      </motion.div>

      <motion.p
        className="mt-8 max-w-2xl text-center text-gray-700"
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