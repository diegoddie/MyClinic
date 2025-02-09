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
import { Mail, Phone, Stethoscope, User } from "lucide-react";
import { sendDoctorMagicLink } from "@/utils/supabase/actions/adminActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateDoctorForm() {
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: async (data: DoctorFormValues) => {
      const result = await sendDoctorMagicLink(data.email, {
        firstName: data.firstName,
        lastName: data.lastName,
        specialization: data.specialization,
        phoneNumber: data.phoneNumber,
        profilePicture: avatar || undefined,
      });
      if (result && result.error) {
        throw new Error(result.error);
      }
      return result
    },
    onSuccess: () => {
      toast({
        title: "Doctor Created",
        description: "Doctor created and magic link sent successfully.",
        variant: "success",
      });
      queryClient.refetchQueries({ queryKey: ["doctors"] });
      form.reset(); // Reset del modulo
      setAvatar(null); // Reset dell'avatar selezionato
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Doctor created but magic link could not be sent.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(data: DoctorFormValues) {
      mutation.mutate(data);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
                    <Input {...field} className="pl-8" />
                  </div>
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
            {mutation.isPending ? (
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
