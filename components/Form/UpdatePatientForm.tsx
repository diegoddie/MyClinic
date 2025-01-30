"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Patient } from "@/utils/supabase/types";
import { updatePatient } from "@/app/dashboard/settings/actions";
import { Spinner } from "../ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { DateOfBirthCalendar } from "../Dashboard/Settings/DateOfBirthCalendar";
import GetAvatarFallback from "../Dashboard/Settings/GetAvatarFallback";
import Image from "next/image";
import { PatientFormValues, patientSchema } from "@/lib/schemas/patientSchema";
import { IdCard, Mail, Phone, User } from "lucide-react";

export function UpdatePatientForm({ patient }: { patient: Patient }) {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>();
  const { toast } = useToast();

  // Imposta i valori predefiniti per il modulo, utilizzando i dati dell'utente se presenti
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: patient?.first_name || "",
      lastName: patient?.last_name || "",
      taxId: patient?.tax_id || "",
      birthDate: patient?.birth_date ? new Date(patient.birth_date) : undefined,
      profilePicture: patient?.profile_picture,
      phoneNumber: patient?.phone_number || "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newAvatar = event.target.files[0];
      setAvatar(newAvatar);

      // Segna esplicitamente il campo 'profilePicture' come dirty
      form.setValue("profilePicture", newAvatar, { shouldDirty: true });
    }
  };

  async function onSubmit(data: PatientFormValues) {
    const { dirtyFields } = form.formState;
    const changedData = {
      ...form.getValues(),
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([key]) => dirtyFields[key as keyof PatientFormValues]
        )
      ),
    };

    setIsLoading(true);

    const error = await updatePatient(
      changedData,
      patient,
      avatar ?? undefined
    ); // Passa l'avatar

    if (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } else {
      setIsLoading(false);
      toast({
        title: "User updated",
        description: "You have successfully updated your profile",
        variant: "success",
      });
      form.reset(data);
      setAvatar(null); // Reset dell'avatar selezionato
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
                      ) : patient?.profile_picture ? (
                        <Image
                          src={patient.profile_picture}
                          alt="User Avatar"
                          className="w-16 h-16 rounded-full object-cover"
                          width={64}
                          height={64}
                        />
                      ) : (
                        <div className="h-16 w-16">
                          <GetAvatarFallback email={patient?.email || ""} />
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
                    value={patient?.email}
                    readOnly
                    className="bg-slate-200 dark:bg-slate-600 cursor-not-allowed pl-8"
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
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax ID</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <IdCard className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input {...field} className="pl-8" />
                    </div>
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
                  <FormControl>
                    <DateOfBirthCalendar {...field} />
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
