"use client";

import * as React from "react";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  History, 
  FileText, 
  Download,
  AlertCircle
} from "lucide-react";

export default function BillingPage() {
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 2000);
  };

  const invoices = [
    { id: "INV-2024-001", date: "Apr 01, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-002", date: "Mar 01, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-003", date: "Feb 01, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-004", date: "Jan 01, 2024", amount: "$29.00", status: "Paid" },
  ];

  return (
    <PageLayout>
      <PageHeader
        title="Billing & Subscription"
        subtitle="Manage your plan, payment methods, and review your billing history."
        breadcrumbs={[
          { label: "Settings", href: "/settings/profile" },
          { label: "Billing", active: true },
        ]}
      />

      <PageContent className="space-y-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Plan */}
            <Card className="relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors duration-700"></div>
              <CardHeader 
                title="Current Plan" 
                subtitle="You are currently on the Pro Annual plan." 
              />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">$29</span>
                    <span className="text-muted-foreground font-medium">/ month</span>
                  </div>
                  <div className="space-y-2">
                    {["Unlimited Projects", "Priority Support", "Advanced Analytics", "Custom Domain"].map(feature => (
                      <div key={feature} className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button size="lg" onClick={handleUpdate} isLoading={isUpdating}>
                    Upgrade Plan
                  </Button>
                  <Button variant="outline" size="lg">Cancel Subscription</Button>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t flex items-center gap-3 text-sm text-muted-foreground bg-accent/5 -mx-8 px-8 py-4">
                <AlertCircle className="w-4 h-4 text-primary" />
                Next billing date is <span className="font-bold text-foreground">May 01, 2024</span>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader 
                title="Payment Methods" 
                subtitle="Manage your credit cards and payment accounts."
                actions={
                  <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                    Add Method
                  </Button>
                }
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 rounded-3xl border bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-card border flex items-center justify-center shadow-sm">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        Visa ending in 4242
                        <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] uppercase font-black tracking-widest">Default</span>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">Expiry 12/26</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>

                <div className="flex items-center justify-between p-6 rounded-3xl border hover:bg-accent/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-card border flex items-center justify-center shadow-sm">
                      <CreditCard className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-bold">Mastercard ending in 8888</div>
                      <div className="text-xs text-muted-foreground font-medium">Expiry 08/25</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader 
                title="Billing History" 
                subtitle="Download your previous invoices and receipts."
                actions={<Button variant="ghost" size="sm" leftIcon={<History className="w-4 h-4" />}>View All</Button>}
              />
              
              <div className="overflow-x-auto -mx-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-accent/5">
                      <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Invoice ID</th>
                      <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Date</th>
                      <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Amount</th>
                      <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</th>
                      <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-accent/5 transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm font-bold">{inv.id}</span>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-sm text-muted-foreground font-medium">{inv.date}</td>
                        <td className="px-8 py-4 text-sm font-bold">{inv.amount}</td>
                        <td className="px-8 py-4">
                          <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest">
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <IconButton icon={<Download className="w-4 h-4" />} variant="ghost" size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Usage Summary */}
            <Card>
              <CardHeader title="Usage Summary" subtitle="Your current usage this month." />
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Cloud Storage</span>
                    <span className="text-primary">85%</span>
                  </div>
                  <div className="h-2 w-full bg-accent/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%] rounded-full shadow-lg shadow-primary/40 transition-all duration-1000"></div>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium">8.5 GB of 10 GB used</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>API Requests</span>
                    <span className="text-green-500">42%</span>
                  </div>
                  <div className="h-2 w-full bg-accent/20 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[42%] rounded-full shadow-lg shadow-green-500/40 transition-all duration-1000"></div>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium">4,200 of 10,000 requests</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Team Seats</span>
                    <span className="text-orange-500">90%</span>
                  </div>
                  <div className="h-2 w-full bg-accent/20 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[90%] rounded-full shadow-lg shadow-orange-500/40 transition-all duration-1000"></div>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium">9 of 10 seats filled</div>
                </div>

                <Button variant="outline" className="w-full" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  Detailed Analytics
                </Button>
              </div>
            </Card>

            {/* Billing Information */}
            <Card>
              <CardHeader title="Tax Information" subtitle="Update your billing details." />
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">Entity Name</div>
                  <div className="text-sm font-bold">Acme Corp International</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">Tax ID</div>
                  <div className="text-sm font-bold">US 45-8899221</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">Address</div>
                  <div className="text-sm font-bold leading-relaxed">
                    123 Innovation Drive<br />
                    Palo Alto, CA 94304<br />
                    United States
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-start px-0 text-primary hover:bg-transparent hover:underline">
                  Edit Billing Details
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}

function IconButton({ icon, variant = "primary", size = "md", className, onClick }: any) {
  const sizes = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const variants = {
    primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border bg-transparent hover:bg-accent",
    ghost: "bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground",
  };

  return (
    <button 
      onClick={onClick}
      className={`rounded-xl transition-all active:scale-95 ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${className}`}
    >
      {icon}
    </button>
  );
}
