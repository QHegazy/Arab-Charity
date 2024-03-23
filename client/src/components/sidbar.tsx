'use client'
import { Home, LogOut, MoreHorizontal } from "lucide-react";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarItems } from "@/types/sidebar";
import { SidbarButton } from "./sidebar-button";



const sidebarItems: SidebarItems = {

  links: [{
    label: "الرئيسية",
    href: "/user",
    icon: Home
  },
  {
    label: "تبرع",
    href: "user/donate",
    icon: Home
  },
  {
    label: "تطوع",
    href: "user/volunteer",
    icon: Home
  },
  {
    label: "اطلب خدمة",
    href: "/user/ai",
    icon: Home
  },

  {
    label: "الطلبات",
    href: "/user/orders",
    icon: Home
  },
  {
    label: "تواصل مع AI",
    href: "/user/ai",
    icon: Home
  },

  {
    label: "خدمة خاصة",
    href: "/user/requests",
    icon: Home
  },

],
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