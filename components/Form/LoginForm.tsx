"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "../ui/spinner";
import { loginWithGoogle, loginWithMagicLink } from "@/app/login/actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { emailSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GoogleLoginButton from "../Auth/GoogleLoginButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleMagicLink = async (data: z.infer<typeof emailSchema>) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    await loginWithMagicLink(formData);
    form.reset();
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border shadow-xl border-secondary p-2 py-3">
        <CardHeader className="text-center">
          <CardTitle className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text text-xl font-bold tracking-tighter md:text-2xl lg:text-3xl">
            Welcome
          </CardTitle>
          <CardDescription className="text-paragraphs text-md ">
            Login with your Google Account or with your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <GoogleLoginButton onClick={loginWithGoogle} />
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-paragraphs">
                Or continue with magic link
              </span>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleMagicLink)}
                className="space-y-4"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@doe.it " {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2" />
                        Loading...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking login, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
