import Image from "next/image"
export default function Content() {
  return (
    <section className="content lg:h-[60vh] flex items-center justify-center">
      <div className="container h-[30rem] lg:h-[25rem] gap-6 grid grid-cols-1 lg:grid-cols-2 py-11 my-11">
        <div className="w-full h-full rounded-[4rem] bg-slate-100 overflow-hidden relative ">
          <Image
            className="w-full h-full object-cover z-10"
            alt="section image"
            src="/images/section2.jpeg"
            width={400}
            height={400}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40 z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-100 text-sm lg:text-2xl text-center font-semibold z-20">
            <q >
              إن مساعدتنا للمحتاجين تمثل نبض الحياة في عالم يحتاج إلى لمسة إنسانية، ونحن نعمل جاهدين لتكوين جيل يعتمد على التعليم والتكنولوجيا في بناء مستقبل أفضل.
            </q>
          </div>
        </div>

        <div className="flex h-full flex-col gap-6 w-full overflow-hidden">
          <div className="w-full h-full rounded-[4rem] bg-slate-100 overflow-hidden ">

            <Image
              className="w-full h-auto object-cover "
              alt="section image"
              src="/images/section3.jpeg"
              width={400}
              height={400}
            />

          </div>
          <div className="w-full h-full flex items-center justify-center rounded-[4rem] bg-orange-300 overflow-hidden text-2xl ">
          </div>
        </div>
      </div>

    </section>
  )
}