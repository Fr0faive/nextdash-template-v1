"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Chip } from "@/components/ui/chip";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import {
  MoreVertical,
  Search,
  Filter,
  Download,
  User,
  Mail,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/button";

const users = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex@example.com",
    role: "Admin",
    status: "Active",
    date: "Apr 12, 2024",
  },
  {
    id: 2,
    name: "Sarah Connor",
    email: "sarah@example.com",
    role: "Editor",
    status: "Inactive",
    date: "Apr 10, 2024",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    role: "Viewer",
    status: "Active",
    date: "Apr 08, 2024",
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "Editor",
    status: "Pending",
    date: "Apr 05, 2024",
  },
  {
    id: 5,
    name: "David Kim",
    email: "david@example.com",
    role: "Admin",
    status: "Active",
    date: "Apr 02, 2024",
  },
  {
    id: 6,
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Viewer",
    status: "Active",
    date: "Mar 30, 2024",
  },
  {
    id: 7,
    name: "Lucas Brown",
    email: "lucas@example.com",
    role: "Editor",
    status: "Inactive",
    date: "Mar 28, 2024",
  },
];

export default function DataTablesDemo() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <PageLayout>
      <PageHeader
        title="Data Tables"
        subtitle="Highly customizable tables for displaying and managing structured data."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Data Tables", active: true },
        ]}
      />

      <PageContent className="space-y-8">
        {/* Table Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <IconButton
              icon={<Filter className="w-4 h-4" />}
              variant="outline"
            />
            <IconButton
              icon={<Download className="w-4 h-4" />}
              variant="outline"
            />
          </div>
        </div>

        {/* User Table */}
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      variant="soft"
                      color={user.role === "Admin" ? "primary" : "neutral"}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          user.status === "Active"
                            ? "bg-green-500"
                            : user.status === "Inactive"
                              ? "bg-zinc-400"
                              : "bg-orange-500",
                        )}
                      />
                      <span className="text-sm font-medium">{user.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {user.date}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <IconButton
                      icon={<MoreVertical className="w-4 h-4" />}
                      variant="ghost"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-bold text-foreground">1 to 7</span>{" "}
              of <span className="font-bold text-foreground">50</span> entries
            </p>
            <Pagination 
              currentPage={currentPage} 
              totalPages={5} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </div>

        {/* Minimal Variant */}
        <section className="space-y-6 pt-12">
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Transaction History</h2>
            <p className="text-sm text-muted-foreground">
              A simpler table style for financial records.
            </p>
          </div>
          <Table className="bg-transparent border-none shadow-none">
            <TableHeader className="bg-transparent">
              <TableRow className="border-b">
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  desc: "Figma Subscription",
                  amount: "-$12.00",
                  category: "Software",
                  time: "2h ago",
                },
                {
                  desc: "Stripe Payout",
                  amount: "+$2,450.00",
                  category: "Sales",
                  time: "5h ago",
                },
                {
                  desc: "AWS Cloud Services",
                  amount: "-$84.32",
                  category: "Infrastructure",
                  time: "1d ago",
                },
              ].map((tx, i) => (
                <TableRow key={i} className="hover:bg-accent/20">
                  <TableCell className="font-bold">{tx.desc}</TableCell>
                  <TableCell
                    className={cn(
                      "font-black",
                      tx.amount.startsWith("+")
                        ? "text-green-600"
                        : "text-foreground",
                    )}
                  >
                    {tx.amount}
                  </TableCell>
                  <TableCell>
                    <Badge count={tx.category} variant="secondary" />
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {tx.time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </PageContent>
    </PageLayout>
  );
}
