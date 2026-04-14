import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#e8e8ed] bg-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          
          {/* Brand */}
          <div className="max-w-sm">
            <h2 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
              My Blog
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6e6e73]">
              Discover thoughtful articles, share your ideas, and connect with a
              growing community of readers and writers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#1d1d1f] mb-3">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-[#6e6e73]">
              <li>
                <NavLink to="/" className="hover:text-[#1d1d1f] transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="hover:text-[#1d1d1f] transition-colors"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="hover:text-[#1d1d1f] transition-colors"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-[#1d1d1f] mb-3">
              Platform
            </h3>
            <p className="text-sm text-[#6e6e73] leading-relaxed max-w-xs">
              Built for clean reading, simple writing, and a smooth blogging
              experience.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-[#e8e8ed] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#a1a1a6]">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
          <p className="text-xs text-[#a1a1a6]">
            Clean • Minimal • Modern
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
