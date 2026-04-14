import { NavLink } from "react-router";
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

  const navItemClass = ({ isActive }) =>
    isActive ? navLinkActiveClass : navLinkClass;

  return (
    <header className={`${navbarClass} sticky top-0 z-50 bg-white shadow-sm`}>
      <div className={`${navContainerClass} flex items-center justify-between py-4`}>
        {/* Logo */}
        <NavLink
          to="/"
          className={`${navBrandClass} text-2xl font-bold text-blue-600`}
          onClick={closeMenu}
        >
          MyBlog
        </NavLink>

        {/* Desktop Nav */}
        <ul className={`${navLinksClass} hidden md:flex items-center gap-6`}>
          <li>
            <NavLink to="/" end className={navItemClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/blogs" className={navItemClass}>
              Blogs
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={navItemClass}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={navItemClass}>
              Contact
            </NavLink>
          </li>

          {!isAuthenticated ? (
            <>
              <li>
                <NavLink to="/register" className={navItemClass}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to={getProfilePath()}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
              >
                Profile
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <ul className="flex flex-col gap-4 px-6 py-4">
            <li>
              <NavLink to="/" end onClick={closeMenu} className={navItemClass}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/blogs" onClick={closeMenu} className={navItemClass}>
                Blogs
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" onClick={closeMenu} className={navItemClass}>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" onClick={closeMenu} className={navItemClass}>
                Contact
              </NavLink>
            </li>

            {!isAuthenticated ? (
              <>
                <li>
                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className={navItemClass}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className="block w-fit px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to={getProfilePath()}
                  onClick={closeMenu}
                  className="block w-fit px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
