import { Public_Sans } from "next/font/google";
import Header from "@/components/Header";

const public_Sans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
      <main className={`$ ${public_Sans.variable} antialiased bg-background`}>
        {children}
      </main>
  );
}