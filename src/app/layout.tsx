import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NightSky } from "@/components/night-sky";
import { profile } from "@/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: profile.siteTitle,
  description: profile.intro[0] ?? profile.siteTitle,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative isolate flex min-h-full flex-col bg-background text-foreground">
        <NightSky />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
