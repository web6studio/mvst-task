import type { Metadata } from "next";
import { Poppins, Bebas_Neue } from "next/font/google";
import { Providers } from "./providers";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/ui/Toast";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "MVST Coffee",
  description: "Choose a coffee from our collection or create your own",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${bebasNeue.variable}`}>
      <body
        className={`min-h-screen bg-gradient-to-b from-[#070707] to-[#101011]`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
