import type { Metadata } from "next";
import "@/app/globals.css";
import { Sidbar } from "@/components/sidbar";
import { Cairo } from "next/font/google"
export const metadata: Metadata = {
  title: "Arab Charity",
  description: "the arab charity website",
};

const cairo = Cairo({
  weight: "400",
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
        <div className="hidden md:block">
        <Sidbar/>
        </div>
        <main className="lg:mr-[280px] md:mr-[90px] md:mt-2">
          {children}
        </main>
      </body>
    </html>
  );
}
