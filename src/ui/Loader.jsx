function Loader() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-4 text-gray-700 font-semibold">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
