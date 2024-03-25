"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"
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
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

import { arabCountries } from "@/constants/arabCountries";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, User } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import Link from "next/link";
import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const formSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    country: z.string(),
    password: z.string().min(3),
    role: z.enum(["donor", "needy", "org"]),
    orgRole: z.enum(["provider", "distributor"]).optional(),
    phoneNumber: z.string().refine((val) => !isNaN(parseInt(val, 10)), {
      message: "ضع رقم هاتف صحيح"
    }),
    birthDate: z.date({
      required_error: "تاريخ الميلاد مطلوب",
    }).optional(),
    orgName: z.string().optional(),
    website: z.string().optional()

  })
// .refine(
//   (data) => {
//     return data.Password === data.PasswordConfirm;
//   },
//   {
//     message: "Passwords do not match",
//     path: ["PasswordConfirm"],
//   }
// )


export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      country: "",
      orgName: "",
      website: ""

    },
  });
  const { toast } = useToast()

  const router = useRouter()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    toast({
      title: "Singup successfuly ",
      description: "pleas login",
    })

    // TODO handle org request and button loading

    try {
      setMessage("loading")
      const response = await axios.post("http://localhost:3001/v1/users", { ...values })
      console.log(response.status)
      if (response.status === 200) {
        toast({
          title: "Singup successfuly ",
          description: "pleas login",
        })
        router.push("/login")
        console.log('Signup successful:', response.data);
        setMessage("done singup")
      } else {
        console.error('Signup failed:', response.data);
      }

    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const role = form.watch("role")

  return (
    <>
      <Header />

      <div className=" py-11 flex min-h-screen items-center justify-center">

        <div className="container  mx-auto my-11">
          <div className=" md:w-[600px] m-auto bg-white p-10 rounded-3xl text-3xl font-semibold">
            <div className="text-2xl">إنشاء حساب جديد</div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-1"
              >

                {/* account type */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>نوع الحساب</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="rounded-full">
                              <SelectValue placeholder="اختر النوع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-orange-50 rounded-2xl text-2xl">
                            <SelectItem
                              className=" cursor-pointer hover:bg-white rounded-3xl"
                              value="donor">متبرع</SelectItem>
                            <SelectItem
                              className=" cursor-pointer hover:bg-white rounded-3xl"
                              value="needy">محتاج</SelectItem>

                            <SelectItem
                              className=" cursor-pointer hover:bg-white rounded-3xl"
                              value="org">منظمة</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {role === "org" ? (
                  <div>
                    {/* org name */}
                    <FormField
                      control={form.control} name='orgName'
                      render={({ field }) => {
                        return (
                          <FormItem className='md:flex-1 w-full'>
                            <FormLabel>أسم المنظمة</FormLabel>
                            <FormControl>
                              <Input
                                className='rounded-full w-full '
                                placeholder='الأسم الأول'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }} />

                    {/* email */}
                    <FormField
                      control={form.control} name='email'
                      render={({ field }) => {
                        return (
                          <FormItem className='md:flex-1 w-full'>
                            <FormLabel>البريد الإلكتروني </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                className='rounded-full w-full '
                                placeholder='البريد الإلكتروني '
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }} />
                    <FormField
                      control={form.control} name='phoneNumber'
                      render={({ ...field }) => {
                        return (
                          <FormItem className='md:flex-1 w-full'>
                            <FormLabel>رقم الهاتف</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                className='rounded-full w-full '
                                placeholder='رقم الهاتف'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }} />
                    {/* website */}

                    <FormField
                      control={form.control} name='website'
                      render={({ field }) => {
                        return (
                          <FormItem className='md:flex-1 w-full'>
                            <FormLabel>الموقع الإلكتروني </FormLabel>
                            <FormControl>
                              <Input
                                className='rounded-full w-full '
                                placeholder=' الموقع الإلكتروني'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }} />

                    {/* Country */}
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>البلد</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="rounded-full">
                                  <SelectValue placeholder="اختر البلد" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-orange-50 rounded-2xl text-2xl">
                                {arabCountries.map((name) => (
                                  <SelectItem
                                    key={name}
                                    className=" cursor-pointer hover:bg-white rounded-3xl"
                                    value={name}>{name}</SelectItem>
                                ))}


                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    {/* org type */}
                    <FormField
                      control={form.control}
                      name="orgRole"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>الدور</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="rounded-full">
                                  <SelectValue placeholder="اختر دور المنظمة" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-orange-50 rounded-2xl text-2xl">
                                <SelectItem
                                  className=" cursor-pointer hover:bg-white rounded-3xl"
                                  value="distributor">موزرع</SelectItem>
                                <SelectItem
                                  className=" cursor-pointer hover:bg-white rounded-3xl"
                                  value="provider">مزود</SelectItem>

                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    {/* password */}
                    <FormField
                      control={form.control} name='password'
                      render={({ field }) => {
                        return (
                          <FormItem className='md:flex-1 w-full'>
                            <FormLabel>كلمة المرور </FormLabel>
                            <FormControl>
                              <Input
                                className='rounded-full w-full '
                                placeholder='كلمة المرور '
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }} />

                  </div>
                ) :
                  (

                    <div>

                      {/* first and last name */}
                      <div className='flex flex-col md:flex-row items-center gap-4 justify-between '>
                        <FormField
                          control={form.control} name='firstName'
                          render={({ field }) => {
                            return (
                              <FormItem className='md:flex-1 w-full'>
                                <FormLabel>الأسم الأول</FormLabel>
                                <FormControl>
                                  <Input
                                    className='rounded-full w-full '
                                    placeholder='الأسم الأول'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }} />
                        <FormField control={form.control}
                          name='lastName'
                          render={({ field }) => {
                            return (
                              <FormItem
                                className='md:flex-1 w-full'>
                                <FormLabel>الأسم الأول</FormLabel>
                                <FormControl>
                                  <Input
                                    className='rounded-full w-full '
                                    {...field}
                                    placeholder='الأسم الأول'
                                    type='text' />
                                </FormControl>
                                <FormMessage />
                              </FormItem>);
                          }} />
                      </div>

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

                      {/* phone number */}
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>رقم الهاتف</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  className="rounded-full w-full"
                                  placeholder="رقم الهاتف"

                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          );
                        }}
                      />

                      {/* Country */}
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>البلد</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger className="rounded-full">
                                    <SelectValue placeholder="اختر البلد" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-orange-50 rounded-2xl text-2xl">
                                  {arabCountries.map((name) => (
                                    <SelectItem
                                      key={name}
                                      className=" cursor-pointer hover:bg-white rounded-3xl"
                                      value={name}>{name}</SelectItem>
                                  ))}


                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {/* birth day */}
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col mt-4">
                            <FormLabel>تاريخ الميلاد</FormLabel>
                            <Popover >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full rounded-full bg-orange-50 text-lg font-bold pl-3 text-left ",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>اختر التاريخ</span>
                                    )}
                                    <CalendarIcon className="ml-3 h-4 w-4 " />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-orange-50 rounded-3xl" align="start">

                                <Calendar
                                  mode="single"
                                  captionLayout="dropdown-buttons"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  fromYear={1960}
                                  toYear={2010}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password */}
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
                                  type="Password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  )}

                <Button type="submit" className="w-full mt-3 bg-blue-950 text-orange-50">
                  إنشاء حساب جديد
                </Button>

                <Link className="text-lg mt-2"
                  href="/login">
                  تسجيل الدخول
                </Link>
              </form>
            </Form>

          </div>
        </div>
      </div >
    </>
  );
}