import type { Metadata } from "next";
import "@/app/globals.css";
import { Sidbar } from "@/components/UserSidbar";
export const metadata: Metadata = {
  title: "Arab Charity",
  description: "the arab charity website",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ar" dir="rtl">
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
      <body className="bg-orange-50 bg-opacity-10  text-blue-950 font-body">
        <div className="hidden md:block">
          <Sidbar />
        </div>
        <main className="lg:mr-[280px] md:mr-[90px]">
          {children}
        </main>
      </body>
    </html>
  );
}
