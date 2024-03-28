"use client";
import * as z from "zod";
import jwt from "jsonwebtoken"

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
import { useToast } from "@/components/ui/use-toast"

import Link from "next/link";
import Header from "@/components/Header";
import { useState } from "react";
const formSchema = z
  .object({
    Email: z.string().email(),
    Password: z.string().min(8),

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
      Email: "",
      Password: "",

    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()


  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/v1/auth" , { ...values });

      if (response.status === 200) {
        const token = response.data.data;
        Cookies.set("accessToken", token, { expires: 7 })
        const decodedToken = await jwt.decode(token);
        console.log(decodedToken)

        if (decodedToken && typeof decodedToken === 'object' && 'Role' in decodedToken) {
          console.log("login successful: ", decodedToken);
          // Determine redirect based on role
          if (decodedToken.Role === "Beneficiary" || decodedToken.Role === "doner") {
            router.push("/user");
          } else if (decodedToken.Role === "org") {
            router.push("/org");
          }
          toast({
            variant: "success",
            title: "Login successfuly",
            description: "Welcome back",
          });
        } else {
          router.push("/")
          console.error("Failed to decode token");
        }
      } else {
        console.log(response.data.message);
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please try again",
        });
      }
    } catch (error) {
      //@ts-ignore
      if (error.response) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "تعذر تسجيل الدخول",
          description: "معلومات الدخول خاطئة",
        });
      } else {
        toast({
          variant: "destructive",
          title: "خطأ",
          description: "خطأ غير متوقع حاول مجددًا لاحقًا",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-orange-100 bg-opacity-55">
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
                  name="Email"
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
                  name="Password"
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
    </div>
  );
}