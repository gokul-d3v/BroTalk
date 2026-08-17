import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brotalk",
  description: "Secure communication platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background text-on-background min-h-screen relative overflow-x-hidden flex flex-col font-body-base antialiased`}>
        {/* Technical Background Elements */}
        <div className="fixed inset-0 bg-grid-pattern opacity-30 z-0 pointer-events-none"></div>

        {/* Large Decorative Arc */}
        <div className="fixed w-[120vh] h-[120vh] border-[0.5px] border-primary/20 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 w-[1px] h-4 bg-primary/40 -translate-x-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-[1px] h-4 bg-primary/40 -translate-x-1/2"></div>
          <div className="absolute left-0 top-1/2 h-[1px] w-4 bg-primary/40 -translate-y-1/2"></div>
          <div className="absolute right-0 top-1/2 h-[1px] w-4 bg-primary/40 -translate-y-1/2"></div>
        </div>
        
        {children}
      </body>
    </html>
  );
}
