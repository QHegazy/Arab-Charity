import PageTitle from "@/components/PageTitle"

/** @format */

import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";



const uesrSalesData: SalesProps[] = [
  {
    name: "موسى محمد",
    email: "mose@emailxample.com",
    date: "2025/02/25"
  },
  {
    name: "فاطمة علي",
    email: "fatima@emailxample.com",
    date: "2025/03/01"
  },
  {
    name: "خالد أحمد",
    email: "khaled@emailxample.com",
    date: "2025/02/28"
  },
  {
    name: "عائشة بنت سعيد",
    email: "aisha@emailxample.com",
    date: "2025/03/02"
  },

  {
    name: "زينب بنت محمد",
    email: "zeinab@emailxample.com",
    date: "2025/03/04"
  },
  {
    name: "ليلى بنت خالد",
    email: "leila@emailxample.com",
    date: "2025/03/06"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5   w-full p-6">
      <div className="">
        <PageTitle title="الرئيسية" />
      </div>

      {/* <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 ">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section> */}
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2 ">
        <CardContent>
          <p className="p-4 font-semibold">المستجدات</p>

          <div className="flex flex-col gap-4">
            <p className="bg-orange-50 rounded-full p-3">تم قبول طلب واحد ولديك رسالة</p>

            <p className="bg-orange-50 rounded-full p-3">تم قبول طلب المساعدة المالية من فاطمة علي</p>

            <p className="bg-orange-50 rounded-full p-3">تم قبول طلبك من فاطمة </p>


          </div>
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>الطلبات </p>
            <p className="text-sm text-gray-400">
              لديك 8 طلبات مقبول
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              date={d.date}
            />
          ))}
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}