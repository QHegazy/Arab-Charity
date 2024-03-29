'use client'
import { getDataFromToken } from "@/helpers/getDataFromToken"
import PageTitle from "@/components/PageTitle"
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps {
  Commodity: string,
  Title: string,
  Description: string,
  Order: string,
  Owner: string,
}


const formSchema = z
  .object({
    Commodity: z.enum(["Food", "RealEstate", "Ticket", "FinancialAid", "Course", "LegalSupport"]),
    Title: z.string(),
    Description: z.string(),
    Owner: z.string(),
    Order: z.string(),

  })
export default function Home() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    }
  });
  const data = getDataFromToken()
  if (data) {
  const userId = data._id
  }
  

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle form submission here
    try {
      // Here you can perform actions such as sending the form data to a server
      console.log(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  useEffect(() => {
    form.setValue('Owner',"");

  }, [form])

  return (
    <div className="w-full min-h-screen p-6 container">
      <PageTitle title="نشر خدمة" />
      <div>
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2 border mt-6 shadow-lg rounded-3xl p-6"
          >

            <FormField
              control={form.control}
              name="Commodity"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>النوع</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-orange-50 rounded-2xl text-2xl">
                        <SelectItem
                          className=" cursor-pointer hover:bg-white rounded-3xl"
                          value="Food">طعام</SelectItem>
                        <SelectItem
                          className=" cursor-pointer hover:bg-white rounded-3xl"
                          value="RealEstate">عقار</SelectItem>

                        <SelectItem
                          className=" cursor-pointer hover:bg-white rounded-3xl"
                          value="Ticket">تذكرة</SelectItem>

                        <SelectItem
                          className=" cursor-pointer hover:bg-white rounded-3xl"
                          value="FinancialAid">مساعدة مالية</SelectItem>

                        <SelectItem
                          className=" cursor-pointer hover:bg-white rounded-3xl"
                          value="Course">كورس</SelectItem>

                        <SelectItem
                          className=" cursor-pointer hover:bg-white rounded-3xl"
                          value="LegalSupport">دعم قانوني</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="Title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>العنوان</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-full w-full"
                        placeholder="العنوان"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                );
              }}
            />


            {/* Description */}
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>الوصف</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className=" w-full resize-none min-h-60 outline-none border border-orange-200 p-3 rounded-3xl"
                        placeholder="اكتب وصف الخدمة"
                      />

                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="">
              إضافة
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
