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
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

import { arabCountries } from "@/constants/arabCountries";
import { Icon } from '@iconify/react';

const formSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    emailAddress: z.string().email(),
    country: z.string(),
    password: z.string().min(3),
    passwordConfirm: z.string(),
    accountType: z.enum(["donor", "needy"]),
    phoneNumber: z.string(),
  })

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      phoneNumber: "",
      country: ""

    },
  });


  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className=" md:w-[600px] m-auto bg-white p-10 rounded-3xl text-3xl font-semibold">

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >

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
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {/* 
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <div className="flex h-10 w-full rounded-full border border-input bg-background">
                          <Input
                            className="rounded-full w-full border-none flex-3 -inset-y-px"
                            placeholder="رقم الهاتف"
                            {...field}
                          />

                          <Select onValueChange={field.onChange}>
                            <FormControl className="flex-2">
                              <SelectTrigger className="rounded-full">
                                <SelectValue placeholder="اختر النوع" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-orange-100 rounded-3xl text-2xl">
                              <SelectItem
                                className=" cursor-pointer hover:bg-white rounded-3xl"
                                value="donor">متبرع</SelectItem>
                              <SelectItem
                                className=" cursor-pointer hover:bg-white rounded-3xl"
                                value="needy">محتاج</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}

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
                        <SelectContent className="bg-orange-100 rounded-3xl text-2xl">
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

              <FormField
                control={form.control}
                name="accountType"
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
                        <SelectContent className="bg-orange-100 rounded-3xl text-2xl">
                          <SelectItem
                            className=" cursor-pointer hover:bg-white rounded-3xl"
                            value="donor">متبرع</SelectItem>
                          <SelectItem
                            className=" cursor-pointer hover:bg-white rounded-3xl"
                            value="needy">محتاج</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
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
              <Button type="submit" className="w-full mt-4">
                Submit
                <Icon icon="flag:ly-4x3" />
              </Button>
            </form>
          </Form>

        </div>
      </div>
    </div>
  );
}