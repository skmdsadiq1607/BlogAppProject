import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";

import { pageWrapper, navLinkClass, divider } from "../styles/common";

function AuthorProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  // call this function on logout
  const onLogout = async () => {
    // call login route and navigate to the login page
    await logout();
    navigate("/login");
  };

  return (
    <div className={`${pageWrapper} px-4 sm:px-6`}>

      {/* PROFILE HEADER */}
      <div className="bg-white border border-[#e8e8ed] rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Avatar */}
          {currentUser?.profileImageUrl ? (
            <img
              src={currentUser.profileImageUrl}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border"
              alt="profile"
            />
          ) : (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-lg sm:text-xl font-semibold">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Name */}
          <div>
            <p className="text-xs sm:text-sm text-[#6e6e73]">
              Welcome back
            </p>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1d1d1f]">
              {currentUser?.firstName}
            </h2>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          className="w-full sm:w-auto bg-[#ff3b30] text-white text-sm px-4 sm:px-5 py-2 rounded-full hover:bg-[#d62c23] transition"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      {/* NAVIGATION (TABS STYLE) */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-[#f5f5f7] p-2 rounded-2xl sm:rounded-full w-full sm:w-fit overflow-x-auto">

        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive
              ? "bg-white px-4 sm:px-5 py-2 rounded-full text-[#0066cc] text-sm font-medium shadow-sm whitespace-nowrap"
              : `${navLinkClass} px-4 sm:px-5 py-2 whitespace-nowrap`
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive
              ? "bg-white px-4 sm:px-5 py-2 rounded-full text-[#0066cc] text-sm font-medium shadow-sm whitespace-nowrap"
              : `${navLinkClass} px-4 sm:px-5 py-2 whitespace-nowrap`
          }
        >
          Write Article
        </NavLink>

      </div>

      <div className={divider}></div>

      {/* CONTENT */}
      <div className="mt-4 sm:mt-6">
        <Outlet />
      </div>

    </div>
  );
}

export default AuthorProfile;