import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "strou",
  description:
    "A simple to-do app with scheduling features and its own consice language for flawless daily plan creation",
  keywords: ["to-do", "schedule", "planner"],
  authors: {
    name: "sinskiy",
    url: "https://sinskiy.vercel.app/",
  },
  creator: "sinskiy",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={twMerge(
          inter.className,
          "bg-background m-4 flex w-[calc(100%-2rem)] flex-col gap-8 sm:mx-auto sm:w-fit",
        )}
      >
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
