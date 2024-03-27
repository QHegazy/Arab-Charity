/* eslint-disable @next/next/no-img-element */
/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */

import { ClipboardCheck } from "lucide-react";
import React from "react";

export type SalesProps = {
  name: string;
  description: string;
  date: string;
};

export default function SalesCard(props: SalesProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
          <ClipboardCheck className="w-full h-full" />
        </div>
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
            {props.description}
          </div>
        </div>
      </section>
      <p>{props.date}</p>
    </div>
  );
}