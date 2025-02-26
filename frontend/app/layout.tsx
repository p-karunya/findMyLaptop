import { Sansita } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const sansita = Sansita({
  variable: "--font-Sansita",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sansita.variable} antialiased bg-background h-[100vh]`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
