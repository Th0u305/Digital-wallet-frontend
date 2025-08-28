import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sideBar";
import {
  // IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconTransactionDollar,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router";
import { Home, Users } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { ThemeToggle } from "../ui/theme-toggle";
import VerifyReminderPage from "@/pages/Otp/VerifyReminderPage";
import { driver } from "driver.js";
import { agentTourSteps, userTourSteps } from "@/utils/driverJs/TourTypes";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { data } = useUserInfoQuery(undefined);

  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <Home className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Analytics",
      href: "analytics",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Transactions",
      href: "transactions",
      icon: (
        <IconTransactionDollar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    // {
    //   label: "Logout",
    //   href: "#",
    //   icon: (
    //     <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    //   ),
    // },
  ];

  const newLinks = [
    ...links,
    {
      label: "Users",
      href: "/admin/users",
      icon: (
        <Users className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  const handleStartTour = () => {
    const driverObj = driver({
      showProgress: true, // Show a progress bar
      steps: data?.data?.role === "USER" ? userTourSteps : agentTourSteps,
    });

    driverObj.drive();
  };

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      handleStartTour();
      localStorage.setItem("hasSeenTour", "true");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen overflow-auto" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody id="sidebar" className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <span id="logo">
              {open ? <Logo role={data?.data?.role} /> : <LogoIcon />}
            </span>
            <div className="mt-8 flex flex-col gap-2">
              {(data?.data?.role === "ADMIN" ? newLinks : links).map(
                (link, idx) => (
                  <SidebarLink key={idx} link={link} />
                )
              )}
            </div>
          </div>
          <div>
            <ThemeToggle />
            <SidebarLink
              link={{
                label: `${data?.data?.name}`,
                href: "#",
                icon: (
                  <img
                    src={data?.data?.image}
                    className="mt-2 h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard
        isVerified={data?.data?.isVerified}
        email={data?.data?.email}
        role={data?.data?.role}
        walletStatus={data?.walletStatus}
      />
    </div>
  );
};
export const Logo = ({ role }: { role: string }) => {
  return (
    <a
      href={`${
        (role === "ADMIN" && "/admin/analytics") ||
        (role === "USER" && "/user/analytics") ||
        (role === "AGENT" && "/agent/analytics")
      }`}
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        SecurePay
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

const Dashboard = ({
  isVerified,
  email,
  role,
  walletStatus,
}: {
  isVerified: boolean;
  email: string;
  role: string;
  walletStatus: string;
}) => {
  useEffect(() => {
    if (!isVerified || walletStatus !== "ACTIVE") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: walletStatus !== "ACTIVE" ?  `Your wallet is ${walletStatus?.toLowerCase()} . Please consult with admin` :  "You're not verified ",
      });
    }
  }, [isVerified, walletStatus]);
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full overflow-y-scroll flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        {!isVerified && <VerifyReminderPage email={email} role={role} />}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
