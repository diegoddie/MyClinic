'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface AvatarUploadProps {
  avatar: string;
  onAvatarChange: (avatar: string) => void;
}

export function AvatarUpload({ avatar, onAvatarChange }: AvatarUploadProps) {
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="w-16 h-16 md:w-20 md:h-20">
        <AvatarImage src={avatar} alt="Profile picture" />
        <AvatarFallback>
          <User className="w-10 h-10" />
        </AvatarFallback>
      </Avatar>
      <Label
        htmlFor="avatar-upload"
        className="bg-secondary dark:text-black text-white dark:font-semibold cursor-pointer hover:bg-primary inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
      >
        Change Avatar
      </Label>
      <Input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />
    </div>
  );
}