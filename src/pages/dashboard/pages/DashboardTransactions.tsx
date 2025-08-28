/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTransactionHistoryQuery } from "@/redux/features/auth/auth.api";
import { Search } from "lucide-react";
import { useState } from "react";

export default function DashboardTransactions() {

  const [ currentPage, setCurrentPage ] = useState<number>(1)
  const { data } = useGetTransactionHistoryQuery(currentPage);
  

  return (
    <main className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Transaction History
        </h1>
        <p className="text-muted-foreground">
          View and manage all your wallet transactions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>
            {/* {totalTransactions} transaction{totalTransactions !== 1 ? "s" : ""} found */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                // value={searchTerm}
                // onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
            // value={filters.type || "all"} onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdraw">Withdrawals</SelectItem>
                <SelectItem value="send">Sent</SelectItem>
                <SelectItem value="receive">Received</SelectItem>
              </SelectContent>
            </Select>

            <Select
            // value={filters.status || "all"} onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Transactions Id</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Transaction type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((invoice: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {invoice.transactionId}
                    </TableCell>
                    <TableCell>
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.substring(1).toLowerCase()}
                    </TableCell>
                    <TableCell>Bank transfer</TableCell>
                    <TableCell className="capitalize">{invoice?.transactionType.split("_").join(" ").toLowerCase()}</TableCell>
                    <TableCell className="text-right">
                      {invoice.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    {data?.meta?.totalMoney[0]?.totalMoney}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
}
