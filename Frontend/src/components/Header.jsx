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
    isActive ? navLinkActiveClass : navLinkClass;

  return (
    <nav className={navbarClass}>
      <div className={`${navContainerClass} relative`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={navBrandClass}
        >
          My Blog
        </NavLink>

        <button
          className="md:hidden ml-auto text-xl text-[#1d1d1f]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul className={`${navLinksClass} hidden md:flex ml-auto`}>
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
                  className="border border-[#d2d2d7] px-5 py-2 rounded-full text-sm text-[#1d1d1f] hover:bg-[#f5f5f7] transition"
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
                className="border border-[#d2d2d7] px-5 py-2 rounded-full text-sm text-[#1d1d1f] hover:bg-[#f5f5f7] transition"
              >
                Profile
              </NavLink>
            </li>
          )}
        </ul>

        {menuOpen && (
          <ul className="absolute top-[52px] left-0 w-full bg-white border-b border-[#e8e8ed] flex flex-col gap-4 px-6 py-5 md:hidden">
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
                    className="inline-block border border-[#d2d2d7] px-5 py-2 rounded-full text-sm text-[#1d1d1f] hover:bg-[#f5f5f7] transition"
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
                  className="inline-block border border-[#d2d2d7] px-5 py-2 rounded-full text-sm text-[#1d1d1f] hover:bg-[#f5f5f7] transition"
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;
