import Logo from "@/components/utils/Logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from 'lucide-react';

export default async function Page() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-bgGreen to-bgBlue py-1 md:py-4 mx-auto px-3 md:px-10 lg:px-16">
      <div className="">
        <Logo />
      </div>
      <div className="flex flex-col items-center justify-center p-8 md:p-10">
        <Card className="border shadow-xl border-secondary p-2 py-3 max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text text-xl font-bold tracking-tighter md:text-2xl lg:text-3xl">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-paragraphs text-md">
              We&apos;ve sent you a login link. Please check your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Mail className="w-16 h-16 text-primary" />
            <p className="text-center text-sm text-muted-foreground">
              If you don&apos;t see the email in your inbox, please check your spam folder.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
