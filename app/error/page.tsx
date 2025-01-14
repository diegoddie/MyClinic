"use client";

import ErrorPageContent from "@/components/Error/ErrorPageContent";
import { Suspense } from "react";


export default function ErrorPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorPageContent />
    </Suspense>
  );
}
