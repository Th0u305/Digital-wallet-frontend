import App from "@/App";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FAQ from "@/pages/faq/FAQ";
import Home from "@/pages/home/Home";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import Pricing from "@/pages/pricing/Pricing";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import { UserSidebarItems } from "./UserSidebarItems";
import { AdminSidebarItems } from "./AdminSidebarItems";
import Verify from "@/pages/Otp/Verify";
import { withAuth } from "@/utils/withAuth";
import type { TRole } from "@/types";
import ErrorPage from "@/pages/errorPage/ErrorPage";
import { VerifyOtpRoute } from "@/pages/Otp/VerifyOtpRoute";
import { AgentSidebarItems } from "./AgentSidebarItems";
import AdminLogin from "@/pages/auth/AdminLogin";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify",
        Component: VerifyOtpRoute(Verify),
      },
    ],
  },
  {
    path: "/adminLogin",
    element: <AdminLogin />,
  },
  {
    Component: withAuth(DashboardLayout, "USER" as TRole),
    path: "/user",
    children: [
      {
        index: true,
        element: <Navigate to="/user/analytics" />,
      },
      ...generateRoutes(UserSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, "AGENT" as TRole),
    path: "/agent",
    children: [
      {
        index: true,
        element: <Navigate to="/agent/analytics" />,
      },
      ...generateRoutes(AgentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, "ADMIN" as TRole),
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to="/admin/analytics" />,
      },
      ...generateRoutes(AdminSidebarItems),
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);
