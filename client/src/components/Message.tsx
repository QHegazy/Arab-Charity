export default function Messag() {
  return (
    <section className="message bg-white" id="about">
      <div className="container flex gap-5 items-center justify-between flex-col lg:flex-row py-11 my-11">
        <div className="lg:flex-1 text-center lg:text-right">
          <div className="text-3xl text-orange-400 font-bold">ماذا نقدم</div>
          <div className="text-2xl mt-4 text-blue-950 font-bold lg:w-3/4">
            نحن في مهمة لمساعدة المحتاج
            و بذل العطاء
          </div>
          <p className="text-lg mt-4 lg:w-3/4 text-blue-900 font-normal">
            في رحلتنا لمساعدة المحتاج وبذل العطاء، نسعى دوماً إلى تقديم الدعم والمساعدة لأولئك الذين يحتاجون إليها في مختلف جوانب حياتهم. نؤمن بقوة التضامن والتعاون كوسيلة لبناء مجتمع أفضل، ومن هنا تأتي رسالتنا في تقديم التعليم والموارد التي تمكن الأفراد من تحسين أوضاعهم وتعزيز قدراتهم. نحن ملتزمون بتقديم المعرفة والدعم اللازمين لتمكين الفرد والمجتمع، ونعمل بجدية لنكون جزءاً من تحقيق الإيجابية والتغيير الإيجابي في حياة الآخرين.
          </p>
        </div>
        <div className="lg:flex-1 h-full w-full mt-4 lg:mt-0 lg:flex items-center justify-center">
          {/* <div className="text-4xl font-bold mb-9 text-orange-400 lg:hidden text-center lg:text-right">خطوات بسيطة</div> */}
          <div className="flex flex-col gap-5 items-center lg:-rotate-[30deg] mt-9">

            <div className="flex items-center flex-wrap w-full justify-center gap-5">
              <div className="bg-slate-100 lg:w-[9rem] h-[5rem] w-full flex items-center justify-center rounded-[4rem]">
                <p className="text-2xl text-blue-950">إحسان</p>
              </div>
              <div className="bg-slate-100 lg:w-[9rem] h-[5rem] w-full flex items-center justify-center rounded-[4rem]">
                <p className="text-2xl text-blue-950">فرصة</p>
              </div>
            </div>

            <div className="flex items-center lg:flex-row w-full flex-col justify-center gap-5 lg:translate-x-[4rem] ">
              <div className="bg-slate-100 lg:w-[9rem] h-[5rem] w-full flex items-center justify-center rounded-[4rem]">
                <p className="text-2xl text-blue-950">تمكين</p>
              </div>
              <div className="bg-slate-100 lg:w-[9rem] h-[5rem] w-full flex items-center justify-center rounded-[4rem]">
                <p className="text-2xl text-blue-950">بصمة</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}