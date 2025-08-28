/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserActionModal } from "@/components/dashboard/UserActionModal";
import {
  Search,
  MoreHorizontal,
  Shield,
  AlertTriangle,
  Clock,
  Ban,
  Verified,
  ShieldX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAllInfoByAdminQuery } from "@/redux/features/auth/auth.api";
import type { UserFilters } from "@/types";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";

export default function AdminUsersPage() {
  const [filters, setFilters] = useState<UserFilters>({});
  // const [searchTerm, setSearchTerm] = useState("");
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState<number>(1);


  const { data, refetch } = useGetAllInfoByAdminQuery({
    view: filters.role === undefined ? "user" : filters.role,
    filterBy: "wallet",
    sortBy: filters.sortOrder === undefined ? "asc" : filters.sortOrder,
    walletStatus:
      filters.walletStatus === undefined ? "ACTIVE" : filters.walletStatus,
    isVerified: filters.isVerified === undefined ? true : filters.isVerified,
    limit: 20,
    page : currentPage
  });

  const users = data?.data?.data;

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    refetch();
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // const handleSearch = (e) => {
  //   const ff = e.target.value

  //   setSearchTerm(ff);
  // };

  const handleUserAction = (user:any) => {
    setSelectedUser(user)
    setShowActionModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Shield className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        );
      case "blocked":
        return (
          <Badge variant="destructive">
            <Ban className="h-3 w-3 mr-1" />
            Blocked
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getVerify = (status: boolean) => {
    switch (status) {
      case true:
        return (
          <span className="flex gap-2 text-gray-400">
            verified
            <Verified className="text-green-600 w-5 h-5" />
          </span>
        );
      case false:
        return (
          <span className="flex gap-2 text-gray-400">
            unverified
            <ShieldX className="text-red-600 w-5 h-5" />
          </span>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 rounded-xl bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage user accounts, approvals, and status
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>{users?.length} found</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col gap-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or ID..."
                  // onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Select
                  value={filters.walletStatus || "ACTIVE"}
                  onValueChange={(value) =>
                    handleFilterChange("walletStatus", value)
                  }
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Wallet Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    <SelectItem value="BLOCKED">Blocked</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.role || "user"}
                  onValueChange={(value) => handleFilterChange("role", value)}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.isVerified || "true"}
                  onValueChange={(value) =>
                    handleFilterChange("isVerified", value)
                  }
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Verification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Verified</SelectItem>
                    <SelectItem value="false">Unverified</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.sortOrder || "asc"}
                  onValueChange={(value) =>
                    handleFilterChange("sortOrder", value)
                  }
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Users Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Wallet Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user: any) => (
                    <TableRow key={user?._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={users?.picture || "/placeholder.svg"}
                              alt={user?.name}
                            />
                            <AvatarFallback>
                              {user?.name?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user?.email}
                            </p>
                            {getVerify(user?.isVerified)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(user?.walletStatus.toLowerCase())}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          cn(
                            "capitalize",
                            {
                              "bg-green-600" : user?.role === "USER",
                              "bg-amber-700" : user?.role === "ADMIN",
                              "bg-blue-600" : user?.role === "AGENT"
                            }
                          )
                        }>
                          {user?.role.toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            ${user?.walletData?.balance?.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total: ${user?.totalTransacted?.toLocaleString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {user?.transactionCount}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            transactions
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleUserAction(user)}
                            >
                              Manage User
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                              View Transactions
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>

      {/* User Action Modal */}
      <UserActionModal
        user={selectedUser}
        open={showActionModal}
        onOpenChange={setShowActionModal}
      />
    </div>
  );
}
