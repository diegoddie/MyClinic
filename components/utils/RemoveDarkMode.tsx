"use client";

import { useEffect } from "react";

export default function RemoveDarkMode({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("style");
  }, []);

  return <>{children}</>;  // Renderizza i figli passati
}
