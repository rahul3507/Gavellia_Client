/** @format */

import type { Metadata } from "next";
import React from "react";
import ProfileSettingsContent from "@/components/ProfileSettingComponents/ProfileSettingsContent";

export const metadata: Metadata = {
  title: "Profile Settings",
  description:
    "Manage your account settings, personal information, and preferences on Gavellia.",
};

const ProfileSettingsPage = () => {
  return <ProfileSettingsContent />;
};

export default ProfileSettingsPage;
