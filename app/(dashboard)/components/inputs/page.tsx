"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { InputNumber } from "@/components/ui/input-number";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Mail, Search, Lock, User, Hash } from "lucide-react";

export default function InputsDemo() {
  return (
    <PageLayout>
      <PageHeader 
        title="Inputs"
        subtitle="Form controls and input fields with various states."
        breadcrumbs={[
          { label: "Components", href: "/components" },
          { label: "Inputs", active: true }
        ]}
      />

      <PageContent className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Numeric Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputNumber 
              label="Standard Number" 
              placeholder="Enter amount" 
              defaultValue={10}
            />
            <InputNumber 
              label="Stepper Variant" 
              variant="stepper" 
              min={0} 
              max={100} 
              defaultValue={50}
            />
            <InputNumber 
              label="With Step (5)" 
              step={5} 
              defaultValue={25} 
            />
            <InputNumber 
              label="Currency Example" 
              placeholder="0.00" 
              step={0.01}
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Basic States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Default Input" placeholder="Standard text field" />
            <Input label="With Value" defaultValue="Alex Rivera" />
            <Input label="Disabled" placeholder="Cannot type here" disabled />
            <Input label="Error State" error="This field is required" placeholder="Required field" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">With Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Email" leftIcon={<Mail className="w-4 h-4" />} placeholder="alex@example.com" />
            <Input label="Search" rightIcon={<Search className="w-4 h-4" />} placeholder="Search items..." />
            <Input label="Password" leftIcon={<Lock className="w-4 h-4" />} type="password" placeholder="••••••••" />
            <Input label="Username" leftIcon={<User className="w-4 h-4" />} placeholder="username" />
          </div>
        </section>
      </PageContent>
    </PageLayout>
  );
}
