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
      ? `${navLinkActiveClass} relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[2px] after:bg-[#0066cc]`
      : `${navLinkClass} relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-0 after:h-[2px] after:bg-[#1d1d1f] hover:after:w-full after:transition-all after:duration-300`;

  return (
    <nav className={`${navbarClass} supports-[backdrop-filter]:bg-white/75 bg-white/90`}>
      <div className={`${navContainerClass} relative h-full`}>
        <div className="flex items-center h-full">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className={`${navBrandClass} z-20 hover:opacity-80 transition duration-300`}
          >
            My Blog
          </NavLink>

          {/* Center nav for desktop */}
          <ul
            className={`${navLinksClass} hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8`}
          >
            <li>
              <NavLink to="/" end className={getNavClass}>
                Home
              </NavLink>
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <NavLink to="/register" className={getNavClass}>
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-[#0066cc] px-5 py-2 rounded-full text-sm font-medium transition"
                        : "text-[#1d1d1f] border border-[#d2d2d7] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#f5f5f7] transition"
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
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-[#0066cc] px-5 py-2 rounded-full text-sm font-medium transition"
                      : "text-[#1d1d1f] border border-[#d2d2d7] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#f5f5f7] transition"
                  }
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>

          {/* Mobile button */}
          <button
            className="md:hidden ml-auto flex items-center justify-center w-10 h-10 rounded-full border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Mobile nav */}
        <ul
          className={`
            ${navLinksClass}
            md:hidden
            absolute top-[52px] left-0 w-full
            flex flex-col gap-5
            px-6 py-6
            bg-white/95 backdrop-blur-xl
            border-b border-[#e8e8ed]
            ${menuOpen ? "flex" : "hidden"}
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
                <NavLink to="/register" onClick={closeMenu} className={getNavClass}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-[#0066cc] px-5 py-2 rounded-full text-sm font-medium transition w-fit"
                      : "text-[#1d1d1f] border border-[#d2d2d7] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#f5f5f7] transition w-fit"
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
                    ? "text-white bg-[#0066cc] px-5 py-2 rounded-full text-sm font-medium transition w-fit"
                    : "text-[#1d1d1f] border border-[#d2d2d7] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#f5f5f7] transition w-fit"
                }
              >
                Profile
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
