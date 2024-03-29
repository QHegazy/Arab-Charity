'use client'
import PageTitle from "@/components/PageTitle"
import Card, { CardContent, CardProps } from "@/components/Card";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDataFromToken } from "@/helpers/getDataFromToken";
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
import { useEffect, useId, useState } from "react";
import axios from "axios";
const cairo = Cairo({ subsets: ["arabic", "latin"] })

// const cardData: CardProps[] = [
//   {
//     title: "مسكن",
//     amount: "ليلتان",
//     discription: "مأوى الطوارئ",
//     icon: CircleUserRound
//   },
//   {
//     title: "مواصلات",
//     amount: "تذكرة حافلة",
//     discription: "للتوجه إلى مقابلة عمل",
//     icon: CircleUserRound
//   },
//   {
//     title: "دعم مالي",
//     amount: "500 ريال ",
//     discription: "مساعدة طارئة",
//     icon: CircleUserRound
//   },
//   {
//     title: "مهارات حياتية",
//     amount: "دورة ورشة عمل",
//     discription: "إدارة الميزانية",
//     icon: CircleUserRound
//   },
//   {
//     title: "دعم قانوني",
//     amount: "استشارة مجانية لمدة ساعة",
//     discription: "مع المحامي علي حسن",
//     icon: CircleUserRound
//   },
//   {
//     title: "مسكن",
//     amount: "ليلتان",
//     discription: "مأوى الطوارئ",
//     icon: CircleUserRound
//   },
//   {
//     title: "مواصلات",
//     amount: "تذكرة حافلة",
//     discription: "للتوجه إلى مقابلة عمل",
//     icon: CircleUserRound
//   },
//   {
//     title: "دعم مالي",
//     amount: "500 ريال ",
//     discription: "مساعدة طارئة",
//     icon: CircleUserRound
//   },
//   {
//     title: "مهارات حياتية",
//     amount: "دورة ورشة عمل",
//     discription: "إدارة الميزانية",
//     icon: CircleUserRound
//   },
//   {
//     title: "دعم قانوني",
//     amount: "استشارة مجانية لمدة ساعة",
//     discription: "مع المحامي علي حسن",
//     icon: CircleUserRound
//   },
// ];

interface packagePrpos {
  Commodity: string,
  Title: string,
  Description: string,
  _id: string
}


export default function Home() {
  const { toast } = useToast()
  const userData = getDataFromToken()
  // console.log(userData._id)
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/package');
        const data = await response.data;
        setPackages(data.data);
      } catch (error) {
        console.log(error)
      }

    };

    fetchPackages();
  }, []);


  // console.log(packages)

  const handleSubmit = async (thePackage: packagePrpos, userId: string) => {
    console.log(thePackage, userId)
    try {
      const response = await axios.post('http://localhost:3000/v1/order', {

        Package: thePackage._id,
        Owner: userId,
        Mount: "1"
      });

      if (response.status === 201) {
        toast({
          variant: "success",
          title: "تم تقديم طلبك بنجاح",
          description: "سيتم مراجعة طلبك من قبل المتبرع",
        });
      } else {
        throw new Error('Failed to submit the package. Please try again.');
      }
    } catch (error) {
      //@ts-ignore
      console.log(error)
      toast({
        variant: "destructive",
        title: "خطأ في تقديم الطلب",
        description: "حدث خطأ أثناء تقديم طلبك. يرجى المحاولة مرة أخرى.",
      });
    }
  };


  return (
    <div className={`w-full min-h-screen container p-6 ${cairo.className}`}>
      <PageTitle title="الخدمات المتوفرة" />
      <section className="grid mt-6 w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 ">
        {packages.map((thePackage: packagePrpos, i) => (
          <Dialog key={i} >
            <DialogTrigger >
              <HoverCard  >
                <HoverCardTrigger
                  className="cursor-pointer"
                >
                  <Card
                    // amount={d.amount}
                    Description={thePackage.Description}
                    // icon={d.icon}
                    Title={thePackage.Title}
                    Commodity={thePackage.Commodity} />
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
                    {thePackage.Title}
                  </span>
                  <span>
                    {thePackage.Description}
                  </span>
                </div>
              </div>
              <DialogClose asChild>
                <Button onClick={() => handleSubmit(thePackage, userData._id)} >تقديم</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ))}
      </section>
    </div>

  )
}