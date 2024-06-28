import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ToastProvider from "@/components/ui/toastprovider";
import { StoreProvider } from "@/store/storeprovider";
import ReactQueryProvider from "@/components/query-provider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pablings Sandoval",
  description: "Schedule your next haircut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ToastProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </ThemeProvider>
          </ToastProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
