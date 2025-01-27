"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendDoctorMagicLink } from "@/app/dashboard/doctors/actions";
import { useToast } from "@/hooks/use-toast";
import { DoctorFormValues, doctorSchema } from "@/lib/schemas/doctorSchema";

export default function CreateDoctorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>();
  const { toast } = useToast();

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      specialization: "",
      phoneNumber: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newAvatar = event.target.files[0];
      
      setAvatar(newAvatar);
    }
  };

  async function onSubmit(data: DoctorFormValues) {
    setIsLoading(true);

    const magicLinkError = await sendDoctorMagicLink(data.email, {
      firstName: data.firstName,
      lastName: data.lastName,
      specialization: data.specialization,
      phoneNumber: data.phoneNumber,
      profilePicture: avatar || undefined,
    });
    if (magicLinkError instanceof Error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Doctor created but magic link could not be sent.",
        variant: "destructive",
      });
    } else {
      setIsLoading(false);
      toast({
        title: "Doctor Created",
        description: "Doctor created and magic link sent successfully.",
        variant: "success",
      });
      form.reset(data);
      setAvatar(null); // Reset dell'avatar selezionato
    }
  }

  return (
    <Form {...form}>
      <form className="mt-8 h-screen" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="profilePicture"
            render={() => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className="space-x-4 flex justify-between items-center">
                    {!avatar ? (
                      <div className="w-16 h-16 rounded-full object-cover bg-slate-300" />
                    ) : (
                      <Image
                        src={URL.createObjectURL(avatar)}
                        alt="User Avatar Preview"
                        className="w-16 h-16 rounded-full object-cover"
                        width={64}
                        height={64}
                      />
                    )}

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Button
                      type="button"
                      className="bg-secondary dark:text-black text-white dark:font-semibold"
                      onClick={() =>
                        document.getElementById("avatar-upload")?.click()
                      }
                    >
                      {avatar ? "Change Photo" : "Upload Photo"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            className="bg-secondary dark:text-black text-white dark:font-semibold"
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                Loading...
              </>
            ) : (
              "Add doctor"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
