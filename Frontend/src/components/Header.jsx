import { NavLink } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { useState } from "react";

import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  const [menuOpen, setMenuOpen] = useState(false);

  const getProfilePath = () => {
    if (!user) return "/";

    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const getNavClass = ({ isActive }) =>
    isActive
      ? `${navLinkActiveClass} relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[2px] after:bg-[#0066cc]`
      : `${navLinkClass} relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-0 after:h-[2px] after:bg-[#1d1d1f] hover:after:w-full after:transition-all after:duration-300`;

  return (
    <nav
      className={`${navbarClass} supports-[backdrop-filter]:bg-white/75 bg-white/90`}
    >
      <div className={`${navContainerClass} h-full`}>
        <div className="flex items-center justify-between h-full">
          {/* LOGO */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className={`${navBrandClass} text-lg tracking-[-0.02em] hover:opacity-80 transition duration-300`}
          >
            My Blog
          </NavLink>

          {/* HAMBURGER */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
          </button>

          {/* DESKTOP + MOBILE NAV */}
          <ul
            className={`
              ${navLinksClass}
              absolute md:static top-[52px] left-0 md:left-auto
              w-full md:w-auto
              flex flex-col md:flex-row
              items-start md:items-center
              gap-5 md:gap-7
              px-6 md:px-0 py-6 md:py-0
              bg-white/95 md:bg-transparent
              backdrop-blur-xl
              border-b border-[#e8e8ed] md:border-0
              ${menuOpen ? "flex" : "hidden md:flex"}
            `}
          >
            <li>
              <NavLink to="/" end onClick={closeMenu} className={getNavClass}>
                Home
              </NavLink>
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className={getNavClass}
                  >
                    Register
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-[#0066cc] px-4 py-2 rounded-full text-sm font-medium transition"
                        : "text-[#1d1d1f] border border-[#d2d2d7] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f5f5f7] transition"
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {isAuthenticated && (
              <li>
                <NavLink
                  to={getProfilePath()}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-[#0066cc] px-4 py-2 rounded-full text-sm font-medium transition"
                      : "text-[#1d1d1f] border border-[#d2d2d7] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f5f5f7] transition"
                  }
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
