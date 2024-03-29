"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"
import { Icon } from '@iconify-icon/react';
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

import { countries } from "@/constants/countries";

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
    FirstName: z.string(),
    LastName: z.string(),
    Email: z.string().email(),
    Country: z.string(),
    Password: z.string().min(3),
    Role: z.enum(["donor", "Beneficiary", "org"]).optional(),
    OrgRole: z.enum(["provider", "distributor"]).optional(),
    PhoneNumber: z.string(),
    BirthDate: z.date({
      required_error: "تاريخ الميلاد مطلوب",
    }).optional(),
    Name: z.string(),
    Website: z.string(),
    Location: z.string(),

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
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      Country: "",
      Name: "",
      Website: "",
      Location: "",
    },
  });


  const { toast } = useToast()

  const router = useRouter()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const mapToForm = (data: z.infer<typeof formSchema>) => ({
    ...data, // Map orgRole to Role
    PhoneNumber: +data.PhoneNumber,
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });

    // TODO handle org request and button loading
    setMessage("loading")
    try {

      const mappedData = mapToForm({ ...values })
      const endpoint = values.Role === "org" ? "/v1/orgs" : "/v1/users"

      const response = await axios.post("http://localhost:3000" + endpoint, mappedData)
      console.log(response.status)
      if (response.data.statusCode === 200) {
        toast({
          variant: "success",
          title: "Singup successfuly ",
          description: "pleas login",
        })
        router.push("/login")
        console.log('Signup successful:', response.data);
        setMessage("done singup")
      } else {
        toast({
          variant: "destructive",
          title: "Singup fail ",
          description: response.data.message,
        })
        console.log(response.data);
      }

    } catch (error) {
      //@ts-ignore

      if (error.response) {
        //@ts-ignore
        console.log(error.response.data.message)
        toast({
          variant: "destructive",
          title: "تعذر إنشاء حساب جديد",
          //@ts-ignore
          description: `${error.response.data.message}`,
        })
        //@ts-ignore
        // console.log(...error.response.data);
      } else {
        toast({
          variant: "destructive",
          title: "خطاء ",
          description: "خطاء غير متوقع حاول مجددا لاحقا",
        })

        //@ts-ignore
        console.log('Signup error:', ...error.response.data.message);
      }
    }
  };

  const Role = form.watch("Role")

  return (
    <div className="bg-orange-100 bg-opacity-55">
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
                  name="Role"
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
                              value="Beneficiary">مستفيد</SelectItem>

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
                {Role === "org" ? (
                  <div>
                    {/* org name */}
                    <FormField
                      control={form.control} name='Name'
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
                      control={form.control} name='Email'
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
                    {/* phone number */}
                    <FormField
                      control={form.control}
                      name="PhoneNumber"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>رقم الهاتف</FormLabel>
                            <FormControl>
                              <Input
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

                    {/* website */}

                    {/* org loaction */}
                    <FormField
                      control={form.control}
                      name="Location"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>الموقع</FormLabel>
                            <Input
                              className='rounded-full w-full '
                              placeholder='الموقع'
                              {...field}
                            />
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control} name='Website'
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
                      name="Country"
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
                                {countries.map((country) => (
                                  <SelectItem
                                    key={country.name}
                                    className=" cursor-pointer hover:bg-white rounded-3xl"
                                    value={country.name}>
                                    {country.name}
                                    <Icon icon={`flag:${country.code}-4x3`} />
                                  </SelectItem>
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
                      name="OrgRole"
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
                      control={form.control} name='Password'
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
                    // <div>
                    // </div>
                    <div>
                      {/* first and last name */}
                      <div className='flex flex-col md:flex-row items-center gap-4 justify-between '>
                        <FormField
                          control={form.control} name='FirstName'
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
                          name='LastName'
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

                      {/* phone number */}
                      <FormField
                        control={form.control}
                        name="PhoneNumber"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>رقم الهاتف</FormLabel>
                              <FormControl>
                                <Input
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
                        name="Country"
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
                                  {countries.map((country) => (
                                    <SelectItem
                                      key={country.name}
                                      className=" cursor-pointer hover:bg-white w-full gap-8 flex items-center justify-between rounded-3xl"
                                      value={country.name}>
                                      <span>
                                        <Icon icon={`flag:${country.code}-4x3`} />
                                      </span>
                                      <span>
                                        {country.name}
                                      </span>
                                    </SelectItem>
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
                        name="BirthDate"
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
                        name="Password"
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
    </div>
  );
}