"use client";

import { useTheme } from "next-themes";
import MoonIcon from "./icons/moonIcon";
import Button from "./ui/button";
import SunIcon from "./icons/sunIcon";
import { useEffect, useState } from "react";
import Skeleton from "./ui/skeleton";

export default function Theme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Button
      onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="change theme"
      variant="text"
      colors="on-background"
      className="p-4"
    >
      {mounted ? (
        theme === "dark" ? (
          <MoonIcon />
        ) : (
          <SunIcon />
        )
      ) : (
        <Skeleton className="size-6 rounded-full" />
      )}
    </Button>
  );
}
