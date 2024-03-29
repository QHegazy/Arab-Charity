import { Sidbar } from "@/components/UserSidbar";
import { Cairo } from "next/font/google"
const cario = Cairo({ subsets: ["arabic", "latin"] })
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={`bg-orange-50 bg-opacity-20 min-h-screen ${cario.className}`}>
      <div>
        <Sidbar />
      </div>
      <main className="lg:mr-[270px] md:mr-[90px] font-body">
        {children}
      </main>
    </div>

  );
}
