import { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_720gg34";
    const templateID = "template_gstyirb";
    const publicKey = "jqsjBfTjjL8tFcx5a";

    const emailParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(serviceID, templateID, emailParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form after submission
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Connect With Us 📝
        </h1>
        <p className="text-center max-w-2xl mx-auto text-gray-600">
          Have ideas for a blog post? Want to collaborate or give feedback? Reach out to us!
        </p>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Share Your Thoughts 💡</h2>

            {isSent && <p className="text-green-600 font-bold text-center">✅ Message Sent Successfully!</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us what’s on your mind..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 h-32 transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stay Connected 🔗</h2>
            <p className="text-gray-600">We love hearing from our readers and fellow bloggers.</p>

            <div className="mt-4 space-y-4">
              <p className="flex items-center text-gray-700">
                Roorkee, Uttarakhand
              </p>
              <p className="flex items-center text-gray-700">
              <i className="ri-mail-line text-xl mr-2 mt-1"></i> raghvendrasingh10216@gmail.com
              </p>
              <p className="flex items-center text-gray-700">
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