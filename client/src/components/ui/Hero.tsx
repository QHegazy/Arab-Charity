import Image from "next/image"
export default function Hero() {
  return (
    <section className="container ">
      <div className="flex items-center justify-between my-11 py-11">
        <div>
          <h1 className="text-orange-400 font-bold text-3xl ">قد تغيب أنت و يبقى اثرك في فعل الخير</h1>
          <p className="leading-normal text-blue-950 font-bold text-4xl  lg:text-[3rem] lg:w-3/4 mt-2">لا تحقرن قليلًا من الخير تفعله، فان قليل الخير كثيره
          </p>
          <p className="text-2xl lg:w-3/4 font-noraml mt-5 text-blue-900">نحن نساعد المحتاجين باستخدام التقنية. التعليم,
            الطعام, المساعدة الطبية...</p>
        </div>
        <div className=" relative hidden lg:block">
          <div className="image-container ">
            <Image
              alt="hero"
              src="/images/Hero-image.jpeg"
              width={454}
              height={406}
              objectFit="cover"
            />
          </div>
          <Image
            className="-rotate-45 absolute top-[200px] left-[440px]"
            alt="curved arrow"
            src="/images/curved-arrow.png"
            width={150}
            height={150}
          />
        </div>
      </div>


    </section>)

}