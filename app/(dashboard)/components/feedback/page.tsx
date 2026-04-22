"use client";

import * as React from "react";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function FeedbackDemoPage() {
  const [isLoading, setIsLoading] = React.useState(true);

  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Feedback & Loading"
        subtitle="Indicators and skeleton screens to manage perceived performance and state."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Feedback", active: true },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLoading}
            leftIcon={
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
            }
          >
            Simulate Loading
          </Button>
        }
      />

      <PageContent className="space-y-12 pb-20">
        {/* Skeleton Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Skeleton Screens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Skeleton */}
            <Card>
              <CardHeader title="User Profile" subtitle="Card loading state" />
              <div className="flex items-center gap-4">
                <Skeleton variant="circle" className="w-16 h-16" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2 opacity-60" />
                </div>
              </div>
            </Card>

            {/* List Skeleton */}
            <Card>
              <CardHeader
                title="Recent Activity"
                subtitle="List loading state"
              />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton
                      variant="rounded"
                      className="w-10 h-10 shrink-0"
                    />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-2 w-1/2 opacity-50" />
                    </div>
                    <Skeleton className="w-12 h-6 rounded-lg shrink-0" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Content Skeleton */}
            <Card className="md:col-span-2">
              <CardHeader
                title="Article Content"
                subtitle="Complex layout loading"
              />
              <div className="space-y-6">
                <Skeleton className="w-full h-48 rounded-4xl" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-1/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-24 h-10" />
                  <Skeleton className="w-24 h-10" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Loading States */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">
            Loading Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="py-12">
              <Loading variant="spinner" size="lg" label="Processing..." />
            </Card>

            <Card className="py-12">
              <Loading variant="dots" size="lg" label="Fetching Data" />
            </Card>

            <Card className="py-12">
              <Loading variant="ring" size="lg" label="Syncing" />
            </Card>
          </div>
        </section>

        {/* Actual Content Toggle Example */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">
            Example: Content Toggle
          </h2>
          <Card>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h3 className="text-2xl font-bold">
                  Data Loaded Successfully!
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-6 bg-accent/20 rounded-3xl border border-primary/10"
                    >
                      <div className="text-primary font-bold text-lg mb-2">
                        Item #{i}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This content is now visible after the loading state
                        finished.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </section>
      </PageContent>
    </PageLayout>
  );
}
