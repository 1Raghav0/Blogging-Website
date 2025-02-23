const Loader = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="relative w-12 h-12">
        {/* Spinning Circle */}
        <div className="w-full h-full border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
