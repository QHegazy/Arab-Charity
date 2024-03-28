'use client'
import { getDataFromToken } from "@/helpers/getDataFromToken"
import PageTitle from "@/components/PageTitle"
import { useEffect } from "react"
export default function Home() {
  const data = getDataFromToken()
  const userId = data.id
  console.log(data)
  console.log(userId)
  return (
    <div className=" w-full min-h-screen p-6 container">
      <PageTitle title="نشر خدمة" />



    </div>

  )
}