import React from "react";

const MainTitle = () => {
    return (
        <div className="rounded-full bg-slate-100 h-max w-max p-12">
                <div className="text-8xl font-extrabold">Free Stuff</div>
        </div>
    )
}

const Header = () => {
    return (
        <div className="flex justify-center text-[#3e9399] p-4 overflow-hidden">
            <MainTitle/>
        </div>
        
    );
}

export default Header;