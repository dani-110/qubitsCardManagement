import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qubits Card OS | Card Management System",
  description:
    "Enterprise card issuing, controls, risk, disputes and operations for banks and fintechs.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
