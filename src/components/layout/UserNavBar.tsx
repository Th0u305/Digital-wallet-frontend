"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { User, Settings, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const UserNavBar = () => {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {

    if (!data || !data?.data?.email) {
      return toast.error("You're not logged in")
    }
    
    await logout(undefined);
    toast.success("Logged out Successfully");
    dispatch(authApi.util.resetApiState());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full hover:bg-background dark:hover:bg-background hover:text-accent"
        >
          <Avatar className="h-10 w-10 border-2 border-accent">
            <AvatarImage
              src={
                data?.data?.picture || data?.data?.name?.charAt(0).toUpperCase()
              }
            />
            <AvatarFallback>
              {data?.data?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.data?.name || "John"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data?.data?.email || "example@gmail.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              navigate(
                `/${
                  (data?.data?.role.toLowerCase() === "admin" && "admin") ||
                  (data?.data?.role.toLowerCase() === "user" && "user") ||
                  (data?.data?.role.toLowerCase() === "agent" && "agent")
                }/profile`
              )
            }
          >
            <User className="mr-2 h-4 w-4 text-white" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              navigate(
                `/${
                  (data?.data?.role.toLowerCase() === "admin" && "admin") ||
                  (data?.data?.role.toLowerCase() === "user" && "user") ||
                  (data?.data?.role.toLowerCase() === "agent" && "agent")
                }/settings`
              )
            }
          >
            <Settings className="mr-2 h-4 w-4 text-white" />
            <span>Settings</span>
          </DropdownMenuItem>
          {data?.data?.email && (
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  `/${
                    (data?.data?.role.toLowerCase() === "admin" && "admin") ||
                    (data?.data?.role.toLowerCase() === "user" && "user") ||
                    (data?.data?.role.toLowerCase() === "agent" && "agent")
                  }/analytics`
                )
              }
            >
              <Shield className="mr-2 h-4 w-4 text-white" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="hover:bg-red-400 dark:hover:bg-red-500 dark:hover:text-black hover:text-black"
        >
          <LogOut className="mr-2 h-4 w-4 dark:hover:text-black hover:text-black" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavBar;
