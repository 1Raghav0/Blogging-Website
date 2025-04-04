import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types"; 
import Mycontext from "../context/Mycontext"; 

const ShareDialog = ({ isOpen, onClose, shareUrl }) => {
  const dialogRef = useRef(null);
  const { mode } = useContext(Mycontext); // Get dark mode context

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.classList.remove("hidden");
    } else {
      dialogRef.current?.classList.add("hidden");
    }
  }, [isOpen]);

  return (
    <div
      ref={dialogRef}
      className="relative flex items-center justify-center top-[88px]"
    >
      {/* Dialog Box */}
      <div
        className={`h-52 p-10 rounded-lg shadow-lg relative animate-fadeIn 
          ${mode === "dark" ? "bg-gray-900 shadow-zinc-700 text-white" : "bg-white text-black"}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-gray-600 hover:text-gray-700"
        >
          <i className="ri-close-line text-2xl cursor-pointer"></i>
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-4 text-center">
          Share this blog post
        </h2>

        {/* Social Media Buttons */}
        <div className="flex justify-center gap-4">
          {[
            {
              href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
              class: "hover:text-blue-600",
              icon: "ri-facebook-box-fill",
            },
            {
              href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
              class: "hover:text-black",
              icon: "ri-twitter-x-line",
            },
            {
              href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
              class: "hover:text-blue-700",
              icon: "ri-linkedin-box-fill",
            },
            {
              href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`,
              class: "hover:text-green-500",
              icon: "ri-whatsapp-fill",
            },
          ].map(({ href, class: hoverClass, icon }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-600 text-3xl ${hoverClass} hover:scale-110 transition`}
            >
              <i className={`${icon} p-2 rounded-3xl cursor-pointer 
                ${mode === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
              ></i>
            </a>
          ))}

          {/* Copy Link */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert("Link copied to clipboard!");
            }}
            className="text-gray-600 text-3xl hover:scale-110 hover:text-black transition"
          >
            <i className={`ri-file-copy-line p-2 rounded-3xl cursor-pointer 
                ${mode === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for props validation
ShareDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  shareUrl: PropTypes.string.isRequired,
};

export default ShareDialog;
