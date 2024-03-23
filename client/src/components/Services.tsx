
import { Key } from "lucide-react"
import Image from "next/image"

export default function Services() {
  interface CardProps {
    title?: string,
    style?: string,
    imageSrc?: string
  }
  const ServiceCard = ({ title, style, imageSrc }: CardProps) => {
    return (
      <div className={`${style} text-center mt-6 w-[130px] h-[100px] rounded-3xl relative`}>
        <div className="w-[60px] h-[60px] bg-slate-100 rounded-full
          absolute -top-1/3 left-[27%] flex items-center justify-center ">
          <Image
            alt="service image"
            src={imageSrc || ""}
            width={40}
            height={40}
          />
        </div>
        <div className="flex items-center h-full justify-center">
          <p className="text-xl font-bold  text-blue-950 ">
            {title}
          </p>
        </div>

      </div>
    )
  }

  return (
    <section className="services w-full bg-white">
      <div className="container flex items-center justify-center flex-wrap gap-5 lg:gap-4 my-11 py-[5rem]">
        <ServiceCard
          title="تعليم"
          style="bg-amber-300"
          imageSrc="/images/book.png"
        />
        <ServiceCard
          title="صحة"
          style="bg-teal-300"
          imageSrc="/images/mental-health.png"
        />
        <ServiceCard
          title="غذاء"
          style="bg-pink-300"
          imageSrc="/images/gift.png"
        />
        <ServiceCard
          title="إستشارة"
          style="bg-cyan-300"
          imageSrc="/images/conversation.png"
        />
        <ServiceCard
          title="تطوع"
          style="bg-purple-300"
          imageSrc="/images/help.png"
        />
      </div>
    </section>
  )
}