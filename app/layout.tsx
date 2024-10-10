import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Wrapper from "./Wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Inventory Management App | Track and Manage Your Stock Effortlessly",
  description:
    "Optimize your inventory management with our intuitive app. Track stock levels, manage products, and streamline your business operations with ease.",
  keywords: [
    "Inventory Management",
    "Stock Management",
    "Product Tracking",
    "Business Operations",
    "Inventory App",
    "Manage Stock",
    "Inventory Optimization",
    "Inventory Software",
    "Inventory Control",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Navbar />
          <Wrapper>{children}</Wrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
