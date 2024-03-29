import PageTitle from "@/components/PageTitle"
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className=" w-full min-h-screen p-6 container ">
      <PageTitle title="اطلب خدمة خاصة" />

      <div className="w-full  m-auto p-3 shadow-2xl border  rounded-2xl mt-6">
        <form action="">
          <Select>
            <SelectTrigger className="rounded-full text-right">
              <SelectValue className="text-right" placeholder="اختر الفئة" />
            </SelectTrigger>

            <SelectContent className="bg-orange-50 rounded-2xl text-2xl">
              <SelectItem
                className=" cursor-pointer hover:bg-white rounded-3xl"
                value="education">التعليم</SelectItem>
              <SelectItem
                className=" cursor-pointer hover:bg-white rounded-3xl"
                value="food">غذاء</SelectItem>

              <SelectItem
                className=" cursor-pointer hover:bg-white rounded-3xl"
                value="counsoltion">إستشارة</SelectItem>

              <SelectItem
                className=" cursor-pointer hover:bg-white rounded-3xl"
                value="health">الصحة</SelectItem>
            </SelectContent>
          </Select>

          <p className="mt-3">الوصف</p>
          <textarea placeholder="اكتب وصف الخدمة "
            className=" outline-none w-full border border-orange-100 rounded-2xl mt-1 resize-none min-h-52 p-6" />

          <Button className="w-full mt-3" type="submit">
            اطلب
          </Button>
        </form>
      </div>
    </div>

  )
}