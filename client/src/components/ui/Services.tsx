
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
      <div className={`${style} text-center mt-6 w-[180px] h-[120px] rounded-3xl relative`}>
        <div className="w-[90px] h-[90px] bg-slate-100 rounded-full
          absolute -top-1/3 left-1/4 flex items-center justify-center ">
          <Image
            alt="service image"
            src={imageSrc || ""}
            width={50}
            height={50}
          />
        </div>
        <p className="text-2xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 text-blue-950 ">
          {title}
        </p>
      </div>
    )
  }

  return (
    <section className="services w-full bg-white">
      <div className="container flex items-center justify-center flex-wrap gap-8 lg:gap-4 my-11 py-[5rem]">
        <ServiceCard
          title="تعليم"
          style="bg-amber-200"
          imageSrc="/images/book.png"
        />
        <ServiceCard
          title="صحة"
          style="bg-teal-200"
          imageSrc="/images/mental-health.png"
        />
        <ServiceCard
          title="غذاء"
          style="bg-pink-200"
          imageSrc="/images/gift.png"
        />
        <ServiceCard
          title="إستشارة"
          style="bg-cyan-200"
          imageSrc="/images/conversation.png"
        />
        <ServiceCard
          title="تطوع"
          style="bg-purple-200"
          imageSrc="/images/help.png"
        />
      </div>
    </section>
  )
}