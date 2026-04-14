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

  return (
    <nav className={`${navbarClass} sticky top-0 z-50`}>
      <div className={`${navContainerClass} flex items-center justify-between`}>
        <NavLink to="/" className={navBrandClass} onClick={closeMenu}>
          My Blog
        </NavLink>

        <button
          className="md:hidden text-2xl font-semibold text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul
          className={`
            ${navLinksClass}
            absolute md:static top-16 left-0 w-full md:w-auto
            bg-white md:bg-transparent
            flex flex-col md:flex-row
            gap-3 md:gap-6
            p-4 md:p-0
            rounded-b-xl md:rounded-none
            shadow-lg md:shadow-none
            border-t md:border-0
            transition-all duration-200
            ${menuOpen ? "block" : "hidden md:flex"}
          `}
        >
          <li>
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass
              }
            >
              Home
            </NavLink>
          </li>

          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? navLinkActiveClass : navLinkClass
                  }
                >
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? navLinkActiveClass : navLinkClass
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
                  isActive ? navLinkActiveClass : navLinkClass
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
