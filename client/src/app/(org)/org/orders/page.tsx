import PageTitle from "@/components/PageTitle"
export default function Home() {
  return (
    <div className="p-6 w-full min-h-screen container">
      <PageTitle title="الطلبات" />
      <div className="flex items-center text-xl min-h-[90vh] justify-center h-full">
        لا يوجد طلبات الان
      </div>
    </div>

  )
}