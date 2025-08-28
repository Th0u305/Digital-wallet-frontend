import UserDashboardAnalytics from "@/pages/dashboard/pages/DashboardAnalytics";
import DashboardProfile from "@/pages/dashboard/pages/DashboardProfile";
import DashboardSetting from "@/pages/dashboard/pages/DashboardSettting";
import DashboardTransactions from "@/pages/dashboard/pages/DashboardTransactions";
import type { ISidebarItem } from "@/types";

export const AgentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/agent/analytics",
        component : UserDashboardAnalytics,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "profile",
        url: "/agent/profile",
        component : DashboardProfile,

      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "settings",
        url: "/agent/settings",
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
  {
    title: "Transactions",
    items: [
      {
        title: "transactions",
        url: "/agent/transactions",
        component : DashboardTransactions,
      },
    ],
  },

];

