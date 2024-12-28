"use client"
import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

const SearchBar = (props: {placeHolder: string, inputClassName: string, searchIconClassName: string}) => {
    return (
        <div className = "flex justify-center items-center w-full h-full">
            <SearchIcon size={2} className={props.searchIconClassName}/>
            <Input
                className={props.inputClassName}
                placeholder={props.placeHolder}
            />
        </div>
    );
}

export default SearchBar;