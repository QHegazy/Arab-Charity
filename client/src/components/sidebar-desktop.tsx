'use client'

import { CircleUserRound, Home, MoreHorizontal, Settings } from "lucide-react";
import { SidbarButton } from "./sidebar-button";
import { SidebarItems } from "@/types/sidebar";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
interface sidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: sidebarDesktopProps) {
  const pathname = usePathname()
  return (
    <aside className="lg:w-[270px] md:w-[88px] max-w-xs h-screen fixed top-0 rihgt-0 bg-white z-40 border-l">
      <div className="h-full px-3 py-4">
        <h3 className="lg:block text-lg font-semibold text-blue-950 ">
          HOME
        </h3>

        <div className="mt-5">
          <div className="flex flex-col gap-3 w-full">
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidbarButton icon={link.icon} className=" w-full" variant="secondary" >
                  {link.label}
                </SidbarButton>
              </Link>

            ))}

            {props.sidebarItems.extra}
          </div>
          <div className=" absolute right-0 bottom-3 w-full px-3">
            <Separator className="absolute -top-3 right-0 bg-orange-400" />
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full justify-start items-center" >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 ">

                      <Avatar className="h-5 w-5 rounded-full">
                        <AvatarImage />
                        <AvatarFallback>User</AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:block">User name </span>
                    </div>
                    <MoreHorizontal />
                  </div>

                </Button>
              </PopoverTrigger>

              <PopoverContent className="mb-2 w-56 p-3 rounded-3xl">
                <div className=" space-y-2">
                  <Link href="/">
                    <SidbarButton icon={Settings} size="sm" className="w-full text-sm">
                      إعدادت الحساب
                    </SidbarButton>
                  </Link>

                  <SidbarButton icon={Settings} size="sm" className="w-full text-sm">
                    تسجيل الخروج
                  </SidbarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}