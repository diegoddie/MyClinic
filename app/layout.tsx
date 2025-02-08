import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/tanstack/queryClient";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyClinic - Book Your Appointment",
  description: "Easily book medical appointments online.",
  openGraph: {
    title: "MyClinic - Book Your Appointment",
    description: "Easily book medical appointments online.",
    url: "https://www.myclinic.tech",
    siteName: "MyClinic",
    images: [
      {
        url: "https://www.myclinic.tech/favicon.ico", 
        width: 1200,
        height: 630,
        alt: "MyClinic Logo",
      },
    ],
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body className={`${dmSans.className} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-col md:min-h-screen">
            {children}
          </div>
          <Toaster />
        </QueryClientProvider>
        
      </body>
    </html>
  );
}
