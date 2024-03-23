import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
export default function Hero() {
  return (
    <section className="container  ">
      <div className="flex flex-col lg:min-h-[60vh] lg:flex-row items-center gap-11 lg:gap-0 justify-between my-11 py-11">
        <div>
          <h1 className="text-orange-400 font-bold text-2xl ">قد تغيب أنت و يبقى اثرك في فعل الخير</h1>
          <p className="leading-normal text-blue-950 font-bold text-2xl  lg:text-[2rem] lg:w-3/4 mt-2">لا تحقرن قليلًا من الخير تفعله، فان قليل الخير كثيره
          </p>
          <p className="text-xl lg:w-3/4 font-noraml mt-5 text-blue-900">نحن نساعد المحتاجين باستخدام التقنية. التعليم,
            الطعام, المساعدة الطبية...</p>

          <Button asChild className="mt-4">
            <Link href="/signup">
              ساعد محتاج
            </Link>
          </Button>
        </div>


        <div className=" relative hidden lg:block ">
          <div className="image-container ">
            <Image
              alt="hero"
              src="/images/hero-vector.png"
              width={300}
              height={300}

            />
          </div>
          <Image
            className="-rotate-45 absolute top-[115px] left-[300px] "
            alt="curved arrow"
            src="/images/curved-arrow.png"
            width={150}
            height={150}
          />
        </div>

        <div className="lg:hidden w-full flex items-center justify-center rounded-full overflow-hidde max-w-[400px] max-h-[400px]">
          <Image
            className="rounded-full "
            alt="hero"
            src="/images/Hero-image.jpeg"
            width={250}
            height={250}

          />
        </div>
      </div>


    </section>)

}