"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import Header from "@/components/ui/Header";
const formSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(8),

  })
// .refine(
//   (data) => {
//     return data.password === data.passwordConfirm;
//   },
//   {
//     message: "Passwords do not match",
//     path: ["passwordConfirm"],
//   }
// )


export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",

    },
  });


  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <>
      <Header />
      <div className="h-screen py-11 flex items-center justify-center">

        <div className="container  mx-auto my-11">
          <div className=" md:w-[600px] m-auto bg-white p-10 rounded-3xl text-3xl font-semibold">
            <div className="text-2xl">تسجيل الدخول</div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4"
              >
                {/* email */}
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full w-full"
                            placeholder="البريد الإلكتروني"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    );
                  }}
                />

                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>كلمة السر</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full w-full"
                            placeholder="كلمة السر"
                            type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <Button type="submit" className="w-full mt-4 bg-blue-950 text-orange-50">
                  تسجيل الدخول
                </Button>

                <Link className="text-lg"
                  href="/signup">
                  إنشاء حساب جديد
                </Link>
              </form>
            </Form>
          </div>
          </div>
      </div>
    </>
  );
}