import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { twMerge } from "tailwind-merge";
import { PropsWithChildren, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "strou",
  description: "focus on what's important",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="size-full flex m-auto">
      <body className={twMerge("m-auto bg-background", inter.className)}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
