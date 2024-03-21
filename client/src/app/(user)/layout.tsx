import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarDesktop } from "@/components/sidebar-desktop";

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
    <html lang="ar" dir="rtl" className="">
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
      <body className="font-body bg-white bg-opacity-55 text-blue-950">
        <SidebarDesktop />
        <main className="mr-[300px] mt-3">
          {children}
        </main>
      </body>
    </html>
  );
}
