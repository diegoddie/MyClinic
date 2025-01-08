"use client";

import { ProfileForm } from "@/components/Form/UpdateProfileInfoForm";
import { SecurityForm } from "@/components/Form/UpdateSecuritySettingsForm";


export default function Settings() {
  return (
    <div className="py-2">
      <div className="justify-center flex flex-col md:flex-row gap-6">
        <ProfileForm />
        <SecurityForm />
      </div>
    </div>
  );
}