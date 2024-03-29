'use client'
import Marquee from "react-fast-marquee";
export default function Services() {

  const texts = ["تعليم", "صحة", "إستشارة", "غذاء", "تطوع"]
  function ServiceCard({ text }: { text: string }) {
    return (
      <div className="shadow-xl w-[150px] h-[100px] flex mx-4 items-center justify-center p-6 rounded-2xl text-2xl border border-orange-100 border-1">
        <span>{text}</span>
      </div>
    );
  }

  return (
    <section className=" bg-gradient-to-br overflow-hidden
    min-h-[50vh]
    backdrop-blur-3xl w-full  my-[6rem]  flex items-center justify-center" id="services">
      <div className="flex flex-col ">
        <div className=" text-center max-w-md m-auto">
          <p className="text-3xl font-semibold">بالعطاء نزداد</p>
          <p className="text-gray-800 mt-2">
            انطلق معنا في رحلة العطاء والإحسان، حيث يُعَد العمل الخيري والتعاون أساسًا لبناء مستقبل أفضل للجميع
          </p>
        </div>

        <div className="w-full">
          <Marquee
            // #5352518c
            // #e9e5df8c
            gradientColor="#ffedd58c"
            gradientWidth={100}
            // gradient={true}
            className="w-full min-h-[20vh]">
            <ServiceCard text="تعليم" />
            <ServiceCard text="غذاء" />
            <ServiceCard text="تطوع" />
            <ServiceCard text="إستشارة" />
            <ServiceCard text="صحة" />
          </Marquee>

          <Marquee
            // #5352518c
            // #e9e5df8c
            direction="right"
            gradientColor="#ffedd58c"
            gradientWidth={100}
            // gradient={true}
            className="w-full min-h-[20vh]">
            <ServiceCard text="تعليم" />
            <ServiceCard text="غذاء" />
            <ServiceCard text="تطوع" />
            <ServiceCard text="إستشارة" />
            <ServiceCard text="صحة" />
          </Marquee>
        </div>
      </div>
    </section>
  )
}