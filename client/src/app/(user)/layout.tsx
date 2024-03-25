import { Sidbar } from "@/components/UserSidbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="bg-orange-50 bg-opacity-20 min-h-screen">
      <div className="hidden md:block">
        <Sidbar />
      </div>
      <main className="lg:mr-[270px] md:mr-[90px]">
        {children}
      </main>
    </div>

  );
}
