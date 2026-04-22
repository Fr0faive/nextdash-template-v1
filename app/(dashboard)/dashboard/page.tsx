"use client";

import { BarChart3, ShoppingCart, Users, ArrowUpRight, ArrowDownRight, Download, Plus, MoreHorizontal } from "lucide-react";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Chart } from "@/components/ui/chart";

export default function DashboardPage() {
  return (
    <PageLayout>
      <PageHeader 
        title="Dashboard Overview"
        subtitle="Monitor your business performance, sales, and customer growth in real-time."
        breadcrumbs={[
          { label: "Overview", active: true }
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Download PDF
            </Button>
            <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Create Report
            </Button>
          </>
        }
      />

      <PageContent className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: "$45,231.89", trend: "+20.1%", positive: true, icon: BarChart3 },
            { label: "Active Subscriptions", value: "2,350", trend: "+180.1%", positive: true, icon: Users },
            { label: "Total Sales", value: "12,234", trend: "-4.5%", positive: false, icon: ShoppingCart },
            { label: "Avg. Session", value: "12m 30s", trend: "+12%", positive: true, icon: BarChart3 },
          ].map((stat) => (
            <Card key={stat.label} padding="md" hover>
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-xl bg-primary/10 text-primary transition-colors">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  stat.positive ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                }`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader 
              title="Performance"
              subtitle="Comparison between current and previous month."
              actions={
                <div className="flex gap-2">
                  {['1D', '1W', '1M', '1Y'].map(t => (
                    <button key={t} className="px-3 py-1 rounded-lg text-xs font-bold hover:bg-accent transition-colors">
                      {t}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="h-72">
              <Chart 
                type="area"
                series={[
                  { name: "Current Month", data: [31, 40, 28, 51, 42, 109, 100] },
                  { name: "Previous Month", data: [11, 32, 45, 32, 34, 52, 41] }
                ]}
                options={{
                  xaxis: {
                    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                  }
                }}
              />
            </div>
          </Card>
          
          <div className="p-8 bg-primary rounded-[2.5rem] shadow-2xl shadow-primary/30 text-primary-foreground flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">New Insights</h3>
              <p className="mt-4 text-primary-foreground/80 leading-relaxed font-medium">
                We've analyzed your data and found 3 areas where you can optimize your conversion rates.
              </p>
            </div>
            <button className="relative w-full py-4 bg-white text-primary rounded-2xl font-bold text-sm hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all">
              View Analysis
            </button>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
