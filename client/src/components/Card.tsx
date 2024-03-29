/** @format */

import React from "react";
import { BadgeDollarSign, Book, Home, LucideIcon, Scale, TicketCheck, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardProps = {
  Title?: string;
  icon?: LucideIcon;
  amount?: string;
  Description?: string;
  Commodity?:string;
};

const commodityIcons = {
  Food: <Utensils />,
  RealEstate: <Home />,
  Ticket: <TicketCheck />,
  FinancialAid: <BadgeDollarSign />,
  Course: <Book />,
  LegalSupport:<Scale />,
};

export default function Card(props: CardProps) {
  return (
    <CardContent className="rounded-3xl">
      <section className="flex justify-between gap-2">
        {/* title */}
        <p className="text-sm text-blue-950">{props.Title}</p>
        {/* icon */}
        {commodityIcons[props.Commodity]}
        {/* <props.icon className="h-4 w-4 text-blue-950" /> */}
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-blue-950">{props.amount}</h2>
        <p className="text-xs text-blue-900">{props.Description}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col bg-white  gap-3 rounded-3xl border  p-5 shadow",
        props.className
      )}
    />
  );
}