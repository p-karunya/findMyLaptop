import Link from "next/link";
import React from "react";

const MainTitle = () => {
    return (
        <div className="rounded-full bg-slate-100 h-max w-max p-12 border-4 border-[#3e9399]">
                <div className="text-8xl font-extrabold">Free Stuff</div>
        </div>
    )
}

const Header = () => {
    return (
        <div className="relative flex justify-center text-[#3e9399] p-4 overflow-hidden">
            <div className="absolute top-24 w-screen h-1/2 bg-[#3e9399] -z-10 transform -translate-y-[40%]"/>
            <div className="absolute top-24 w-screen h-1/3 bg-white -z-10 transform -translate-y-[40%]">
                <div className="flex justify-end items-center w-[100%] h-[100%]">
                    
                    <p className="px-4" rel="stylesheet">About</p>

                </div>
            </div>
            <MainTitle/>
        </div>
        
    );
}

export default Header;