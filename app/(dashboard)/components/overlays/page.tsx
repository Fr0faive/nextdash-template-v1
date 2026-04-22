"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Modal, AlertModal } from "@/components/ui/modal";
import { Tooltip } from "@/components/ui/tooltip";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/providers/toast-provider";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Info, Trash2, HelpCircle } from "lucide-react";

export default function OverlaysDemo() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const { success, error, warning, info } = useToast();

  return (
    <PageLayout>
      <PageHeader 
        title="Overlays & Dialogs"
        subtitle="Modals, alerts, and tooltips for contextual information."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Overlays", active: true }
        ]}
      />

      <PageContent className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Toasts Notifications</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => success("Profile updated successfully!", "Success")}
              className="bg-emerald-500 hover:bg-emerald-600 border-none"
            >
              Show Success
            </Button>
            <Button 
              onClick={() => error("Something went wrong on our end.", "System Error")}
              variant="destructive"
            >
              Show Error
            </Button>
            <Button 
              onClick={() => warning("Your storage is almost full.", "Warning")}
              className="bg-amber-500 hover:bg-amber-600 border-none"
            >
              Show Warning
            </Button>
            <Button 
              onClick={() => info("Check out the new features available.", "Updates")}
              className="bg-blue-500 hover:bg-blue-600 border-none"
            >
              Show Info
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Toast Positions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button 
              variant="outline"
              onClick={() => info("Top Left Notification", "Position", "top-left")}
            >
              Top Left
            </Button>
            <Button 
              variant="outline"
              onClick={() => info("Top Center Notification", "Position", "top-center")}
            >
              Top Center
            </Button>
            <Button 
              variant="outline"
              onClick={() => info("Top Right Notification", "Position", "top-right")}
            >
              Top Right
            </Button>
            <Button 
              variant="outline"
              onClick={() => info("Bottom Left Notification", "Position", "bottom-left")}
            >
              Bottom Left
            </Button>
            <Button 
              variant="outline"
              onClick={() => info("Bottom Center Notification", "Position", "bottom-center")}
            >
              Bottom Center
            </Button>
            <Button 
              variant="outline"
              onClick={() => info("Bottom Right Notification", "Position", "bottom-right")}
            >
              Bottom Right
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Modals</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setIsModalOpen(true)}>Open Dialog</Button>
            <Button onClick={() => setIsAlertOpen(true)} variant="destructive">Delete Project</Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Tooltips</h2>
          <div className="flex flex-wrap gap-12 items-center">
            <Tooltip content="Useful information here">
              <Info className="w-6 h-6 text-muted-foreground cursor-help" />
            </Tooltip>
            <Tooltip content="I'm on top!" position="top">
              <Button size="sm" variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="I'm on bottom!" position="bottom">
              <Button size="sm" variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Danger zone" position="right">
              <Trash2 className="w-5 h-5 text-destructive cursor-pointer" />
            </Tooltip>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Inline Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert 
              variant="info" 
              title="System Update" 
              description="A new version of the dashboard is available. Check the changelog for details." 
            />
            <Alert 
              variant="success" 
              title="Payment Received" 
              description="Your subscription has been renewed successfully for the next month." 
            />
            <Alert 
              variant="warning" 
              title="Storage Warning" 
              description="You have used 85% of your available disk space. Consider upgrading your plan." 
            />
            <Alert 
              variant="destructive" 
              title="Action Required" 
              description="Your account is missing required billing information. Access will be limited soon." 
              onClose={() => console.log("Alert closed")}
            />
          </div>
        </section>

        {/* Modal Instances */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Update Account"
          description="Update your account information below."
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsModalOpen(false)}>Save Changes</Button>
            </>
          }
        >
          <div className="space-y-4 py-4">
            <Input label="Name" placeholder="Full name" />
            <Input label="Email" placeholder="Email address" />
          </div>
        </Modal>

        <AlertModal 
          isOpen={isAlertOpen} 
          onClose={() => setIsAlertOpen(false)}
          onConfirm={() => alert("Deleted!")}
          title="Delete Project"
          description="Are you absolutely sure? This will permanently delete your project data."
        />
      </PageContent>
    </PageLayout>
  );
}
