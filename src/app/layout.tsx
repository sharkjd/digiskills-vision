import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "./globals.css";
import LayoutSwitcher from "@/components/layout/LayoutSwitcher";
import Providers from "@/components/Providers";
import ElevenLabsChatbot from "@/components/ElevenLabsChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Digiskills",
  description: "Digiskills vzdělávací portál",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${montserrat.variable} antialiased`}
        suppressHydrationWarning
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Providers>
          <LayoutSwitcher>{children}</LayoutSwitcher>
          <ElevenLabsChatbot />
        </Providers>
      </body>
    </html>
  );
}
