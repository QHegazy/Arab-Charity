'use client'
import { Home, LogOut, MoreHorizontal } from "lucide-react";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarItems } from "@/types/sidebar";
import { SidbarButton } from "./sidebar-button";



const sidebarItems: SidebarItems = {

  links: [{
    label: "الرئيسية",
    href: "/",
    icon: Home
  },
  {
    label: "من نحن",
    href: "user/dashboard",
    icon: Home
  },
  {
    label: "تبرع",
    href: "/donate",
    icon: Home
  },
  {
    label: "تواصل معنا",
    href: "/contact",
    icon: Home
  },],
  extra: (
    <div className="flex flex-col gap-3">
      <SidbarButton icon={MoreHorizontal} className="w-full">
        المزيد
      </SidbarButton>

      <SidbarButton variant="outline" icon={LogOut} className="w-full">
        تسجيل الخروج
      </SidbarButton>
    </div>
  )
}



export function Sidbar() {


  return (
    <SidebarDesktop sidebarItems={sidebarItems} />
  )
}