import React from "react";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="text-center max-w-2xl">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Share Ideas. Read Stories. Stay Inspired.
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
          MyBlog is a simple yet powerful platform where you can explore meaningful articles,
          express your thoughts, and connect with a growing community of readers and writers.
          Whether you're here to learn, write, or discover — there's always something valuable waiting for you.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Start Reading
          </button>

          <button className="border border-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-100 transition">
            Become a Writer
          </button>

        </div>

        <p className="mt-8 text-xs sm:text-sm text-gray-400">
          Built for creators • Powered by modern web technologies
        </p>

      </div>

    </div>
  );
}

export default Home;
