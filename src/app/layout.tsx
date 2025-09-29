import React from "react";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Desa Kabupaten Sumedang",
  description: "Informasi, Berita, dan Layanan Masyarakat",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/logo-fix/icon-head.png"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/assets/logo-fix/icon-head.png" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
