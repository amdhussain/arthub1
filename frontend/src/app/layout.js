import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "@/components/QueryProvider";
import ThemeWrapper from "@/components/ThemeWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ArtHub — Discover & Collect Art",
  description:
    "ArtHub is an online art marketplace connecting artists and collectors worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <ThemeWrapper>{children}</ThemeWrapper>
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
