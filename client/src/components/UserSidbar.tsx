'use client'
import { Home, LogOut, LayoutList, HandHelping, BringToFront, Bot, BookHeart, HeartHandshake } from "lucide-react";
import { SidebarDesktop } from "./SidebarDesktop";
import { SidebarItems } from "@/types/sidebar";
import { SidbarButton } from "./SidebarButton";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const userData = getDataFromToken()
console.log(userData)

const BeneficiarySidebarItem: SidebarItems = {
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
    label: "اطلب خدمة خاصة",
    href: "/user/custom-service",
    icon: LayoutList
  },

  {
    label: "الخدمات المتوفرة",
    href: "/user/services",
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

const DonorSidebarItems: SidebarItems = {
  links: [{
    label: "الرئيسية",
    href: "/user",
    icon: Home
  },
  {
    label: "تبرع",
    href: "/user/donate",
    icon: HeartHandshake
  },
  {
    label: "نشر فرصة تطوع",
    href: "/user/add-volunteer-opportunity",
    icon: Home
  },


  {
    label: "نشر خدمة",
    href: "/user/add-service",
    icon: BookHeart
  },


  {
    label: "الطلبات",
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname()

  return (
    <div className="w-full">

      <nav>
        <section className="MOBILE-MENU flex md:hidden ">
          <div
            className="HAMBURGER-ICON space-y-2 cursor-pointer absolute left-[26px] top-[30px]"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-blue-950"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-blue-950"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-blue-950"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav transition-all duration-300 bg-orange-100" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-5 py-5 cursor-pointer"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-orange-400 "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px] w-full gap-5 p-4 text-xl font-bold text-blue-950">
              {userData.Role === "doner" ? ( // Modified conditional check
                DonorSidebarItems.links?.map((link, index) => (
                  <Link key={index}
                    className="w-full text-right"
                    href={link.href} passHref>
                    <Button
                      onClick={() => setIsNavOpen((prev) => !prev)}
                      className="w-full flex-start justify-start gap-2" variant={pathname == link.href ? "secondary" : "ghost"}
                    >
                      <div>
                        {link.icon && <link.icon size={20} />}
                      </div>
                      <span className="inline-block">
                        {link.label}
                      </span>
                    </Button>
                  </Link>

                ))
              ) : (
                BeneficiarySidebarItem.links?.map((link, index) => (
                  <Link key={index}
                    className="w-full text-right"
                    href={link.href} passHref>
                    <Button
                      onClick={() => setIsNavOpen((prev) => !prev)}
                      className="w-full flex-start justify-start gap-2" variant={pathname == link.href ? "secondary" : "ghost"}
                    >
                      <div>
                        {link.icon && <link.icon size={20} />}
                      </div>
                      <span className="inline-block">
                        {link.label}
                      </span>
                    </Button>
                  </Link>

                ))
              )}
              <Button asChild className="w-full">
                <Link href="/login">تسجيل</Link>
              </Button>
            </ul>
          </div>
        </section>
      </nav>
      <style>{`
      .hideMenuNav {
        animation-name: closeMenue;
        animation-duration 0.4s;
        display: none;

      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: #FBF8F2;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        animation-name: openMenue;
        animation-duration 0.4s;
      }

      @keyframes openMenue {
        from {opacity:0};
        to {opacity: 100%};
      }

      @keyframes closeMenue {
        from {display:block};
        to {display: none};
      }
    `}</style>
      <div className="hidden md:block">
        <SidebarDesktop sidebarItems={userData.Role === "doner" ? DonorSidebarItems : BeneficiarySidebarItem} />
      </div>

    </div>

  )
}