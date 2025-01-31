import React from "react";
import SearchBar from "@/components/searchBar";
import Image from "next/image";

export default function Home() {
  // Use useState and destructure the value and setter

  return (
    <>
      <div className="flex justify-center h-[75%] w-screen items-center overflow-hidden scroll-m-0 bg-background flex-col flex-1">
        <SearchBar placeHolder = "Search" 
          inputClassName="w-1/3 h-[5%]" 
          searchIconClassName="w-max h-[5%] px-4"
        />
      </div>
    </>
  );
}