import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import TransactionCharts from "@/components/dashboard/TransactionCharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllInfoQuery,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { Check, Clock, DollarSign, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import "driver.js/dist/driver.css";

const UserDashboardAnalytics = () => {
  const { data } = useGetAllInfoQuery(undefined);
  const { data: userData } = useUserInfoQuery(undefined);
  

  const balance = data?.data?.wallet?.balance;
  const transactions = data?.data?.allTransactions;

  const stats = [
    {
      id : "wallet-balance-card",
      title: "Current Balance",
      value: balance || 0.0,
      icon: DollarSign,
      color: "primary",
      // loading: balanceLoading
    },
    {
      id: "total-transactions-stat",
      title: "Total Transactions",
      value: transactions,
      icon: TrendingUp,
      color: "accent",
      // loading: statsLoading
    },
    {
      id: "pending-transactions-stat",
      title: "Pending",
      value: 0,
      icon: Clock,
      color: "warning",
      // loading: statsLoading
    },
    {
      id: "success-rate-chart",
      title: "Success Rate",
      value: "0%",
      icon: Check,
      color: "success",
      // loading: statsLoading
    },
  ];

  return (
    <div className="space-y-6 h-screen" id="dashboard-stats">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-primary to-accent dark:from-primary-foreground rounded-lg p-6 text-white"
      >
        {(userData?.data?.role === "USER" && (
          <>
            <h1 className="text-2xl font-bold mb-2">
              Welcome to Your Wallet Dashboard
            </h1>
            <p className="text-primary-100">
              Manage your finances, send money, and track transactions all in
              one place.
            </p>
          </>
        )) ||
          (userData?.data?.role === "AGENT" && (
            <>
              {" "}
              <h1 className="text-2xl font-bold mb-2">Agent Control Panel</h1>
              <p className="text-accent-100">
                Provide cash-in and cash-out services to users and track your
                commissions.
              </p>
            </>
          )) ||
          (userData?.data?.role === "ADMIN" && (
            <>
              <h1 className="text-2xl font-bold mb-2">System Administration</h1>
              <p className="text-primary-100">
                Monitor system performance, manage users, and oversee platform
                operations.
              </p>
            </>
          ))}
      </motion.div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Quick Actions */}
      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionCharts />
        {/* Transaction Chart */}
        <div id="chart-section">
          <Card className="h-25">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="w-fit">Recent transactions</CardTitle>
              <CardTitle className="w-fit text-sm font-normal">
                <Link to="transactions">View All</Link>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Transactions */}
      </div>
    </div>
  );
};

export default UserDashboardAnalytics;
