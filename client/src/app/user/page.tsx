import PageTitle from "@/components/PageTitle"

/** @format */

import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";

const cardData: CardProps[] = [
  {
    label: "مسكن",
    amount: "ليلتان",
    discription: "مأوى الطوارئ",
    icon: CircleUserRound
  },
  {
    label: "مواصلات",
    amount: "تذكرة حافلة",
    discription: "للتوجه إلى مقابلة عمل",
    icon: CircleUserRound
  },
  {
    label: "دعم مالي",
    amount: "500 ريال ",
    discription: "مساعدة طارئة",
    icon: CircleUserRound
  },
  {
    label: "مهارات حياتية",
    amount: "دورة ورشة عمل",
    discription: "إدارة الميزانية",
    icon: CircleUserRound
  },
  {
    label: "دعم قانوني",
    amount: "استشارة مجانية لمدة ساعة",
    discription: "مع المحامي علي حسن",
    icon: CircleUserRound
  },
  {
    label: "مسكن",
    amount: "ليلتان",
    discription: "مأوى الطوارئ",
    icon: CircleUserRound
  },
  {
    label: "مواصلات",
    amount: "تذكرة حافلة",
    discription: "للتوجه إلى مقابلة عمل",
    icon: CircleUserRound
  },
  {
    label: "دعم مالي",
    amount: "500 ريال ",
    discription: "مساعدة طارئة",
    icon: CircleUserRound
  },
  {
    label: "مهارات حياتية",
    amount: "دورة ورشة عمل",
    discription: "إدارة الميزانية",
    icon: CircleUserRound
  },
  {
    label: "دعم قانوني",
    amount: "استشارة مجانية لمدة ساعة",
    discription: "مع المحامي علي حسن",
    icon: CircleUserRound
  },
];

const uesrSalesData: SalesProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="p-6">
        <PageTitle title="الرئيسية" />
      </div>

      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 p-6">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2 p-6">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>

          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Sales</p>
            <p className="text-sm text-gray-400">
              You made 265 sales this month.
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}