import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter, IBM_Plex_Serif} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight:['400','700'],
  variable: '--font-ibm-plex-serif'

});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PayStrive",
  description: "Pay smarter. Strive further.",
  icons: {
    icon: '/icons/logo.svg' 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${ibmPlexSerif.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
