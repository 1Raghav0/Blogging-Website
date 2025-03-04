


import { useState, useContext } from "react";
import emailjs from "@emailjs/browser";
import Mycontext from "../context/Mycontext";

const ContactPage = () => {
  const { mode } = useContext(Mycontext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceID = "service_720gg34";
    const templateID = "template_gstyirb";
    const publicKey = "jqsjBfTjjL8tFcx5a";

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setIsSent(true);
        setLoading(false);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setLoading(false);
      });
  };

  return (
    <div
      className={`w-full py-24 px-6 transition-colors duration-300 
        ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-6">
          Connect With Us <span className="text-green-500">📝</span>
        </h1>
        <p className="text-center max-w-2xl mx-auto text-gray-600">
          Have ideas for a blog post? Want to collaborate or give feedback? Reach out to us!
        </p>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          {/* Contact Form */}
          <div
            className={`shadow-lg rounded-lg p-8 transition-colors duration-300 
              ${mode === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"}`}
          >
            <h2 className="text-2xl font-semibold mb-4">Share Your Thoughts 💡</h2>

            {isSent && (
              <p className="text-green-500 font-bold text-center">
                ✅ Message Sent Successfully!
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition 
                    ${mode === "dark" ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500" : "focus:ring-green-400"}`}
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition 
                    ${mode === "dark" ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500" : "focus:ring-green-400"}`}
                />
              </div>
              <div>
                <label className="block font-medium">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us what’s on your mind..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 h-32 transition 
                    ${mode === "dark" ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500" : "focus:ring-green-400"}`}
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full text-white py-2 rounded-lg font-semibold transition duration-300 
                  ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`shadow-lg rounded-lg p-8 transition-colors duration-300 
              ${mode === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"}`}
          >
            <h2 className="text-2xl font-semibold mb-4">Stay Connected 🔗</h2>
            <p className="text-gray-400">We love hearing from our readers and fellow bloggers.</p>

            <div className="mt-4 space-y-4">
            <p className="flex items-center text-gray-400">
                Roorkee, Uttarakhand
              </p>
              <p className="flex items-center text-gray-400">
              <i className="ri-mail-line text-xl mr-2 mt-1"></i> raghvendrasingh10216@gmail.com
              </p>
              <p className="flex items-center text-gray-400">
              <i className="ri-phone-line text-xl mr-2 mt-0.5"></i> 6397258224
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6 flex space-x-4 text-gray-600">
              <i className="ri-facebook-circle-fill text-3xl hover:text-blue-600 cursor-pointer transition"></i>
              <i className="ri-instagram-line text-3xl hover:text-pink-600 cursor-pointer transition"></i>
              <i className="ri-twitter-x-line text-3xl hover:text-black cursor-pointer transition"></i>
              <i className="ri-linkedin-box-fill text-3xl hover:text-blue-700 cursor-pointer transition"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
