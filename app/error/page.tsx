'use client'

import { useSearchParams } from 'next/navigation';
import Logo from "@/components/utils/Logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An unknown error occurred';

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-bgGreen to-bgBlue py-1 md:py-4 mx-auto px-3 md:px-10 lg:px-16">
      <div className="">
        <Logo />
      </div>
      <div className="flex flex-col items-center justify-center p-8 md:p-10">
        <Card className="border shadow-xl border-secondary p-2 py-3 max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text text-xl font-bold tracking-tighter md:text-2xl lg:text-3xl">
              Oops! Something went wrong
            </CardTitle>
            <CardDescription className="text-paragraphs text-md">
              We encountered an error while processing your request.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <AlertTriangle className="w-16 h-16 text-destructive" />
            <p className="text-center text-sm text-muted-foreground">
              {errorMessage}
            </p>
            <Button asChild className="w-full bg-primary text-white text-lg">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
