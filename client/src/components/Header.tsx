'use client'
import { useState } from "react";
import { Button } from "./ui/button"
import Link from "next/link";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <header className="header w-full container ">
      <div className=" py-2 px-4 flex items-center justify-between">
        <div className="text-3xl font-bold text-blue-950">
          <Link href="/">Arab Charity</Link>
        </div>
        <div>

          <nav  className="transition-all duration-300">
            <section className="MOBILE-MENU flex md:hidden ">
              <div
                className="HAMBURGER-ICON space-y-2 cursor-pointer"
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
                <ul className="flex flex-col items-center justify-between min-h-[250px] w-full p-4 text-xl font-bold text-blue-950">
                  <Link href="/"
                    className="border-b border-gray-400 my-2 w-full p-2 hover:bg-orange-300 rounded-full transition-all duration-300 "
                  >الرئيسية</Link>
                  <Link href="/about"
                    className="border-b border-gray-400 my-2 w-full p-2 hover:bg-orange-300 rounded-full transition-all duration-300 "
                  >من نحن</Link>
                  <Link href="/contact"
                    className="border-b border-gray-400 my-2 w-full p-2 hover:bg-orange-300 rounded-full transition-all duration-300 "
                  >تواصل</Link>
                  <Link href="/services"
                    className="border-b border-gray-400 my-2 w-full p-2 hover:bg-orange-300 rounded-full transition-all duration-300 "
                  >خدمات</Link>

                  <Button asChild className="w-full">
                    <Link href="/login">تسجيل</Link>
                  </Button>
                </ul>
              </div>
            </section>

            <ul className="DESKTOP-MENU hidden md:flex md:items-center md:justify-between gap-5">
              <li>
                <Link href="/"
                  className="text-xl font-light text-blue-950 hover:text-orange-400 transition-colors duration-200 ">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about"
                  className="text-xl font-light text-blue-950 hover:text-orange-400 transition-colors duration-200 ">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact"
                  className="text-xl font-light text-blue-950 hover:text-orange-400 transition-colors duration-200 ">
                  تواصل
                </Link>
              </li>
              <li>
                <Link href="/services"
                  className="text-xl font-light text-blue-950 hover:text-orange-400 transition-colors duration-200 ">
                  الخدمات
                </Link>
              </li>
            </ul>
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
        </div>
        <Button asChild className="hidden md:block ">
          <Link href="/login">
            تسجيل
          </Link>
        </Button>
      </div>

    </header>
  )
}