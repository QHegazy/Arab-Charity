import PageTitle from "@/components/PageTitle"

/** @format */

import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Orgdashboard } from "@/components";

const cardData: CardProps[] = [
  {
    title: "مسكن",
    amount: "ليلتان",
    discription: "مأوى الطوارئ",
    icon: CircleUserRound
  },
  {
    title: "مواصلات",
    amount: "تذكرة حافلة",
    discription: "للتوجه إلى مقابلة عمل",
    icon: CircleUserRound
  },
  {
    title: "دعم مالي",
    amount: "500 ريال ",
    discription: "مساعدة طارئة",
    icon: CircleUserRound
  },
  {
    title: "مهارات حياتية",
    amount: "دورة ورشة عمل",
    discription: "إدارة الميزانية",
    icon: CircleUserRound
  },
  {
    title: "دعم قانوني",
    amount: "استشارة مجانية لمدة ساعة",
    discription: "مع المحامي علي حسن",
    icon: CircleUserRound
  },
  {
    title: "مسكن",
    amount: "ليلتان",
    discription: "مأوى الطوارئ",
    icon: CircleUserRound
  },
  {
    title: "مواصلات",
    amount: "تذكرة حافلة",
    discription: "للتوجه إلى مقابلة عمل",
    icon: CircleUserRound
  },
  {
    title: "دعم مالي",
    amount: "500 ريال ",
    discription: "مساعدة طارئة",
    icon: CircleUserRound
  },
  {
    title: "مهارات حياتية",
    amount: "دورة ورشة عمل",
    discription: "إدارة الميزانية",
    icon: CircleUserRound
  },
  {
    title: "دعم قانوني",
    amount: "استشارة مجانية لمدة ساعة",
    discription: "مع المحامي علي حسن",
    icon: CircleUserRound
  },
];

const uesrSalesData: SalesProps[] = [
  {
    name: "موسى محمد",
    description: "mose@descriptionxample.com",
    date: "2025/02/25"
  },
  {
    name: "فاطمة علي",
    description: "fatima@descriptionxample.com",
    date: "2025/03/01"
  },
  {
    name: "خالد أحمد",
    description: "khaled@descriptionxample.com",
    date: "2025/02/28"
  },
  {
    name: "عائشة بنت سعيد",
    description: "aisha@descriptionxample.com",
    date: "2025/03/02"
  },

  {
    name: "زينب بنت محمد",
    description: "zeinab@descriptionxample.com",
    date: "2025/03/04"
  },
  {
    name: "ليلى بنت خالد",
    description: "leila@descriptionxample.com",
    date: "2025/03/06"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5 container w-full p-6">
      <div className="">
        <PageTitle title="الرئيسية" />
      </div>

      {/*  <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 ">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            title={d.title}
          />
        ))}
      </section>
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
            <p>الطلبات المقبولة</p>
            <p className="text-sm text-gray-400">
              لديك 8 طلبات مقبول
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              description={d.description}
              name={d.name}
              date={d.date}
            />
          ))}
        </CardContent>

      
      </section>*/}

      <Orgdashboard />
    </div>
  );
}