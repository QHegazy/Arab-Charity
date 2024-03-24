"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie"
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
import Header from "@/components/Header";
import { Cookie } from "next/font/google";
const formSchema = z
  .object({
    email: z.string().email(),
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
      email: "",
      password: "",

    },
  });

  const router = useRouter();


  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    try {
      const response = await axios.post("localhost:3000/v1/auth/email/login", values)
      if (response.status === 200) {
        // successful login
        Cookies.set('user_tooken', response.data.data)
        router.push("/user")
      } else {
        console.log("login failed")
      }

    } catch (error) {
      console.log(error)
    }

  };

  return (
    <>
      <Header />
      <div className=" min-h-screen py-11 flex items-center justify-center">

        <div className="container  mx-auto my-11">
          <div className=" md:w-[600px] m-auto bg-white p-10 rounded-3xl text-3xl font-semibold">
            <div className="text-2xl">تسجيل الدخول</div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-2"
              >
                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
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

                <Button type="submit" className="w-full mt-3 bg-blue-950 text-orange-50">
                  تسجيل الدخول
                </Button>

                <Link className="text-lg mt-2"
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