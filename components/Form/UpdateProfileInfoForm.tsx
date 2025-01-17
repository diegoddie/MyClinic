"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  profileFormSchema,
  ProfileFormValues,
} from "@/lib/schemas/settingsSchema";
import { AvatarUpload } from "../Dashboard/Settings/AvatarUpload";
import { User } from "@/utils/supabase/types";
import { updateUser } from "@/app/dashboard/settings/actions";
import { Spinner } from "../ui/spinner";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";

export function ProfileForm({ user }: { user: User }) {
  const [avatar, setAvatar] = useState("https://github.com/shadcn.png");
  const [isLoading, setIsLoading] = useState(false);

  // Imposta i valori predefiniti per il modulo, utilizzando i dati dell'utente se presenti
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      taxId: user?.tax_id || "",
      birthDate: user?.birth_date || "",
      phoneNumber: user?.phone_number || "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    const { dirtyFields } = form.formState;
    const changedData = Object.fromEntries(
      Object.entries(data).filter(
        ([key]) => dirtyFields[key as keyof ProfileFormValues]
      )
    );

    if (Object.keys(changedData).length > 0) {
      setIsLoading(true);
      console.log("Sending only dirty fields:", changedData);
      await updateUser(changedData, user.id);
      setIsLoading(false);
      form.reset(data); // Update default values with new values
    } else {
      console.log("No changes detected");
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your account&apos;s profile information and email address.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <AvatarUpload avatar={avatar} onAvatarChange={setAvatar} />
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  value={user?.email}
                  readOnly
                  className="bg-slate-200 cursor-not-allowed"
                />
              </FormControl>
            </FormItem>

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    
                    captionLayout="dropdown"
                    fixedWeeks={true}
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={!form.formState.isDirty}
              className="bg-secondary dark:text-black text-white dark:font-semibold"
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Loading...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
