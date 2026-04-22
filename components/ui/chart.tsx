"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import { useTheme } from "@/components/providers/theme-provider";

// Dynamic import to avoid SSR issues with ApexCharts
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartProps {
  options?: any;
  series: any[];
  type?: "line" | "area" | "bar" | "pie" | "donut" | "radialBar";
  height?: number | string;
}

export function Chart({ 
  options = {}, 
  series, 
  type = "area", 
  height = 350 
}: ChartProps) {
  const { theme, accent } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getAccentColor = (name: string) => {
    const colors: Record<string, string> = {
      blue: "#3b82f6",
      violet: "#8b5cf6",
      rose: "#f43f5e",
      orange: "#f97316",
      zinc: "#71717a",
    };
    return colors[name] || colors.blue;
  };

  const defaultOptions = React.useMemo(() => {
    const isDark = theme === "dark";
    const primaryColor = getAccentColor(accent);
    
    return {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: "inherit",
        background: "transparent",
        foreColor: isDark ? "#94a3b8" : "#64748b", // slate-400 : slate-500
      },
      theme: {
        mode: isDark ? "dark" : "light",
      },
      colors: [
        primaryColor,
        "#0ea5e9", // Sky Blue
        "#10b981", // Emerald
        "#f59e0b", // Amber
        "#6366f1", // Indigo
        "#8b5cf6", // Violet
        "#ec4899", // Pink
        "#f43f5e", // Rose
      ],
      dataLabels: { enabled: false },
      stroke: {
        curve: type === "area" ? "smooth" : "straight",
        width: type === "area" || type === "line" ? 3 : 0,
        lineCap: "round",
      },
      markers: {
        size: 0,
        strokeColors: isDark ? "#1e1e2d" : "#fff",
        strokeWidth: 2,
        hover: {
          size: 6,
        },
      },
      grid: {
        borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
        strokeDashArray: 4,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 10,
        },
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: isDark ? "#94a3b8" : "#64748b",
            fontSize: "12px",
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: isDark ? "#94a3b8" : "#64748b",
            fontSize: "12px",
            fontWeight: 600,
          },
        },
      },
      tooltip: {
        theme: isDark ? "dark" : "light",
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
          const isDonut = w.config.chart.type === "donut" || w.config.chart.type === "pie";
          const val = isDonut ? series[seriesIndex] : series[seriesIndex][dataPointIndex];
          const label = isDonut ? w.config.labels[seriesIndex] : w.globals.seriesNames[seriesIndex];
          
          return `
            <div class="px-4 py-2 bg-card/80 backdrop-blur-xl border rounded-2xl shadow-xl">
              <div class="flex items-center gap-2 mb-1">
                <div class="w-2 h-2 rounded-full bg-primary"></div>
                <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  ${label}
                </span>
              </div>
              <div class="text-sm font-black text-foreground">
                ${val?.toLocaleString() || val}
              </div>
            </div>
          `;
        }
      },
      fill: {
        type: type === "area" ? "gradient" : "solid",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
      legend: {
        show: type === "donut" || type === "pie",
        position: "bottom",
      },
      ...options,
    };
  }, [theme, options]);

  if (!mounted) return <div style={{ height }} className="w-full bg-accent/20 animate-pulse rounded-[2.5rem]" />;

  return (
    <div className="w-full">
      <ApexChart
        options={defaultOptions}
        series={series}
        type={type}
        height={height}
      />
    </div>
  );
}
