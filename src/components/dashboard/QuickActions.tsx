import { motion } from "framer-motion";
import SendMoneyModal from "./SendMoneyModal";
import { cn } from "@/lib/utils";
import WithdrawMoneyModal from "./WithdrawMoneyModal";
import CashInMoneyModal from "./CashInMoneyModal";
import CashOutMoneyModal from "./CashoutMoneyModal";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import UserAddMoneyModal from "./UserAddMoneyModal";
import AddMoneyModal from "./AddMoneyModal";
import UserCashOutModal from "./UserCashOutModal";

const QuickActions = () => {
  const { data } = useUserInfoQuery(undefined);


  const userAction = [
    {
      id: "withdraw-money-btn",
      title: "Withdraw",
      description: "Withdraw out your money",
      icon: WithdrawMoneyModal,
      color: "warning",
    },
    {
      id: "add-money-btn",
      title: "Add Money",
      description: "Deposit via agent",
      icon: UserAddMoneyModal,
      color: "accent",
    },
    {
      id: "send-money-btn",
      title: "Send Money",
      description: "Transfer to friends & family",
      icon: SendMoneyModal,
      color: "primary",
    },
    {
      id: "cash-out-feature",
      title: "Cash out",
      description: "Cash out customers money",
      icon: UserCashOutModal,
      color: "success",
    },
  ];

  const agentActions = [
    {
      id: "cash-in-feature",
      title: "Cash in",
      description: "Deposit via agent",
      icon: CashInMoneyModal,
      color: "accent",
    },
    {
      id: "send-money-btn",
      title: "Send Money",
      description: "Transfer to friends & family",
      icon: SendMoneyModal,
      color: "primary",
    },
    {
      id: "cash-out-feature",
      title: "Cash out",
      description: "Cash out customers money",
      icon: CashOutMoneyModal,
      color: "success",
    },
    {
      id: "add-money-btn",
      title: "Add Money",
      description: "Add money to your wallet",
      icon: AddMoneyModal,
      color: "warning",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(data?.data?.role === "USER" ? userAction : agentActions).map(
            (action, index) => (
              <motion.span
                id={action.id}
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "text-white p-4 rounded-lg transition-colors text-center group",
                  {
                    "bg-gray-700 hover:bg-gray-600": action.color === "primary",
                    "bg-accent hover:bg-accent": action.color === "accent",
                    "bg-green-600 hover:bg-green-700":
                      action.color === "success",
                    "bg-yellow-600 hover:bg-yellow-700":
                      action.color === "warning",
                  }
                )}
              >
                <span>
                  <action.icon />
                </span>
                <div className="text-sm font-medium">{action?.title}</div>
                <div className="text-xs opacity-90 mt-1">
                  {action?.description}
                </div>
              </motion.span>
            )
          )}
        </div>
      </motion.div>
    </>
  );
};

export default QuickActions;
