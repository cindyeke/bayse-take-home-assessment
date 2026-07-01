import { Onest, Inter, Archivo } from "next/font/google";
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
      <body>{children}</body>
    </html>
  );
}
