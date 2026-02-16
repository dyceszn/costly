import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const montserratAlternates = Montserrat_Alternates({
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Costly: The Price Advantage",
  description: "Centralized. Verified. Simplified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserratAlternates.variable}`}>
      <body className={`antialiased text-text-primary`}>{children}</body>
    </html>
  );
}
