import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import { useState, useEffect } from "react";
import axios from "axios";
import { articleTitle } from "../styles/common.js";

function AdminProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await axios.patch(
        "https://atp-24eg112c38-2.onrender.com/admin-api/users",
        {
          userId: userId,
          isUserActive: !currentStatus,
        },
        { withCredentials: true }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isUserActive: !currentStatus } : u
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        let res = await axios.get(
          "https://atp-24eg112c38-2.onrender.com/admin-api/users",
          { withCredentials: true }
        );

        if (res.status === 200) {
          setUsers(res.data.payload);
        }
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6 sm:py-10">

      {/* HEADER */}
      <div className="bg-white border border-[#e8e8ed] rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3 sm:gap-4">

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

      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500 text-sm text-center mb-4">
          Loading users...
        </p>
      )}

      {/* USERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        {users.map(
          (userObj) =>
            userObj.role !== "ADMIN" && (
              <div
                key={userObj._id}
                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >

                {/* NAME */}
                <h3 className={`${articleTitle} text-base sm:text-lg`}>
                  {userObj.firstName}
                </h3>

                {/* STATUS */}
                <p className="text-sm mt-2">
                  Status:{" "}
                  <span
                    className={
                      userObj.isUserActive
                        ? "text-green-600 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {userObj.isUserActive ? "Active" : "Blocked"}
                  </span>
                </p>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    handleToggleStatus(userObj._id, userObj.isUserActive)
                  }
                  className={`mt-4 w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-medium transition ${
                    userObj.isUserActive
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                >
                  {userObj.isUserActive ? "Block" : "Unblock"}
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default AdminProfile;