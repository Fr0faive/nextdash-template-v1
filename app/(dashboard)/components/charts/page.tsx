"use client";

import * as React from "react";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Chart } from "@/components/ui/chart";
import { TrendingUp, Activity, BarChart3, PieChart, Target } from "lucide-react";

export default function ChartsDemoPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Charts & Data Visualization"
        subtitle="Beautiful, interactive charts powered by ApexCharts with custom theme integration."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Charts", active: true },
        ]}
      />

      <PageContent className="space-y-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Area Chart */}
          <Card>
            <CardHeader 
              title="Area Chart" 
              subtitle="Smooth gradients for trend analysis" 
              actions={<TrendingUp className="w-5 h-5 text-primary" />}
            />
            <Chart
              type="area"
              series={[
                { name: "Traffic", data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10] }
              ]}
              options={{
                xaxis: {
                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                }
              }}
            />
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader 
              title="Bar Chart" 
              subtitle="Comparing data across categories" 
              actions={<BarChart3 className="w-5 h-5 text-primary" />}
            />
            <Chart
              type="bar"
              series={[
                { name: "Revenue", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] }
              ]}
              options={{
                plotOptions: {
                  bar: {
                    borderRadius: 8,
                    columnWidth: "50%",
                  }
                },
                xaxis: {
                  categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
                }
              }}
            />
          </Card>

          {/* Line Chart */}
          <Card>
            <CardHeader 
              title="Line Chart" 
              subtitle="Precise data point visualization" 
              actions={<Activity className="w-5 h-5 text-primary" />}
            />
            <Chart
              type="line"
              series={[
                { name: "Active Users", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }
              ]}
              options={{
                stroke: {
                  curve: "straight",
                  width: 4
                },
                markers: {
                  size: 6,
                  strokeWidth: 3,
                  hover: { size: 8 }
                },
                xaxis: {
                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
                }
              }}
            />
          </Card>

          {/* Horizontal Bar */}
          <Card>
            <CardHeader 
              title="Horizontal Bar" 
              subtitle="Ranking and distribution" 
              actions={<BarChart3 className="w-5 h-5 text-primary rotate-90" />}
            />
            <Chart
              type="bar"
              series={[
                { name: "Conversion Rate", data: [400, 430, 448, 470, 540, 580, 690] }
              ]}
              options={{
                plotOptions: {
                  bar: {
                    borderRadius: 6,
                    horizontal: true,
                  }
                },
                xaxis: {
                  categories: ["ID", "US", "UK", "JP", "DE", "FR", "CA"]
                }
              }}
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donut Chart */}
          <Card>
            <CardHeader 
              title="Donut Chart" 
              subtitle="Device distribution" 
              actions={<PieChart className="w-5 h-5 text-primary" />}
            />
            <div className="py-4">
              <Chart
                type="donut"
                series={[44, 55, 13, 33]}
                options={{
                  labels: ["Mobile", "Desktop", "Tablet", "Other"],
                  legend: {
                    show: true,
                    position: "bottom"
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        size: "75%",
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            label: "Total Users",
                            formatter: () => "2,450"
                          }
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </Card>

          {/* Radial Bar Chart */}
          <Card>
            <CardHeader 
              title="Goal Completion" 
              subtitle="Monthly target tracking" 
              actions={<Target className="w-5 h-5 text-primary" />}
            />
            <div className="py-4">
              <Chart
                type="radialBar"
                series={[76]}
                options={{
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 135,
                      hollow: { size: "70%" },
                      track: {
                        background: "hsl(var(--accent))",
                        strokeWidth: "100%",
                      },
                      dataLabels: {
                        name: {
                          show: true,
                          color: "hsl(var(--muted-foreground))",
                          fontSize: "14px",
                          offsetY: 20
                        },
                        value: {
                          offsetY: -20,
                          fontSize: "30px",
                          fontWeight: 900,
                          color: "hsl(var(--foreground))"
                        }
                      }
                    }
                  },
                  labels: ["Course Completed"]
                }}
              />
            </div>
          </Card>

          {/* Multi-Series Area */}
          <Card>
            <CardHeader 
              title="Comparison" 
              subtitle="Two datasets overlap" 
              actions={<TrendingUp className="w-5 h-5 text-primary" />}
            />
            <Chart
              type="area"
              series={[
                { name: "Income", data: [31, 40, 28, 51, 42, 109, 100] },
                { name: "Expenses", data: [11, 32, 45, 32, 34, 52, 41] }
              ]}
              options={{
                xaxis: {
                  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                },
                legend: { show: true, position: "top" }
              }}
            />
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  );
}
