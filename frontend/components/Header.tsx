import Link from "next/link";
import React from "react";
import { Oi } from "next/font/google";
import { cn } from "@/lib/utils";
import { BadgeDollarSign } from "lucide-react";


// Import the font
const oi = Oi({
    variable: "--font-Oi",
    subsets: ["latin"],
    weight: "400"
});

const MainTitle = (props: {className?: string}) => {
    return (
        <>
        <div className="rounded-full w-1/3 h-[1/3] bg-transparent border-8 border-white flex items-center justify-center">
            <Link href="/">
                <div className={cn(`${oi.className} text-[4rem] text-white`)}>$</div>
            </Link>
        </div>
        <div className={cn(`${oi.className} w-2/3 text-[3.5rem] text-white`,props.className)}>Free Stuff</div>
       </>
    );
};

const Header = () => {
    return (
        <div className="w-screen h-[25%] flex justify-between items-center bg-foreground">
            <div className="w-[30%] text-center flex flex-row items-center py-2">
                <MainTitle className="relative text-5xl"/>
            </div>
        </div>
    );
};

export default Header;