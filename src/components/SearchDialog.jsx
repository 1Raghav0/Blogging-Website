import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const SearchDialog = ({ isOpen, onClose }) => {
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
          className="absolute top-1 right-4 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        {/* Search Input */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <i className="ri-search-line text-gray-500 text-lg"></i>
          <input
            type="text"
            placeholder="Search blog posts..."
            className="w-full outline-none px-2 text-gray-700"
          />
        </div>

        {/* Suggested Searches */}
        <div className="mt-4 text-sm text-gray-500">
          <p className="font-semibold text-gray-700">Popular Searches:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["React Tips", "UI/UX Design", "Firebase Guide"].map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer hover:bg-green-500 hover:text-white transition"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


SearchDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchDialog;

