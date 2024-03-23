'use client'
import { Home, LogOut, MoreHorizontal, HeartHandshake, LayoutList, BringToFront, Bot, BookHeart } from "lucide-react";
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
    icon: HeartHandshake
  },
  {
    label: "تطوع",
    href: "user/volunteer",
    icon: Home
  },
  {
    label: "اطلب خدمة",
    href: "/user/ai",
    icon: LayoutList
  },

  {
    label: "الطلبات",
    href: "/user/orders",
    icon: BringToFront
  },
  {
    label: "تواصل مع AI",
    href: "/user/ai",
    icon: Bot
  },

  {
    label: "خدمة خاصة",
    href: "/user/requests",
    icon: BookHeart
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