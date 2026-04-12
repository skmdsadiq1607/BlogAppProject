import { useForm } from "react-hook-form";
import {
  loadingClass,
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  linkClass,
} from "../styles/common";

import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login, currentUser, loading, error, isAuthenticated } = useAuth(
    (state) => state
  );

  const onUserLogin = async (userCredObj) => {
    await login(userCredObj);
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (!currentUser.isUserActive) {
        toast.error("Login unsuccessful -- You are Blocked");
        navigate("/login");
        return;
      }

      if (currentUser.role === "USER") {
        toast.success("Login Successful -- redirecting to user profile", {
          duration: 2000,
        });
        navigate("/user-profile");
      } else if (currentUser.role === "ADMIN") {
        toast.success("Login Successful -- redirecting to admin profile", {
          duration: 2000,
        });
        navigate("/admin-profile");
      } else if (currentUser.role === "AUTHOR") {
        toast.success("Login Successful -- redirecting to author profile", {
          duration: 2000,
        });
        navigate("/author-profile");
      }
    }
  }, [currentUser, isAuthenticated, navigate]);

  if (loading) {
    return <p className={loadingClass}>Loading...</p>;
  }

  return (
    <div className={`${pageBackground} min-h-screen flex items-center justify-center px-4 py-10`}>
      
      <div className={`${formCard} w-full max-w-sm sm:max-w-md md:max-w-lg`}>

        {/* Title */}
        <h2 className={`${formTitle} text-center text-lg sm:text-xl md:text-2xl`}>
          Sign In
        </h2>

        {/* API error */}
        {error && <p className={errorClass}>{error}</p>}

        <form onSubmit={handleSubmit(onUserLogin)} className="space-y-4 sm:space-y-5">

          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              className={`${inputClass} text-sm sm:text-base`}
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  value.trim().length > 0 || "Email cannot be empty",
              })}
            />

            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              className={`${inputClass} text-sm sm:text-base`}
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  value.trim().length > 0 || "Password cannot be empty",
              })}
            />

            {errors.password && (
              <p className={errorClass}>{errors.password.message}</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right -mt-2">
            <a href="/forgot-password" className={`${linkClass} text-xs sm:text-sm`}>
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`${submitBtn} w-full text-sm sm:text-base py-2 sm:py-3`}
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className={`${mutedText} text-center mt-5 text-sm sm:text-base`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={linkClass}>
            Create one
          </NavLink>
        </p>

      </div>
    </div>
  );
}

export default LoginComponent;