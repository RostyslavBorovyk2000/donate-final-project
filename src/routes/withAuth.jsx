// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export function withAuth(WrappedComponent, redirectTo = "", requiredAdmin = false) {
//   return function ProtectedRoute(props) {
//     const navigate = useNavigate();
//     const isUserLoggedIn = localStorage.getItem("userLogin") || null;
//     const isUserAdmin = localStorage.getItem("isAdmin") === "true";

//     useEffect(() => {
//       if (!isUserLoggedIn || (requiredAdmin && !isUserAdmin)) {
//         navigate(redirectTo);
//       }
//     }, [isUserLoggedIn, isUserAdmin, navigate]);

//     return isUserLoggedIn ? <WrappedComponent {...props} /> : null;
//   };
// }

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function withAuth(WrappedComponent, redirectTo = "", requiredAdmin = false, prohibitAdmin = false) {
  return function ProtectedRoute(props) {
    const navigate = useNavigate();
    const isUserLoggedIn = localStorage.getItem("userLogin") || null;
    const isUserAdmin = localStorage.getItem("isAdmin") === "true";

    useEffect(() => {
      if (!isUserLoggedIn || (requiredAdmin && !isUserAdmin) || (prohibitAdmin && isUserAdmin)) {
        navigate(redirectTo);
      }
    }, [isUserLoggedIn, isUserAdmin, navigate]);

    return isUserLoggedIn ? <WrappedComponent {...props} /> : null;
  };
}
