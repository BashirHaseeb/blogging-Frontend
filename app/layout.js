import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar.js";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from 'nextjs-toploader';

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

export const metadata = {
  title: "AB's Blog",
  description: "this is a bloging website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <NextTopLoader
            color="red"
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />

          <Navbar />
          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
