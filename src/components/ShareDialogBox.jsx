
import { useEffect, useRef } from "react";
import PropTypes from "prop-types"; 

const ShareDialog = ({ isOpen, onClose, shareUrl }) => {
  const dialogRef = useRef(null);

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
      className="relative flex items-center justify-center top-24"
    >
      {/* Dialog Box */}
      <div className="bg-white h-52 p-10 rounded-lg shadow-lg relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-gray-600 hover:text-gray-900"
        >
          <i className="ri-close-line text-2xl cursor-pointer"></i>
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Share this blog post
        </h2>

        {/* Social Media Buttons */}
        <div className="flex justify-center gap-4">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-3xl hover:text-blue-600 hover:scale-110 transition"
          >
            <i className="ri-facebook-box-fill p-2 bg-gray-300 rounded-3xl cursor-pointer"></i>
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-3xl hover:text-black hover:scale-110 transition"
          >
            <i className="ri-twitter-x-line p-2 bg-gray-300 rounded-3xl cursor-pointer"></i>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-3xl hover:scale-110 hover:text-blue-700 transition"
          >
            <i className="ri-linkedin-box-fill p-2 bg-gray-300 rounded-3xl cursor-pointer"></i>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-3xl hover:scale-110 hover:text-green-500 transition"
          >
            <i className="ri-whatsapp-fill p-2 bg-gray-300 rounded-3xl cursor-pointer"></i>
          </a>

          {/* Copy Link */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert("Link copied to clipboard!");
            }}
            className="text-gray-600 text-3xl hover:scale-110 hover:text-black transition"
          >
            <i className="ri-file-copy-line p-2 bg-gray-300 rounded-3xl cursor-pointer"></i>
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

