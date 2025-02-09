import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background antialiased",inter)}>{children}</body>
    </html>
  );
}
