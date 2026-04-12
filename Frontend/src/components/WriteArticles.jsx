import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
} from "../styles/common";

import { useAuth } from "../stores/authStore";
import toast from "react-hot-toast";

function WriteArticles() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitArticle = async (articleObj) => {
    setLoading(true);

    articleObj.author = currentUser._id;

    try {
      let res = await axios.post(
        "https://atp-24eg112c38-2.onrender.com/author-api/article",
        articleObj,
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success("Article published successfully");
        navigate("../articles");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gray-50">
      
      {/* responsive card wrapper */}
      <div className={`${formCard} w-full max-w-md sm:max-w-lg md:max-w-2xl`}>
        
        <h2 className={`${formTitle} text-center text-lg sm:text-xl md:text-2xl`}>
          Write New Article
        </h2>

        <form onSubmit={handleSubmit(submitArticle)} className="space-y-4 sm:space-y-5">

          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Title</label>

            <input
              type="text"
              className={`${inputClass} text-sm sm:text-base`}
              placeholder="Enter article title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
            />

            {errors.title && (
              <p className={errorClass}>{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div className={formGroup}>
            <label className={labelClass}>Category</label>

            <select
              className={`${inputClass} text-sm sm:text-base`}
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option value="">Select category</option>
              <option value="technology">Technology</option>
              <option value="programming">Programming</option>
              <option value="ai">AI</option>
              <option value="web-development">Web Development</option>
            </select>

            {errors.category && (
              <p className={errorClass}>{errors.category.message}</p>
            )}
          </div>

          {/* Content */}
          <div className={formGroup}>
            <label className={labelClass}>Content</label>

            <textarea
              rows="8"
              className={`${inputClass} text-sm sm:text-base resize-none`}
              placeholder="Write your article content..."
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 50,
                  message: "Content must be at least 50 characters",
                },
              })}
            />

            {errors.content && (
              <p className={errorClass}>{errors.content.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            className={`${submitBtn} w-full text-sm sm:text-base`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Article"}
          </button>

          {loading && (
            <p className={loadingClass + " text-center text-sm"}>
              Publishing article...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default WriteArticles;