/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  discription: string;
};

export default function Card(props: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-sm text-blue-950">{props.label}</p>
        {/* icon */}
        <props.icon className="h-4 w-4 text-blue-950" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-blue-950">{props.amount}</h2>
        <p className="text-xs text-blue-900">{props.discription}</p>
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