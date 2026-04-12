import { useAuth } from "../stores/authStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
} from "../styles/common.js";

function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        let res = await axios.get(
          "https://atp-24eg112c38-2.onrender.com/user-api/articles",
          { withCredentials: true }
        );

        if (res.status === 200) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

      {/* ERROR */}
      {error && <p className={errorClass}>{error}</p>}

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

      {/* ARTICLES SECTION */}
      <div className="mt-2 sm:mt-4">
        <h3 className="text-base sm:text-lg font-semibold text-[#1d1d1f] mb-3 sm:mb-4">
          Latest Articles
        </h3>

        {/* EMPTY STATE */}
        {articles.length === 0 ? (
          <p className="text-[#a1a1a6] text-sm text-center py-8 sm:py-10">
            No articles available yet
          </p>
        ) : (
          <div className={`${articleGrid} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`}>
            {articles.map((articleObj) => (
              <div className={articleCardClass} key={articleObj._id}>
                <div className="flex flex-col h-full">

                  {/* TOP */}
                  <div>
                    <p className={`${articleTitle} text-sm sm:text-base`}>
                      {articleObj.title}
                    </p>

                    <p className="text-xs sm:text-sm text-[#6e6e73] mt-1">
                      {articleObj.content.slice(0, 80)}...
                    </p>

                    <p className={`${timestampClass} mt-2 text-xs sm:text-sm`}>
                      {formatDateIST(articleObj.createdAt)}
                    </p>
                  </div>

                  {/* ACTION */}
                  <button
                    className={`${ghostBtn} mt-auto pt-3 sm:pt-4 text-sm sm:text-base`}
                    onClick={() => navigateToArticleByID(articleObj)}
                  >
                    Read Article →
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;