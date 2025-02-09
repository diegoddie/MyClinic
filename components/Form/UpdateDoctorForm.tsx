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
import { useToast } from "@/hooks/use-toast";
import { DoctorFormValues, doctorSchema } from "@/lib/schemas/doctorSchema";
import { Doctor } from "@/utils/supabase/types";
import GetAvatarFallback from "../Settings/GetAvatarFallback";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, Stethoscope, User } from "lucide-react";
import { updateDoctor } from "@/utils/supabase/actions/doctorActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UpdateDoctorForm({ doctor }: { doctor: Doctor }) {
  const queryClient = useQueryClient();

  const [avatar, setAvatar] = useState<File | null>();
  const { toast } = useToast();

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      firstName: doctor?.first_name,
      lastName: doctor?.last_name,
      email: doctor?.email,
      specialization: doctor?.specialization,
      phoneNumber: doctor?.phone_number ?? undefined,
      profilePicture: doctor?.profile_picture,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newAvatar = event.target.files[0];
      setAvatar(newAvatar);

      form.setValue("profilePicture", newAvatar, { shouldDirty: true });
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: DoctorFormValues) => {
      const result = await updateDoctor(data, doctor.id, avatar ?? undefined)
      if (result.error) {
        throw new Error(result.error); 
      }
      return result;
    },
    onSuccess: (updatedDoctor) => {
      toast({
        title: "Doctor Updated",
        description: "You have successfully updated your profile",
        variant: "success",
      });

      // Invalida la cache dell'utente per forzare il refetch
      queryClient.refetchQueries({ queryKey: ["user"] });

      form.reset({
        firstName: updatedDoctor.data?.first_name ?? undefined,
        lastName: updatedDoctor.data?.last_name ?? undefined,
        profilePicture: updatedDoctor.data?.profile_picture,
        specialization: updatedDoctor.data?.specialization ?? undefined,
        phoneNumber: updatedDoctor.data?.phone_number ?? undefined,
      });
      setAvatar(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(data: DoctorFormValues) {
      mutation.mutate(data);
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
            <FormField
              control={form.control}
              name="profilePicture"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <div className="space-x-4 flex justify-between items-center">
                      {avatar ? (
                        <Image
                          src={URL.createObjectURL(avatar)}
                          alt="User Avatar Preview"
                          className="w-16 h-16 rounded-full object-cover"
                          width={64}
                          height={64}
                        />
                      ) : doctor?.profile_picture ? (
                        <Image
                          src={doctor.profile_picture}
                          alt="User Avatar"
                          className="w-16 h-16 rounded-full object-cover"
                          width={64}
                          height={64}
                        />
                      ) : (
                        <div className="h-16 w-16">
                          <GetAvatarFallback email={doctor?.email || ""} />
                        </div>
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
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={doctor?.email}
                  readOnly
                  className="bg-slate-200 dark:bg-slate-600 pl-8 cursor-not-allowed"
                />
                </div>
                
              </FormControl>
            </FormItem>

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                  <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input {...field} className="pl-8" />
                    </div>
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
                  <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input {...field} className="pl-8" />
                    </div>
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
                  <div className="relative">
                    <Stethoscope className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input {...field} className="pl-8" />
                  </div>
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
                  <div className="relative">
                      <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="tel" {...field} className="pl-8" />
                    </div>
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
              {mutation.isPending ? (
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
