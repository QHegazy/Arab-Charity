'use client'
import { Home, LogOut, LayoutList,HandHelping, BringToFront, Bot, BookHeart } from "lucide-react";
import { SidebarDesktop } from "./SidebarDesktop";
import { SidebarItems } from "@/types/sidebar";
import { SidbarButton } from "./SidebarButton";

const sidebarItems: SidebarItems = {
  links: [{
    label: "الرئيسية",
    href: "/user",
    icon: Home
  },
  {
    label: "تطوع",
    href: "/user/volunteer",
    icon: HandHelping
  },

  {
    label: "اطلب خدمة",
    href: "/user/help",
    icon: LayoutList
  },

  {
    label: "الخدمات المتوفرة",
    href: "/user/orders",
    icon: BringToFront
  },
  {
    label: "تواصل مع AI",
    href: "/user/ai-chat",
    icon: Bot
  },


  ],
  extra: (
    <div className="flex flex-col gap-3">

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