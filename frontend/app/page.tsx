'use client'
import React, { useState } from "react";
import SearchBar from "@/components/searchBar";

export default function Home() {
  // Use useState and destructure the value and setter
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="flex justify-center h-[50vh] w-screen items-center overflow-hidden scroll-m-0 bg-background">
        <SearchBar placeHolder = "Search" inputClassName="w-1/3 h-[10%]" searchIconClassName="w-max h-[10%] px-4"></SearchBar>
      </div>
    </>
  );
}