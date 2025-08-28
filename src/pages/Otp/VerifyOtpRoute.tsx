
import type { ComponentType } from "react";
import { Navigate , useLocation } from "react-router";

export const VerifyOtpRoute = (Component: ComponentType) => {

  return function AuthWrapper() {

    const location = useLocation();
    const email = location.state?.email;
    const role = location.state?.role

    if (!email && role) {
      return <Navigate to="/" />;
    }

    return <Component/>;
  };
};
