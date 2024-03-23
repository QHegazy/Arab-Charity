'use client'

import { usePathname } from "next/navigation"
import path from "path"
export default function Home() {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <div className="bg-white p-10 w-full h-full">
      <h2>
        Welcome to the User Dashboard!
      </h2>
    </div>

  )
}