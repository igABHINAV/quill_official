import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import "react-loading-skeleton/dist/skeleton.css"
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });
import "simplebar-react/dist/simplebar.min.css"
export const metadata: Metadata = {
  title: "Quill",
  description: "A platform for students !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
      <meta name="google-adsense-account" content="ca-pub-6034584058469073"></meta>
      </head>
      <Providers>
        <body
          className={cn(
            "min-h-screen font-sans antialiased grainy",
            inter.className
          )}
        >
          <Toaster/>
          <Navbar />
          {children}
        </body>
      </Providers>
      
    </html>
  );
}
