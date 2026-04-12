import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  articlePageWrapper,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const article = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // prefill form
  useEffect(() => {
    if (!article) return;

    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article]);

  const updateArticle = async (modifiedArticle) => {
    console.log(modifiedArticle);

    modifiedArticle.articleId = article._id;

    let res = await axios.put(
      "https://atp-24eg112c38-2.onrender.com/author-api/articles",
      modifiedArticle,
      { withCredentials: true }
    );

    if (res.status === 200) {
      navigate(`/article/${article._id}`, {
        state: res.data.payload,
      });
    }
  };

  return (
    <div className={`${articlePageWrapper} min-h-screen flex items-center justify-center px-4 py-8`}>
      
      <div className={`${formCard} w-full max-w-md sm:max-w-lg md:max-w-2xl`}>

        <h2 className={`${formTitle} text-center text-lg sm:text-xl md:text-2xl`}>
          Edit Article
        </h2>

        <form onSubmit={handleSubmit(updateArticle)} className="space-y-4 sm:space-y-5">

          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Title</label>

            <input
              className={`${inputClass} text-sm sm:text-base`}
              {...register("title", { required: "Title required" })}
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
              {...register("category", { required: "Category required" })}
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
              rows="14"
              className={`${inputClass} text-sm sm:text-base resize-none`}
              {...register("content", { required: "Content required" })}
            />

            {errors.content && (
              <p className={errorClass}>{errors.content.message}</p>
            )}
          </div>

          <button
            className={`${submitBtn} w-full text-sm sm:text-base`}
          >
            Update Article
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditArticle;