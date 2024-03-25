import { Sidbar } from "@/components/OrgSidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <div className="hidden md:block">
        <Sidbar />
      </div>
      <main className="lg:mr-[280px] md:mr-[90px]">
        {children}
      </main>
    </>


  );
}
