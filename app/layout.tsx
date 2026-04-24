import type { Metadata } from "next";
import { fontDisplay, fontSans } from "./fonts";
import { Layout } from "@/components/Layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sein Wut Hmon Group",
  description:
    "Myanmar conglomerate in distribution, fisheries, and industrial inputs.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
