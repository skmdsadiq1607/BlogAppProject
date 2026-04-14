<nav className={`${navbarClass} border-b border-[#e8e8ed]`}>
  <div className={`${navContainerClass} flex items-center justify-between`}>

    {/* LOGO */}
    <NavLink
      to="/"
      onClick={closeMenu}
      className={`${navBrandClass} hover:opacity-80 transition`}
    >
      My Blog
    </NavLink>

    {/* HAMBURGER */}
    <button
      className="md:hidden text-xl text-[#1d1d1f]"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? "✕" : "☰"}
    </button>

    {/* NAV LINKS */}
    <ul
      className={`
        ${navLinksClass}
        absolute md:static top-[52px] left-0 w-full md:w-auto
        bg-white md:bg-transparent
        flex flex-col md:flex-row
        gap-4 md:gap-7
        px-6 md:px-0 py-5 md:py-0
        border-b md:border-0 border-[#e8e8ed]
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
            isActive
              ? `${navLinkActiveClass} border-b-2 border-[#0066cc] pb-1`
              : `${navLinkClass} pb-1`
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
                isActive
                  ? `${navLinkActiveClass} border-b-2 border-[#0066cc] pb-1`
                  : `${navLinkClass} pb-1`
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
                isActive
                  ? `${navLinkActiveClass} border-b-2 border-[#0066cc] pb-1`
                  : `${navLinkClass} pb-1`
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
                ? `${navLinkActiveClass} border-b-2 border-[#0066cc] pb-1`
                : `${navLinkClass} pb-1`
            }
          >
            Profile
          </NavLink>
        </li>
      )}
    </ul>
  </div>
</nav>
