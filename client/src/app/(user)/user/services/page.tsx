'use client'
import PageTitle from "@/components/PageTitle"
import Card, { CardContent, CardProps } from "@/components/Card";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Cairo } from "next/font/google";
import { useToast } from "@/components/ui/use-toast"
const cairo = Cairo({ subsets: ["arabic", "latin"] })
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



export default function Home() {
  const { toast } = useToast()

  const handleSubmit = async () => {
    //TODO SEND request to the end point for order
    toast({
      variant: "success",
      title: "تم تقديم طلبك بنجاح",
      description: "سيتم مراجعة طلبك من قبل المتبرع",
    })

  }


  return (
    <div className={`w-full min-h-screen container p-6 ${cairo.className}`}>
      <PageTitle title="الخدمات المتوفرة" />
      <section className="grid mt-6 w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 ">
        {cardData.map((d, i) => (
          <Dialog key={i} >
            <DialogTrigger >
              <HoverCard  >
                <HoverCardTrigger
                  className="cursor-pointer"
                >
                  <Card
                    key={i}
                    amount={d.amount}
                    discription={d.discription}
                    icon={d.icon}
                    title={d.title}
                  />
                </HoverCardTrigger>

                <HoverCardContent className="border p-1 shadow-lg">
                  <div>
                    اضغط لتقديم طلب
                  </div>
                </HoverCardContent>
              </HoverCard>
            </DialogTrigger>
            <DialogContent className={`rounded-2xl text-center ${cairo.className}`}>
              <div className="">
                <p className="text-xl text-center">
                  هل تريد تقديم طلب للحصول على هذه الخدمة
                </p>
                <div className="my-4 flex flex-col flex-wrap">
                  <span className="text-bold text-gray-500 text-right">
                    {d.title}
                  </span>
                  <span className="text-2xl">
                    {d.amount}
                  </span>
                  <span>
                    {d.discription}
                  </span>
                </div>
              </div>
              <DialogClose asChild>
                <Button onClick={handleSubmit} >تقديم</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ))}
      </section>
    </div>

  )
}