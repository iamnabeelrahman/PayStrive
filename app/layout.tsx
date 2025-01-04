import type { Metadata } from "next";
import { Poppins, Roboto, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

// Poppins - A modern, professional sans-serif font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Customizing weights
});

// Roboto - Another clean and versatile sans-serif font
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"], // Customizing weights
});

// IBM Plex Serif - For some elegant touch
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "PayStrive",
  description: "Pay smarter. Strive further.",
  icons: {
    icon: '/icons/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${roboto.variable} ${ibmPlexSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
