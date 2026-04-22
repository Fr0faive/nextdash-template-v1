"use client";

import * as React from "react";
import { PageLayout, PageContent } from "@/components/ui/page-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/ui/modal";
import { Camera, User, Mail, Globe, Shield, Trash2, Save } from "lucide-react";

import { AvatarUpload } from "@/components/ui/avatar-upload";

export default function ProfileSettingsPage() {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [avatar, setAvatar] = React.useState<string | undefined>(undefined);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Profile updated successfully!");
    }, 1500);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Profile Settings"
        subtitle="Manage your personal information, avatar, and account security."
        breadcrumbs={[
          { label: "Settings" },
          { label: "Profile", active: true },
        ]}
        actions={
          <Button
            onClick={handleSave}
            isLoading={isLoading}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        }
      />

      <PageContent className="max-w-4xl space-y-12 pb-20">
        {/* Profile Header Card */}
        <section className="p-8 bg-card border rounded-[2.5rem] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <AvatarUpload
              size="lg"
              onChange={(file) => console.log("New avatar:", file)}
              onRemove={() => console.log("Avatar removed")}
            />

            <div className="text-center md:text-left space-y-2">
              <h2 className="text-2xl font-black">Faikar</h2>
              <p className="text-muted-foreground">
                Web Developer based in Bandung.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  Administrator
                </div>
                <div className="px-3 py-1 rounded-full bg-accent text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  {" "}
                  Bandung, ID
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="First Name" defaultValue="Faikar" />
                <Input label="Last Name" defaultValue="" />
                <Input
                  label="Email Address"
                  defaultValue="faikar@email.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                />
                <Input
                  label="Website"
                  defaultValue="https://profile.faikarmocht.dev"
                  leftIcon={<Globe className="w-4 h-4" />}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                  Bio
                </label>
                <textarea
                  className="w-full bg-accent/40 border-none rounded-2xl p-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all min-h-[120px] resize-none"
                  placeholder="Tell us about yourself..."
                  defaultValue="Passionate about building beautiful, accessible, and high-performance web applications using modern technologies."
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Social Profiles
              </h3>
            </div>
          </div>

          {/* Sidebar Info / Danger Zone */}
          <div className="space-y-8">
            <div className="p-6 bg-accent/20 border border-dashed rounded-4xl space-y-4">
              <h4 className="font-bold flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                Account Security
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your account is protected with Two-Factor Authentication. We
                recommend changing your password every 3 months.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Update Password
              </Button>
            </div>

            <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-4xl space-y-4">
              <h4 className="font-bold flex items-center gap-2 text-sm text-destructive">
                <Trash2 className="w-4 h-4" />
                Danger Zone
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Permanently delete your account and all associated data. This
                action is irreversible.
              </p>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => setIsDeleting(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </PageContent>

      <AlertModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => alert("Account deleted.")}
        title="Delete Account?"
        description="Are you absolutely sure you want to delete your account? This will permanently remove all your data from our servers."
        confirmText="Yes, Delete My Account"
      />
    </PageLayout>
  );
}
