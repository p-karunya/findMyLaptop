import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";


export default function MyButton(props: {className: string, query: string, children: React.ReactNode}) {
    return (
        <>
        <Link href={`/search/${props.query}`}>
            <button className={cn("w-[100%] h-12 bg-[#3e9392] text-white rounded-md",props.className)}>
                {props.children}
            </button>
        </Link>
        </>
    );

}