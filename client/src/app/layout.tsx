import type { Metadata } from "next";
import "@/app/globals.css";
import { Sidbar } from "@/components/sidbar";
import { Cairo } from "next/font/google"
export const metadata: Metadata = {
  title: "Arab Charity",
  description: "the arab charity website",
};

const cairo = Cairo({
  
  subsets: ["latin", "arabic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ar" dir="rtl" className={cairo.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className="bg-orange-100 bg-opacity-55 text-blue-950">
        {children}
      </body>
    </html>
  );
}
