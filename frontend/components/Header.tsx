import Link from "next/link";
import React from "react";
import { Oi } from "next/font/google";
import { cn } from "@/lib/utils";


// Import the font
const oi = Oi({
    variable: "--font-Oi",
    subsets: ["latin"],
    weight: "400"
});

const MainTitle = (props: {className?: string}) => {
    return (
        <>
        <div className="rounded-full w-32 bg-transparent border-8 border-background flex items-center justify-center aspect-square">
            <Link href="/">
                <div className={cn(`${oi.className} text-[4rem] text-background`)}>$</div>
            </Link>
        </div>
        <div className={cn(`${oi.className} w-fit text-[3.5rem] text-background p-4`, props.className)}>
            <span className="block">Free</span>
            <span className="block">Stuff</span>
        </div>
       </>
    );
};

const Header = () => {
    return (
        <div className="w-[99vw] h-1/4 flex justify-between items-center bg-foreground border-x-[2vw] border-foreground mb-2">
            <div className="h-full w-fit text-center flex flex-row items-center ">
                <MainTitle className="text-5xl"/>
            </div>
            <div className="w-[30%] h-[100%] flex flex-row justify-between items-center ">
                <Link href="/" className="text-background">About</Link>
                <Link href="/" className="text-background">Contribute</Link>
                <Link href="/" className="text-background">Doc</Link>
            </div>
            <div className="flex flex-col h-[90%] w-[20%] bg-[hsl(var(--secondary-background))] rounded-md  items-center text-background">
                TaskBar
            </div>
        </div>
    );
};

export default Header;