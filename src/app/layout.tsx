import { Onest, Inter, Archivo } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Bayse",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${onest.variable} ${inter.variable} ${archivo.variable} h-full font-sans antialiased `}
    >
      <body className="bg-off-white">{children}</body>
    </html>
  );
}
