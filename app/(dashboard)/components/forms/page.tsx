"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";

import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { PhoneInput } from "@/components/ui/phone-input";
import { OTPInput } from "@/components/ui/otp-input";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { Autocomplete } from "@/components/ui/autocomplete";

export default function FormsDemo() {
  const countries = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Indonesia", value: "id" },
    { label: "Japan", value: "jp" },
    { label: "Germany", value: "de" },
    { label: "France", value: "fr" },
    { label: "Canada", value: "ca" },
    { label: "Australia", value: "au" },
  ];

  return (
    <PageLayout>
      <PageHeader
        title="Form Controls"
        subtitle="Selection controls, toggles, and dropdowns for user input."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Forms", active: true },
        ]}
      />
      <PageContent className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">
            Select & Autocomplete
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Select
              label="Subscription Plan"
              options={[
                { label: "Free Plan", value: "free" },
                { label: "Business Plan ($29/mo)", value: "business" },
                { label: "Enterprise Plan ($99/mo)", value: "enterprise" },
              ]}
              defaultValue="business"
              helperText="Choose the plan that best fits your needs."
            />
            <Autocomplete
              label="Destination Country"
              options={countries}
              placeholder="Start typing a country..."
            />
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Multi-Selection Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Select 
              label="Selected Tags"
              placeholder="Choose tags..."
              multiple={true}
              options={[
                { label: "Design", value: "design" },
                { label: "Development", value: "dev" },
                { label: "Marketing", value: "marketing" },
                { label: "Sales", value: "sales" },
                { label: "Product", value: "product" },
              ]}
              helperText="You can select multiple categories for your project."
            />
            <Autocomplete 
              label="Collaborators"
              placeholder="Search team members..."
              multiple={true}
              options={[
                { label: "Alex Rivera", value: "alex" },
                { label: "Sarah Chen", value: "sarah" },
                { label: "John Doe", value: "john" },
                { label: "Maria Garcia", value: "maria" },
                { label: "James Wilson", value: "james" },
              ]}
            />
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Security & Advanced Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <PhoneInput 
                label="Phone Number"
                placeholder="812 3456 7890"
              />
              <p className="text-xs text-muted-foreground ml-1">
                We'll send a verification code to this number.
              </p>
            </div>
            <div className="space-y-4">
              <OTPInput 
                label="Verification Code"
                length={6}
                onComplete={(v) => console.log("OTP Complete:", v)}
              />
              <p className="text-xs text-muted-foreground ml-1">
                Enter the 6-digit code sent to your phone.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">File Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Single Upload (Image)
              </h3>
              <FileUpload multiple={false} accept="image/*" maxSize={2} />
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Multi-file (Documents)
              </h3>
              <FileUpload
                multiple={true}
                accept=".pdf,.doc,.docx"
                maxSize={10}
              />
            </div>
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Avatar Upload</h2>
          <div className="flex flex-wrap items-end gap-12 p-8 bg-accent/20 rounded-4xl border border-dashed border-primary/20">
            <div className="space-y-3 text-center">
              <AvatarUpload size="sm" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Small
              </p>
            </div>
            <div className="space-y-3 text-center">
              <AvatarUpload size="md" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Medium
              </p>
            </div>
            <div className="space-y-3 text-center">
              <AvatarUpload size="lg" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Large
              </p>
            </div>
            <div className="space-y-3 text-center">
              <AvatarUpload size="xl" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Extra Large
              </p>
            </div>
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Checkboxes</h2>
          <div className="flex flex-col gap-4">
            <Checkbox label="Remember me" defaultChecked />
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter (Disabled)" disabled />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Radio Group</h2>
          <div className="flex flex-col gap-4">
            <Radio name="plan" label="Basic Plan - $0/mo" defaultChecked />
            <Radio name="plan" label="Pro Plan - $19/mo" />
            <Radio name="plan" label="Enterprise Plan - $99/mo" />
            <Radio name="plan" label="Custom (Disabled)" disabled />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Switches</h2>
          <div className="flex flex-col gap-6">
            <Switch label="Push Notifications" defaultChecked />
            <Switch label="Email Alerts" />
            <Switch label="Dark Mode (Disabled)" disabled />
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
}
