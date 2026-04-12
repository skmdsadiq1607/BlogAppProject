// import { useEffect } from "react";
// import { useNavigate } from "react-router";

// const Unauthorized = ({ redirectTo = "/login", delay = 2000 }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate(redirectTo, { replace: true });
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [navigate, redirectTo, delay]);

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
//       <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
//       <p className="text-lg text-gray-700 mb-2">You don’t have permission to access this page.</p>
//       <p className="text-sm text-gray-500">Redirecting...</p>
//     </div>
//   );
// };

//  export default Unauthorized;

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const Unauthorized = ({ delay = 5000 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo || "/login";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">

      <div className="bg-white shadow-md rounded-xl p-6 sm:p-10 w-full max-w-md sm:max-w-lg">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-3 sm:mb-4">
          403 - Unauthorized
        </h1>

        <p className="text-sm sm:text-base text-gray-700 mb-2">
          You don’t have permission to access this page.
        </p>

        <p className="text-xs sm:text-sm text-gray-500">
          Redirecting...
        </p>

      </div>

    </div>
  );
};

export default Unauthorized;