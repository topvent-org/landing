import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TopVent — Gestión inteligente para tu restaurante",
  description:
    "TopVent digitaliza la operación de tu restaurante: mesas, pedidos, meseros y reportes en tiempo real. Empieza gratis hoy.",
  openGraph: {
    title: "TopVent — Gestión inteligente para tu restaurante",
    description:
      "Digitaliza tu restaurante con TopVent. Mesas, pedidos y reportes en tiempo real.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
