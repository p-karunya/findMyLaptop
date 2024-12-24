'use client'
import { Input } from "@/components/input";
import MyButton from "../components/searchButton";
import React, { useState } from "react";

export default function Home() {
  // Use useState and destructure the value and setter
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="flex justify-center h-[50vh] w-screen items-center overflow-hidden scroll-m-0">
        <Input
          className="px-2"
          type="text"
          placeholder="Search for offers"
          onChange={(e) => setQuery(e.target.value)} // Update state correctly
        />
        <div className="px-2 w-[10%]">
          <MyButton
            className="w-[100%] h-12 bg-[#3e9392] text-white rounded-md"
            query={query} // Pass the query value
          >
            Search
          </MyButton>
        </div>
      </div>
    </>
  );
}