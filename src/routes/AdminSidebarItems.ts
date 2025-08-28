import AdminLoginForm from "@/components/Authentication/AdminLoginForm";
import AdminUsersPage from "@/pages/dashboard/pages/AdminUsersPage";
import UserDashboardAnalytics from "@/pages/dashboard/pages/DashboardAnalytics";
import DashboardProfile from "@/pages/dashboard/pages/DashboardProfile";
import DashboardSetting from "@/pages/dashboard/pages/DashboardSettting";
import DashboardTransactions from "@/pages/dashboard/pages/DashboardTransactions";
import type { ISidebarItem } from "@/types";

export const AdminSidebarItems: ISidebarItem[] = [
  {
    title: "Login",
    items: [
      {
        title: "Analytics",
        url: "/adminLogin",
        component : AdminLoginForm,
      },
    ],
  },
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component : UserDashboardAnalytics,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "profile",
        url: "/admin/profile",
        component : DashboardProfile,

      },
    ],
  },
  {
    title: "Users",
    items: [
      {
        title: "users",
        url: "/admin/users",
        component : AdminUsersPage,

      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "transactions",
        url: "/admin/transactions",
        component : DashboardTransactions,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "settings",
        url: "/admin/settings",
        component : DashboardSetting,
      },
    ],
  },
  {
    title: "Logout",
    items: [
      {
        title: "logout",
        url: "#",
        component : UserDashboardAnalytics,
      },
    ],
  },

];

