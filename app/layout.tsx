import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={`${inter.className} bg-background my-4`}>
        {children}
      </body>
    </html>
  );
}
