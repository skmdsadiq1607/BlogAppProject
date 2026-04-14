import React from "react";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-4">

      <div className="text-center max-w-2xl">

        {/* SMALL TAG */}
        <p className="text-xs tracking-widest text-blue-600 font-semibold mb-3 uppercase">
          Welcome to MyBlog
        </p>

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-5 leading-tight tracking-tight">
          Share Ideas. Read Stories. Stay Inspired.
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base md:text-lg text-[#6e6e73] leading-relaxed">
          Discover thoughtful articles, share your perspective, and connect with a
          growing community of readers and writers. Whether you're exploring new
          ideas or publishing your own — MyBlog makes it simple and meaningful.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <button className="bg-[#0066cc] text-white px-7 py-2.5 rounded-full text-sm font-medium hover:bg-[#004499] transition shadow-sm">
            Start Reading
          </button>

          <button className="border border-[#d2d2d7] text-[#1d1d1f] px-7 py-2.5 rounded-full text-sm font-medium hover:bg-white transition">
            Become a Writer
          </button>

        </div>

        {/* FOOT NOTE */}
        <p className="mt-10 text-xs text-[#a1a1a6] tracking-tight">
          Built for creators • Clean • Minimal • Fast
        </p>

      </div>
    </div>
  );
}

export default Home;
